import SidebarComponent from "@/components/SidebarComponent";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}