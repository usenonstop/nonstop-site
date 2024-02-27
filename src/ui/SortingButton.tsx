import type { Dispatch, SetStateAction } from "react";
import { BiSortAlt2 } from "react-icons/bi";

import { useClickOutside } from "~/hooks/useClickOutside";
import type { SortingState } from "~/types/property";
import { SortingMenu } from "~/ui/SortingMenu";

export const SortingButton = ({
  sortingOptions,
  sorting,
  setSorting,
  disabled,
  showDesktop,
  className,
}: {
  sortingOptions: Record<string, string>[];
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  disabled?: boolean;
  showDesktop?: boolean;
  className?: string;
}) => {
  const { ref, showElement, setShowElement } = useClickOutside();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return setShowElement((s) => !s);
    }
    if (e.key === "Esc") {
      e.preventDefault();
      return setShowElement(false);
    }
  };
  return (
    <div
      className={`@container pointer-events-none relative z-10 w-full max-w-[160px] rounded-lg ${
        showDesktop ? "" : "xl:hidden"
      } ${className}`}
    >
      <button
        disabled={disabled}
        onClick={() => setShowElement((s) => !s)}
        onKeyDown={handleKeyDown}
        className={`flex w-full rounded-lg disabled:opacity-50 ${
          showElement ? "" : "pointer-events-auto"
        }`}
      >
        <div className="flex h-12 w-12 shrink-0 grow items-center justify-center gap-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100">
          <BiSortAlt2 size={18} />
          <span className="@[100px]:flex hidden">Ordenar</span>
        </div>
      </button>

      {showElement && !disabled && (
        <SortingMenu
          sorting={sorting}
          setSorting={setSorting}
          ref={ref}
          sortingOptions={sortingOptions}
        />
      )}
    </div>
  );
};
