import { NextRequest } from "next/server";
import { db } from '../../../../lib/mongodb';
import { ObjectId } from "mongodb";

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const ipAddress = request.headers.get("x-forwarded-for");
        const postId = params.id;

        const viewsCollection = db.collection('views');
        const pastHour = new Date(Date.now() - (1 * 60 * 1000));

        const postsCollection = db.collection('posts');

        const existingView = await viewsCollection.findOne({ ip: ipAddress, postId: postId, createdAt: { $gte: pastHour } });

        if (!existingView) {
            await viewsCollection.insertOne({ ip: ipAddress, postId: postId, createdAt: new Date() });

            await postsCollection.updateOne({ _id: new ObjectId(postId) }, { $push: { Views: { ip: ipAddress, createdAt: new Date() } } });
        }

        return Response.json({
            message: 'View recorded successfully'
        });

    } catch (error) {
        return Response.json({
            error: error
        });
    }

}