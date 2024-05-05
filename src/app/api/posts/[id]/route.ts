import { NextRequest } from "next/server";
import { db } from '../../../../lib/mongodb';
import { IPost } from "@/app/interfaces/post.interface";
import { ObjectId } from "mongodb";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const id = params.id;
        const posts: IPost[] = await db.collection('posts').find({ _id: new ObjectId(id) }).toArray();
        if (posts && posts.length > 0) {
            const post = posts[0];
            return Response.json(posts[0]);
        } else {
            return Response.json({});
        }

    } catch (error) {
        return Response.json(error);
    }

}