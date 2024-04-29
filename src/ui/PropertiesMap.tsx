/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import {
  propertyFilterAtom,
  propertyPaginationAtom,
  propertySearchAtom,
  propertyMapBoundsAtom,
  propertyMapCenterAtom,
  propertyMapMapAtom,
  propertyMapMarkersAtom,
  propertyMapPolygonsAtom,
  propertyMapSelectedProperties,
  propertyMapZoomAtom,
  propertyPerimetersAtom,
} from "~/atoms/property";
import NoSSR from "~/ui/NoSSR";
import { GoogleMap } from "~/ui/GoogleMap";
import { clearMarkers } from "~/fns/clearMarkers";
import { createMapButton } from "~/fns/createMapButton";
import { createPropertiesMapMarkers } from "~/fns/createPropertiesMapMarkers";
import { isTheSameMarker } from "~/fns/isTheSameMarker";
import { loadDrawingManager } from "~/fns/loadDrawingManager";
import type { Marker } from "~/types/property";
import { onOverlayComplete } from "~/fns/onOverlayComplete";
import { encodePerimeter } from "~/fns/encodePerimeter";
import { createGoogleMapsPolygonFromPaths } from "~/fns/createGoogleMapsPolygonFromPaths";
import { toast } from "~/hooks/useToast";
import { api } from "~/utils/api";

export type onClickMarkerParams = {
  map: google.maps.Map;
  size: number;
  position: Marker["position"];
};

