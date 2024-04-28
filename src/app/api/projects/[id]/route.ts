import { IProject } from "@/app/interfaces/project.interface";
import { db } from "@/app/lib/mongodb";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const id = params.id;
        const projects: IProject[] = await db.collection('projects').find({ key: id }).toArray();
        if (projects && projects.length > 0) {
            return Response.json(projects[0]);
        } else {
            return Response.json({});
        }

    } catch (error: any) {
        console.log("We encounter the error...!");
        return Response.json({ "DB": error });
    }
}