import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Section,
	Tailwind,
	Text,
} from "@react-email/components"

export const EmailChangeNotification = (props: {
	name: string
	newEmail: string
	oldEmail: string
	changeDate: string
	ipAddress: string
}) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Body className="bg-[#1f1f23] py-[40px] font-sans">
					<Container className="mx-auto max-w-[600px] rounded-[8px] bg-[#2a2a2f] px-[32px] py-[40px]">
						{/* Header with Logo */}
						<Section className="mb-[8px] text-center">
							<Img
								alt="TekBreed"
								className="mx-auto h-auto w-full max-w-[80px] object-cover"
								src="https://di867tnz6fwga.cloudfront.net/brand-kits/4131df7d-337f-4182-99ad-1dc8664a83be/primary/c56c3e12-1f19-4f5c-ab3d-042d351d4a59.png"
							/>
						</Section>

						<Section>
							<Heading className="mb-[24px] text-center font-bold text-[#fbfbfc] text-[28px]">
								Email Address Successfully Changed
							</Heading>

							<Text className="mb-[24px] text-[#fbfbfc] text-[16px] leading-[24px]">
								Hello {props.name},
							</Text>

							<Text className="mb-[24px] text-[#fbfbfc] text-[16px] leading-[24px]">
								We&apos;re confirming that your email address has been
								successfully updated on your TekBreed account. This change helps
								ensure you continue receiving important updates about your
								software engineering journey.
							</Text>

							{/* Email Change Details */}
							<Section className="mb-[24px] rounded-[8px] border border-[#bfdbfe] border-solid bg-[#1f1f23] p-[24px]">
								<Text className="m-0 mb-[8px] font-medium text-[#bfdbfe] text-[14px]">
									Previous Email:
								</Text>
								<Text className="m-0 mb-[16px] font-medium text-[#fbfbfc] text-[16px]">
									{props.oldEmail}
								</Text>

								<Text className="m-0 mb-[8px] font-medium text-[#bfdbfe] text-[14px]">
									New Email:
								</Text>
								<Text className="m-0 mb-[16px] font-medium text-[#fbfbfc] text-[16px]">
									{props.newEmail}
								</Text>

								<Text className="m-0 mb-[8px] font-medium text-[#bfdbfe] text-[14px]">
									Change Date:
								</Text>
								<Text className="m-0 font-medium text-[#fbfbfc] text-[16px]">
									{props.changeDate}
								</Text>
							</Section>

							<Text className="mb-[24px] text-[#fbfbfc] text-[16px] leading-[24px]">
								This change was processed from IP address {props.ipAddress}. All
								future communications, updates, and notifications will now be
								sent to your new email address.
							</Text>

							{/* Security Warning */}
							<Section className="mb-[32px] rounded-[8px] border border-red-600 border-solid bg-[#2d1b1b] p-[24px]">
								<Text className="m-0 mb-[16px] font-bold text-[16px] text-red-400">
									⚠️ Didn&apos;t make this change?
								</Text>
								<Text className="m-0 mb-[16px] text-[#fbfbfc] text-[14px] leading-[20px]">
									If you didn&apos;t request this email change, your account
									security may be compromised. Please secure your account
									immediately and contact our support team.
								</Text>
								<Button
									className="box-border rounded-[6px] bg-red-600 px-[24px] py-[12px] font-medium text-[14px] text-white no-underline"
									href="https://tekbreed.com/support"
								>
									Secure My Account
								</Button>
							</Section>

							<Text className="mb-[32px] text-[#fbfbfc] text-[16px] leading-[24px]">
								Continue building your software engineering skills with
								confidence. Your learning journey with TekBreed remains
								uninterrupted with this email update.
							</Text>
						</Section>

						<Hr className="my-[32px] border-[#bfdbfe]" />

						{/* Footer */}
						<Section>
							<Text className="mb-[16px] text-center text-[#fbfbfc] text-[14px]">
								Breeding the next generation of software engineers
							</Text>

							{/* Social Links */}
							<Section className="mb-[24px] text-center">
								<Link
									className="mx-[8px] inline-block"
									href="https://github.com/tekbreed"
								>
									<Img
										alt="GitHub"
										className="h-[24px] w-[24px]"
										height="24"
										src="https://new.email/static/emails/social/social-github.png"
										width="24"
									/>
								</Link>
								<Link
									className="mx-[8px] inline-block"
									href="https://www.linkedin.com/company/tekbreed/"
								>
									<Img
										alt="LinkedIn"
										className="h-[24px] w-[24px]"
										height="24"
										src="https://new.email/static/emails/social/social-linkedin.png"
										width="24"
									/>
								</Link>
								<Link
									className="mx-[8px] inline-block"
									href="https://x.com/tekbreed"
								>
									<Img
										alt="X (Twitter)"
										className="h-[24px] w-[24px]"
										height="24"
										src="https://new.email/static/emails/social/social-x.png"
										width="24"
									/>
								</Link>
								<Link
									className="mx-[8px] inline-block"
									href="https://www.youtube.com/channel/UCYWjNbfB8ygT_7hElaa0B9Q"
								>
									<Img
										alt="YouTube"
										className="h-[24px] w-[24px]"
										height="24"
										src="https://new.email/static/emails/social/social-youtube.png"
										width="24"
									/>
								</Link>
								<Link
									className="mx-[8px] inline-block"
									href="https://discord.gg/7uZ6PWf4Xv"
								>
									<Img
										alt="Discord"
										className="h-[24px] w-[24px]"
										height="24"
										src="https://new.email/static/emails/social/social-discord.png"
										width="24"
									/>
								</Link>
							</Section>
							<Text className="m-0 mb-[8px] text-center text-[#bfdbfe] text-[12px]">
								42D Isa Shado by Halima Road, Sabon Tasha
							</Text>
							<Text className="m-0 text-center text-[#bfdbfe] text-[12px]">
								© 2025 TekBreed. All rights reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}
