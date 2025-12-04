import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components"

export const WaitlistEmail = (props: { firstName?: string }) => {
	const { firstName = "Developer" } = props

	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Preview>Welcome to TekBreed - You&apos;re on the waitlist!</Preview>
				<Body
					className="py-[40px] font-sans"
					style={{ backgroundColor: "#1f1f23" }}
				>
					<Container
						className="mx-auto max-w-[600px] rounded-[8px] px-[20px] py-[40px]"
						style={{ backgroundColor: "#2a2a2f" }}
					>
						{/* Header with Logo */}
						<Section className="mb-[8px] text-center">
							<Img
								alt="TekBreed"
								className="mx-auto h-auto w-full max-w-[80px]"
								src="https://di867tnz6fwga.cloudfront.net/brand-kits/4131df7d-337f-4182-99ad-1dc8664a83be/primary/c56c3e12-1f19-4f5c-ab3d-042d351d4a59.png"
							/>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Heading
								className="mb-[16px] text-center font-bold text-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Welcome to TekBreed, {firstName}!
							</Heading>

							<Text
								className="mb-[16px] text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Thank you for joining our waitlist. You&apos;re now part of an
								exclusive community dedicated to breeding the next generation of
								software engineers through our comprehensive learning platform
								and developer community.
							</Text>

							<Text
								className="mb-[16px] text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								We&apos;re building a platform that will transform how software
								engineers learn, grow, and connect with each other. Our mission
								is to provide world-class education, mentorship, and career
								resources that help developers at every stage of their journey.
								We&apos;re targeting a launch in Q1 2026, and as a waitlist
								member, you&apos;ll be among the first to experience it.
							</Text>

							<Text
								className="mb-[24px] text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Here&apos;s what you can expect as a founding member:
							</Text>

							<Section className="mb-[32px]">
								<Text
									className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
									style={{ color: "#fbfbfc" }}
								>
									• One month free access to all premium content and features
								</Text>
								<Text
									className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
									style={{ color: "#fbfbfc" }}
								>
									• Priority access to new features before general release
								</Text>
								<Text
									className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
									style={{ color: "#fbfbfc" }}
								>
									• Weekly email updates on our development progress
								</Text>
								<Text
									className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
									style={{ color: "#fbfbfc" }}
								>
									• Exclusive founding member badge and recognition
								</Text>
								<Text
									className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
									style={{ color: "#fbfbfc" }}
								>
									• Behind-the-scenes development insights and sneak peeks
								</Text>
							</Section>

							<Text
								className="mb-[16px] text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Want to get involved right away? Join our Discord community to
								connect with other founding members, share ideas, and get the
								latest updates in real-time. We&apos;d love to hear your
								thoughts on what features matter most to you.
							</Text>

							<Text
								className="mb-[16px] text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Stay connected with us on social media for daily updates and
								behind-the-scenes content:
							</Text>

							{/* Social Media Links */}
							<Section className="mb-[32px] text-center">
								<Row>
									<Column className="text-center">
										<Link
											className="mx-[8px] inline-block"
											href="https://github.com/tekbreed"
										>
											<Img
												alt="GitHub"
												className="rounded-[4px]"
												height="32"
												src="https://new.email/static/emails/social/social-github.png"
												width="32"
											/>
										</Link>
										<Link
											className="mx-[8px] inline-block"
											href="https://www.linkedin.com/company/tekbreed/"
										>
											<Img
												alt="LinkedIn"
												className="rounded-[4px]"
												height="32"
												src="https://new.email/static/emails/social/social-linkedin.png"
												width="32"
											/>
										</Link>
										<Link
											className="mx-[8px] inline-block"
											href="https://x.com/tekbreed"
										>
											<Img
												alt="X (Twitter)"
												className="rounded-[4px]"
												height="32"
												src="https://new.email/static/emails/social/social-x.png"
												width="32"
											/>
										</Link>
										<Link
											className="mx-[8px] inline-block"
											href="https://www.youtube.com/channel/UCYWjNbfB8ygT_7hElaa0B9Q"
										>
											<Img
												alt="YouTube"
												className="rounded-[4px]"
												height="32"
												src="https://new.email/static/emails/social/social-youtube.png"
												width="32"
											/>
										</Link>
										<Link
											className="mx-[8px] inline-block"
											href="https://discord.gg/7uZ6PWf4Xv"
										>
											<Img
												alt="Discord"
												className="rounded-[4px]"
												height="32"
												src="https://new.email/static/emails/social/social-discord.png"
												width="32"
											/>
										</Link>
									</Column>
								</Row>
							</Section>

							<Text
								className="text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Thank you for believing in our mission. Together, we&apos;re
								building the future of software engineering education.
							</Text>
						</Section>

						<Hr
							className="my-[32px] border-[1px] border-solid"
							style={{ borderColor: "#3a3a3f" }}
						/>

						{/* Footer */}
						<Section className="text-center">
							<Text
								className="m-0 mb-[8px] text-[12px] leading-[16px]"
								style={{ color: "#9ca3af" }}
							>
								Breeding the next generation of software engineers
							</Text>
							<Text
								className="m-0 mb-[8px] text-[12px] leading-[16px]"
								style={{ color: "#9ca3af" }}
							>
								Kaduna, Nigeria.
							</Text>
							<Text
								className="m-0 mb-[8px] text-[12px] leading-[16px]"
								style={{ color: "#9ca3af" }}
							>
								© 2025 TekBreed
							</Text>
							<Link
								className="text-[12px] underline"
								href="https://tekbreed.com/unsubscribe"
								style={{ color: "#bfdbfe" }}
							>
								Unsubscribe
							</Link>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
