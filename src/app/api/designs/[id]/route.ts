import { IDesign } from "@/app/interfaces/design.interface";
import { db } from "@/app/lib/mongodb";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const id = params.id;
        const designs: IDesign[] = await db.collection('designs').find({ key: id }).toArray();
        if (designs && designs.length > 0) {
            const design = designs[0];
            let cover;
            if (design.images && design.images.length > 0) {
                cover = design.images?.filter((img: any) => img.isCover);
                if (cover.length > 0) {
                    design.coverUrl = cover[0]?.fileUrl
                    design.coverAlt = cover[0]?.fileAlt
                } else {
                    design.coverUrl = design.images[0]?.fileUrl
                    design.coverAlt = design.images[0]?.fileAlt

                }
            }
            return Response.json(designs[0]);
        } else {
            return Response.json({});
        }

    } catch (error: any) {
        return Response.json({ "DB": error });
    }
}