import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IProject } from "@/app/interfaces/project.interface";

export async function GET(request: NextRequest) {
    try {
        const projects: IProject[] = await db.collection('projects').find().sort({ priority: 1 }).toArray();
        if (projects) {
            return Response.json(projects);
        } else {
            return Response.json({});
        }

    } catch (error: any) {
        return Response.json({ "DB": error });
    }
}

