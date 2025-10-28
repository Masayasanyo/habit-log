import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/containers/sidebar/app-sidebar";
import { SiteHeader } from "@/components/containers/header/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
