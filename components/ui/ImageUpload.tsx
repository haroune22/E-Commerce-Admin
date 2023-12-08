"use client"

import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from "./button";




interface ImageUploadProps {
    disabled?: boolean,
    onChange: (value:string) => void;
    onRemove: (value:string) => void;
    value:string[]
};


const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value,
}:ImageUploadProps) => {

    const [isMounted,setIsMounted]=useState<boolean>(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null;
    };

    const onUpload = (result:any) => {
        onChange(result.info.secure_url);
    };

  return (
    <div>
        <div className="mb-4 flex items-center gap-4">
            {value.map((url)=>(
                <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden ">
                    <div className="z-10 absolute top-2 right-2">
                        <Button variant="destructive" type="button" onClick={()=>onRemove(url)} size='icon' >
                            <Trash className="h-4 w-4"/>
                        </Button>
                    </div>
                    <Image src={url}  fill className="object-cover" alt="image" />
                </div>
            ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="ecommerceAdmin">
            {({ open }) => {
            const onClick = () => {
                open();
            };

            return (
                <Button 
                type="button" 
                disabled={disabled} 
                variant="secondary" 
                onClick={onClick}
                >
                <ImagePlus className="h-4 w-4 mr-2" />
                    Upload an Image
                </Button>
            );
            }}
        </CldUploadWidget>
    </div>
  )
}


export default ImageUpload

