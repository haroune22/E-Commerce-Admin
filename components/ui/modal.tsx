"use client"

import { 
    Dialog,
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "./dialog"



interface ModalProps {
    title:string;
    description:string;
    isOpen:boolean;
    onClose:()=> void;
    children?:React.ReactNode;
}


export const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    children
}:ModalProps) => {

    const onChnage = (open:boolean)=>{
        if(!open){
            onClose()
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={onChnage} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
        </DialogContent>
    </Dialog>
  )
}
