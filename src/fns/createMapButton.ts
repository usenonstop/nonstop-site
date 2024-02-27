export const createMapButton = ({
  map,
  onClick,
  textContent,
  title,
}: {
  map: google.maps.Map | null;
  onClick: (el: HTMLButtonElement) => void;
  textContent: string;
  title: string;
}) => {
  if (!map) return;

  function createCenterControl() {
    const controlButton = document.createElement("button");

    controlButton.style.backgroundColor = "#fff";
    controlButton.style.border = "2px solid #fff";
    controlButton.style.borderRadius = "3px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.color = "rgb(25,25,25)";
    controlButton.style.cursor = "pointer";
    controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
    controlButton.style.fontSize = "16px";
    controlButton.style.lineHeight = "38px";
    controlButton.style.margin = "8px 6px 22px";
    controlButton.style.padding = "0 5px";
    controlButton.style.textAlign = "center";

    controlButton.textContent = textContent;
    controlButton.title = title;
    controlButton.type = "button";

    controlButton.addEventListener("click", () => onClick(controlButton));

    return controlButton;
  }

  const centerControlDiv = document.createElement("div");
  const centerControl = createCenterControl();
  centerControlDiv.appendChild(centerControl);

  map.controls[google.maps.ControlPosition.TOP_CENTER]?.push(centerControlDiv);

  return centerControl;
};
