import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";

interface MobileToggleProps {
}

export default function SidebarMenuToggle({ }: MobileToggleProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 flex gap-0 w-64">
        <div className="w-full">
          <NavigationSidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
