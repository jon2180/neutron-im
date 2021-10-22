import { debounce } from "lodash";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

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

export function parseGetParams(
  paramsStr: string
): Readonly<Record<string, string>> | null {
  if (!paramsStr || paramsStr === "" || paramsStr.indexOf("?") < 0) {
    return null;
  }
  const params: Record<string, string> = {};
  const tempArr = paramsStr.split("?");
  const pairs = tempArr[tempArr.length - 1]
    .split("&")
    .map((value) => {
      return value.split("=");
    })
    .filter((value) => {
      return value.length === 2 && value[0] && value[0] !== "";
    });
  for (let value of pairs) {
    if (value.length === 2) params[value[0]] = value[1];
  }
  return params;
}

export function useGetParams<T extends Record<string, string>>(
  defaultVal?: T
): Readonly<T> {
  const location = useLocation();
  const getParams = parseGetParams(location.search);

  if (!getParams) return defaultVal ? defaultVal : ({} as T);
  if (!defaultVal) return getParams as T;
  return {
    ...defaultVal,
    ...getParams,
  } as T;
}
