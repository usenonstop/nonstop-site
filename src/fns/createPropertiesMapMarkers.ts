import type { MapMarker, MarkerProperty } from "~/types/property";
import { createClusterIcon } from "~/fns/createClusterIcon";
import { isTheSameMarker } from "~/fns/isTheSameMarker";
import type { onClickMarkerParams } from "~/types/property";

export const createPropertiesMapMarkers = ({
  map,
  locations,
  onClickMarker,
  markers,
}: {
  map: google.maps.Map | null;
  locations: MarkerProperty[];
  onClickMarker: ({ map, size, position }: onClickMarkerParams) => void;
  markers: MapMarker[];
}) => {
  if (typeof google === "undefined") return;
  if (map === null) return;

  let newMarkers = [...markers];

  const handleClickMarker =
    (position: MarkerProperty["position"], size: number) => () =>
      onClickMarker({ map, position, size });

  for (const location of locations) {
    const marker = markers.find((m) =>
      isTheSameMarker(m.position, location.position),
    );
    const needUpdate = marker?.selected !== location.selected;

    if (!!marker && !needUpdate) continue;

    if (!!marker && needUpdate) {
      marker.marker?.setMap(null);
      marker.marker = null;
      newMarkers = newMarkers.filter(
        (m) => !isTheSameMarker(m.position, marker.position),
      );
    }

    const { id, position, selected } = location;

    const m = new google.maps.Marker({
      map,
      position,
      icon: createClusterIcon({
        size: location.size,
        selected: location.selected,
      }),
    });

    newMarkers.push({
      selected,
      size: location.size,
      position,
      id,
      marker: m,
    });
  }

  for (const marker of markers) {
    if (
      locations.some(
        (l) =>
          l.position.lat === marker.position.lat &&
          l.position.lng === marker.position.lng,
      )
    )
      continue;
    marker.marker?.setMap(null);
    marker.marker = null;
    newMarkers = newMarkers.filter(
      (m) => !isTheSameMarker(m.position, marker.position),
    );
  }

  for (const newMarker of newMarkers) {
    if (!newMarker.marker) continue;
    newMarker.listener?.remove();

    const listener = newMarker.marker.addListener(
      "click",
      handleClickMarker(newMarker.position, newMarker.size),
    );

    newMarker.listener = listener;
  }

  return newMarkers;
};
