"use client"
import { Store } from "@prisma/client"
import { Check, ChevronsUpDown, Plus, Store as StoreIcon} from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { UseStoreModal } from "@/hooks/use-store-modal"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwicherProps extends PopoverTriggerProps {
    items: Store[],

}


export const StoreSwitcher = ({
    className,
    items = []
}:StoreSwicherProps) => {

    const storeModal = UseStoreModal();
    const params = useParams();
    const router  = useRouter();

    const [open,setOpen] = useState(false);

    const formattedItems = items.map((item)=> ({
        label:item.name,
        value:item.id
    }));

    const currentStore = formattedItems.find((item)=> item.value === params.storeId);

    const onStoreSelect =( store: { value: string, label: string }) => {
            setOpen(true)
            router.push(`/${store.value}`)
    };

  return (
    <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
            <Button 
                variant='outline' 
                size='sm' 
                role="combobox" 
                aria-expanded={open} 
                aria-label="Select a store"
                className={cn('w-[200px] justify-between ', className)} 
            >
                <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 ">
            <Command>
                <CommandList>
                    <CommandInput 
                        placeholder="Search Store..."
                     />
                     <CommandEmpty>
                        No Store Found
                     </CommandEmpty>
                     <CommandGroup heading="Stores">
                        {formattedItems.map((store)=> (
                            <CommandItem
                                key={store.value}
                                onSelect={()=>onStoreSelect(store)}
                                className="text-sm"
                             >
                                <StoreIcon className="mr-2 w-4 h-4" />
                                {store.label}
                                <Check 
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                    )} 
                                />
                            </CommandItem>
                        ))}
                     </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem onSelect={()=> {
                            setOpen(false),
                            storeModal.onOpen()   
                        }} >
                        <Plus className="mr-2 h-5 w-5"/>
                        Create Store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}
