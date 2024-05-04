import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IResume } from "@/app/interfaces/resume.interface";

export const GET = async (request: NextRequest) => {
    try {
        const resumes: IResume[] = await db.collection('resumes').find().toArray();
        const resume = resumes[0];
        if (resume) {
            return Response.json(resume);
        } else {
            return Response.json({});
        }

    } catch (error: any) {
        return Response.json({ "DB": error });
    }
}