import db from "@/lib/db";
import { auth } from "@clerk/nextjs"

import { NextResponse } from "next/server"

export async function POST(req:Request){

    try {

        const { userId } = auth()
        const {name} = await req.json();

        if(!userId){
            return new NextResponse('unauthorized', { status: 401 })
        };

        if(!name){
            return new NextResponse('Name required' ,{status:402})
        };

        const store = await db.store.create({
            data:{
                name:name,
                userId,
            }
        });

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_CREATE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}
