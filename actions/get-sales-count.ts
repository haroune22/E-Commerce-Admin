import db from "@/lib/db"




export const getTSalesCount = async(storeId:string) => {

    try {
        const SalesCount = await db.order.count({
            where:{
                storeId,
                isPaid:true
            },
        })

        return SalesCount

    } catch (error) {
        return 0
    }
    
}