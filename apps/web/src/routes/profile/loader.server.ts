import { prisma } from "@repo/database/client"
// import { getSubscription as getSubscriptionFromPolar } from "@repo/utils/subcription";

export async function getSubscription(_userId: string) {
	// const subscription = await prisma.subscription.findUnique({
	//   where: { userId },
	//   select: { subscriptionId: true },
	// });
	// if (!subscription) return null;
	// return getSubscriptionFromPolar(subscription.subscriptionId);
	return null
}

export async function getUserProfle(userId: string) {
	return prisma.user.findUniqueOrThrow({
		where: { id: userId },
		select: {
			id: true,
			name: true,
			email: true,
			isSubscribedToNewsletter: true,
			notificationSettings: true,
			image: { select: { fileKey: true } },
			password: { select: { userId: true } },
			_count: {
				select: {
					sessions: {
						where: {
							expirationDate: { gt: new Date() },
						},
					},
				},
			},
		},
	})
}

export async function getBookmarks(_userId: string) {
	return []
	// return prisma.bookmark.findMany({
	//   where: { userId },
	//   select: {
	//     id: true,
	//     notes: true,
	//     createdAt: true,
	//     content: {
	//       select: {
	//         id: true,
	//         type: true,
	//         views: true,
	//       },
	//     },
	//     bookmarkTags: {
	//       select: {
	//         tag: {
	//           select: {
	//             name: true,
	//             color: true,
	//           },
	//         },
	//       },
	//     },
	//   },
	//   orderBy: { createdAt: "desc" },
	// });
}

export async function getReports(_userId: string) {
	return []
	// return prisma.contentReport.findMany({
	//   where: { userId },
	//   select: {
	//     id: true,
	//     reason: true,
	//     details: true,
	//     status: true,
	//     createdAt: true,
	//     resolvedAt: true,
	//     content: {
	//       select: {
	//         id: true,
	//         type: true,
	//       },
	//     },
	//     comment: {
	//       select: {
	//         id: true,
	//         body: true,
	//       },
	//     },
	//   },
	//   orderBy: { createdAt: "desc" },
	// });
}
