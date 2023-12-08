import { UserButton, auth } from "@clerk/nextjs"

import { MainNav } from "./MainNav"
import { StoreSwitcher } from "./StoreSwitcher"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { ModeToggle } from "./theme-toggle"


const Navbar = async() => {
    
    const { userId } =auth();

    if(!userId) {
        return redirect("/sign-in")
    };

    const stores = await db.store.findMany({
        where: {
            userId
        }
    });

    if(!stores){
        redirect('/')
    };

  return (
    <div className="border-b ">
        <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores} />
           <MainNav className="mx-6"/>
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle/>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>
  )
}

export default Navbar