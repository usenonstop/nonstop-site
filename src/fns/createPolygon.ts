export const createPolygon = (overlay: google.maps.Polygon) => {
  const polygonCoordinates: number[][] = [];

  overlay
    .getPath()
    .getArray()
    .forEach((latlng) => {
      polygonCoordinates.push([latlng.lat(), latlng.lng()]);
    });

  const firstCoordinate = polygonCoordinates[0];
  if (firstCoordinate) polygonCoordinates.push(firstCoordinate);

  return {
    perimeter: { coordinates: [polygonCoordinates], type: "Polygon" as const },
  };
};
