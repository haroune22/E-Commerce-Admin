"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";



import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { categoriesColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";


interface CategoryClientProps {
  data: categoriesColumn[]
}
export const CategoryClient = ({data}:CategoryClientProps) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
     <div className="flex items-center justify-between">
        <Heading 
            title={`Categories (${data.length})`}
            description="Manage Categories for your billboard"
         />
         <Button onClick={()=>router.push(`/${params.storeId}/categories/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
         </Button>
    </div>
    <Separator/>
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading
      title="API"
      description="API Calls for Categories"
    />
    <Separator/>
    <ApiList entityName="categories" entityIdName="CateogryId" />
    </>
  )
}
