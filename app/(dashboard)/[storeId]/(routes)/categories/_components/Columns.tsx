"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type categoriesColumn = {
  id: string
  billboardLabel: string
  name:string
  createdAt: string
}

export const columns: ColumnDef<categoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Billboard",
    header: "Billboard",
    cell: ({row}) => row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"actions",
    cell:({row})=><CellAction data={row.original}/>
  }
]
