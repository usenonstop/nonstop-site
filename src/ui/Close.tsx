import type { SVGProps } from "react";

const Close = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M13 1 1 13M1 1l12 12"
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
    />
  </svg>
);

export default Close;
