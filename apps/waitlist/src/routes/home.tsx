import { HeroSection } from './components/hero'
import { CountdownTimer } from './components/timer'
import { FeaturesSection } from './components/features'
import { AboutSection } from './components/about'
import { FormSection } from './components/form'
// import { listSubscribers } from '~/utils/email.server'
import { FounderQuoteSection } from './components/quote'

// export async function loader() {
// 	return { subscribers: await listSubscribers() }
// }

export default function WaitlistRoute() {
	return (
		<>
			<HeroSection />
			<CountdownTimer />
			<FeaturesSection />
			<AboutSection />
			<FounderQuoteSection />
			<FormSection />
		</>
	)
}
