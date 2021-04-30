interface HelmetProps {
  children?: JSX.Element | JSX.Element[];
}

function handleMetaElement(child: JSX.Element) {
  if (
    child.type === "title" &&
    child.props.children &&
    typeof child.props.children === "string"
  ) {
    document.title = child.props.children;
  } else if (
    child.type === "meta" &&
    child.props.name &&
    typeof child.props.name === "string"
  ) {
    document
      .querySelector(`meta[name=${child.props.name}]`)
      ?.setAttribute("content", child.props.content);
  } else {
    // NONE
  }
}

export default function Helmet({ children }: HelmetProps) {
  if (!children) {
    return <></>;
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      handleMetaElement(child);
    }
  } else {
    handleMetaElement(children);
  }

  return <></>;
}
