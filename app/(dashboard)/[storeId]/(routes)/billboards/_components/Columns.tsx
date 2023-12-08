"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type billboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<billboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Lable",
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
