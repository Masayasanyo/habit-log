import { logout } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items } from "@/lib/sidebar/menu-items";

export function AppSidebar() {
  const currentYear = new Date().getFullYear();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Habit Log</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <form action={logout} className="">
          <Button variant="ghost" type="submit" className="w-full justify-start">
            <div className="font-bold">ログアウト</div>
          </Button>
        </form>
        <small>
          &copy; <span id="year">{currentYear}</span> Habit Log
        </small>
      </SidebarFooter>
    </Sidebar>
  );
}
