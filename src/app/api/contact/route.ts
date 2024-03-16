import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IContact } from "@/app/interfaces/contact.interface";

export async function GET(request: NextRequest) {
    try {
        const pipeline = [];

        pipeline.push({ $sort: { priority: 1 } });

        const contacts: IContact[] = await db.collection('contacts').aggregate(pipeline).toArray();
        return Response.json(contacts);
    } catch (error: any) {
        return Response.json({ "DB": error });
    }
}

const getMarkdownContent = async (id: string) => {
    try {
        const serverUrl = `${process.env.SERVER_URI}/service/${id}`;
        const fileContents = await fetch(serverUrl, {
            cache: "no-cache"
        });
        return fileContents.text();
    } catch (error) {
        console.error('Error fetching Markdown content:', error);
        return '';
    }
}