import { Typography } from "antd";
import ReactMarkdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import math from "remark-math";
import type {
  NormalComponents,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";

const components: Partial<NormalComponents & SpecialComponents> = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={materialLight}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props} children={children} />
    );
  },
};

export default function MdRenderer({ children }: { children: string }) {
  return (
    <Typography>
      <ReactMarkdown remarkPlugins={[gfm, math]} components={components}>
        {children}
      </ReactMarkdown>
    </Typography>
  );
}
