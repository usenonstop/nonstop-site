/**
 * Finds the children with the highest z-index from target node.
 * If no id is passed fallsback to layout
 */
export const getHighestZIndex = (id = "main"): number => {
  if (typeof window === "undefined") return 0;

  const el = document.getElementById(id);
  const children = el ? el.getElementsByTagName("*") : [];
  let highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);

  for (const c of children) {
    const index = document.defaultView
      ?.getComputedStyle(c, null)
      .getPropertyValue("z-index");

    const zindex = Number.parseInt(
      index === "auto" || !index ? "1" : index,
      10,
    );

    if (zindex > highest) highest = zindex;
  }

  return highest;
};
