import { useEffect, useState } from "react"

import {
	type ActionFunctionArgs,
	Link,
	type LoaderFunctionArgs,
	useFetcher,
} from "react-router"

import { PortableText } from "@portabletext/react"
import { format } from "date-fns"
import {
	Bookmark,
	Eye,
	Flag,
	Heart,
	MessageSquare,
	Share2,
	ThumbsUp,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { Textarea } from "@repo/ui/components/textarea"
import { cn } from "@repo/ui/lib/utils"

// Types
import {
	articleDetailsQuery,
	relatedQuery,
} from "@repo/utils/content.server/articles/queries"
import { client } from "@repo/utils/content.server/loader"

import { ScrollProgress } from "../../components/scroll-progress"
import { TableOfContents } from "../../components/toc"

// Helper to generate IDs for TOC
const slugify = (text: string) => text.toLowerCase().replace(/[^\w]+/g, "-")

const ptComponents = {
	block: {
		h2: ({ children, value }: any) => {
			const text = value.children?.map((c: any) => c.text).join("") || ""
			const id = slugify(text)
			return (
				<h2 className="mt-12 mb-6 scroll-mt-24 font-bold text-3xl" id={id}>
					{children}
				</h2>
			)
		},
		h3: ({ children, value }: any) => {
			const text = value.children?.map((c: any) => c.text).join("") || ""
			const id = slugify(text)
			return (
				<h3 className="mt-8 mb-4 scroll-mt-24 font-bold text-2xl" id={id}>
					{children}
				</h3>
			)
		},
		normal: ({ children }: any) => (
			<p className="mb-6 text-lg leading-relaxed">{children}</p>
		),
	},
	list: {
		bullet: ({ children }: any) => (
			<ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
		),
		number: ({ children }: any) => (
			<ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
		),
	},
}

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { articleSlug } = params
	if (!articleSlug) throw new Response("Not Found", { status: 404 })

	const article = await client.fetch(articleDetailsQuery, { slug: articleSlug })
	if (!article) throw new Response("Not Found", { status: 404 })

	const relatedArticles = await client.fetch(relatedQuery, {
		slug: articleSlug,
		tagIds: article.tags?.map((t: any) => t.id) || [],
		categoryId: article.category?.id,
	})

	// Mock Data
	const userId = "user_123"
	const comments = [
		{
			id: "c1",
			content:
				"Great article! Really enjoyed the deep dive into the architecture.",
			createdAt: new Date().toISOString(),
			user: { name: "Alice Johnson", image: null },
			likes: 5,
			hasLiked: false,
			replies: [
				{
					id: "r1",
					content: "Totally agree, especially the part about state management.",
					createdAt: new Date().toISOString(),
					user: { name: "Bob Smith", image: null },
					likes: 2,
					hasLiked: false,
				},
			],
		},
		{
			id: "c2",
			content: "Could you elaborate more on the performance implications?",
			createdAt: new Date(Date.now() - 86400000).toISOString(),
			user: { name: "Charlie Brown", image: null },
			likes: 3,
			hasLiked: true,
			replies: [],
		},
	]
	const likeCount = 42
	const hasLiked = false
	const viewCount = 1205
	const hasBookmarked = false

	return {
		article,
		relatedArticles,
		comments,
		likeCount,
		hasLiked,
		viewCount,
		hasBookmarked,
		userId,
	}
}

export async function action({ request, params }: ActionFunctionArgs) {
	// Mock action - just return success
	return { success: true }
}

