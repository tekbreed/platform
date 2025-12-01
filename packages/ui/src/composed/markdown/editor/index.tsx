import React from "react"

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Placeholder from "@tiptap/extension-placeholder"
import {
	EditorContent,
	type Editor as IEditor,
	ReactNodeViewRenderer,
	useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"

import { CodeBlockComponent } from "./code-block-component"
import { MenuBar } from "./menu-bar"
export interface MenuBarProps {
	editor: IEditor | null
}

const lowlight = createLowlight(common)

interface EditorProps {
	value?: string
	setValue?: (value: string) => void
	placeholder?: string
}

export function MarkdownEditor({
	value = "",
	setValue,
	placeholder = "Write your comment here...",
}: EditorProps) {
	// Track previous value to prevent unnecessary updates
	const prevValueRef = React.useRef(value)

	// Optimize onUpdate handler with useCallback
	const handleUpdate = React.useCallback(
		({ editor }: { editor: IEditor }) => {
			const html = editor.getHTML()
			if (html !== prevValueRef.current) {
				prevValueRef.current = html
				setValue?.(editor.getText() ? html : "")
			}
		},
		[setValue],
	)

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder,
			}),
			CodeBlockLowlight.extend({
				addNodeView() {
					return ReactNodeViewRenderer(CodeBlockComponent)
				},
			}).configure({ lowlight }),
		],
		content: value,
		editorProps: {
			attributes: {
				class:
					"prose prose-sm max-w-none focus:outline-none min-h-[80px] p-2 prose-headings:my-1 prose-p:my-0.5 prose-headings:text-base prose-p:text-sm prose-ul:my-0.5 prose-ol:my-0.5 prose-li:my-0 [&_.ProseMirror]:p-0 [&_.ProseMirror>p]:mt-0 [&_.ProseMirror>p]:mb-0 text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-blockquote:text-foreground",
			},
		},
		onUpdate: handleUpdate,
	})

	// Fix useEffect to prevent infinite loops
	React.useEffect(() => {
		if (!editor || value === prevValueRef.current) return

		const currentContent = editor.getHTML()
		if (value !== currentContent) {
			editor.commands.setContent(value, false)
			prevValueRef.current = value
		}
	}, [editor, value])

	return (
		<div className="rounded-lg border border-border">
			<MenuBar editor={editor} />
			<EditorContent className="bg-background" editor={editor} />
		</div>
	)
}
