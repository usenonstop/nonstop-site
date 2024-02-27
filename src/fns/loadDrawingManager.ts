export const loadDrawingManager = ({ map }: { map: google.maps.Map }) => {
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: false,
    drawingMode: null,
  });

  drawingManager.setMap(map);

  return drawingManager;
};
