
import { format } from "date-fns"
import db from '@/lib/db'

import { CategoryClient } from './_components/Client'
import { categoriesColumn } from './_components/Columns';

const CategoriesPage = async({params}:{params: {storeId:string}}) => {
  
  const categories = await db.category.findMany({
    where: {
      storeId:params.storeId
    },
    include:{
      billboard:true
    },
    orderBy:{
      createdAt:'desc'
    },
  });

  const formatedCategories:categoriesColumn[] = categories.map((item)=> ({
    id:item.id,
    name:item.name,
    billboardLabel:item.billboard.label,
    createdAt:format(item.createdAt, "MMMM do, yyyy")
  }))


  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryClient data={formatedCategories}/>
        </div>
    </div>
  )
}

export default CategoriesPage