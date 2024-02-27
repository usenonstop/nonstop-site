import { useState, useRef, useEffect } from "react";

export const useClickOutside = (initialValue?: boolean) => {
  const [showElement, setShowElement] = useState<boolean>(!!initialValue);
  const ref = useRef<HTMLDivElement>(null);

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") setShowElement(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      return setShowElement(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleEscape, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, showElement, setShowElement };
};
