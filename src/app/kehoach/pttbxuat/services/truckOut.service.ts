export async function fetchTruckOutData(
  voyageKey: string,
  vesselType: number,
  opts: number
) {
  const res = await fetch("/Planning/truckPlanningOut/getTruckPlanning", {
    method: "POST",
    body: JSON.stringify({
      VoyageKey: voyageKey,
      VesselType: vesselType,
      opts,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function saveTruckOut(data: any) {
  const res = await fetch("/Planning/truckPlanningOut/save", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function fetchVessels(filter: any) {
  const res = await fetch("/Planning/vsVesselVisit/get", {
    method: "POST",
    body: JSON.stringify(filter),
    headers: { "Content-Type": "application/json" },
  });

  return await res.json();
}
