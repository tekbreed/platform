import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent } from '@repo/ui/components/card'

interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
}

export function CountdownTimer() {
	const launchDate = useMemo(() => {
		const date = new Date()
		date.setMonth(date.getMonth() + 4)
		return date
	}, [])

	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		function calculateTimeLeft() {
			const difference = launchDate.getTime() - new Date().getTime()

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				})
			}
		}

		calculateTimeLeft()
		const timer = setInterval(calculateTimeLeft, 1000)
		return () => clearInterval(timer)
	}, [launchDate])

	return (
		<div className="relative overflow-hidden bg-card py-16">
			<div className="absolute inset-0 pointer-events-none select-none" />
			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-balance bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
						Platform Launch Countdown
					</h2>
					<p className="text-muted-foreground mt-4 text-pretty text-lg">
						First modules available in
					</p>
				</div>

				<div className="mt-10 flex justify-center">
					<div className="grid grid-cols-4 gap-4 sm:gap-8">
						{[
							{ label: 'Days', value: timeLeft.days },
							{ label: 'Hours', value: timeLeft.hours },
							{ label: 'Minutes', value: timeLeft.minutes },
							{ label: 'Seconds', value: timeLeft.seconds },
						].map((item, index) => (
							<Card
								key={index}
								className="border border-primary/20 bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
							>
								<CardContent className="p-4 text-center sm:p-6">
									<div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold tabular-nums text-transparent sm:text-4xl">
										{item.value.toString().padStart(2, '0')}
									</div>
									<div className="text-muted-foreground mt-1 text-sm font-medium sm:text-base">
										{item.label}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
