import type { NodeViewProps } from "@tiptap/react"
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"

export function CodeBlockComponent({
	node: {
		attrs: { language: defaultLanguage },
	},
	updateAttributes,
	extension,
}: NodeViewProps) {
	return (
		<NodeViewWrapper className="code-block">
			<select
				className="mb-2 rounded-md border border-border bg-background px-2 py-1 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
				contentEditable={false}
				defaultValue={defaultLanguage}
				onChange={(event) => updateAttributes({ language: event.target.value })}
			>
				<option value="null">auto</option>
				<option disabled>—</option>
				{extension.options.lowlight
					.listLanguages()
					.map((lang: string, index: number) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: List doesn't change
						<option key={index} value={lang}>
							{lang}
						</option>
					))}
			</select>
			<pre>
				<NodeViewContent as="code" />
			</pre>
		</NodeViewWrapper>
	)
}
