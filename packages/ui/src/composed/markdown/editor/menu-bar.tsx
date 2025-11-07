import React from "react"

import { Skeleton } from "@/components/skeleton"
import { Icons } from "@/composed/icons"
import { cn } from "@/lib/utils"
import type { MenuBarProps } from "."

const MenuBarComponent: React.FC<MenuBarProps> = ({ editor }) => {
	if (!editor) {
		return <Skeleton className="h-32" />
	}
	return (
		<div className="flex flex-wrap items-center gap-1 rounded-lg rounded-br-none rounded-bl-none border-b border-border bg-background p-1">
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("bold") && "bg-muted",
				)}
				title="Bold"
				aria-label="Bold"
			>
				<Icons.bold className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("italic") && "bg-muted",
				)}
				title="Italic"
				aria-label="Italic"
			>
				<Icons.italic className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("strike") && "bg-muted",
				)}
				title="Strike"
				aria-label="Strike"
			>
				<Icons.strikeThrough className="size-4" />
			</button>
			<div className="mx-1 h-6 w-px bg-border" />
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("heading", { level: 3 }) && "bg-muted",
				)}
				title="Heading 3"
				aria-label="Heading 3"
			>
				<Icons.heading3 className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("heading", { level: 4 }) && "bg-muted",
				)}
				title="Heading 4"
				aria-label="Heading 4"
			>
				<Icons.heading4 className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("heading", { level: 5 }) && "bg-muted",
				)}
				title="Heading 5"
				aria-label="Heading 5"
			>
				<Icons.heading5 className="size-4" />
			</button>
			<div className="mx-1 h-6 w-px bg-border" />
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("code") && "bg-muted",
				)}
				title="Code"
				aria-label="Code"
			>
				<Icons.code className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("codeBlock") && "bg-muted",
				)}
				title="Code Block"
				aria-label="Code Block"
			>
				<Icons.code2 className="size-4" />
			</button>
			<div className="mx-1 h-6 w-px bg-border" />
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("bulletList") && "bg-muted",
				)}
				title="Bullet List"
				aria-label="Bullet List"
			>
				<Icons.list className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("orderedList") && "bg-muted",
				)}
				title="Ordered List"
				aria-label="Ordered List"
			>
				<Icons.listOrdered className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("blockquote") && "bg-muted",
				)}
				title="Blockquote"
				aria-label="Blockquote"
			>
				<Icons.quote className="size-4" />
			</button>
			<div className="mx-1 h-6 w-px bg-border" />
			<button
				onClick={() => editor.chain().focus().undo().run()}
				className="rounded p-2 hover:bg-muted"
				title="Undo"
				aria-label="Undo"
			>
				<Icons.undo className="size-4" />
			</button>
			<button
				onClick={() => editor.chain().focus().redo().run()}
				className="rounded p-2 hover:bg-muted"
				title="Redo"
				aria-label="Redo"
			>
				<Icons.redo className="size-4" />
			</button>
		</div>
	)
}

export const MenuBar = React.memo(MenuBarComponent)
MenuBar.displayName = "MenuBar"
