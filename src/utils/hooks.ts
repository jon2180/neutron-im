import { debounce } from "lodash";
import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

interface WindowDimensionsHookParams {
  debounceTime?: number;
}

const defaultWindowsDimensionsHookParams: WindowDimensionsHookParams = {
  debounceTime: 300,
};

export default function useWindowDimensions(
  props?: WindowDimensionsHookParams
) {
  const mixedProps = {
    ...defaultWindowsDimensionsHookParams,
    ...props,
  };

  const { debounceTime } = mixedProps;

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const resizer = debounce(function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }, debounceTime);

  useEffect(() => {
    window.addEventListener("resize", resizer);
    return () => window.removeEventListener("resize", resizer);
  }, [resizer]);

  return windowDimensions;
}
