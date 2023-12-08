"use client"

import { UseStoreModal } from '@/hooks/use-store-modal'
import { UserButton } from '@clerk/nextjs'
import { useEffect } from 'react'


export default function SetupPage() {

  const {isOpen,onOpen} = UseStoreModal()

  useEffect(()=>{
    if(!isOpen){
      onOpen()
    }
  },[isOpen,onOpen])
  
  return  null
}
