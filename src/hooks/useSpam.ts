import { useBoolean } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

interface Options {
  limit?: number;
  duration?: number;
  waiting?: number;
}

export function useSpam(options: Options): [isSpam: boolean, fn: () => void] {
  const [isSpam, setIsSpam] = useBoolean(false);
  const [limit, setLimit] = useState<number>(5);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(20);
  const [waiting, setWaiting] = useState<number>(100);

  const onHandle = useCallback(() => {
    if (date === undefined || date === null) return;

    const eventStartTime = date;
    const eventEndTime = new Date();

    const diff = Math.round(
      (eventEndTime.valueOf() - eventStartTime.valueOf()) / 1000
    );
    if (isSpam && diff > waiting) setIsSpam.off();
    else if (!isSpam && diff > duration) {
      setCount(0);
      setDate(new Date());
    }
    if (count + 1 > limit) {
      setIsSpam.on();
      setDate(new Date());
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }, [isSpam, waiting, count, limit, setIsSpam, date]);

  useEffect(() => {
    setDate(new Date());
    setLimit(options?.limit || 5);
    setDuration(options?.duration || 20);
    setWaiting(options?.waiting || 100);
  }, []);
  return [isSpam, () => onHandle()];
}
