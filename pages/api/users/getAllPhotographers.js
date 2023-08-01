import prisma from "@/components/prisma";

export default async function handler(req,res){

    const photographers = await prisma.photographer.findMany()

    if(photographers){
        res.status(200).json({photographers})
    }
}