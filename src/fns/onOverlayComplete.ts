import gpsi from "geojson-polygon-self-intersections";
import { createPolygon } from "~/fns/createPolygon";

export const onOverlayComplete = function ({
  event,
  map,
  onInvalid,
  onSuccess,
  drawingManager,
}: {
  event: google.maps.drawing.OverlayCompleteEvent;
  drawingManager: google.maps.drawing.DrawingManager;
  map: google.maps.Map;
  onInvalid: () => void;
  onSuccess: ({ polygon }: { polygon: google.maps.Polygon }) => void;
}) {
  if (!(event.overlay instanceof google.maps.Polygon)) return;
  const polygon = createPolygon(event.overlay);
  const poly = { type: "Feature" as const, geometry: polygon.perimeter };
  const intersections = gpsi(poly);

  event.overlay.setMap(null);
  event.overlay = null;

  drawingManager.setDrawingMode(null);

  const coordinates = polygon.perimeter.coordinates[0];

  if (!coordinates) return;

  if (coordinates.length < 4) return;

  if (intersections.geometry.coordinates.length > 0) return onInvalid();

  const polygonCoords = coordinates.map((c) => ({
    lat: c[0],
    lng: c[1],
  }));

  const newPolygon = new google.maps.Polygon({
    paths: polygonCoords,
    strokeColor: "#2063A6",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#2063A6",
    fillOpacity: 0.35,
  });

  newPolygon.setMap(map);

  onSuccess({ polygon: newPolygon });
};
