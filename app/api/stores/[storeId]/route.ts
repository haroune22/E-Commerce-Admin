import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{storeId:string}}){

    try {

        const { userId } = auth()
        const { name } = await req.json();

        if(!userId){
            return new NextResponse('unauthorized', { status: 401 })
        };

        if(!name){
            return new NextResponse('Name required' ,{status:402})
        };

        if(!params.storeId){
            return new NextResponse('Store Id required' ,{status:402})
        };

        const store = await db.store.updateMany({
            where:{
                id:params.storeId,
                userId
            },
            data:{
                name:name,
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_UPDATE]',error)
        return new NextResponse('internal Error', { status: 500});
    }
};


export async function DELETE(req:Request, {params}:{params:{storeId:string}}){

    try {

        const { userId } = auth()

        if(!userId){
            return new NextResponse('unauthorized', { status: 401 })
        };

        if(!params.storeId){
            return new NextResponse('Store Id required' ,{status:402})
        };

        const store = await db.store.deleteMany({
            where:{
                id:params.storeId,
                userId
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORE_DELETE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}