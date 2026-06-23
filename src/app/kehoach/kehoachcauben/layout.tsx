"use client";
export default function KeHoachBaiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="flex min-w-0 flex-1 flex-col bg-white rounded-[4px] border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
        <main className="min-h-0 flex-1 bg-white rounded-[4px]">
          {children}
        </main>
      </div>
    </div>
  );
}
