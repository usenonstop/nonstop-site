/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  delay: number,
  onDebounceChange?: (value: T) => void,
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onDebounceChange && value !== debouncedValue) onDebounceChange(value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
