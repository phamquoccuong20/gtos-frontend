import { Vessel, CargoSummary, YardBlock } from './types';

export const VESSELS: Vessel[] = [
  {
    id: 'v1',
    name: 'BIEN DONG STAR',
    code: 'BDS',
    inboundVoy: '0912N',
    outboundVoy: '0912X',
    year: '2025',
    eta: '09/12/2025 17:08',
    ata: '09/12/2025 16:30',
    etd: '09/12/2025 23:00',
    inboundLane: 'L1',
    outboundLane: 'L2',
    status: 'at_port',
    hatches: ['Hầm 1', 'Hầm 2', 'Hầm 3', 'Hầm 4']
  },
  {
    id: 'v2',
    name: 'TEST-BUG (KHONG CHAM VAO)',
    code: 'CZ',
    inboundVoy: '400',
    outboundVoy: '400',
    year: '2025',
    eta: '12/11/2025 23:22',
    ata: '',
    etd: '23/11/2025 07:00',
    inboundLane: 'L3',
    outboundLane: 'L4',
    status: 'departed',
    hatches: ['Hầm 1', 'Hầm 2']
  },
  {
    id: 'v3',
    name: 'CTY TNHH RED',
    code: 'ABC',
    inboundVoy: '0711N',
    outboundVoy: '0711X',
    year: '2025',
    eta: '07/11/2025 23:00',
    ata: '',
    etd: '08/11/2025 05:00',
    inboundLane: 'L1',
    outboundLane: 'L1',
    status: 'arriving',
    hatches: ['Hầm A', 'Hầm B']
  },
  {
    id: 'v4',
    name: 'HUMAN LIFE',
    code: 'BDST',
    inboundVoy: '001N',
    outboundVoy: '001X',
    year: '2025',
    eta: '04/11/2025 23:16',
    ata: '04/11/2025 23:00',
    etd: '04/11/2025 23:17',
    inboundLane: 'L2',
    outboundLane: 'L3',
    status: 'at_port',
    hatches: ['H1', 'H2', 'H3']
  },
  {
    id: 'v5',
    name: 'ECKERT OLDENDORFF',
    code: 'EKOD',
    inboundVoy: '2534',
    outboundVoy: '2534',
    year: '2025',
    eta: '01/07/2025 16:07',
    ata: '',
    etd: '23/07/2025 07:00',
    inboundLane: 'L5',
    outboundLane: 'L5',
    status: 'arriving',
    hatches: ['Hold 1', 'Hold 2', 'Hold 3', 'Hold 4', 'Hold 5']
  },
];

export const CARGO_SUMMARY: CargoSummary[] = [
  // Cargo for BIEN DONG STAR (v1)
  { id: 'c1', vesselId: 'v1', name: 'Băng nóng', count: 48, initialCount: 100, unit: 'cuộn', color: 'bg-orange-100 text-orange-700', weightPerUnit: 2.5 },
  { id: 'c2', vesselId: 'v1', name: 'Đường ray', count: 12, initialCount: 20, unit: 'bó', color: 'bg-blue-100 text-blue-700', weightPerUnit: 5.0 },
  { id: 'c3', vesselId: 'v1', name: 'Thép góc', count: 15, initialCount: 15, unit: 'bó', color: 'bg-emerald-100 text-emerald-700', weightPerUnit: 3.0 },

  // Cargo for TEST-BUG (v2)
  { id: 'c4', vesselId: 'v2', name: 'Thép tấm', count: 18, initialCount: 50, unit: 'tấm', color: 'bg-slate-100 text-slate-700', weightPerUnit: 4.2 },

  // Cargo for CTY TNHH RED (v3)
  { id: 'c5', vesselId: 'v3', name: 'Tole cuộn', count: 30, initialCount: 30, unit: 'cuộn', color: 'bg-purple-100 text-purple-700', weightPerUnit: 3.5 },
];

const generateMockYardBlocks = (count: number): YardBlock[] => {
  const baseBlocks = [
    { name: 'VCCDCT', zone: 'Hầm 2', max: 2800 },
    { name: 'V1TEST-0', zone: 'Hầm 1', max: 1500 },
    { name: 'V1TEST-2', zone: 'Hầm 3', max: 2100 },
    { name: 'V1TEST-4', zone: 'Hầm 1', max: 2700 },
    { name: 'VCCK3', zone: 'Hầm 1', max: 2500 },
    { name: 'V1TEST-1', zone: 'Hầm 2', max: 1000 },
  ];

  return Array.from({ length: count }, (_, i) => {
    const base = baseBlocks[i % baseBlocks.length];
    return {
      id: `b${i + 1}`,
      name: `${base.name}-${Math.floor(i / baseBlocks.length) + 1}`,
      zone: base.zone,
      vesselName: i === 0 ? 'BIEN DONG STAR' : '',
      vesselCode: i === 0 ? 'BDS' : '',
      contents: i === 0 ? [
        { cargoId: 'c1', cargoName: 'Băng nóng', quantity: 52, unit: 'cuộn', weight: 130, color: 'bg-orange-100 text-orange-700', vesselName: 'BIEN DONG STAR', vesselCode: 'BDS' },
        { cargoId: 'c3', cargoName: 'Thép góc', quantity: 10, unit: 'bó', weight: 30, color: 'bg-emerald-100 text-emerald-700', vesselName: 'BIEN DONG STAR', vesselCode: 'BDS' }
      ] : [],
      capacityCurrent: i === 0 ? 160 : 0,
      capacityMax: base.max,
      status: i === 0 ? 'active' : 'active'
    };
  });
};

export const YARD_BLOCKS: YardBlock[] = generateMockYardBlocks(54); // Generate 54 blocks to ensure scrolling