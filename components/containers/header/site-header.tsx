"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pageTitles } from "@/lib/header/page-titles";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathName = usePathname();
  const title = pageTitles[pathName.split("/")[2] || "home"] ?? "";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <h1 className="font-medium text-lg">{title}</h1>
    </header>
  );
}
