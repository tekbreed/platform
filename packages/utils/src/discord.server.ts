import {
	Client,
	EmbedBuilder,
	GatewayIntentBits,
	type GuildMember,
	type NewsChannel,
	PermissionsBitField,
	type StageChannel,
	type TextChannel,
	type VoiceChannel,
} from "discord.js"

import { invariant } from "./misc"

interface LearningSystemUser {
	id: string
	username: string
	email: string
	learningTrack?: string
	joinedAt: Date
}

interface ChannelInfo {
	id: string
	name: string
	type: string
	memberCount?: number
	topic?: string
}

interface MemberStats {
	totalMembers: number
	onlineMembers: number
	offlineMembers: number
	idleMembers: number
	doNotDisturbMembers: number
}

// Singleton client instance
let discordClient: Client | null = null

// Get Discord config from environment
const { DISCORD_GUILD_ID, DISCORD_BOT_TOKEN } = process.env

function createDiscordClient(): Client {
	return new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.GuildPresences,
			GatewayIntentBits.GuildVoiceStates,
		],
	})
}

// Initialize client once
async function getDiscordClient(): Promise<Client> {
	try {
		if (!discordClient) {
			discordClient = createDiscordClient()

			discordClient.once("ready", () => {
				console.log(`Discord bot logged in as ${discordClient?.user?.tag}`)
			})

			discordClient.on("guildMemberAdd", async (member: GuildMember) => {
				await handleNewMemberJoin(member)
			})

			await discordClient.login(DISCORD_BOT_TOKEN)
		}
		return discordClient
	} catch (error) {
		console.error("Error getting Discord client:", error)
		throw new Error("Failed to get Discord client")
	}
}

// Function to get all channels in a guild
export async function getGuildChannels(
	guildId: string = DISCORD_GUILD_ID,
): Promise<ChannelInfo[]> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)
		const channels = await guild.channels.fetch()

		const channelInfo: ChannelInfo[] = []

		channels.forEach((channel) => {
			if (channel) {
				const info: ChannelInfo = {
					id: channel.id,
					name: channel.name,
					type: channel.type.toString(),
				}

				if (channel.isTextBased() && "topic" in channel) {
					info.topic = (channel as TextChannel).topic || undefined
				}

				if (channel.type === 2) {
					info.memberCount = (channel as VoiceChannel).members.size
				}

				channelInfo.push(info)
			}
		})

		return channelInfo
	} catch (error) {
		console.error("Error fetching channels:", error)
		throw new Error("Failed to fetch guild channels")
	}
}

export async function getMemberStatistics(
	guildId: string = DISCORD_GUILD_ID,
): Promise<MemberStats> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)
		const members = await guild.members.fetch()
		let onlineMembers = 0
		let offlineMembers = 0
		let idleMembers = 0
		let doNotDisturbMembers = 0

		members.forEach((member) => {
			const presence = member.presence
			if (presence) {
				switch (presence.status) {
					case "online":
						onlineMembers++
						break
					case "idle":
						idleMembers++
						break
					case "dnd":
						doNotDisturbMembers++
						break
					case "offline":
						offlineMembers++
						break
				}
			} else {
				offlineMembers++
			}
		})

		return {
			totalMembers: members.size,
			onlineMembers,
			offlineMembers,
			idleMembers,
			doNotDisturbMembers,
		}
	} catch (error) {
		console.error("Error fetching member statistics:", error)
		throw new Error("Failed to fetch member statistics")
	}
}

