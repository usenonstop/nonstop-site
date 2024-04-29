/* eslint-disable react-hooks/exhaustive-deps */
import { type Libraries } from "@googlemaps/js-api-loader";
import { useEffect } from "react";
import { useGoogleMap } from "~/hooks/useGoogleMap";

import type { MapBounds } from "~/types/property";

export const GoogleMap = ({
  options,
  onLoad,
  onBoundsChange,
  onZoomChange,
  onCenterChange,
  libraries,
}: {
  options: Partial<google.maps.MapOptions>;
  onLoad?: ({ map }: { map: google.maps.Map }) => void;
  onBoundsChange?: (b: MapBounds) => void;
  onZoomChange?: (z: number) => void;
  onCenterChange?: (c: { lat: number; lng: number }) => void;
  libraries?: Libraries;
}) => {
  const { ref, load } = useGoogleMap({
    options,
    onBoundsChange,
    onZoomChange,
    onCenterChange,
    onLoad,
    libraries,
  });

  useEffect(() => {
    void load();
  }, []);

  return <div ref={ref} className="h-full w-full" />;
};
