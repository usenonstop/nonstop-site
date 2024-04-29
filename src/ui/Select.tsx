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
  nullLabel,
}: {
  label?: string;
  options: T[] | readonly T[];
  name: string;
  placeholder?: string;
  value: T | null;
  onChange: (v: T) => void;
  disabled?: boolean;
  isLoading?: boolean;
  nullLabel?: string;
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
          className="mb-1 block text-sm font-medium text-ns-gray-700"
        >
          {label}
        </Listbox.Label>
      )}
      <Listbox.Button
        id={name}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.stopPropagation()
        }
        className="flex h-12 max-h-12 w-full items-center rounded-lg border border-ns-gray-300 bg-white px-3 py-2 text-left text-sm text-ns-gray-600 shadow-sm shadow-gray-200 outline-2 focus:outline-ns-300 disabled:cursor-not-allowed  disabled:bg-gray-200 ui-open:rounded-b-none"
      >
        <>
          <span className="mr-2 truncate">{value ? value : placeholder}</span>
          <FaChevronDown className="ml-auto text-xs font-light transition-transform ui-open:rotate-180" />
        </>
      </Listbox.Button>
      <div>
        <Listbox.Options className="absolute z-10 max-h-96 w-full overflow-scroll rounded-b-lg border border-t-0 border-solid border-ns-gray-300 bg-white shadow-sm outline-2 scrollbar focus:outline-ns-300">
          {hasOptions &&
            options.map((o) => (
              <Listbox.Option
                onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                  e.stopPropagation()
                }
                className="px-3 py-2 text-sm text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400"
                key={o}
                value={o}
              >
                {o}
              </Listbox.Option>
            ))}
          <Listbox.Option
            onClick={(e: React.MouseEvent<HTMLLIElement>) =>
              e.stopPropagation()
            }
            className="px-3 py-2 text-sm text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400"
            value={null}
          >
            {nullLabel ?? "-"}
          </Listbox.Option>
          {!hasOptions && (
            <Listbox.Option
              className="px-3 py-2 text-sm text-ns-gray-600"
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
