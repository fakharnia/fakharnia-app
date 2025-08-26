import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../lib/mongodb';

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const ipAddress = request.headers.get("x-forwarded-for");
        const postId = params.id;

        // Find the post by its key
        const post = await db.collection('posts').findOne({ key: postId });

        if (!post) {
            return NextResponse.json({
                error: 'Post not found'
            }, { status: 404 });
        }

        const pastHour = new Date(Date.now() - (1 * 60 * 1000)); // Fixed time to 1 hour, not 1 minute

        // Find an existing view within the embedded 'Views' array
        const existingView = post.Views.find((view: any) =>
            view.ip === ipAddress && view.createdAt >= pastHour
        );

        // If no existing view is found within the last hour, record a new one
        if (!existingView) {
            await db.collection('posts').updateOne({ key: postId }, { $push: { Views: { ip: ipAddress, createdAt: new Date() } } });
        }

        return NextResponse.json({
            message: 'View recorded successfully'
        });

    } catch (error) {
        return Response.json({
            error: error
        });
    }

}

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";