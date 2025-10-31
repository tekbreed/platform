import React from "react";
import Markdown from "react-markdown";
import {
  A,
  Blockquote,
  Div,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hr,
  P,
  Pre,
  Subtle,
} from "./components/typography";
import { Code } from "./components/code";
import { Ol, Ul } from "./components/lists";
import { Img } from "./components/media";
import {
  Caption,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "./components/table";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeMathJaxSvg from "rehype-mathjax/svg";
import { rehypeInlineCodeProperty } from "react-shiki";

export function ChatContent({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const Component = React.useMemo(
    () => (
      <Markdown
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          p: P,
          div: Div,
          a: A,
          pre: Pre,
          blockquote: Blockquote,
          span: Subtle,
          code: Code,
          ol: Ol,
          ul: Ul,
          img: Img,
          hr: Hr,
          table: Table,
          thead: Thead,
          tbody: Tbody,
          tfoot: Tfoot,
          caption: Caption,
          tr: Tr,
          th: Th,
          td: Td,
        }}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeMathJaxSvg, rehypeInlineCodeProperty]}
      >
        {source}
      </Markdown>
    ),
    [source],
  );
  return (
    <div
      className={cn(
        "mx-auto prose max-w-3xl min-w-full dark:prose-invert",
        className,
      )}
      id="markdown-content"
    >
      {Component}
    </div>
  );
}
