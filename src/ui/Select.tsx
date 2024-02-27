import { Listbox } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { Spinner } from "~/ui/Spinner";

export const Select = <T extends string>({
  label,
  options,
  name,
  placeholder = "Selecione",
  value,
  onChange,
  disabled,
  isLoading,
}: {
  label?: string;
  options: T[] | readonly T[];
  name: string;
  placeholder?: string;
  value: T | null;
  onChange: (v: T) => void;
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  const hasOptions = options.length > 0;

  return (
    <Listbox
      disabled={disabled}
      value={value ?? null}
      onChange={onChange}
      className="relative flex w-full select-none flex-col"
      as="div"
    >
      {isLoading && (
        <div className="absolute h-full w-full rounded-lg border border-gray-300 bg-gray-200">
          <div className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        </div>
      )}
      {label && (
        <Listbox.Label
          htmlFor={name}
          className="text-ns-gray-700 mb-1 block text-sm font-medium"
        >
          {label}
        </Listbox.Label>
      )}
      <Listbox.Button
        id={name}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.stopPropagation()
        }
        className="border-ns-gray-300 text-ns-gray-600 focus:outline-ns-300 ui-open:rounded-b-none flex h-12 max-h-12 w-full items-center rounded-lg border bg-white px-3 py-2 text-left text-sm shadow-sm shadow-gray-200 outline-2  disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        <>
          <span className="mr-2 truncate">{value ? value : placeholder}</span>
          <FaChevronDown className="ui-open:rotate-180 ml-auto text-xs font-light transition-transform" />
        </>
      </Listbox.Button>
      <div>
        <Listbox.Options className="border-ns-gray-300 focus:outline-ns-300 absolute z-10 max-h-96 w-full overflow-scroll rounded-b-lg border border-t-0 border-solid bg-white shadow-sm outline-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
          {hasOptions &&
            options.map((o) => (
              <Listbox.Option
                onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                  e.stopPropagation()
                }
                className="text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400 px-3 py-2 text-sm"
                key={o}
                value={o}
              >
                {o}
              </Listbox.Option>
            ))}
          {!hasOptions && (
            <Listbox.Option
              className="text-ns-gray-600 px-3 py-2 text-sm"
              value={null}
            >
              Nenhuma opção...
            </Listbox.Option>
          )}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
