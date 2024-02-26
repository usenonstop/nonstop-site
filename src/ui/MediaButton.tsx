import { useState } from "react";

export const MediaButton = ({
  icon,
  onClick,
  active,
  label,
  disabled,
  variant = "default",
  withCooldown,
}: {
  icon: React.ReactNode;
  active: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "nonstop" | "default";
  withCooldown?: boolean;
}) => {
  const style = {
    default: {
      regular: "bg-white text-gray-700",
      active: "bg-gray-800 text-white",
    },
    nonstop: {
      regular: "bg-white text-ns-700",
      active: "bg-ns-600 text-white",
    },
  };
  const [cooldown, setCooldown] = useState(false);

  const handleClick = withCooldown
    ? async () => {
        setCooldown(true);
        onClick();
        await new Promise((res) => setTimeout(res, 2000));
        setCooldown(false);
      }
    : () => onClick();

  return (
    <div className="rounded-lg border">
      <button
        disabled={disabled ?? cooldown}
        onClick={() => void handleClick()}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
          style[variant][active ? "active" : "regular"]
        } disabled:opacity-50`}
      >
        {icon}
        {label}
      </button>
    </div>
  );
};
