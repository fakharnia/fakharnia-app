import { NextRequest } from "next/server";
import { db } from '../../../lib/mongodb';
import { IPost } from "@/app/interfaces/post.interface";

interface PipelineStage {
    [key: string]: any;
}

export const GET = async (request: NextRequest) => {
    try {
        const queries = request.url.slice(request.url.indexOf("posts?") + 6, request.url.length);
        let page: number, perPage: number, sortFlow: number;
        let search: string, sort: string, tags: string;

        if (queries.length > 0) {
            const parameters = new URLSearchParams(queries);
            page = Number(parameters.get("page")) || 1;
            perPage = Number(parameters.get("perPage")) || 5;
            search = parameters.get("search") || "";
            sort = parameters.get("sort") || "_id"; // default sort field
            sortFlow = (parameters.get("sortFlow") === "asc" ? 1 : -1) || -1; // default sort flow (ascending)
            tags = parameters.get("tags") || "";
        } else {
            page = 1;
            perPage = 5;
            search = "";
            sort = "_id";
            sortFlow = 1;
            tags = "";
        }

        const pipeline = [];

        if (search || tags) {
            const matchQuery: any = {};
            const searchCriteria: any[] = [];

            if (search) {
                searchCriteria.push({ en_title: { $regex: search, $options: 'i' } });
                searchCriteria.push({ fa_title: { $regex: search, $options: 'i' } });
                searchCriteria.push({ de_title: { $regex: search, $options: 'i' } });
                searchCriteria.push({ tags: { $regex: search, $options: 'i' } });
            }

            if (tags) {
                searchCriteria.push({ tags: { $in: tags.split(",") } });
            }

            matchQuery.$or = searchCriteria;
            pipeline.push({ $match: matchQuery });
        }


        const countPipeline: PipelineStage[] = [...pipeline];

        let sortStage: PipelineStage = {};
        if (sort === "views") {
            sortStage = { totalViews: sortFlow };
            pipeline.push({
                $addFields: {
                    totalViews: { $size: "$Views" }
                }
            });
        } else {
            sortStage[sort] = sortFlow;
        }

        pipeline.push({ $match: { deletedAt: { $eq: null } } });
        pipeline.push({ $sort: sortStage });

        pipeline.push({ $skip: (page - 1) * perPage });
        pipeline.push({ $limit: perPage });


        const posts: IPost[] = await db.collection("posts").aggregate(pipeline).toArray();

        countPipeline.push({ $count: "total" });
        const totalPostArray = await db.collection("posts").aggregate(countPipeline).toArray();
        const postNumbers = totalPostArray.length > 0 ? totalPostArray[0]?.total : 0;

        return Response.json({
            data: posts,
            pages: Math.ceil(postNumbers / perPage),
            perPage: perPage,
            activePage: page,
            total: postNumbers
        });

    } catch (error) {
        return Response.json(error);
    }

}

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";
