import { FaMap } from "react-icons/fa";

export const MapButton = ({
  onClick,
  disabled,
  value,
}: {
  onClick: () => void;
  disabled?: boolean;
  value: boolean;
}) => {
  return (
    <div className="@container relative hidden h-full w-full max-w-[100px] xl:flex">
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${
          value ? "" : "opacity-50"
        } flex w-full rounded-lg disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <div className="flex h-12 w-12 shrink-0 grow items-center justify-center gap-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100">
          <FaMap size={16} />
          <span className="@[100px]:flex hidden">Mapa</span>
        </div>
      </button>
    </div>
  );
};
