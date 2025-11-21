"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { title } from "@/lib/metadata";

const pages = [
  {
    label: (
      <div className="flex place-items-center gap-2">
        <img
          className="size-[40px]"
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
        />
        <span className="text-xl">{title}</span>
      </div>
    ),
    href: "/",
  },
];

export function Header() {
  return (
    <>
      <header className="sticky flex place-items-center gap-4 border-b p-4 max-md:hidden">
        {pages.map((page, i) => (
          <Link key={i} href={page.href}>
            {page.label}
          </Link>
        ))}
      </header>
      <header className="sticky flex place-content-between border-b p-4 md:hidden">
        <Link href="/">{pages.find((page) => page.href === "/")?.label}</Link>
        {pages.length > 1 && (
          <Drawer>
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="hidden">
                <DrawerTitle>Navigation Menu</DrawerTitle>
                <DrawerDescription>Navigate to other pages</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex flex-col place-content-center gap-4">
                  {pages
                    .map((page) =>
                      page.href === "/"
                        ? {
                            ...page,
                            label: <span className="text-lg">Home</span>,
                          }
                        : page
                    )
                    .map((page, i) => (
                      <DrawerClose key={i}>
                        <Link href={page.href}>{page.label}</Link>
                      </DrawerClose>
                    ))}
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </header>
    </>
  );
}
