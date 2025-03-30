import SidebarComponent from "@/components/SidebarComponent";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        <SidebarTrigger className="-ml-1 m-4 cursor-pointer" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}