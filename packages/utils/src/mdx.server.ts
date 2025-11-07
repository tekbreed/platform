/**
 * MDX Server Utilities
 *
 * This module provides utilities for processing and bundling MDX content with enhanced features
 * including math rendering, GitHub Flavored Markdown, and custom containers.
 *
 * Dependencies:
 * - mdx-bundler: Core MDX bundling functionality
 * - react-shiki: Code block syntax highlighting
 * - remark-gfm: GitHub Flavored Markdown support
 * - remark-math: Math equation support
 * - rehype-mathjax: Math equation rendering
 * - rehype-slug: Heading ID generation
 * - remark-flexible-containers: Custom container syntax
 */

import { bundleMDX as bMDX } from "mdx-bundler"
import { rehypeInlineCodeProperty } from "react-shiki"
import rehypeMathjax from "rehype-mathjax"
import rehypeSlug from "rehype-slug"
import remarkContainers from "remark-flexible-containers"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

/**
 * Bundles MDX source code into a single JavaScript module with enhanced features.
 *
 * This function processes MDX content using mdx-bundler and includes several plugins:
 * - remarkGfm: Adds GitHub Flavored Markdown support
 * - remarkContainers: Enables custom container syntax
 * - rehypeSlug: Adds IDs to headings for anchor links
 * - rehypeInlineCodeProperty: Enhances code block styling
 *
 * @param {Object} params - The parameters object
 * @param {string} params.source - The MDX source code to bundle
 * @param {Record<string, string>} [params.files] - Additional files to include in the bundle
 * @returns {Promise<{ code: string; frontmatter: Record<string, any> }>} An object containing:
 *   - code: The bundled JavaScript code
 *   - frontmatter: The extracted frontmatter data
 *
 * @example
 * ```ts
 * const { code, frontmatter } = await bundleMDX({
 *   source: "# Hello World\n\nThis is MDX content",
 *   files: {
 *     "components/Button.tsx": "export const Button = () => <button>Click me</button>"
 *   }
 * });
 * ```
 */
