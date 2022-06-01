import { useState, ChangeEvent, useCallback } from "react";

export default function useInput(
  initialValue: string = "",
  limit: number = 0
): [
  {
    value: string;
    onChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
    ) => void;
  }
] {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string): void => {
      if (typeof e === "string") {
        if (limit > 0) {
          if (inputValue.length + e.length < limit) setInputValue(e);
        } else setInputValue(e);
      } else if (limit > 0) {
        if (inputValue.length + e.target.value.length < limit)
          setInputValue(e.target.value);
      } else setInputValue(e.target?.value);
    },
    [limit, inputValue, initialValue]
  );

  return [{ value: inputValue, onChange }];
}
