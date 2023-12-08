
import { format } from "date-fns"
import db from '@/lib/db'

import { OrderClient } from './_components/Client'
import { OrderColumn } from './_components/Columns';
import { formatter } from "@/lib/utils";

const OrdersPage = async({params}:{params: {storeId:string}}) => {
  
  const Orders = await db.order.findMany({
    where: {
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          product: true
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    },
  });

  const formatedOrder:OrderColumn[] = Orders.map((item)=> ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))


  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderClient data={formatedOrder}/>
        </div>
    </div>
  )
}

export default OrdersPage