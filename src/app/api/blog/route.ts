import { NextRequest } from "next/server";
import { db } from '../../../lib/mongodb';
import { IPost } from "@/app/interfaces/post.interface";

export const GET = async (request: NextRequest) => {
    try {
        const pipeline = [];

        pipeline.push({ $sort: { createdAt: -1 } });

        pipeline.push({ $match: { deletedAt: { $eq: null } } });
        pipeline.push({ $skip: 0 });
        pipeline.push({ $limit: 1 });

        const posts: IPost[] = await db.collection("posts").aggregate(pipeline).toArray();

        return Response.json(posts);

    } catch (error) {
        return Response.json(error);
    }

}