import { Facebook, InstagramIcon, Twitter } from "lucide-react";
import { Button } from "../ui/button";

export default function NavSocilsLinks() {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 hover:bg-primary hover:text-primary-foreground"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant={"ghost"}
        size="icon"
        className="h-6 w-6 hover:bg-primary hover:text-primary-foreground"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant={"ghost"}
        size="icon"
        className="h-6 w-6 hover:bg-primary hover:text-primary-foreground"
      >
        <InstagramIcon className="h-4 w-4 " />
      </Button>
    </div>
  );
}
