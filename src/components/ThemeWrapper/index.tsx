import React, { useRef } from "react";

const { Provider, Consumer } = React.createContext({} as Record<string, string | number>);

export enum ThemeList {
  DEFAULT = "default",
  LIGHT = "light",
  dark = "dark",
}

export default function ThemeWrapper({
  children,
  theme,
}: {
  children: JSX.Element;
  theme: ThemeList;
}) {
  // const htmlTag = document.getElementsByTagName("html").item(0);
  // const ref = useRef(htmlTag);
  // const headerTag = useRef(document.getElementsByTagName("head").item(0));
  //
  // const baseLink = useRef(document.createElement("link"));
  // baseLink.current.rel = "stylesheet";
  // baseLink.current.href = `/themes/${theme}.css`;
  // headerTag.current?.appendChild(baseLink.current);
  //
  // if (ref.current) ref.current.className = theme;
  return <Consumer>
    {(settings) => {
      return children
    }}
  </Consumer>;
}

export const ThemeContext = { ThemeProvider: Provider, ThemeWrapper }
