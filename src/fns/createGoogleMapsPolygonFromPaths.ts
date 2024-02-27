import { decode } from "@googlemaps/polyline-codec";

export const createGoogleMapsPolygonFromPaths = ({
  paths,
  map,
  onCreatePolygon,
}: {
  paths: string[];
  map: google.maps.Map | null;
  onCreatePolygon: (p: google.maps.Polygon, path: string) => void;
}) => {
  if (!map || typeof google === "undefined") return;

  if (!paths) return;

  for (const encoded of paths) {
    const tuples = decode(encoded);
    const paths = tuples.map((tu) => new google.maps.LatLng(tu[0], tu[1]));
    const polygon = new google.maps.Polygon({
      paths,
      strokeColor: "#2063A6",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#2063A6",
      fillOpacity: 0.35,
    });

    polygon.setMap(map);
    onCreatePolygon(polygon, encoded);
  }
};
