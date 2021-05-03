import { Typography } from "antd";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import math from "remark-math";
import Tex from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";

const renderers = {
  code: ({ language, value }: { language: string; value: string }) => {
    return (
      <SyntaxHighlighter style={atomDark} language={language}>
        {value || ""}
      </SyntaxHighlighter>
    );
  },
  inlineMath: ({ value }: { value: any }) => <Tex math={value} />,
  math: ({ value }: { value: any }) => <Tex block math={value} />,
};

export default function MdRenderer({ children }: { children: string }) {
  return (
    <div>
      <Typography>
        <ReactMarkdown renderers={renderers} plugins={[gfm, math]}>
          {children}
        </ReactMarkdown>
      </Typography>
    </div>
  );
}
