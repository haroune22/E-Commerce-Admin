"use client";

import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";


interface OrderClientProps {
  data: OrderColumn[]
}

export const OrderClient = ({data}:OrderClientProps) => {

  return (
    <>
      <Heading 
            title={`Orders (${data.length})`}
            description="Manage Order for your store"
      />
    <Separator/>
    <DataTable  searchKey="products" columns={columns} data={data}/>
    </>
  )
}
