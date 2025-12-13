"use client";
export default function KeHoachBaiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl p-4 sm:p-6">
      <div className="flex min-w-0 flex-1 flex-col bg-white rounded-lg">
        <main className="min-h-0 flex-1 bg-white rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
}