async function handleNewMemberJoin(member: GuildMember): Promise<void> {
	try {
		const welcomeChannel = member.guild.channels.cache.find(
			(channel) => channel.name === "welcome" || channel.name === "general",
		) as TextChannel

		if (welcomeChannel) {
			const welcomeEmbed = new EmbedBuilder()
				.setColor(0x00ae86)
				.setTitle("Welcome to the Learning Community! 🎉")
				.setDescription(`Hey ${member.user}, welcome to TekBreed!`)
				.addFields(
					{
						name: "Get Started",
						value:
							"• Check out #rules for community guidelines\n• Introduce yourself in #introductions",
					},
					{
						name: "Need Help?",
						value: "Feel free to ask questions in #help or #general",
					},
				)
				.setThumbnail(member.user.displayAvatarURL())
				.setTimestamp()
				.setFooter({
					text: "TekBreed Bot",
					iconURL: member.guild.iconURL() || undefined,
				})

			await welcomeChannel.send({
				content: `Welcome ${member}!`,
				embeds: [welcomeEmbed],
			})
		}

		const defaultRole = member.guild.roles.cache.find(
			(role) => role.name === "Student",
		)
		if (defaultRole) {
			await member.roles.add(defaultRole)
		}
	} catch (error) {
		console.error("Error handling new member join:", error)
	}
}

export async function postAnnouncement(
	channelName: string,
	title: string,
	content: string,
	isImportant: boolean = false,
	guildId: string = DISCORD_GUILD_ID,
): Promise<void> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)
		const channel = guild.channels.cache.find(
			(ch) => ch.name === channelName && ch.isTextBased(),
		) as TextChannel
		invariant(channel, `Channel ${channelName} not found`)

		const announcementEmbed = new EmbedBuilder()
			.setColor(isImportant ? 0xff0000 : 0x0099ff)
			.setTitle(title)
			.setDescription(content)
			.setTimestamp()
			.setFooter({ text: "TekBreed Announcement" })

		if (isImportant) {
			announcementEmbed.addFields({
				name: "⚠️ Important",
				value: "This is a high-priority announcement",
			})
		}

		const messageContent = isImportant ? "@everyone" : ""

		await channel.send({
			content: messageContent,
			embeds: [announcementEmbed],
		})

		console.log(`Announcement posted to ${channelName}`)
	} catch (error) {
		console.error("Error posting announcement:", error)
		throw new Error("Failed to post announcement")
	}
}

// Function to create Discord invite and add user programmatically
export async function createUserInvite(
	user: LearningSystemUser,
	channelName: string = "general",
	guildId: string = DISCORD_GUILD_ID!,
): Promise<string> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)
		const channel = guild.channels.cache.find((ch) => ch.name === channelName)

		if (!channel || !("createInvite" in channel)) {
			throw new Error(
				`Channel ${channelName} not found or does not support invites`,
			)
		}

		const inviteableChannel = channel as
			| TextChannel
			| VoiceChannel
			| NewsChannel
			| StageChannel

		const invite = await inviteableChannel.createInvite({
			maxAge: 86400, // 24 hours
			maxUses: 1, // Single use
			unique: true,
			reason: `Invite for TekBreed user: ${user.username}`,
		})

		console.log(`Invite created for user ${user.username}: ${invite.url}`)
		return invite.url
	} catch (error) {
		console.error("Error creating user invite:", error)
		throw new Error("Failed to create user invite")
	}
}

// Function to send direct message to user
export async function sendDirectMessage(
	userId: string,
	message: string,
): Promise<void> {
	try {
		const client = await getDiscordClient()
		const user = await client.users.fetch(userId)
		await user.send(message)
		console.log(`DM sent to ${user.username}`)
	} catch (error) {
		console.error("Error sending direct message:", error)
		throw new Error("Failed to send direct message")
	}
}

