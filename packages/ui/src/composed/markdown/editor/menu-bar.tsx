import React from "react"

import { Button } from "@/components/button"
import { Skeleton } from "@/components/skeleton"
import { Icons } from "@/composed/icons"
import { cn } from "@/lib/utils"
import type { MenuBarProps } from "."

const MenuBarComponent: React.FC<MenuBarProps> = ({ editor }) => {
	if (!editor) {
		return <Skeleton className="h-32" />
	}
	return (
		<div className="flex flex-wrap items-center gap-1 rounded-lg rounded-br-none rounded-bl-none border-border border-b bg-background p-1">
			<Button
				aria-label="Bold"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("bold") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleBold().run()}
				title="Bold"
				variant={"ghost"}
			>
				<Icons.bold className="size-4" />
			</Button>
			<Button
				aria-label="Italic"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("italic") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleItalic().run()}
				title="Italic"
			>
				<Icons.italic className="size-4" />
			</Button>
			<Button
				aria-label="Strike"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("strike") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleStrike().run()}
				title="Strike"
			>
				<Icons.strikeThrough className="size-4" />
			</Button>
			<div className="mx-1 h-6 w-px bg-border" />
			<Button
				aria-label="Heading 3"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("heading", { level: 3 }) && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				title="Heading 3"
			>
				<Icons.heading3 className="size-4" />
			</Button>
			<Button
				aria-label="Heading 4"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("heading", { level: 4 }) && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				title="Heading 4"
			>
				<Icons.heading4 className="size-4" />
			</Button>
			<Button
				aria-label="Heading 5"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("heading", { level: 5 }) && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				title="Heading 5"
			>
				<Icons.heading5 className="size-4" />
			</Button>
			<div className="mx-1 h-6 w-px bg-border" />
			<Button
				aria-label="Code"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("code") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleCode().run()}
				title="Code"
			>
				<Icons.code className="size-4" />
			</Button>
			<Button
				aria-label="Code Block"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("codeBlock") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				title="Code Block"
			>
				<Icons.code2 className="size-4" />
			</Button>
			<div className="mx-1 h-6 w-px bg-border" />
			<Button
				aria-label="Bullet List"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("bulletList") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				title="Bullet List"
			>
				<Icons.list className="size-4" />
			</Button>
			<Button
				aria-label="Ordered List"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("orderedList") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				title="Ordered List"
			>
				<Icons.listOrdered className="size-4" />
			</Button>
			<Button
				aria-label="Blockquote"
				className={cn(
					"rounded p-2 hover:bg-muted",
					editor.isActive("blockquote") && "bg-muted",
				)}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				title="Blockquote"
			>
				<Icons.quote className="size-4" />
			</Button>
			<div className="mx-1 h-6 w-px bg-border" />
			<Button
				aria-label="Undo"
				className="rounded p-2 hover:bg-muted"
				onClick={() => editor.chain().focus().undo().run()}
				title="Undo"
			>
				<Icons.undo className="size-4" />
			</Button>
			<Button
				aria-label="Redo"
				className="rounded p-2 hover:bg-muted"
				onClick={() => editor.chain().focus().redo().run()}
				title="Redo"
			>
				<Icons.redo className="size-4" />
			</Button>
		</div>
	)
}

export const MenuBar = React.memo(MenuBarComponent)
MenuBar.displayName = "MenuBar"
