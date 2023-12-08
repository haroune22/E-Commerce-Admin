import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}:{params:{storeId:string, billboardId:string}}){

    try {

        const { userId } = auth()
        const { label,imageUrl } = await req.json();

        if(!userId){
            return new NextResponse('unauthorized', { status: 401 })
        };

        if(!label){
            return new NextResponse('label is required' ,{status:402})
        };
        if(!imageUrl){
            return new NextResponse('imageUrl is  required' ,{status:402})
        };

        if(!params.billboardId){
            return new NextResponse('Billboard Id required' ,{status:402})
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

        const billboard = await db.billboard.updateMany({
            where:{
                id:params.billboardId,
            },
            data:{
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_UPDATE]',error)
        return new NextResponse('internal Error', { status: 500});
    }
};


export async function DELETE(req:Request, {params}:{params:{storeId:string, billboardId:string}}){

    try {

        const { userId } = auth()

        if(!userId){
            return new NextResponse('unauthorized', { status: 401 })
        };

        if(!params.storeId){
            return new NextResponse('Billboard Id required' ,{status:402})
        };
        if(!params.billboardId){
            return new NextResponse('Billboard Id required' ,{status:402})
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

        const billboard = await db.billboard.deleteMany({
            where:{
                id:params.billboardId,
            }
        });

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_DELETE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
  ) {
    try {
      if (!params.billboardId) {
        return new NextResponse("Billboard id is required", { status: 400 });
      }
  
      const billboard = await db.billboard.findUnique({
        where: {
          id: params.billboardId
        }
      });
    
      return NextResponse.json(billboard);
    } catch (error) {
      console.log('[BILLBOARD_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