export const PropertiesMap = () => {
  const [, setPerimeterControl] = useState<HTMLButtonElement>();
  const [polygons, setPolygons] = useAtom(propertyMapPolygonsAtom);
  const [selectionControl, setSelectionControl] = useState<HTMLButtonElement>();
  const [clearPerimetersControl, setClearPerimetersControl] =
    useState<HTMLButtonElement>();
  const [bounds, setBounds] = useAtom(propertyMapBoundsAtom);
  const [zoom, setZoom] = useAtom(propertyMapZoomAtom);
  const [center, setCenter] = useAtom(propertyMapCenterAtom);
  const [search] = useAtom(propertySearchAtom);
  const [drawingManager, setDrawingManager] =
    useState<google.maps.drawing.DrawingManager>();
  const [map, setMap] = useAtom(propertyMapMapAtom);
  const [selectedProperties, setSelectedProperties] = useAtom(
    propertyMapSelectedProperties,
  );
  const [createdPolygons, setCreatedPolygons] = useState<string[]>([]);
  const [mapMarkers, setMapMarkers] = useAtom(propertyMapMarkersAtom);
  const [, setPagination] = useAtom(propertyPaginationAtom);
  const [perimeters, setPerimeters] = useAtom(propertyPerimetersAtom);

  const [filters] = useAtom(propertyFilterAtom);

  const utils = api.useUtils();

  const onClickMarker = ({ map, size, position }: onClickMarkerParams) => {
    const currentZoom = map.getZoom();

    if (!currentZoom) return;

    if (currentZoom < 17 && size > 1) {
      map.panTo(position);
    }

    if (size > 1 && currentZoom < 17) {
      const newZoom = currentZoom + 1;
      setZoom(newZoom);
      return map.setZoom(newZoom);
    }

    setSelectedProperties((p) => {
      if (p.some((loc) => isTheSameMarker(loc, position)))
        return p.filter((loc) => !isTheSameMarker(loc, position));
      return [...p, position];
    });
  };

  const clearSelection = () => {
    setSelectedProperties([]);
  };

  const updatePerimeters = (p: string[]) => {
    setPerimeters(p);
    void utils.property["get-all"].invalidate();
    void utils.property["get-markers"].invalidate();
    setPagination((p) => ({ ...p, currPage: 1 }));
  };

  const clearPolygons = (polygons: google.maps.Polygon[]) => {
    for (const p of polygons) {
      p.setMap(null);
    }
    setPolygons([]);
    updatePerimeters([]);
  };

  api.property["get-markers"].useQuery(
    {
      zoom,
      bounds,
      search,
      selectedProperties,
      filters,
      perimeters,
    },
    {
      onError: (error) => toast({ severity: "ERROR", message: error.message }),
      onSuccess: (data) => {
        map?.setZoom(zoom);
        if (selectedProperties.length === 0) {
          selectionControl?.remove();
          setSelectionControl(undefined);
        }

        if (polygons.length === 0) {
          clearPerimetersControl?.remove();
          setClearPerimetersControl(undefined);
        }

        if (perimeters.length > 0)
          createGoogleMapsPolygonFromPaths({
            paths: perimeters.filter(
              (path) => !createdPolygons.some((encoded) => encoded === path),
            ),
            map,
            onCreatePolygon: (p, path) => {
              setCreatedPolygons((p) => [...p, path]);
              setPolygons((poly) => [...poly, p]);
            },
          });

        if (polygons.length > 0 && clearPerimetersControl) {
          clearPerimetersControl.onclick = () => clearPolygons(polygons);
        }

        if (polygons.length > 0 && !clearPerimetersControl) {
          const clearPerimetersButton = createMapButton({
            map,
            onClick: () => clearPolygons(polygons),
            textContent: "Limpar Perímetros",
            title: "Clique para limpar os perímetros",
          });
          setClearPerimetersControl(clearPerimetersButton);
        }

        if (selectedProperties.length > 0 && !selectionControl) {
          const selectionButton = createMapButton({
            map,
            onClick: clearSelection,
            textContent: "Limpar Seleção",
            title: "Clique para limpar a seleção",
          });
          setSelectionControl(selectionButton);
        }

        const newMarkers = createPropertiesMapMarkers({
          map,
          locations: data ?? [],
          onClickMarker,
          markers: mapMarkers,
        });

        if (newMarkers) setMapMarkers(newMarkers);
      },
    },
  );

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        drawingManager?.setDrawingMode(null);
      }
    };

    window.addEventListener("keydown", keydownListener);

    return () => window.removeEventListener("keydown", keydownListener);
  }, [drawingManager]);

  const enterDrawingMode = (
    drawingManager?: google.maps.drawing.DrawingManager,
  ) => {
    if (!drawingManager) return;

    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  };

  const onLoad = ({ map }: { map: google.maps.Map }) => {
    setMap(map);

    const drawingManager = loadDrawingManager({ map });

    setDrawingManager(drawingManager);

    drawingManager.addListener(
      "overlaycomplete",
      (e: google.maps.drawing.OverlayCompleteEvent) =>
        onOverlayComplete({
          event: e,
          map,
          drawingManager,
          onSuccess: ({ polygon }) => {
            setPolygons((p) => {
              const newPolygons = [...p, polygon];
              const encoded = encodePerimeter([polygon]);

              setCreatedPolygons((c) => [...c, ...encoded]);

              updatePerimeters([...new Set(encodePerimeter(newPolygons))]);
              return newPolygons;
            });
          },
          onInvalid: () => {
            toast({ severity: "WARNING", message: "Polígono inválido" });
          },
        }),
    );

    const perimeterButton = createMapButton({
      map,
      onClick: () => enterDrawingMode(drawingManager),
      textContent: "Criar perímetro",
      title: "Clique para criar um filtro de perímetro",
    });
    setPerimeterControl(perimeterButton);
  };

  useEffect(() => {
    return () => {
      clearMarkers(mapMarkers);
      setMapMarkers([]);
    };
  }, []);

  return (
    <NoSSR>
      <div className="h-full overflow-hidden rounded-lg">
        <GoogleMap
          onLoad={onLoad}
          onCenterChange={(c) => setCenter(c)}
          onBoundsChange={(b) => setBounds(b)}
          onZoomChange={(z) => setZoom(z)}
          libraries={["drawing"]}
          options={{
            gestureHandling: "greedy",
            center,
            zoom,
            maxZoom: 17,
            minZoom: 4,
          }}
        />
      </div>
    </NoSSR>
  );
};