export async function createLearningChannel(
	courseName: string,
	categoryName: string = "Courses",
	guildId: string = DISCORD_GUILD_ID,
): Promise<TextChannel> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)

		// Find or create category
		let category = guild.channels.cache.find(
			(ch) => ch.name === categoryName && ch.type === 4, // Category type
		)

		if (!category) {
			category = await guild.channels.create({
				name: categoryName,
				type: 4, // Category
			})
		}

		// Create the course channel
		const channel = await guild.channels.create({
			name: `${courseName.toLowerCase().replace(/\s+/g, "-")}`,
			type: 0, // Text channel
			parent: category.id,
			topic: `Discussion channel for ${courseName} course`,
			permissionOverwrites: [
				{
					id: guild.roles.everyone.id,
					allow: [
						PermissionsBitField.Flags.ViewChannel,
						PermissionsBitField.Flags.ReadMessageHistory,
					],
					deny: [PermissionsBitField.Flags.SendMessages],
				},
			],
		})

		// Send initial message
		const welcomeEmbed = new EmbedBuilder()
			.setColor(0x00ae86)
			.setTitle(`Welcome to ${courseName}!`)
			.setDescription(
				"This channel is dedicated to discussions about this course.",
			)
			.addFields(
				{
					name: "Guidelines",
					value:
						"• Stay on topic\n• Be respectful to others\n• Study together and help each other",
				},
				{
					name: "Resources",
					value: "Always check the platform for resources",
				},
			)

		await (channel as TextChannel).send({ embeds: [welcomeEmbed] })

		return channel as TextChannel
	} catch (error) {
		console.error("Error creating learning channel:", error)
		throw new Error("Failed to create learning channel")
	}
}

// Function to assign roles based on learning track
export async function assignLearningRole(
	userId: string,
	learningTrack: string,
	guildId: string = DISCORD_GUILD_ID,
): Promise<void> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)
		const member = await guild.members.fetch(userId)

		// Find or create role for learning track
		let role = guild.roles.cache.find((r) => r.name === learningTrack)

		if (!role) {
			role = await guild.roles.create({
				name: learningTrack,
				color: Math.floor(Math.random() * 16777215), // Random color
				hoist: true,
				mentionable: true,
				reason: `Role for ${learningTrack} learning track`,
			})
		}

		await member.roles.add(role)
		console.log(`Assigned ${learningTrack} role to ${member.user.username}`)
	} catch (error) {
		console.error("Error assigning learning role:", error)
		throw new Error("Failed to assign learning role")
	}
}

// Function to get user progress and post updates
export async function postUserProgress(
	channelName: string,
	user: LearningSystemUser,
	progressData: {
		course: string
		completedLessons: number
		totalLessons: number
		currentStreak: number
	},
	guildId: string = DISCORD_GUILD_ID,
): Promise<void> {
	try {
		const client = await getDiscordClient()
		const guild = await client.guilds.fetch(guildId)
		const channel = guild.channels.cache.find(
			(ch) => ch.name === channelName && ch.isTextBased(),
		) as TextChannel

		if (!channel) {
			throw new Error(`Channel ${channelName} not found`)
		}

		const progressPercentage = Math.round(
			(progressData.completedLessons / progressData.totalLessons) * 100,
		)

		const progressEmbed = new EmbedBuilder()
			.setColor(0x00ff00)
			.setTitle(`${user.username}'s Progress Update! 📚`)
			.addFields(
				{ name: "Course", value: progressData.course, inline: true },
				{
					name: "Progress",
					value: `${progressData.completedLessons}/${progressData.totalLessons} lessons (${progressPercentage}%)`,
					inline: true,
				},
				{
					name: "Current Streak",
					value: `${progressData.currentStreak} days 🔥`,
					inline: true,
				},
			)
			.setTimestamp()

		await channel.send({ embeds: [progressEmbed] })
	} catch (error) {
		console.error("Error posting user progress:", error)
		throw new Error("Failed to post user progress")
	}
}

// Utility function to get raw Discord client (for advanced usage)
export async function getDiscordClientInstance(): Promise<Client> {
	return await getDiscordClient()
}

// Function to cleanup on app shutdown
export async function disconnectDiscordBot(): Promise<void> {
	if (discordClient) {
		await discordClient.destroy()
		discordClient = null
		console.log("Discord bot disconnected")
	}
}

export type { LearningSystemUser, ChannelInfo, MemberStats }
