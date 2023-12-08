"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Billboard, Category } from "@prisma/client"
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Heading } from "@/components/ui/Heading";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface CategoryFormProps {
    initialData: Category | null;
    billboards:Billboard[] 
}

const formSchema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(1)
});

type CategoryFormValues = z.infer<typeof formSchema>

export const CategoryForm = ({initialData,billboards}:CategoryFormProps) => {

    const params = useParams();
    const router = useRouter();

  
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData  || {
          name:"",
          billboardId:"",
        }
    });

    const title = initialData ? 'Edit Category' : 'Create Category';
    const description = initialData ? 'Edit a Category.' : 'Add a new Category';
    const toastMessage = initialData ? 'Category updated.' : 'Category created.';
    const action = initialData ? 'Save changes' : 'Create';
  

    const onSubmit = async (data: CategoryFormValues) => {
      try {
        setLoading(true);
        if (initialData) {
          await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data);
        } else {
          await axios.post(`/api/${params.storeId}/categories`, data);
        }
        router.refresh();
        router.push(`/${params.storeId}/categories`);
        toast.success(toastMessage);
      } catch (error: any) {
        toast.error('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
  
    const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
        router.refresh();
        router.push(`/${params.storeId}/categories`);
        toast.success('Category deleted.');
      } catch (error: any) {
        toast.error('Make sure you removed all products using this category first.');
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  
  return (
    <>
    <AlertModal  
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
     />
    <div className="flex items-center justify-between">
        <Heading 
            title={title}
            description={description}
         />
         {initialData  && (
           <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
            >
                <Trash className="h-4 w-4" />
          </Button>
         )}
    </div>
    <Separator />
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField  
              control={form.control}  
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField  
              control={form.control}  
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                      ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
     
    </>
  )
}
