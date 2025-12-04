import {
	getGuildChannels,
	getMemberStatistics,
} from "@repo/utils/discord.server"

export async function loader() {
	const channels = await getGuildChannels()
	const members = await getMemberStatistics()
	return { channels, members }
}
