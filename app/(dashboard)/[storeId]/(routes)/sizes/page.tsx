
import { format } from "date-fns"
import db from '@/lib/db'

import { SizesClient } from './_components/Client'
import { SizeColumn } from './_components/Columns';

const SizesPage = async({params}:{params: {storeId:string}}) => {
  
  const sizes = await db.size.findMany({
    where: {
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    },
  });

  const formatedSizes:SizeColumn[] = sizes.map((item)=> ({
    id:item.id,
    name:item.name,
    value:item.value,
    createdAt:format(item.createdAt, "MMMM do, yyyy")
  }))


  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizesClient data={formatedSizes}/>
        </div>
    </div>
  )
}

export default SizesPage