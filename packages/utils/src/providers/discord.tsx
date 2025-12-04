import React from "react"

type DiscordContextType = {
	open: boolean
	openDiscord: () => void
	closeDiscord: () => void
	toggleDiscord: () => void
}

const DiscordContext = React.createContext<DiscordContextType | undefined>(
	undefined,
)

function DiscordProvider(props: React.PropsWithChildren) {
	const [open, setOpen] = React.useState(false)

	const contextValue = React.useMemo(
		() => ({
			open,
			openDiscord: () => setOpen(true),
			closeDiscord: () => setOpen(false),
			toggleDiscord: () => setOpen((prev) => !prev),
		}),
		[open],
	)

	return <DiscordContext.Provider value={contextValue} {...props} />
}

function useDiscord() {
	const context = React.use(DiscordContext)
	if (context === undefined) {
		throw new Error("useDiscord must be used within a DiscordProvider")
	}
	return context
}

export { useDiscord, DiscordProvider }
