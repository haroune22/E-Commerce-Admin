import db from "@/lib/db";
import { auth } from "@clerk/nextjs"

import { NextResponse } from "next/server"

export async function POST(req:Request, {params}:{params:{storeId:string}}){

    try {

        const { userId } = auth()
        const {label, imageUrl} = await req.json();

        if(!userId){
            return new NextResponse('unauthenticated', { status: 401 })
        };

        if(!label){
            return new NextResponse('label is required' ,{status:402})
        };
        if(!imageUrl){
            return new NextResponse('Image is required' ,{status:402})
        };
        if(!params.storeId){
            return new NextResponse('storeId is required' ,{status:402})
        };

        const storeByUserId = await db.store.findFirst({
            where:{
                userId,
                id:params.storeId
            }
        });

        if(!storeByUserId){
            return new NextResponse('unauthorized', {status:403})
        };

        const billboard = await db.billboard.create({
            data:{
                imageUrl,
                label,
                storeId:params.storeId
            }
        });

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_CREATE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}

export async function GET(req:Request, {params}:{params:{storeId:string}}){

    try {

        if(!params.storeId){
            return new NextResponse('storeId is required' ,{status:402})
        };

     

        const billboards = await db.billboard.findMany({
           where:{
                storeId:params.storeId
           }
        });

        return NextResponse.json(billboards)

    } catch (error) {
        console.log('[BILLBOARDS_GET]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}
