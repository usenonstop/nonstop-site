import { Loader } from "@googlemaps/js-api-loader";
import { useCallback, useRef } from "react";
// import { env } from "~/env";

const initialOptions = {
  position: { lat: -23.57, lng: -46.65 },
  visible: true,
};

export const useStreetView = ({
  options,
}: {
  options: Partial<google.maps.StreetViewPanoramaOptions>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    if (!ref.current) return;
    if (typeof google === "undefined") {
      const loader = new Loader({
        // apiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        apiKey: "",
        version: "weekly",
      });
      await loader.load();
    }
    if (!ref.current) return;

    new google.maps.StreetViewPanorama(ref.current, {
      ...initialOptions,
      ...options,
    });
  }, [options]);

  return { ref, load };
};
