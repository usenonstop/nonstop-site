export const getMapBounds = (b: google.maps.LatLngBounds) => {
  const NE = b.getNorthEast();
  const SW = b.getSouthWest();

  return {
    NE: { lat: NE.lat(), lng: NE.lng() },
    SW: { lat: SW.lat(), lng: SW.lng() },
  };
};
