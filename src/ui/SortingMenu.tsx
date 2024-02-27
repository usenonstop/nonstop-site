import {
  type Dispatch,
  type SetStateAction,
  type ForwardedRef,
  forwardRef,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import type { SortingState } from "~/types/property";

const SortingMenuComponent = (
  {
    sortingOptions,
    sorting,
    setSorting,
  }: {
    sortingOptions: Record<string, string>[];
    sorting: SortingState;
    setSorting: Dispatch<SetStateAction<SortingState>>;
  },
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const sortingState = sorting[0];
  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-full z-10 w-full min-w-fit -translate-x-1/2 rounded-b-lg border border-t-0 bg-white p-4"
    >
      <div className="pointer-events-auto flex flex-col gap-2">
        {sortingOptions.map((o) =>
          Object.entries(o).map((e) => {
            const active = sortingState?.id === e[0];
            const desc = sortingState?.desc;
            return (
              <button
                onClick={() =>
                  setSorting((s) => {
                    const el = s[0];
                    if (!el) return [{ id: e[0], desc: false }];
                    if (el.id !== e[0]) return [{ id: e[0], desc: false }];
                    if (!el.desc) return [{ id: e[0], desc: true }];
                    return [];
                  })
                }
                key={e[0]}
                className={`${
                  active ? "bg-ns-50" : ""
                }  rounded border p-2 text-left text-sm text-gray-700`}
              >
                <div className="flex items-center gap-2">
                  {e[1]}
                  {active && (
                    <FaChevronDown
                      size={10}
                      className={`transition-transform ${
                        desc ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
};

export const SortingMenu = forwardRef(SortingMenuComponent);
