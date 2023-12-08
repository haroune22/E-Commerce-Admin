import db from "@/lib/db"




export const getStockCount = async(storeId:string) => {

    try {
        const StockCount = await db.product.count({
            where:{
                storeId,
                isArchived:false
            },
        })

        return StockCount

    } catch (error) {
        return 0
    }
    
}