export default function ArticleDetailsPage({ loaderData }: any) {
	const {
		article,
		relatedArticles,
		comments,
		likeCount,
		hasLiked,
		viewCount,
		hasBookmarked,
		userId,
	} = loaderData
	const fetcher = useFetcher()
	const [optimisticLike, setOptimisticLike] = useState(hasLiked)
	const [optimisticCount, setOptimisticCount] = useState(likeCount)
	const [optimisticBookmark, setOptimisticBookmark] = useState(hasBookmarked)
	const [commentLikes, setCommentLikes] = useState<
		Record<string, { liked: boolean; count: number }>
	>({})

	// Track view on mount
	useEffect(() => {
		const viewed = sessionStorage.getItem(`viewed-${article.id}`)
		if (!viewed) {
			fetcher.submit(
				{ intent: "view", articleId: article.id },
				{ method: "post" },
			)
			sessionStorage.setItem(`viewed-${article.id}`, "true")
		}
	}, [article.id, fetcher.submit])

	// Initialize comment likes from loader data
	useEffect(() => {
		const initialLikes: Record<string, { liked: boolean; count: number }> = {}
		comments.forEach((comment: any) => {
			initialLikes[comment.id] = {
				liked: comment.hasLiked,
				count: comment.likes,
			}
			comment.replies?.forEach((reply: any) => {
				initialLikes[reply.id] = { liked: reply.hasLiked, count: reply.likes }
			})
		})
		setCommentLikes(initialLikes)
	}, [comments])

	const handleLike = () => {
		const nextState = !optimisticLike
		setOptimisticLike(nextState)
		setOptimisticCount(nextState ? optimisticCount + 1 : optimisticCount - 1)
		fetcher.submit(
			{ intent: "like", articleId: article.id },
			{ method: "post" },
		)
	}

	const handleBookmark = () => {
		setOptimisticBookmark(!optimisticBookmark)
		fetcher.submit(
			{ intent: "bookmark", articleId: article.id },
			{ method: "post" },
		)
	}

	const handleCommentLike = (commentId: string) => {
		const current = commentLikes[commentId] || { liked: false, count: 0 }
		const nextState = !current.liked
		setCommentLikes({
			...commentLikes,
			[commentId]: {
				liked: nextState,
				count: nextState ? current.count + 1 : current.count - 1,
			},
		})
		fetcher.submit({ intent: "likeComment", commentId }, { method: "post" })
	}

	const handleCommentReport = (commentId: string) => {
		if (confirm("Are you sure you want to report this comment?")) {
			fetcher.submit({ intent: "reportComment", commentId }, { method: "post" })
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<ScrollProgress />
			{/* <DetailsHeader item={article} /> */}

			<main className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-8 lg:grid-cols-12">
				{/* Left Sidebar (TOC & Actions) */}
				<aside className="sticky top-24 hidden h-fit space-y-8 lg:col-span-3 lg:block">
					<div className="space-y-4">
						<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
							Table of Contents
						</h3>
						<TableOfContents content={article.content} />
					</div>

					<div className="flex flex-col gap-2">
						<Button
							className="justify-start gap-3 px-2"
							onClick={handleLike}
							variant="ghost"
						>
							<Heart
								className={cn(
									"transition-colors",
									optimisticLike ? "fill-red-500 text-red-500" : "",
								)}
							/>
							{optimisticCount} Likes
						</Button>
						<Button
							className="justify-start gap-3 px-2"
							onClick={() =>
								document
									.getElementById("comments")
									?.scrollIntoView({ behavior: "smooth" })
							}
							variant="ghost"
						>
							<MessageSquare /> {comments.length} Comments
						</Button>
						<Button
							className="justify-start gap-3 px-2"
							onClick={handleBookmark}
							variant="ghost"
						>
							<Bookmark
								className={cn(
									"transition-colors",
									optimisticBookmark ? "fill-primary text-primary" : "",
								)}
							/>
							Bookmark
						</Button>
						<Button className="justify-start gap-3 px-2" variant="ghost">
							<Share2 /> Share
						</Button>
						<Button
							className="justify-start gap-3 px-2 text-muted-foreground hover:text-destructive"
							variant="ghost"
						>
							<Flag /> Report
						</Button>
					</div>
				</aside>

				{/* Main Content */}
				<article className="min-w-0 lg:col-span-6">
					<div className="mb-8">
						<div className="mb-6 flex items-center gap-4">
							<Badge className="rounded-md px-3 py-1" variant="secondary">
								{article.category?.title}
							</Badge>
							<span className="flex items-center gap-1.5 text-muted-foreground text-sm">
								<Eye size={16} /> {viewCount} views
							</span>
						</div>
						<h1 className="mb-6 font-extrabold text-3xl leading-tight tracking-tight lg:text-4xl">
							{article.title}
						</h1>
						<p className="text-muted-foreground text-xl leading-relaxed">
							{article.excerpt}
						</p>

						<div className="mt-8 flex items-center gap-4 border-y py-6">
							<Avatar className="h-12 w-12 border">
								<AvatarImage src={article.author?.image} />
								<AvatarFallback>{article.author?.name?.[0]}</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-semibold">{article.author?.name}</p>
								<p className="text-muted-foreground text-sm">
									{format(new Date(article.createdAt), "MMMM d, yyyy")}
								</p>
							</div>
							<Button className="ml-auto" size="sm" variant="outline">
								Support
							</Button>
						</div>
					</div>

					{/* Featured Image */}
					{article.image && (
						<div className="mb-12 overflow-hidden rounded-2xl border bg-muted">
							<img
								alt={article.title}
								className="h-auto w-full object-cover"
								src={article.image}
							/>
						</div>
					)}

					{/* Article Body */}
					<div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary">
						{article.content ? (
							<PortableText components={ptComponents} value={article.content} />
						) : (
							<p>No content available.</p>
						)}
					</div>

					{/* Author Card (Bottom) */}
					<div className="mt-16 rounded-2xl border bg-muted/30 p-8">
						<div className="flex flex-col items-start gap-6 sm:flex-row">
							<Avatar className="h-16 w-16 border-2 border-background">
								<AvatarImage src={article.author?.image} />
								<AvatarFallback>{article.author?.name?.[0]}</AvatarFallback>
							</Avatar>
							<div className="flex-1 space-y-4">
								<div>
									<h3 className="font-bold text-lg">{article.author?.name}</h3>
									<p className="mt-1 text-muted-foreground">
										{article.author?.bio ||
											"Content creator and tech enthusiast."}
									</p>
								</div>
								<Button>Support Author</Button>
							</div>
						</div>
					</div>

					{/* Comments Section */}
					<div className="mt-16" id="comments">
						<div className="mb-8 flex items-center justify-between">
							<h3 className="font-bold text-2xl">
								Comments ({comments.length})
							</h3>
						</div>

						<div className="space-y-8">
							{/* Comment Form */}
							<fetcher.Form className="flex gap-4" method="post">
								<input name="intent" type="hidden" value="comment" />
								<input name="articleId" type="hidden" value={article.id} />
								<Avatar>
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-3">
									<Textarea
										className="min-h-[100px]"
										name="content"
										placeholder="Write a comment..."
									/>
									<div className="flex justify-end">
										<Button type="submit">Post Comment</Button>
									</div>
								</div>
							</fetcher.Form>

							{/* Comment List */}
							<div className="space-y-8">
								{comments.map((comment: any) => (
									<div className="group" key={comment.id}>
										<div className="flex gap-4">
											<Avatar className="h-10 w-10">
												<AvatarFallback>{comment.user.name[0]}</AvatarFallback>
											</Avatar>
											<div className="flex-1 space-y-2">
												<div className="rounded-xl bg-muted/30 p-4">
													<div className="mb-2 flex items-center justify-between">
														<span className="font-semibold text-sm">
															{comment.user.name}
														</span>
														<span className="text-muted-foreground text-xs">
															{format(new Date(comment.createdAt), "MMM d")}
														</span>
													</div>
													<p className="text-sm leading-relaxed">
														{comment.content}
													</p>
												</div>
												<div className="flex items-center gap-4 px-2 text-muted-foreground text-xs">
													<button
														className={cn(
															"flex items-center gap-1 font-medium transition-colors hover:text-primary",
															commentLikes[comment.id]?.liked && "text-primary",
														)}
														onClick={() => handleCommentLike(comment.id)}
														type="button"
													>
														<ThumbsUp
															className={cn(
																commentLikes[comment.id]?.liked &&
																	"fill-primary",
															)}
															size={12}
														/>
														{commentLikes[comment.id]?.count || 0}
													</button>
													<button
														className="flex items-center gap-1 font-medium hover:text-primary"
														type="button"
													>
														Reply
													</button>
													<button
														className="flex items-center gap-1 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
														onClick={() => handleCommentReport(comment.id)}
														type="button"
													>
														<Flag size={12} />
														Report
													</button>
												</div>

												{/* Replies */}
												{comment.replies?.length > 0 && (
													<div className="mt-4 ml-2 space-y-4 border-muted border-l-2 pl-4">
														{comment.replies.map((reply: any) => (
															<div className="group flex gap-3" key={reply.id}>
																<Avatar className="h-8 w-8">
																	<AvatarFallback>
																		{reply.user.name[0]}
																	</AvatarFallback>
																</Avatar>
																<div className="flex-1">
																	<div className="rounded-lg bg-muted/30 p-3">
																		<div className="mb-1 flex items-center justify-between">
																			<span className="font-semibold text-xs">
																				{reply.user.name}
																			</span>
																			<span className="text-[10px] text-muted-foreground">
																				{format(
																					new Date(reply.createdAt),
																					"MMM d",
																				)}
																			</span>
																		</div>
																		<p className="text-xs">{reply.content}</p>
																	</div>
																	<div className="mt-2 flex items-center gap-3 px-2 text-[10px] text-muted-foreground">
																		<button
																			className={cn(
																				"flex items-center gap-1 font-medium transition-colors hover:text-primary",
																				commentLikes[reply.id]?.liked &&
																					"text-primary",
																			)}
																			onClick={() =>
																				handleCommentLike(reply.id)
																			}
																			type="button"
																		>
																			<ThumbsUp
																				className={cn(
																					commentLikes[reply.id]?.liked &&
																						"fill-primary",
																				)}
																				size={10}
																			/>
																			{commentLikes[reply.id]?.count || 0}
																		</button>
																		<button
																			className="flex items-center gap-1 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
																			onClick={() =>
																				handleCommentReport(reply.id)
																			}
																			type="button"
																		>
																			<Flag size={10} />
																			Report
																		</button>
																	</div>
																</div>
															</div>
														))}
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</article>

				{/* Right Sidebar (Related) */}
				<aside className="sticky top-24 hidden h-fit lg:col-span-3 lg:block">
					<h3 className="mb-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
						Related Articles
					</h3>
					<div className="space-y-6">
						{relatedArticles.map((related: any) => (
							<Link
								className="group block"
								key={related.id}
								to={`/articles/${related.slug}`}
							>
								<div className="mb-3 aspect-video overflow-hidden rounded-lg border border-border/10 bg-muted">
									{related.image && (
										<img
											alt={related.title}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											src={related.image}
										/>
									)}
								</div>
								<h4 className="font-medium leading-snug transition-colors group-hover:text-primary">
									{related.title}
								</h4>
								<p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
									{related.category?.title}
								</p>
							</Link>
						))}
					</div>
				</aside>
			</main>

			{/* Mobile Bottom Bar */}
			<div className="fixed right-0 bottom-0 left-0 z-50 border-t bg-background/80 p-2 backdrop-blur-md lg:hidden">
				<div className="flex items-center justify-around">
					<Button className="flex-1 gap-2" onClick={handleLike} variant="ghost">
						<Heart
							className={cn(
								"transition-colors",
								optimisticLike ? "fill-red-500 text-red-500" : "",
							)}
							size={20}
						/>
						<span className="text-xs">{optimisticCount}</span>
					</Button>
					<Button
						className="flex-1 gap-2"
						onClick={() =>
							document
								.getElementById("comments")
								?.scrollIntoView({ behavior: "smooth" })
						}
						variant="ghost"
					>
						<MessageSquare size={20} />
						<span className="text-xs">{comments.length}</span>
					</Button>
					<Button
						className="flex-1 gap-2"
						onClick={handleBookmark}
						variant="ghost"
					>
						<Bookmark
							className={cn(
								"transition-colors",
								optimisticBookmark ? "fill-primary text-primary" : "",
							)}
							size={20}
						/>
					</Button>
					<Button className="flex-1 gap-2" variant="ghost">
						<Share2 size={20} />
					</Button>
					<Button
						className="flex-1 gap-2 text-muted-foreground hover:text-destructive"
						variant="ghost"
					>
						<Flag size={20} />
					</Button>
				</div>
			</div>
		</div>
	)
}
