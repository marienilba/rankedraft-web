import { useEffect, useState } from "react";

export const useDevice = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setFirstLoad(false);
  }, []);

  const ssr = firstLoad || typeof navigator === "undefined";

  const isAndroid = !ssr && /android/i.test(navigator.userAgent);
  const isIos =
    !ssr && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];

  return {
    isMobile: isAndroid || isIos,
    isAndroid,
    isIos,
    isDesktop: !isAndroid && !isIos,
  };
};
