import { useCallback, useState } from "react";

type TripleToggleType = 0 | 1 | -1;
export function useTripleToggle(
  initialValue: TripleToggleType = 0
): [TripleToggleType, (e) => void] {
  const [value, setValue] = useState<TripleToggleType>(initialValue);
  const onToggle = useCallback(
    (e: TripleToggleType | null = null) => {
      if (typeof e === "number") {
        setValue(e);
        return;
      }
      if (value === 0) {
        setValue(-1);
      } else if (value === -1) {
        setValue(1);
      } else if (value === 1) {
        setValue(0);
      }
    },
    [value]
  );
  return [value, onToggle];
}

//    NC -1 C 0 I 1
