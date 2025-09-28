import { Badge } from '@repo/ui/components/badge'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@repo/ui/components/accordion'
import {
	FileText,
	GraduationCap,
	Briefcase,
	Store,
	Bot,
	BookOpen,
	Users,
	Check,
	PlayCircle,
	Trophy,
} from 'lucide-react'

const features = [
	{
		icon: FileText,
		title: 'Articles',
		description:
			'Curated, long-form technical content covering software engineering concepts and best practices.',
		detailedDescription:
			'Access a comprehensive library of in-depth technical articles covering everything from basic programming concepts to advanced software architecture. Each article is carefully curated by industry experts and includes real-world examples, case studies, and practical insights to deepen your understanding of software engineering principles.',
		isFirstRelease: true,
		releaseTimeline: '3 months',
	},
	{
		icon: PlayCircle,
		title: 'Tutorials',
		description:
			'Step-by-step interactive tutorials with hands-on coding exercises and practical examples.',
		detailedDescription:
			'Learn through hands-on experience with our interactive tutorial system. Each tutorial provides step-by-step guidance through real coding challenges, complete with interactive code examples, live previews, and practical exercises. Build actual projects while learning new concepts and technologies.',
		isFirstRelease: true,
		releaseTimeline: '3 months',
	},
	{
		icon: Bot,
		title: 'AI Learning Assistant',
		description:
			'Advanced software engineering AI assistant trained on your learning progress with contextually-aware guidance.',
		detailedDescription:
			'Meet your personal AI mentor that understands your learning journey. This advanced assistant analyzes your progress, identifies knowledge gaps, and provides personalized recommendations. It can answer technical questions, review your code, suggest improvements, and adapt its teaching style to match your learning preferences.',
		isFirstRelease: false,
		releaseTimeline: '6 months',
	},
	{
		icon: GraduationCap,
		title: 'Structured Courses',
		description:
			'Cohesive learning experiences across lessons and modules with progress tracking and milestone achievements.',
		detailedDescription:
			'Comprehensive courses designed by industry professionals, featuring structured learning paths from beginner to advanced levels. Each course includes video lectures, hands-on projects, quizzes, and milestone assessments. Track your progress with detailed analytics and earn certificates upon completion.',
		isFirstRelease: false,
		releaseTimeline: '9 months',
	},
	{
		icon: Trophy,
		title: 'Monthly Coding Challenges',
		description:
			'Competitive programming challenges and hackathons to test and improve your problem-solving skills.',
		detailedDescription:
			'Participate in monthly coding challenges designed to sharpen your algorithmic thinking and problem-solving abilities. Each challenge includes multiple difficulty levels, real-time leaderboards, detailed solution explanations, and community discussions. Earn badges, climb the rankings, and showcase your skills to potential employers.',
		isFirstRelease: false,
		releaseTimeline: '12 months',
	},
	{
		icon: BookOpen,
		title: 'Multi-Module Programs',
		description:
			'Comprehensive learning tracks with milestones, outcomes, and structured pathways from beginner to advanced.',
		detailedDescription:
			'Intensive, career-focused programs that combine multiple courses into cohesive learning journeys. These programs are designed to take you from your current skill level to job-ready proficiency in specific technologies or roles, with clear milestones, portfolio projects, and career guidance.',
		isFirstRelease: false,
		releaseTimeline: '15 months',
	},
	{
		icon: Users,
		title: 'Team Learning',
		description:
			'Collaborative learning experiences for teams with shared progress tracking and group challenges.',
		detailedDescription:
			'Learn together with peers through collaborative projects, group challenges, and team-based learning experiences. Features include shared workspaces, peer code reviews, group discussions, and team progress tracking. Perfect for study groups, bootcamp cohorts, or corporate training programs.',
		isFirstRelease: false,
		releaseTimeline: '18 months',
	},
	{
		icon: Briefcase,
		title: 'Job Board Integration',
		description:
			'Career opportunities aligned with your skill growth and learning progress with personalized job matching.',
		detailedDescription:
			'Connect your learning directly to career opportunities with our intelligent job matching system. The platform analyzes your skills, completed courses, and learning progress to recommend relevant job openings. Features include application tracking, interview preparation resources, and direct connections with hiring partners.',
		isFirstRelease: false,
		releaseTimeline: '21 months',
	},
	{
		icon: Store,
		title: 'TekBreed Store',
		description:
			'Customized TekBreed merchandise, tech gadgets, and developer tools at subsidized prices for community members.',
		detailedDescription:
			'Shop exclusive TekBreed branded merchandise, cutting-edge tech gadgets, development tools, and accessories at special subsidized prices available only to our community members. From custom hoodies and laptop stickers to premium keyboards, monitors, and developer hardware - everything you need to showcase your TekBreed pride and enhance your coding setup.',
		isFirstRelease: false,
		releaseTimeline: '24 months',
	},
]

export function FeaturesSection() {
	return (
		<section className="relative overflow-hidden text-card-foreground py-24 sm:py-32 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
			<div className="absolute inset-0 pointer-events-none select-none" />
			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-primary text-base font-semibold leading-7">
						Learning Modules
					</h2>
					<p className="text-foreground mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
						Everything you need to master{' '}
						<span className="text-primary">software engineering</span>
					</p>
					<p className="text-muted-foreground mt-6 text-pretty text-lg leading-8">
						Our comprehensive learning platform provides structured content, practical
						challenges, and AI-powered guidance to help you grow from beginner to
						professional developer.
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24">
					<Accordion type="single" collapsible className="space-y-4">
						{features.map((feature, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="bg-card/80 rounded-lg border backdrop-blur-sm"
							>
								<AccordionTrigger className="bg-card px-6 py-4 hover:no-underline">
									<div className="flex w-full items-center gap-4">
										{feature.isFirstRelease && (
											<div className="bg-primary rounded-full p-1.5 shadow-lg">
												<Check className="text-primary-foreground h-4 w-4" />
											</div>
										)}
										<div className="flex h-12 w-12 items-center justify-center rounded-lg">
											<feature.icon className="text-primary h-6 w-6" />
										</div>
										<div className="flex-1 text-left">
											<h3 className="text-foreground text-xl font-semibold">
												{feature.title}
											</h3>
											<Badge
												variant={feature.isFirstRelease ? 'default' : 'secondary'}
												className="mt-1 text-xs"
											>
												{feature.isFirstRelease
													? `First Release - ${feature.releaseTimeline}`
													: `Coming in ${feature.releaseTimeline}`}
											</Badge>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className="px-6 py-4">
									<div className="space-y-3 text-sm">
										<p className="leading-relaxed text-lg text-muted-foreground">
											{feature.description}
										</p>
										<p className="leading-relaxed">{feature.detailedDescription}</p>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	)
}
