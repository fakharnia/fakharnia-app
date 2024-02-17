import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IProject } from "@/app/interfaces/project.interface";

export async function GET(request: NextRequest) {
    try {
        const projects: IProject[] = await db.collection('projects').find().sort({ priority: 1 }).toArray();
        if (projects) {
            return Response.json(projects);
        } else {
            console.log("I don't have the Project!");
            return Response.json({});
        }

    } catch (error: any) {
        console.log("We incounter the error...!");
        return Response.json({ "DB": error });
    }
}

