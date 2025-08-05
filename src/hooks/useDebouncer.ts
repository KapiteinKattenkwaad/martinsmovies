import { useEffect, useState, useRef } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const handler = setTimeout(() => {
      if (mountedRef.current) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      mountedRef.current = false;
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}