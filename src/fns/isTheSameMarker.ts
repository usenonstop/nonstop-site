import type { MapMarker } from "~/types/property";

export const isTheSameMarker = (
  pos1: MapMarker["position"],
  pos2: MapMarker["position"]
) => pos1.lat === pos2.lat && pos1.lng === pos2.lng;
