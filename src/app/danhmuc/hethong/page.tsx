import Link from "next/link";

const NAV = [
  { id: "cang", title: "Cảng" },
  { id: "exchangeRate", title: "Tỷ giá" },
  { id: "quoc-gia", title: "Quốc gia" },
  { id: "vung-phu", title: "Vùng phụ" },
];

export default function HeThongPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {NAV.map((n) => (
          <Link
            key={n.id}
            href={`/danhmuc/hethong/${n.id}`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            {n.title}
          </Link>
        ))}
      </div>

      <div className="space-y-10">
      </div>
    </div>
  );
}
