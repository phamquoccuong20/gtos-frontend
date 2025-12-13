import CangSection from "./sections/Cang";
import TyGiaSection from "./sections/tyGia";
import QuocGiaSection from "./sections/quocGia";
import VungPhuSection from "./sections/vungPhu";

const NAV = [
  { id: "cang", title: "Cảng" },
  { id: "ty-gia", title: "Tỷ giá" },
  { id: "quoc-gia", title: "Quốc gia" },
  { id: "vung-phu", title: "Vùng phụ" },
];

export default function HeThongPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            {n.title}
          </a>
        ))}
      </div>

      <div className="space-y-10">
        <CangSection />
        <TyGiaSection />
        <QuocGiaSection />
        <VungPhuSection />
      </div>
    </div>
  );
}
