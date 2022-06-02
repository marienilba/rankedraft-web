import { useCallback, useState } from "react";

export default function useIncrementation(
  initialValue: number
): { value: any; inc: () => void; dec: () => void; reset: () => void }[] {
  const [value, setValue] = useState<number>(initialValue);
  const inc = useCallback(() => {
    setValue((v) => v + 1);
  }, []);

  const dec = useCallback(() => {
    setValue((v) => v - 1);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [{ value, inc, dec, reset }];
}
