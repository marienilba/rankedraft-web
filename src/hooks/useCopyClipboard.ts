import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

interface IOptions {
  successDuration?: number;
}

export function useCopyClipboard(
  options?: IOptions
): [boolean, (text: string) => void] {
  const [isCopied, setIsCopied] = useState(false);
  const successDuration = options && options.successDuration;

  useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied, successDuration]);

  return [
    isCopied,
    (text: string) => {
      const didCopy = copy(text);
      setIsCopied(didCopy);
    },
  ];
}
