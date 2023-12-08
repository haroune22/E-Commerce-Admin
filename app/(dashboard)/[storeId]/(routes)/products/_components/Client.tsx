"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";



import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";


interface ProductClientProps {
  data: ProductColumn[]
}
export const ProductClient = ({data}:ProductClientProps) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
     <div className="flex items-center justify-between">
        <Heading 
            title={`Products (${data.length})`}
            description="Manage Product for your store"
         />
         <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
         </Button>
    </div>
    <Separator/>
    <DataTable  searchKey="label"columns={columns} data={data}/>
    <Heading
      title="API"
      description="API calls for Products"
    />
    <Separator/>
    <ApiList entityName="Products" entityIdName="ProductId" />
    </>
  )
}
