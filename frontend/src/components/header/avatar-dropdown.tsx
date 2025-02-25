import useAuth from "@/hooks/use-auth";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRound, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@tanstack/react-router";
import { pb } from "@/services/pocketbase";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { avatarNav } from "@/config/menu-config";

export default function AvatarDropdown() {
  const { user, logout } = useAuth();
  const { avatar, id: userId } = user ?? {};

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const avatarUrl = `${pb.baseURL}/api/files/users/${userId}/${avatar}?thumb=100x100`;

  if (isDesktop) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 items-center cursor-pointer select-none">
            <div className="hidden md:flex flex-col text-right">
              <p className="font-bold text-sm lg:text-base tracking-tight transition-colors truncate">
                {user?.name}
              </p>
              <span className="text-muted-foreground tracking-tight text-[12px] leading-none">
                123 XP
              </span>
            </div>
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                <CircleUserRound />
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          {avatarNav.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link to={item.link}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer disablePreventScroll={false}>
      <DrawerTrigger asChild>
        <Avatar>
          <AvatarImage className="select-none" src={avatarUrl} />
          <AvatarFallback>
            <CircleUserRound />
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent className="max-h-[60svh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-4 px-2">
            <Avatar className="w-14 h-14">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                <CircleUserRound />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className=" scroll-m-20 text-xl font-bold tracking-tight transition-colors first:mt-0">
                {user?.name}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="grid items-start gap-4 px-4">
          {avatarNav.map((item, index) => (
            <Link to={item.link} key={index}>
              <Button
                asChild
                variant={"outline"}
                className="w-full justify-start">
                <div>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Button>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <Button
            asChild
            variant="destructive"
            className="w-full justify-start">
            <div>
              <LogOut />
              <span>Выйти</span>
            </div>
          </Button>
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
