import db from "@/lib/db";
import { auth } from "@clerk/nextjs"

import { NextResponse } from "next/server"

export async function POST(req:Request, {params}:{params:{storeId:string}}){

    try {

        const { userId } = auth()
        const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
          }
      
          if (!name) {
            return new NextResponse("Name is required", { status: 400 });
          }
      
          if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
          }
      
          if (!price) {
            return new NextResponse("Price is required", { status: 400 });
          }
      
          if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
          }
      
          if (!colorId) {
            return new NextResponse("Color id is required", { status: 400 });
          }
      
          if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
          }
      
          if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
          }

        const storeByUserId = await db.store.findFirst({
            where:{
                userId,
                id:params.storeId
            }
        });

        if(!storeByUserId){
            return new NextResponse('unauthorized', {status:403})
        };

        const product = await db.product.create({
            data:{
               name,
               price,
               categoryId,
               colorId,
               isArchived,
               isFeatured,
               sizeId,
               storeId:params.storeId,
               images:{
                createMany: {
                    data: [
                        ...images.map((image: { url: string }) => image),
                      ],
                }
               }
            }
        });

        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCTS_CREATE]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}

export async function GET(req:Request, {params}:{params:{storeId:string}}){

    try {

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const isFeatured = searchParams.get('isFeatured');

        if(!params.storeId){
            return new NextResponse('storeId is required' ,{status:402})
        };

          const products = await db.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
            });

        return NextResponse.json(products)

    } catch (error) {
        console.log('[PRODUCTS_GET]',error)
        return new NextResponse('internal Error', { status: 500})
    }
}
