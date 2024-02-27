import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

export const PaginationSelect = ({
  perPage,
  onChange,
  disabled,
}: {
  perPage: number;
  onChange: (v: number) => void;
  disabled: boolean;
}) => {
  return (
    <Listbox
      disabled={disabled}
      value={perPage}
      onChange={onChange}
      className="@container relative flex w-16 max-w-[150px] shrink-0 grow select-none flex-col font-normal"
      as="div"
    >
      <Listbox.Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.stopPropagation()
        }
        className="border-ns-gray-300 text-ns-gray-600 focus:outline-ns-300 ui-open:rounded-b-none flex h-12 w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-left text-sm shadow-sm shadow-gray-200 outline-2  disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        <>
          <span className="mr-2 truncate">
            {perPage}
            <span className="@[123px]:inline hidden">{` por página`}</span>
          </span>
          <FaChevronDown className="ui-open:rotate-180 text-xs font-light transition-transform" />
        </>
      </Listbox.Button>
      <div>
        <Listbox.Options className="border-ns-gray-300 focus:outline-ns-300 absolute z-10 max-h-96 w-full overflow-scroll rounded-b-lg border border-t-0 border-solid bg-white shadow-sm outline-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
          <Listbox.Option
            onClick={(e: React.MouseEvent<HTMLLIElement>) =>
              e.stopPropagation()
            }
            className="text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400 px-3 py-2 text-sm"
            value={20}
          >
            20
          </Listbox.Option>
          <Listbox.Option
            onClick={(e: React.MouseEvent<HTMLLIElement>) =>
              e.stopPropagation()
            }
            className="text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400 px-3 py-2 text-sm"
            value={50}
          >
            50
          </Listbox.Option>
          <Listbox.Option
            onClick={(e: React.MouseEvent<HTMLLIElement>) =>
              e.stopPropagation()
            }
            className="text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400 px-3 py-2 text-sm"
            value={100}
          >
            100
          </Listbox.Option>
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
