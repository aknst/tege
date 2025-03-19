import { Settings, User } from "lucide-react";
import { ReactNode } from "react";

export interface MainNavItem {
  title: string;
  href: string;
  items?: MainNavItem[];
}

export interface MobileNavItem {
  title: string;
  href: string;
  icon?: ReactNode;
}

export interface AvatarNavItem {
  icon: ReactNode;
  label: string;
  link: string;
}

export interface MenuConfig {
  mainNav: MainNavItem[];
  mobileNav: MobileNavItem[];
}

export const avatarNav: AvatarNavItem[] = [
  {
    icon: <User />,
    label: "Профиль",
    link: "/profile",
  },
  {
    icon: <Settings />,
    label: "Настройки",
    link: "/profile/settings",
  },
];

// Конфигурация меню
export const menuConfig: MenuConfig = {
  mainNav: [
    {
      title: "Банк задач",
      href: "/bank",
      items: [],
    },
    {
      title: "Варианты и подборки",
      href: "/documentation",
      items: [
        { title: "API Reference", href: "/documentation/api" },
        { title: "Guides", href: "/documentation/guides" },
      ],
    },
    {
      title: "Курсы",
      href: "/blog",
      items: [],
    },
    {
      title: "О нас",
      href: "/blog",
      items: [],
    },
  ],
  mobileNav: [
    {
      title: "Home",
      href: "/",
      icon: <User />,
    },
    {
      title: "Documentation",
      href: "/documentation",
      icon: <Settings />,
    },
  ],
};
