import { useEffect } from "react";

import { useStreetView } from "~/hooks/useStreetView";

export const StreetView = ({
  position,
}: {
  position: { lat: number; lng: number };
}) => {
  const { ref, load } = useStreetView({ options: { position } });
  useEffect(() => {
    void load();
  }, [load]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};
