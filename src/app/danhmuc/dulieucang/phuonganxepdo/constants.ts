export const PHUONG_AN_OPTIONS = [
  { label: "HẠ TẬP KẾT", value: "HBAI" as const },
  { label: "XUẤT BÃI", value: "LAYN" as const },
  { label: "GIAO HÀNG", value: "NGTH" as const },
  { label: "XUẤT GIAO THẲNG", value: "XGTH" as const },
  { label: "XUẤT TÀU", value: "XTAU" as const },
];

export const PA_LABEL_BY_CODE: Record<string, string> = {
  HBAI: "HẠ TẬP KẾT",
  LAYN: "XUẤT BÃI",
  NGTH: "GIAO HÀNG",
  XGTH: "XUẤT GIAO THẲNG",
  XTAU: "XUẤT TÀU",
};

export const PA_CODE_BY_LABEL: Record<string, string> = Object.fromEntries(
  Object.entries(PA_LABEL_BY_CODE).map(([code, label]) => [label, code])
);

export const STORAGE_KEY = "phuonganxepdo-data";
