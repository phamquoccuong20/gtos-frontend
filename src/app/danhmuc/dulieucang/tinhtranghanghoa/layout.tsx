import SidebarNav from "@/components/Sidebar";
import HeaderBar from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-svh overflow-hidden m-auto w-full max-w-7xl p-4 sm:p-6"> 
      <div className="flex">
        <main className="">{children}</main>
      </div>
    </div>
  );
}
