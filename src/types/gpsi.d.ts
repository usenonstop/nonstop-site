declare module "geojson-polygon-self-intersections" {
  function gpsi(feature: {
    type: "Feature";
    geometry: { type: "Polygon"; coordinates: number[][][] };
  }): {
    type: "Feature";
    geometry: { type: "MultiPoint"; coordinates: number[][] };
  };
  export = gpsi;
}
