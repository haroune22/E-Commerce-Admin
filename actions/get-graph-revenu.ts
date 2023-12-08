import db from "@/lib/db"


interface GraphData {
    name: string;
    total: number;
  }

export const getGraphRevenue = async(storeId:string): Promise<GraphData[]> => {

    try {
        const paidOrders = await db.order.findMany({
            where:{
                storeId,
                isPaid:true
            },
            include:{
                orderItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
    
        let monthlyRevenue: { [key:number]:number } = {};

 // Grouping the orders by month and summing the revenue
        for(const order of paidOrders){

            const month = order.createdAt.getMonth() // 0 for Jan, 1 for Feb, ...
            console.log("month:",month)
            let revenueForOrder = 0;

            for(const item of order.orderItems){
                revenueForOrder += item.product.price.toNumber()
                // console.log("revnueOrder:",revenueForOrder)
            }
            // Adding the revenue for this order to the respective month
            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
            // console.log("monthlyRevenue:",monthlyRevenue)
        
        }

        const graphData: GraphData[] = [
            { name: "Jan", total: 0 },
            { name: "Feb", total: 0 },
            { name: "Mar", total: 0 },
            { name: "Apr", total: 0 },
            { name: "May", total: 0 },
            { name: "Jun", total: 0 },
            { name: "Jul", total: 0 },
            { name: "Aug", total: 0 },
            { name: "Sep", total: 0 },
            { name: "Oct", total: 0 },
            { name: "Nov", total: 0 },
            { name: "Dec", total: 0 },
          ];

          for (const month in monthlyRevenue) {
            graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
          }
        //   console.log("grpahData",graphData)
          return graphData;

    } catch (error) {
        console.log("ERROR_GRAPHDATA:",error)
        return []
    }
    
}