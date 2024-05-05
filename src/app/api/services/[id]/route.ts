import { ObjectId } from "mongodb";
import { db } from '../../../../lib/mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const service = await db.collection('services').findOne({ _id: new ObjectId(id) });
        if (service) {
            service.fa_fileUrl = await getMarkdownContent(service.fa_fileUrl);
            service.en_fileUrl = await getMarkdownContent(service.en_fileUrl);
            service.deu_fileUrl = await getMarkdownContent(service.deu_fileUrl);
            return Response.json(service);
        } else {
            return Response.json({});
        }

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
        return '';
    }
}

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";
