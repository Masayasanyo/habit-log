"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pageTitles } from "@/lib/header/page-titles";

export function SiteHeader() {
  const pathName = usePathname();
  const title = pageTitles[pathName.split("/")[2] || "home"] ?? "";

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 px-4 text-primary">
      <SidebarTrigger className="-ml-1" />
      <h1 className="font-medium text-lg">{title}</h1>
    </header>
  );
}
