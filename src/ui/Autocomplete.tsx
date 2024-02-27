import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { Spinner } from "~/ui/Spinner";
import Close from "~/ui/Close";

export const Autocomplete = (props: {
  label?: string;
  name: string;
  options: string[] | readonly string[];
  placeholder?: string;
  value: string | null;
  onChange: (v: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onChangeInput: (s: string) => void;
}) => {
  const {
    label,
    disabled,
    isLoading,
    onChange,
    value = "",
    options,
    onClose,
    placeholder = "",
    name,
    onChangeInput,
  } = props;
  const [input, setInput] = useState<string>();

  const hasOptions = options.length > 0;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (onChangeInput) onChangeInput(e.target.value);
  };

  const handleClose = () => {
    onClose();
    setInput("");
    if (onChangeInput) onChangeInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.key === "Enter") onClose();
  };

  return (
    <Combobox
      value={value}
      disabled={disabled}
      aria-disabled={disabled}
      onChange={onChange}
      className="relative flex w-full select-none flex-col"
      as="div"
    >
      {({ open }) => (
        <>
          {label && (
            <Combobox.Label
              htmlFor={name}
              className="text-ns-gray-700 mb-1 block text-sm font-medium"
            >
              {label}
            </Combobox.Label>
          )}
          <Combobox.Input
            id={name}
            className="border-ns-gray-300 text-ns-gray-600 focus:outline-ns-300 h-12 max-h-12 w-full truncate rounded-lg border px-3 py-2 text-sm shadow-sm shadow-gray-200 outline-2 disabled:cursor-not-allowed disabled:bg-gray-200"
            displayValue={() => value ?? placeholder}
            placeholder={placeholder}
            onChange={handleChangeInput}
            spellCheck={false}
            autoComplete="off"
          />
          {isLoading && label && (
            <div
              className={`border-ns-gray-200 text-ns-gray-600 absolute top-6 flex h-12 w-full items-center justify-between rounded-lg border bg-gray-100 px-3 text-sm`}
            >
              <div className="">Aguarde...</div>
              <div className="h-5 w-5">
                <Spinner />
              </div>
            </div>
          )}

          {isLoading && !label && (
            <div
              className={`border-ns-gray-200 text-ns-gray-600 absolute top-0 flex h-12 w-full items-center justify-between rounded-lg border bg-gray-100 px-3 text-sm`}
            >
              <div className="">Aguarde...</div>
              <div className="h-5 w-5">
                <Spinner />
              </div>
            </div>
          )}

          {!isLoading && ((open && !!input) || (!open && !!value)) && (
            <Close
              tabIndex={0}
              onClick={handleClose}
              onKeyDown={handleKeyDown}
              className={`${
                !!label ? "top-11" : "top-5"
              } absolute right-3 block h-2 w-2 cursor-pointer stroke-gray-400 stroke-2`}
            />
          )}

          <div>
            <Combobox.Options className="border-ns-gray-300 focus:outline-ns-300 absolute z-10 max-h-96 w-full overflow-scroll rounded-b-lg border border-t-0 border-solid bg-white shadow-sm outline-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-lg">
              {!hasOptions && (
                <div className="text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400 px-3 py-2 text-sm">
                  Sem resultados
                </div>
              )}
              {hasOptions &&
                options.slice(0, 10).map((o) => (
                  <Combobox.Option
                    className="text-ns-gray-600 ui-active:bg-ns-50 ui-active:text-ns-400 px-3 py-2 text-sm"
                    key={o}
                    value={o}
                  >
                    {o}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </div>
        </>
      )}
    </Combobox>
  );
};
