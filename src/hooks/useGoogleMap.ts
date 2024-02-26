/* eslint-disable react-hooks/exhaustive-deps */
import { type Libraries, Loader } from "@googlemaps/js-api-loader";
import { useCallback, useRef } from "react";

import { getMapBounds } from "~/fns/getMapBounds";
import { INITIAL_GOOGLE_MAPS_OPTION } from "~/consts/property";
import type { MapBound } from "~/types/property";
import { env } from "~/env";

export const useGoogleMap = ({
  options,
  onBoundsChange,
  onZoomChange,
  onLoad,
  onCenterChange,
  libraries,
}: {
  options: Partial<google.maps.MapOptions>;
  onBoundsChange?: (b: MapBound) => void;
  onZoomChange?: (z: number) => void;
  onCenterChange?: (c: { lat: number; lng: number }) => void;
  onLoad?: ({ map }: { map: google.maps.Map }) => void;
  libraries?: Libraries;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  const load = useCallback(async () => {
    if (!ref.current) return;

    if (typeof google === "undefined") {
      const loader = new Loader({
        apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries,
      });
      await loader.load();
    }

    if (!ref.current) return;

    map.current = new google.maps.Map(ref.current, {
      ...INITIAL_GOOGLE_MAPS_OPTION,
      ...options,
    });

    map.current.addListener("center_changed", () => {
      const mapCenter = map.current?.getCenter();
      if (!mapCenter || !onCenterChange) return;
      onCenterChange({ lat: mapCenter.lat(), lng: mapCenter.lng() });
    });

    map.current.addListener("dragend", () => {
      const googleBounds = map.current?.getBounds();
      if (!googleBounds || !onBoundsChange) return;

      const mapBounds = getMapBounds(googleBounds);

      onBoundsChange(mapBounds);
    });

    map.current.addListener("zoom_changed", () => {
      const newZoom = map.current?.getZoom();
      if (!newZoom || !onZoomChange) return;
      onZoomChange(newZoom);

      const googleBounds = map.current?.getBounds();
      if (!googleBounds || !onBoundsChange) return;
      const mapBounds = getMapBounds(googleBounds);

      onBoundsChange(mapBounds);
    });

    if (onLoad) onLoad({ map: map.current });
  }, []);

  return { ref, load, map: map.current };
};
