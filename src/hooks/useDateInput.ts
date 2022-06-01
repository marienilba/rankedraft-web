import { useState, ChangeEvent, useCallback } from "react";

export default function useDateInput(
  initialValue: string
): [
  inputValue: string,
  value: string,
  setValue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => void
] {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [value, setValue] = useState<string>(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
      const reg = new RegExp("^[0-9]*$");
      let text: string;
      if (typeof e === "string") {
        text = e;
      } else {
        text = e.target.value;
      }
      text = text.replaceAll("/", "");
      if (!reg.test(text)) {
        return;
      }

      if (text.length < 3) {
        if (Number(text) > 31) return;
      }

      if (text.length < 5) {
        if (Number(text.slice(2, text.length)) > 12) return;
      }

      setValue(text);
      let inputText = "";

      for (let i = 0; i < text.length; i++) {
        inputText +=
          i < 8
            ? i < 6
              ? i === 0
                ? text[i]
                : i % 2 === 0
                ? "/" + text[i]
                : text[i]
              : text[i]
            : "";
      }

      setInputValue(inputText);
    },
    []
  );
  return [inputValue, value, onChange];
}
