import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Hr,
  Tailwind,
} from "@react-email/components";

export const WaitlistEmail = (props: { firstName?: string }) => {
  const { firstName = "Developer" } = props;

  return (
    <Html lang="en" dir="ltr">
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
                src="https://di867tnz6fwga.cloudfront.net/brand-kits/4131df7d-337f-4182-99ad-1dc8664a83be/primary/c56c3e12-1f19-4f5c-ab3d-042d351d4a59.png"
                alt="TekBreed"
                className="mx-auto h-auto w-full max-w-[80px]"
              />
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Heading
                className="mb-[16px] text-center text-[24px] font-bold"
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
                software engineers.
              </Text>

              <Text
                className="mb-[16px] text-[16px] leading-[24px]"
                style={{ color: "#fbfbfc" }}
              >
                We&apos;re working hard to create something special that will
                transform how software engineers learn, grow, and connect. As a
                waitlist member, you&apos;ll be among the first to know when we
                launch.
              </Text>

              <Text
                className="mb-[24px] text-[16px] leading-[24px]"
                style={{ color: "#fbfbfc" }}
              >
                Here&apos;s what you can expect as we prepare for launch:
              </Text>

              <Section className="mb-[32px]">
                <Text
                  className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
                  style={{ color: "#fbfbfc" }}
                >
                  • Early access to our platform before public launch
                </Text>
                <Text
                  className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
                  style={{ color: "#fbfbfc" }}
                >
                  • Exclusive updates on our development progress
                </Text>
                <Text
                  className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
                  style={{ color: "#fbfbfc" }}
                >
                  • Special founder pricing and benefits
                </Text>
                <Text
                  className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
                  style={{ color: "#fbfbfc" }}
                >
                  • Direct input on features and improvements
                </Text>
                <Text
                  className="mb-[8px] ml-[16px] text-[14px] leading-[20px]"
                  style={{ color: "#fbfbfc" }}
                >
                  • Behind-the-scenes content and development insights
                </Text>
              </Section>

              <Text
                className="mb-[16px] text-[16px] leading-[24px]"
                style={{ color: "#fbfbfc" }}
              >
                We&apos;re building something that will change how software
                engineers approach their craft. Your patience and support during
                this development phase means everything to us.
              </Text>

              <Text
                className="mb-[16px] text-[16px] leading-[24px]"
                style={{ color: "#fbfbfc" }}
              >
                Stay connected with us on social media for the latest updates
                and behind-the-scenes content:
              </Text>

              {/* Social Media Links */}
              <Section className="mb-[32px] text-center">
                <Row>
                  <Column className="text-center">
                    <Link
                      href="https://github.com/tekbreed"
                      className="mx-[8px] inline-block"
                    >
                      <Img
                        src="https://new.email/static/emails/social/social-github.png"
                        alt="GitHub"
                        width="32"
                        height="32"
                        className="rounded-[4px]"
                      />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/tekbreed/"
                      className="mx-[8px] inline-block"
                    >
                      <Img
                        src="https://new.email/static/emails/social/social-linkedin.png"
                        alt="LinkedIn"
                        width="32"
                        height="32"
                        className="rounded-[4px]"
                      />
                    </Link>
                    <Link
                      href="https://x.com/tekbreed"
                      className="mx-[8px] inline-block"
                    >
                      <Img
                        src="https://new.email/static/emails/social/social-x.png"
                        alt="X (Twitter)"
                        width="32"
                        height="32"
                        className="rounded-[4px]"
                      />
                    </Link>
                    <Link
                      href="https://www.youtube.com/channel/UCYWjNbfB8ygT_7hElaa0B9Q"
                      className="mx-[8px] inline-block"
                    >
                      <Img
                        src="https://new.email/static/emails/social/social-youtube.png"
                        alt="YouTube"
                        width="32"
                        height="32"
                        className="rounded-[4px]"
                      />
                    </Link>
                    <Link
                      href="https://discord.gg/7uZ6PWf4Xv"
                      className="mx-[8px] inline-block"
                    >
                      <Img
                        src="https://new.email/static/emails/social/social-discord.png"
                        alt="Discord"
                        width="32"
                        height="32"
                        className="rounded-[4px]"
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
                42D Isa Shado by Halima Road, Sabon Tasha
              </Text>
              <Text
                className="m-0 mb-[8px] text-[12px] leading-[16px]"
                style={{ color: "#9ca3af" }}
              >
                © 2025 TekBreed
              </Text>
              <Link
                href="https://tekbreed.com/unsubscribe"
                className="text-[12px] underline"
                style={{ color: "#bfdbfe" }}
              >
                Unsubscribe
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
