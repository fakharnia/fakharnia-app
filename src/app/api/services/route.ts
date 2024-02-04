import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IService } from "@/app/[lang]/interfaces/service.interface";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const priority = searchParams.get('priority')
        let filter = {};
        if (priority) {
            filter = { priority: priority }
        }
        const service = await db.collection('services').find(filter).toArray();
        if (service) {
            const servicesDb: IService[] = service;

            let services: any[] = [];

            for (const service of servicesDb) {
                const temp: IService = service;
                temp.fa_fileUrl = await getMarkdownContent(service.fa_fileUrl);
                temp.en_fileUrl = await getMarkdownContent(service.en_fileUrl);
                temp.deu_fileUrl = await getMarkdownContent(service.deu_fileUrl);
                services.push(temp);
            }

            if (services) {
                return Response.json(services);
            }
            return Response.json({ "DB": "What the hell?!" });
        } else {
            console.log("I don't have the Service!");
            return Response.json({});
        }

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