import { useCallback, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { menuConfig } from "@/config/menu-config";
import { Link } from "@tanstack/react-router";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <div className="cursor-pointer md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Меню</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className=" scroll-m-20 text-2xl font-bold tracking-tight transition-colors first:mt-0">
            Главное меню
          </DrawerTitle>
          <DrawerDescription>Основные ссылки</DrawerDescription>
        </DrawerHeader>

        {menuConfig.mainNav.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="block py-2 px-4 text-md font-medium hover:bg-accent hover:text-accent-foreground">
            {item.title}
          </Link>
        ))}

        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
