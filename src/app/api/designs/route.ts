import { type NextRequest } from 'next/server'
import { db } from '../../lib/mongodb';
import { IDesign, IUiImage } from "@/app/interfaces/design.interface";

export async function GET(request: NextRequest) {
    try {
        const designs: IDesign[] = await db.collection('designs').find().sort({ priority: 1 }).toArray();
        let designsToReturn = [];
        for (let design of designs) {
            const cover = design.images.find((i: any) => i.isCover) || design.images[0];
            const temp = {
                fa_title: design.fa_title,
                en_title: design.en_title,
                deu_title: design.deu_title,
                priority: design.priority,
                fa_description: design.fa_description,
                en_description: design.en_description,
                deu_description: design.deu_description,
                images: design.images,
                coverUrl: cover?.fileUrl,
                coverAlt: cover?.fileAlt,
                key: design.key
            };
            designsToReturn.push(temp);
        }
        if (designs) {
            return Response.json(designsToReturn);
        } else {
            return Response.json({});
        }

    } catch (error: any) {
        return Response.json({ "DB": error });
    }
}

