import { useEffect, useState } from "react"

import {
	type ActionFunctionArgs,
	Link,
	type LoaderFunctionArgs,
	useFetcher,
} from "react-router"

import { format } from "date-fns"
import { StatusCodes } from "http-status-codes"
import {
	ArrowLeft,
	Book,
	Bookmark,
	Eye,
	Flag,
	Github,
	Globe,
	Heart,
	Linkedin,
	MessageSquare,
	Share2,
	ThumbsUp,
	Twitter,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { ScrollProgress } from "@repo/ui/components/scroll-progress"
import { Separator } from "@repo/ui/components/separator"
import { EmptyState } from "@repo/ui/composed/empty-state"
import { Markdown } from "@repo/ui/composed/markdown"
import { MarkdownEditor } from "@repo/ui/composed/markdown/editor"
import { cn } from "@repo/ui/lib/utils"

import { invariant, invariantResponse } from "@repo/utils/misc"

import type { Route } from "./+types/article"
import { ArticleCard } from "./components/article-card"
import { TableOfContent } from "./components/table-of-content"
import { getArticleDetails } from "./loader.article.server"

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{ rel: "preconnect", href: "https://fonts.gstatic.com" },

	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
	},
]

export async function loader({ request, params }: LoaderFunctionArgs) {
	const { articleSlug } = params
	invariant(articleSlug, "Article slug is required")

	const article = await getArticleDetails(articleSlug)
	invariantResponse(article, "Article not found", {
		status: StatusCodes.NOT_FOUND,
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
	const { article, comments, likeCount, hasLiked, viewCount, hasBookmarked } =
		loaderData
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

			<main className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12">
				{/* Left Spacer for centering */}
				<div className="hidden lg:col-span-1 lg:block" />

				{/* Main Content */}
				<article className="min-w-0 lg:col-span-7">
					<div className="w-full lg:max-w-3xl">
						<div className="mb-8">
							<div className="flex flex-wrap items-center justify-between gap-8">
								<Link to="/articles">
									<Button className="gap-2" size="sm" variant="ghost">
										<ArrowLeft size={16} />
										Back to Articles
									</Button>
								</Link>
							</div>
							<Separator className="my-3" />
							<h1 className="mb-6 font-extrabold text-3xl leading-tight tracking-tight lg:text-4xl">
								{article.title}
							</h1>
							<p className="text-muted-foreground leading-relaxed">
								{article.excerpt}
							</p>

							<div className="mt-8 flex items-center justify-between gap-4 border-y py-6">
								<div className="flex items-center gap-4">
									<div>
										<Avatar className="size-12 border">
											<AvatarImage src={article.author?.image} />
											<AvatarFallback>
												{article.author?.name?.[0]}
											</AvatarFallback>
										</Avatar>
									</div>
									<div>
										<p className="font-semibold">{article.author?.name}</p>
										<div className="text-muted-foreground text-sm">
											{article.updatedAt &&
											new Date(article.updatedAt).getTime() !==
												new Date(article.createdAt).getTime() ? (
												<>
													<p>
														Published{" "}
														{format(
															new Date(article.createdAt),
															"MMMM d, yyyy",
														)}
													</p>
													<p>
														Updated{" "}
														{format(
															new Date(article.updatedAt),
															"MMMM d, yyyy",
														)}
													</p>
												</>
											) : (
												<p>
													{format(new Date(article.createdAt), "MMMM d, yyyy")}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<Badge className="rounded-md px-3 py-1" variant="secondary">
										{article.category?.title}
									</Badge>
									<span className="flex items-center gap-1.5 text-muted-foreground text-sm">
										<Eye size={16} /> {viewCount} views
									</span>
								</div>
							</div>
						</div>

						{/* Featured Image */}
						<div className="mb-12 overflow-hidden rounded-2xl border bg-muted">
							<img
								alt={article.title}
								className="max-h-[400px] w-full object-cover"
								src={article.image}
							/>
						</div>

						{/* Article Body */}
						<Markdown
							sandpackTemplates={article.sandpackTemplates}
							source={article.content}
						/>

						<Separator className="mt-8" />

						{/* Author Card (Bottom) */}
						<div className="mt-16 rounded-2xl border bg-muted/30 p-8">
							<div className="flex flex-col items-start gap-6 sm:flex-row">
								<Avatar className="size-30 border-2 border-background">
									<AvatarImage src={article.author?.image} />
									<AvatarFallback>{article.author?.name?.[0]}</AvatarFallback>
								</Avatar>
								<div className="flex-1 space-y-4">
									<div>
										<h3 className="font-bold text-lg">
											{article.author?.name}
										</h3>

										<p className="mt-1 text-muted-foreground">
											{article.author?.bio ||
												"Content creator and tech enthusiast."}
										</p>
									</div>

									<div className="flex gap-2">
										{article.author?.socialLinks?.github && (
											<a
												href={article.author.socialLinks.github}
												rel="noopener noreferrer"
												target="_blank"
											>
												<Button size="icon" variant="ghost">
													<Github className="h-5 w-5" />
												</Button>
											</a>
										)}
										{article.author?.socialLinks?.twitter && (
											<a
												href={article.author.socialLinks.twitter}
												rel="noopener noreferrer"
												target="_blank"
											>
												<Button size="icon" variant="ghost">
													<Twitter className="h-5 w-5" />
												</Button>
											</a>
										)}
										{article.author?.socialLinks?.linkedin && (
											<a
												href={article.author.socialLinks.linkedin}
												rel="noopener noreferrer"
												target="_blank"
											>
												<Button size="icon" variant="ghost">
													<Linkedin className="h-5 w-5" />
												</Button>
											</a>
										)}
										{article.author?.socialLinks?.website && (
											<a
												href={article.author.socialLinks.website}
												rel="noopener noreferrer"
												target="_blank"
											>
												<Button size="icon" variant="ghost">
													<Globe className="h-5 w-5" />
												</Button>
											</a>
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Related Articles (Bottom) */}
						<div className="mt-16">
							<h3 className="mb-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider">
								Related Articles
							</h3>
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{article.relatedArticles?.length ? (
									article.relatedArticles.map((related: any) => (
										<ArticleCard article={related} key={related.id} />
									))
								) : (
									<EmptyState
										className="col-span-3"
										description="We couldn't find any related articles for this article."
										icon={<Book />}
										title="No related articles found"
									/>
								)}
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
										<MarkdownEditor />
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
													<AvatarFallback>
														{comment.user.name[0]}
													</AvatarFallback>
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
																commentLikes[comment.id]?.liked &&
																	"text-primary",
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
																<div
																	className="group flex gap-3"
																	key={reply.id}
																>
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
					</div>
				</article>

				{/* Right Sidebar (TOC & Actions) */}
				<aside className="sticky top-24 hidden h-fit space-y-8 lg:col-span-3 lg:block">
					<TableOfContent />
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

				{/* Right Spacer for centering */}
				<div className="hidden lg:col-span-1 lg:block" />
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
