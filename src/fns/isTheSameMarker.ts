import type { Marker } from "~/types/property";

export const isTheSameMarker = (
  pos1: Marker["position"],
  pos2: Marker["position"],
) => pos1.lat === pos2.lat && pos1.lng === pos2.lng;
