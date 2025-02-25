import useAuth from "@/hooks/use-auth";
import MainNav from "./main-nav";
import { MobileNav } from "./mobile-nav";
import ModeToggle from "../shared/mode-toggle";
import AvatarDropdown from "./avatar-dropdown";
import LoginDialog from "../auth/login-dialog";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="w-full sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 pr-2 md:px-6">
        <MainNav />
        <MobileNav />
        <div className="flex items-center gap-2 ml-auto">
          <nav className="flex md:flex-row-reverse items-center gap-2">
            <ModeToggle />
            {user ? <AvatarDropdown /> : <LoginDialog />}
          </nav>
        </div>
      </div>
    </header>
  );
}
