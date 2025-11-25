import { auth } from "@/lib/auth";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { headers } from "next/headers";

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs: {
    title: string;
    href: string;
  }[];
}

export default async function AppLayout({
  children,
  breadcrumbs,
}: AppLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" session={session} />
      <SidebarInset>
        <SiteHeader breadcrumbs={breadcrumbs} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