export async function bundleMDX({
	source,
	files,
}: {
	source: string
	files?: Record<string, string>
}) {
	return bMDX({
		source,
		files,
		mdxOptions(options) {
			options.remarkPlugins = [
				...(options.remarkPlugins ?? []),
				remarkGfm,
				remarkMath,
				remarkContainers,
			]
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug,
				rehypeMathjax,
				rehypeInlineCodeProperty,
			]
			return options
		},
		globals: {
			// Animation and utilities
			"framer-motion": "motion",
			cn: "cn",

			// Core UI components
			Button: "Button",
			Badge: "Badge",
			Card: "Card",
			CardHeader: "CardHeader",
			CardTitle: "CardTitle",
			CardDescription: "CardDescription",
			CardContent: "CardContent",
			CardFooter: "CardFooter",

			// Form components
			Input: "Input",
			Label: "Label",
			Textarea: "Textarea",
			Select: "Select",
			SelectContent: "SelectContent",
			SelectItem: "SelectItem",
			SelectTrigger: "SelectTrigger",
			SelectValue: "SelectValue",
			Checkbox: "Checkbox",
			Switch: "Switch",
			InputOTP: "InputOTP",
			InputOTPGroup: "InputOTPGroup",
			InputOTPInput: "InputOTPInput",
			InputOTPSeparator: "InputOTPSeparator",
			InputOTPSlot: "InputOTPSlot",

			// Layout components
			Separator: "Separator",
			AspectRatio: "AspectRatio",
			ScrollArea: "ScrollArea",
			ScrollBar: "ScrollBar",

			// Feedback components
			Alert: "Alert",
			AlertDialog: "AlertDialog",
			AlertDialogAction: "AlertDialogAction",
			AlertDialogCancel: "AlertDialogCancel",
			AlertDialogContent: "AlertDialogContent",
			AlertDialogTitle: "AlertDialogTitle",
			AlertDialogTrigger: "AlertDialogTrigger",

			// Navigation components
			Tabs: "Tabs",
			TabsContent: "TabsContent",
			TabsList: "TabsList",
			TabsTrigger: "TabsTrigger",
			Breadcrumb: "Breadcrumb",
			BreadcrumbItem: "BreadcrumbItem",
			BreadcrumbLink: "BreadcrumbLink",
			BreadcrumbList: "BreadcrumbList",
			BreadcrumbPage: "BreadcrumbPage",
			BreadcrumbSeparator: "BreadcrumbSeparator",
			Pagination: "Pagination",
			PaginationContent: "PaginationContent",
			PaginationEllipsis: "PaginationEllipsis",
			PaginationItem: "PaginationItem",
			PaginationLink: "PaginationLink",
			PaginationNext: "PaginationNext",
			PaginationPrevious: "PaginationPrevious",

			// Overlay components
			Dialog: "Dialog",
			DialogContent: "DialogContent",
			DialogDescription: "DialogDescription",
			DialogFooter: "DialogFooter",
			DialogHeader: "DialogHeader",
			DialogTitle: "DialogTitle",
			DialogTrigger: "DialogTrigger",
			Drawer: "Drawer",
			DrawerContent: "DrawerContent",
			DrawerDescription: "DrawerDescription",
			DrawerFooter: "DrawerFooter",
			DrawerHeader: "DrawerHeader",
			DrawerTitle: "DrawerTitle",
			DrawerTrigger: "DrawerTrigger",
			Sheet: "Sheet",
			SheetContent: "SheetContent",
			SheetDescription: "SheetDescription",
			SheetFooter: "SheetFooter",
			SheetHeader: "SheetHeader",
			SheetTitle: "SheetTitle",
			SheetTrigger: "SheetTrigger",
			Popover: "Popover",
			PopoverContent: "PopoverContent",
			PopoverTrigger: "PopoverTrigger",
			Tooltip: "Tooltip",
			TooltipContent: "TooltipContent",
			TooltipProvider: "TooltipProvider",
			TooltipTrigger: "TooltipTrigger",
			HoverCard: "HoverCard",
			HoverCardContent: "HoverCardContent",
			HoverCardTrigger: "HoverCardTrigger",

			// Data display
			Avatar: "Avatar",
			AvatarFallback: "AvatarFallback",
			AvatarImage: "AvatarImage",
			Skeleton: "Skeleton",

			// Interactive components
			Accordion: "Accordion",
			AccordionContent: "AccordionContent",
			AccordionItem: "AccordionItem",
			AccordionTrigger: "AccordionTrigger",
			DropdownMenu: "DropdownMenu",
			DropdownMenuContent: "DropdownMenuContent",
			DropdownMenuItem: "DropdownMenuItem",
			DropdownMenuLabel: "DropdownMenuLabel",
			DropdownMenuSeparator: "DropdownMenuSeparator",
			DropdownMenuTrigger: "DropdownMenuTrigger",

			// Sidebar components
			Sidebar: "Sidebar",
			SidebarContent: "SidebarContent",
			SidebarFooter: "SidebarFooter",
			SidebarGroup: "SidebarGroup",
			SidebarGroupContent: "SidebarGroupContent",
			SidebarGroupLabel: "SidebarGroupLabel",
			SidebarHeader: "SidebarHeader",
			SidebarInset: "SidebarInset",
			SidebarMenu: "SidebarMenu",
			SidebarMenuButton: "SidebarMenuButton",
			SidebarMenuItem: "SidebarMenuItem",
			SidebarMenuSub: "SidebarMenuSub",
			SidebarMenuSubButton: "SidebarMenuSubButton",
			SidebarMenuSubItem: "SidebarMenuSubItem",
			SidebarProvider: "SidebarProvider",
			SidebarRail: "SidebarRail",
			SidebarSeparator: "SidebarSeparator",
			SidebarTrigger: "SidebarTrigger",

			// Utility components
			Callout: "Callout",
			Sonner: "Sonner",
			Toaster: "Toaster",
			SupportMeButton: "SupportMeButton",
			VisuallyHidden: "VisuallyHidden",
		},
	})
}
