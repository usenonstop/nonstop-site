import { applyIntMask } from "~/fns/applyIntMask";

export const createClusterIcon = ({
  size,
  selected,
}: {
  size: number;
  selected: boolean;
}) => {
  if (size < 2)
    return selected
      ? "https://www.usenonstop.com/icons/selected-marker.svg"
      : "https://www.usenonstop.com/icons/properties-marker.svg";

  const digits: Record<
    string,
    {
      textX: number;
      textY: number;
      diameter: number;
    }
  > = {
    "1": {
      textX: 11,
      textY: 19,
      diameter: 30,
    },
    "2": {
      textX: 10,
      textY: 21.5,
      diameter: 35,
    },
    "3": {
      textX: 11,
      textY: 26.5,
      diameter: 45,
    },
    "4": {
      textX: 12,
      textY: 34,
      diameter: 60,
    },
    "5": {
      textX: 13,
      textY: 41.5,
      diameter: 75,
    },
    "6": {
      textX: 14,
      textY: 49,
      diameter: 90,
    },
  };

  const textX = digits[size.toString().length]?.textX ?? 11;

  const textY = digits[size.toString().length]?.textY ?? 20;

  const diameter = digits[size.toString().length]?.diameter ?? 30;

  const fill = selected ? "%232063A6" : "%239CA3AF";

  const color = selected ? "white" : "black";

  return `data:image/svg+xml;utf-8, <svg width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle opacity="0.8" cx="${diameter / 2}" cy="${diameter / 2}" r="${
    diameter / 2
  }" fill="${fill}" />
  <text font-family="monospace" style="fill: ${color}" font-weight="semibold" x="${textX}" y="${textY}" fill="%231F2937">${applyIntMask(
    size,
  )}</text>
</svg>
`;
};
