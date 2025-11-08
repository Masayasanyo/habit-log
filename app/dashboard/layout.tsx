import { SiteHeader } from "@/components/containers/header/site-header";
import { AppSidebar } from "@/components/containers/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="flex h-100vh flex-col">
        <SiteHeader />
        <main className="h-full p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
