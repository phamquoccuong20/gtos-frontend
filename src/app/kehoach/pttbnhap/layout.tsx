"use client";
export default function KeHoachBaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-svh overflow-hidden mx-auto w-full max-w-7xl p-4 sm:p-6">
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <main className="min-h-0 flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
