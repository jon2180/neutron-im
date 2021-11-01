import React from 'react';
import { Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import math from 'remark-math';
import type {
  NormalComponents,
  SpecialComponents,
} from 'react-markdown/src/ast-to-react';
import styles from './MdRenderer.module.less';

const components: Partial<NormalComponents & SpecialComponents> = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={materialLight}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}{' '}
      </code>
    );
  },
};

export default function MdRenderer({
  children,
  withoutStyle,
}: {
  children: string;
  withoutStyle?: boolean;
}) {
  const md = (
    <ReactMarkdown remarkPlugins={[gfm, math]} components={components}>
      {children}
    </ReactMarkdown>
  );

  if (withoutStyle) {
    return <div className={styles.reset}>{md}</div>;
  }

  return <Typography className={styles.typography}>{md}</Typography>;
}
