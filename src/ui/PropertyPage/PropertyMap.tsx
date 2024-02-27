import { GoogleMap } from "~/ui/GoogleMap";

export const PropertyMap = ({
  center,
  zoom,
}: {
  center: { lat: number; lng: number };
  zoom: number;
}) => {
  const onLoad = ({ map }: { map: google.maps.Map }) => {
    if (typeof google === "undefined") return;
    new google.maps.Marker({
      map,
      position: center,
      icon: {
        url: "https://www.usenonstop.com/icons/map-marker.svg",
        anchor: new google.maps.Point(55, 55),
      },
    });
  };
  return <GoogleMap onLoad={onLoad} options={{ center, zoom }} />;
};
