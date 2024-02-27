export const encodePerimeter = (polygons: google.maps.Polygon[]) =>
  polygons.map((p) => google.maps.geometry.encoding.encodePath(p.getPath()));
