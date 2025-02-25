import { Link, useRouterState } from "@tanstack/react-router";

import { menuConfig } from "@/config/menu-config";
import { cn } from "@/lib/utils";
import { MainLogo } from "../shared/logos";

export default function MainNav() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <div className="mr-4 hidden md:flex gap-6 items-center">
      <Link to="/" className="focus:outline-none">
        <MainLogo />
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {menuConfig.mainNav.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
              pathname === item.href ? "text-foreground" : "text-foreground/80"
            )}>
            {item.title}
          </Link>
          // <NavigationMenuItem key={item.title}>
          //   <NavigationMenuLink
          //     asChild
          //     className={navigationMenuTriggerStyle()}>
          //     <Link href={item.href}>{item.title}</Link>
          //   </NavigationMenuLink>
          // </NavigationMenuItem>
        ))}
      </nav>
    </div>
  );
}
