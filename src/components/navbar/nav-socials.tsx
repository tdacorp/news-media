import { Facebook, InstagramIcon, Twitter,  } from "lucide-react";
import { Button } from "../ui/button";


export default function NavSocilsLinks() {

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-red-500 hover:text-white">
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant={"ghost"} size="icon" className="h-9 w-9 hover:bg-red-500 hover:text-white">
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant={"ghost"}  size="icon" className="h-9 w-9 hover:bg-red-500 hover:text-white" >
         <InstagramIcon 

          className="h-4 w-4 "
         />
      </Button>
    </div>
  )
}