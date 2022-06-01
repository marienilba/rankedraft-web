import { EffectCallback, useEffect, useRef } from "react";

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
};

export default useUnmount;
