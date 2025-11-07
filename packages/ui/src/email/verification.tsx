import * as React from "react"

import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components"

export const Verification = ({
	code = "TB2025",
	verificationUrl = "https://tekbreed.com/auth/verify?code=TB2025",
}: {
	code: string
	verificationUrl: string
}) => {
	return (
		<Html>
			<Tailwind>
				<Head />
				<Preview>Your verification code: {code}</Preview>
				<Body
					className="py-[40px] font-sans antialiased"
					style={{ backgroundColor: "#1f1f23" }}
				>
					<Container
						className="mx-auto max-w-[600px] rounded-[8px] border border-solid p-[40px] shadow-lg"
						style={{ backgroundColor: "#2a2a2f", borderColor: "#bfdbfe" }}
					>
						{/* Header with Logo */}
						<Section className="mb-[8px] text-center">
							<Img
								src="https://di867tnz6fwga.cloudfront.net/brand-kits/4131df7d-337f-4182-99ad-1dc8664a83be/primary/c56c3e12-1f19-4f5c-ab3d-042d351d4a59.png"
								alt="TekBreed"
								className="mx-auto mb-[8px] h-auto w-full max-w-[80px] object-cover"
							/>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Heading
								as="h2"
								className="mb-[16px] text-center text-[24px] font-semibold"
								style={{ color: "#fbfbfc" }}
							>
								Email Verification
							</Heading>

							<Text
								className="mb-[24px] text-[16px] leading-[24px]"
								style={{ color: "#fbfbfc" }}
							>
								Welcome to TekBreed! To complete your account setup and start
								your journey with us, please verify your email address.
							</Text>

							{/* Verification Code Section - Using reference structure */}
							<Section className="mb-[24px]">
								<Text
									className="mb-[8px] text-[16px] font-semibold"
									style={{ color: "#fbfbfc" }}
								>
									Your Verification Code
								</Text>
								<Text
									className="mb-[16px] text-[14px]"
									style={{ color: "#fbfbfc" }}
								>
									Please use the following code to verify your identity:
								</Text>
								<Container
									className="rounded-[8px] border border-solid px-[24px] py-[16px] text-center"
									style={{ backgroundColor: "#1f1f23", borderColor: "#bfdbfe" }}
								>
									<Text
										className="m-0 text-[32px] font-bold tracking-[8px]"
										style={{ color: "#fbfbfc" }}
									>
										{code}
									</Text>
								</Container>
								<Text
									className="mt-[8px] text-center text-[12px]"
									style={{ color: "#bfdbfe" }}
								>
									Expires in 10 minutes
								</Text>
							</Section>

							{/* Verification Link Section - Using reference structure */}
							<Section className="mb-[24px]">
								<Text className="mb-[8px] text-[14px] text-white">
									Or click this link to verify:
								</Text>
								<Link
									href={verificationUrl}
									className="block break-all"
									style={{ color: "#bfdbfe" }}
								>
									{verificationUrl}
								</Link>
							</Section>

							<Text
								className="text-[14px] leading-[20px]"
								style={{ color: "#fbfbfc" }}
							>
								For your security, please don&apos;t share this code with
								anyone. If you didn&apos;t create an account with TekBreed, you
								can safely ignore this email.
							</Text>
						</Section>

						{/* Social Links */}
						<Section className="mb-[32px] text-center">
							<Row>
								<Column className="text-center">
									<Link href="https://github.com/tekbreed" className="mx-[8px]">
										<Img
											src="https://new.email/static/emails/social/social-github.png"
											alt="GitHub"
											className="inline-block h-[24px] w-[24px]"
										/>
									</Link>
									<Link
										href="https://www.linkedin.com/company/tekbreed/"
										className="mx-[8px]"
									>
										<Img
											src="https://new.email/static/emails/social/social-linkedin.png"
											alt="LinkedIn"
											className="inline-block h-[24px] w-[24px]"
										/>
									</Link>
									<Link href="https://x.com/tekbreed" className="mx-[8px]">
										<Img
											src="https://new.email/static/emails/social/social-x.png"
											alt="X"
											className="inline-block h-[24px] w-[24px]"
										/>
									</Link>
									<Link
										href="https://www.youtube.com/channel/UCYWjNbfB8ygT_7hElaa0B9Q"
										className="mx-[8px]"
									>
										<Img
											src="https://new.email/static/emails/social/social-youtube.png"
											alt="YouTube"
											className="inline-block h-[24px] w-[24px]"
										/>
									</Link>
									<Link
										href="https://discord.gg/7uZ6PWf4Xv"
										className="mx-[8px]"
									>
										<Img
											src="https://new.email/static/emails/social/social-discord.png"
											alt="Discord"
											className="inline-block h-[24px] w-[24px]"
										/>
									</Link>
								</Column>
							</Row>
						</Section>

						{/* Footer */}
						<Section
							className="border-t border-solid pt-[24px]"
							style={{ borderColor: "#bfdbfe" }}
						>
							<Text
								className="m-0 mb-[8px] text-center text-[12px]"
								style={{ color: "#fbfbfc" }}
							>
								Breeding the next generation of software engineers
							</Text>
							<Text
								className="m-0 mb-[8px] text-center text-[12px]"
								style={{ color: "#fbfbfc" }}
							>
								Kaduna, Nigeria.
							</Text>
							<Text
								className="m-0 mb-[8px] text-center text-[12px]"
								style={{ color: "#fbfbfc" }}
							>
								<Link href="https://tekbreed.com" style={{ color: "#bfdbfe" }}>
									Visit our website
								</Link>
								{" | "}
								<Link
									href="https://tekbreed.com/unsubscribe"
									style={{ color: "#bfdbfe" }}
								>
									Unsubscribe
								</Link>
							</Text>
							<Text
								className="m-0 text-center text-[12px]"
								style={{ color: "#fbfbfc" }}
							>
								© 2025 TekBreed. All rights reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
