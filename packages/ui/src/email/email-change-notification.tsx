import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Tailwind,
  Img,
  Link,
} from "@react-email/components";

export const EmailChangeNotification = (props: {
  name: string;
  newEmail: string;
  oldEmail: string;
  changeDate: string;
  ipAddress: string;
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-[#1f1f23] py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-[#2a2a2f] px-[32px] py-[40px]">
            {/* Header with Logo */}
            <Section className="mb-[8px] text-center">
              <Img
                src="https://di867tnz6fwga.cloudfront.net/brand-kits/4131df7d-337f-4182-99ad-1dc8664a83be/primary/c56c3e12-1f19-4f5c-ab3d-042d351d4a59.png"
                alt="TekBreed"
                className="mx-auto h-auto w-full max-w-[80px] object-cover"
              />
            </Section>

            <Section>
              <Heading className="mb-[24px] text-center text-[28px] font-bold text-[#fbfbfc]">
                Email Address Successfully Changed
              </Heading>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-[#fbfbfc]">
                Hello {props.name},
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-[#fbfbfc]">
                We&apos;re confirming that your email address has been
                successfully updated on your TekBreed account. This change helps
                ensure you continue receiving important updates about your
                software engineering journey.
              </Text>

              {/* Email Change Details */}
              <Section className="mb-[24px] rounded-[8px] border border-solid border-[#bfdbfe] bg-[#1f1f23] p-[24px]">
                <Text className="m-0 mb-[8px] text-[14px] font-medium text-[#bfdbfe]">
                  Previous Email:
                </Text>
                <Text className="m-0 mb-[16px] text-[16px] font-medium text-[#fbfbfc]">
                  {props.oldEmail}
                </Text>

                <Text className="m-0 mb-[8px] text-[14px] font-medium text-[#bfdbfe]">
                  New Email:
                </Text>
                <Text className="m-0 mb-[16px] text-[16px] font-medium text-[#fbfbfc]">
                  {props.newEmail}
                </Text>

                <Text className="m-0 mb-[8px] text-[14px] font-medium text-[#bfdbfe]">
                  Change Date:
                </Text>
                <Text className="m-0 text-[16px] font-medium text-[#fbfbfc]">
                  {props.changeDate}
                </Text>
              </Section>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-[#fbfbfc]">
                This change was processed from IP address {props.ipAddress}. All
                future communications, updates, and notifications will now be
                sent to your new email address.
              </Text>

              {/* Security Warning */}
              <Section className="mb-[32px] rounded-[8px] border border-solid border-red-600 bg-[#2d1b1b] p-[24px]">
                <Text className="m-0 mb-[16px] text-[16px] font-bold text-red-400">
                  ⚠️ Didn&apos;t make this change?
                </Text>
                <Text className="m-0 mb-[16px] text-[14px] leading-[20px] text-[#fbfbfc]">
                  If you didn&apos;t request this email change, your account
                  security may be compromised. Please secure your account
                  immediately and contact our support team.
                </Text>
                <Button
                  href="https://tekbreed.com/support"
                  className="box-border rounded-[6px] bg-red-600 px-[24px] py-[12px] text-[14px] font-medium text-white no-underline"
                >
                  Secure My Account
                </Button>
              </Section>

              <Text className="mb-[32px] text-[16px] leading-[24px] text-[#fbfbfc]">
                Continue building your software engineering skills with
                confidence. Your learning journey with TekBreed remains
                uninterrupted with this email update.
              </Text>
            </Section>

            <Hr className="my-[32px] border-[#bfdbfe]" />

            {/* Footer */}
            <Section>
              <Text className="mb-[16px] text-center text-[14px] text-[#fbfbfc]">
                Breeding the next generation of software engineers
              </Text>

              {/* Social Links */}
              <Section className="mb-[24px] text-center">
                <Link
                  href="https://github.com/tekbreed"
                  className="mx-[8px] inline-block"
                >
                  <Img
                    src="https://new.email/static/emails/social/social-github.png"
                    alt="GitHub"
                    width="24"
                    height="24"
                    className="h-[24px] w-[24px]"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/tekbreed/"
                  className="mx-[8px] inline-block"
                >
                  <Img
                    src="https://new.email/static/emails/social/social-linkedin.png"
                    alt="LinkedIn"
                    width="24"
                    height="24"
                    className="h-[24px] w-[24px]"
                  />
                </Link>
                <Link
                  href="https://x.com/tekbreed"
                  className="mx-[8px] inline-block"
                >
                  <Img
                    src="https://new.email/static/emails/social/social-x.png"
                    alt="X (Twitter)"
                    width="24"
                    height="24"
                    className="h-[24px] w-[24px]"
                  />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCYWjNbfB8ygT_7hElaa0B9Q"
                  className="mx-[8px] inline-block"
                >
                  <Img
                    src="https://new.email/static/emails/social/social-youtube.png"
                    alt="YouTube"
                    width="24"
                    height="24"
                    className="h-[24px] w-[24px]"
                  />
                </Link>
                <Link
                  href="https://discord.gg/7uZ6PWf4Xv"
                  className="mx-[8px] inline-block"
                >
                  <Img
                    src="https://new.email/static/emails/social/social-discord.png"
                    alt="Discord"
                    width="24"
                    height="24"
                    className="h-[24px] w-[24px]"
                  />
                </Link>
              </Section>
              <Text className="m-0 mb-[8px] text-center text-[12px] text-[#bfdbfe]">
                42D Isa Shado by Halima Road, Sabon Tasha
              </Text>
              <Text className="m-0 text-center text-[12px] text-[#bfdbfe]">
                © 2025 TekBreed. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
