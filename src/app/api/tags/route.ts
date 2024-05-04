import { type NextRequest } from "next/server";
import { db } from '../../lib/mongodb';


export const GET = async (request: NextRequest) => {
    try {
        const postsCollection = db.collection('posts');
        const distinctTags = await postsCollection.aggregate([
            { $match: { deletedAt: { $eq: null } } },
            { $project: { tags: 1 } },
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                },

            },
            { $sort: { _id: 1 } }
        ]).toArray();
        const tags = distinctTags.map((tag: { _id: string }) => tag._id);
        return Response.json(tags);
    } catch (error) {
        return Response.json(error);
    }
}