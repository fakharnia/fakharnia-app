import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IStatus } from "@/app/interfaces/status.interface";

export async function GET(request: NextRequest) {
    try {
        const status: IStatus[] = await db.collection('status').find().toArray();
        if (status && status.length > 0) {
            return Response.json(status[0]);
        }
        return Response.json({});
    } catch (error: any) {
        console.log("We incounter the error...!");
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