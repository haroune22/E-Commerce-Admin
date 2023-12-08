"use client"
import React, { useState } from 'react'
import { categoriesColumn } from './Columns'
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import axios from 'axios';


interface CellActionProps {
    data: categoriesColumn
}

export const CellAction = ({data}:CellActionProps) => {

    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
          toast.success('Category deleted.');
          router.refresh();
        } catch (error) {
          toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
          setOpen(false);
          setLoading(false);
        }
      };

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Billboard ID copied to clipboard.');
      }

  return (
    <>
     <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>
                <span className='sr-only'> Open Menu </span>
                <MoreHorizontal className='h-4 w-4'/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
};
