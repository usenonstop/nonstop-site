import { atom } from "jotai";
import { INITIAL_PROPERTY_FILTER } from "~/consts/property";
import type { MapMarker } from "~/types/property";

export const propertyPaginationAtom = atom({ perPage: 20, currPage: 1 });
export const propertyPerimetersAtom = atom<string[]>([]);
export const propertySearchAtom = atom("");
export const propertyMapPolygonsAtom = atom<google.maps.Polygon[]>([]);
export const propertyMapCreatedPolygonsAtom = atom<string[]>([]);
export const propertyFilterAtom = atom(
  structuredClone(INITIAL_PROPERTY_FILTER),
);

export const propertyMapZoomAtom = atom(12);
export const propertyMapWidthAtom = atom(400);
export const propertyMapSelectedProperties = atom<MapMarker["position"][]>([]);
export const propertyMapCenterAtom = atom({
  lat: -23.57,
  lng: -46.65,
});
export const propertyMapBoundsAtom = atom({
  NE: { lat: 20, lng: -30 },
  SW: { lat: -45, lng: -75 },
});
export const propertyMapMapAtom = atom<google.maps.Map | null>(null);
export const propertyMapMarkersAtom = atom<MapMarker[]>([]);
