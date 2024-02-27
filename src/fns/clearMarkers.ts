import type { MapMarker } from "~/types/property";

export const clearMarkers = (markers: MapMarker[]) => {
  for (const marker of markers) {
    marker.marker?.setMap(null);
    marker.marker = null;
  }
};
