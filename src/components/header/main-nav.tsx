"use client";

// https://nextjs.org/docs/app/api-reference/functions/use-pathname
// > Reading the current URL from a Server Component is not supported.
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  isActive: (pathname: string) => boolean;
}

const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    isActive: (pathname: string) => pathname === "/",
  },
  {
    title: "Projects",
    href: "/projects",
    isActive: (pathname: string) => pathname.startsWith("/projects"),
  },
  {
    title: "Tags",
    href: "/tags",
    isActive: (pathname: string) => pathname.startsWith("/tags"),
  },
  {
    title: "About",
    href: "/about",
    isActive: (pathname: string) => pathname.startsWith("/about"),
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-6 md:gap-8">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo
          width={130}
          height={37.15}
          className="h-[37.15px] w-[130px] text-orange-600 dark:text-yellow-400"
        />
      </Link>
      {mainNavItems?.length ? (
        <nav className="flex gap-6">
          {mainNavItems?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground/80",
                    item.isActive(pathname)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
