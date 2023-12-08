"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";



import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";


interface SizesClientProps {
  data: SizeColumn[]
}

export const SizesClient = ({data}:SizesClientProps) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
     <div className="flex items-center justify-between">
        <Heading 
            title={`Sizes (${data.length})`}
            description="Manage Sizes for your store"
         />
         <Button onClick={()=>router.push(`/${params.storeId}/sizes/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
         </Button>
    </div>
    <Separator/>
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading
      title="API"
      description="API calls for Sizes"
    />
    <Separator/>
    <ApiList entityName="Sizes" entityIdName="sizeId" />
    </>
  )
}
