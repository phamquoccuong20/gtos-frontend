import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Định nghĩa Sơ đồ Bãi | Quản lý Bãi Container',
  description: 'Trực quan hóa và quản lý sơ đồ bãi container với bản đồ 2D',
};

export default function CmBlockDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  );
}
