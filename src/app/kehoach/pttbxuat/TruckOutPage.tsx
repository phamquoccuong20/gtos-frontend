"use client";

import { useState } from "react";

import HeaderActions from "./components/truck-out/HeaderActions";
import VoyageSelector from "./components/truck-out/VoyageSelector";
import TransportTypeSelector from "./components/truck-out/TransportTypeSelector";
import TruckOutTable from "./components/truck-out/TruckOutTable";

import { fetchTruckOutData, saveTruckOut } from "./services/truckOut.service";
import { VesselInfo, TruckOutItem } from "./types/truckOut";

export default function TruckOutPage() {
  const [voyage, setVoyage] = useState<VesselInfo | null>(null);
  const [type, setType] = useState("1");
  const [selectVesselOpen, setSelectVesselOpen] = useState(false);

  const [cellars, setCellars] = useState(0);
  const [rows, setRows] = useState<TruckOutItem[]>([]);

  async function loadData() {
    if (!voyage) return alert("Chưa chọn tàu!");

    const res = await fetchTruckOutData(
      voyage.VoyageKey,
      voyage.VesselType,
      Number(type)
    );
    if (res.errCode !== 0) return;

    setCellars(res.result.Cellars[0]);
    setRows(res.result.result);
  }

  async function save() {
    if (!voyage) return alert("Chưa chọn tàu!");

    const formatted: any = [];

    rows.forEach((r) => {
      if (cellars === 0) {
        if (r.Cellar_Salan === 1) {
          formatted.push({
            VoyageKey: voyage.VoyageKey,
            DeviceID: r.DeviceID,
            Cellar: 99,
          });
        }
      } else {
        for (let i = 1; i <= cellars; i++) {
          if (r[`Cellar_${i}`] === 1) {
            formatted.push({
              VoyageKey: voyage.VoyageKey,
              DeviceID: r.DeviceID,
              Cellar: i,
            });
          }
        }
      }
    });

    const res = await saveTruckOut({
      data: formatted,
      VoyageKey: voyage.VoyageKey,
      key: type,
      opts: cellars === 0 ? 2 : 1,
      arrDeviceID: rows.map((r) => r.DeviceID),
    });

    if (res.errCode === 0) alert("Lưu thành công!");
  }

  return (
    <div className="truck-out-page">
      <h1>KẾ HOẠCH PHƯƠNG TIỆN & NHÂN SỰ XUẤT TÀU</h1>

      <div className="top-row">
        <input
          value={voyage ? voyage.VesselName : ""}
          readOnly
          onClick={() => setSelectVesselOpen(true)}
          placeholder="Chọn tàu"
          className="vessel-input"
        />
      </div>

      <TransportTypeSelector value={type} onChange={setType} />

      <HeaderActions onLoad={loadData} onSave={save} />

      <TruckOutTable data={rows} cellarCount={cellars} onChange={setRows} />

      {/* Modal chọn tàu */}
      <VoyageSelector
        open={selectVesselOpen}
        onClose={() => setSelectVesselOpen(false)}
        onSelect={(v) => setVoyage(v)}
      />
    </div>
  );
}
