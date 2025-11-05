import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  A,
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  H6,
  H5,
  Hr,
  P,
  Subtle,
  Pre,
  Div,
} from "./components/typography";
import { Img } from "./components/media";
import { Ol, Ul } from "./components/lists";
import { Code } from "./components/code";

import type { SandpackTemplate } from "@repo/utils/content/articles/types";
import {
  Caption,
  Table,
  Tbody,
  Th,
  Thead,
  Td,
  Tr,
  Tfoot,
} from "./components/table";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/card";
import { Badge } from "@/components/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import { Callout } from "@/components/callout";
import { Separator } from "@/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";

export function Markdown({
  source,
  sandpackTemplates,
  className,
}: {
  source: string;
  className?: string;
  sandpackTemplates?: SandpackTemplate[];
}) {
  const Component = React.useMemo(
    () =>
      getMDXComponent(source, {
        motion,
        cn,
        Button,
        Card,
        CardContent,
        CardHeader,
        CardTitle,
        CardDescription,
        CardFooter,
        Badge,
        Alert,
        AlertDescription,
        AlertTitle,
        Callout,
        Separator,
        Tabs,
        TabsContent,
        TabsList,
        TabsTrigger,
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
      }),
    [source],
  );

  const CodeWithSandpack = React.useCallback(
    (props: React.ComponentProps<typeof Code>) => (
      <Code sandpackTemplates={sandpackTemplates} {...props} />
    ),
    [sandpackTemplates],
  );
  return (
    <div
      className={cn(
        "mx-auto prose max-w-3xl min-w-full dark:prose-invert",
        className,
      )}
      id="markdown-content"
    >
      <Component
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
          code: CodeWithSandpack,
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
      />
    </div>
  );
}
