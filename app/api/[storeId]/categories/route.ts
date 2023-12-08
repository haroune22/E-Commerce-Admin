import db from "@/lib/db";
import { auth } from "@clerk/nextjs"

import { NextResponse } from "next/server"

export async function POST(req:Request, {params}:{params:{storeId:string}}){

    try {

        const { userId } = auth()
        const {name, billboardId} = await req.json();

        if(!userId){
            return new NextResponse('unauthenticated', { status: 401 })
        };

        if(!name){
            return new NextResponse('name is required' ,{status:402})
        };
        if(!billboardId){
            return new NextResponse('billboardId is required' ,{status:402})
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

        const category = await db.category.create({
            data:{
                name,
                billboardId,
                storeId:params.storeId
            }
        });

        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORIES_CREATE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}

export async function GET(req:Request, {params}:{params:{storeId:string}}){

    try {

        if(!params.storeId){
            return new NextResponse('storeId is required' ,{status:402})
        };

     

        const categories = await db.category.findMany({
           where:{
                storeId:params.storeId
           }
        });

        return NextResponse.json(categories)

    } catch (error) {
        console.log('[CATEGORIES_CREATE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}
