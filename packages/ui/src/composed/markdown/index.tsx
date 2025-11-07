import * as React from "react"

import { motion } from "framer-motion"
import { getMDXComponent } from "mdx-bundler/client"

import type { SandpackTemplate } from "@repo/utils/content/articles/types"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/alert"
import { Badge } from "@/components/badge"
import { Button } from "@/components/button"
import { Callout } from "@/components/callout"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/card"
import { Separator } from "@/components/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { cn } from "@/lib/utils"
import { Code } from "./components/code"
import { Ol, Ul } from "./components/lists"
import { Img } from "./components/media"
import {
	Caption,
	Table,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "./components/table"
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
} from "./components/typography"

export function Markdown({
	source,
	sandpackTemplates,
	className,
}: {
	source: string
	className?: string
	sandpackTemplates?: SandpackTemplate[]
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
	)

	const CodeWithSandpack = React.useCallback(
		(props: React.ComponentProps<typeof Code>) => (
			<Code sandpackTemplates={sandpackTemplates} {...props} />
		),
		[sandpackTemplates],
	)
	return (
		<div
			className={cn(
				"prose dark:prose-invert mx-auto min-w-full max-w-3xl",
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
	)
}
