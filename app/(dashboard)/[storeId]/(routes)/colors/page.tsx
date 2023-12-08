
import { format } from "date-fns"
import db from '@/lib/db'

import { ColorsClient } from './_components/Client'
import { ColorColumn } from './_components/Columns';

const ColorPage = async({params}:{params: {storeId:string}}) => {
  
  const colors = await db.color.findMany({
    where: {
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    },
  });

  const formatedColors:ColorColumn[] = colors.map((item)=> ({
    id:item.id,
    name:item.name,
    value:item.value,
    createdAt:format(item.createdAt, "MMMM do, yyyy")
  }))


  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ColorsClient data={formatedColors}/>
        </div>
    </div>
  )
}

export default ColorPage