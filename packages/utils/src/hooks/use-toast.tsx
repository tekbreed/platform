import React from "react"

import { toast } from "sonner"

import type { Toast } from "@/toast.server"

export function useToast(toastSession?: Toast | null) {
	React.useEffect(() => {
		if (toastSession) {
			window.setTimeout(() => {
				toast[toastSession.type](toastSession.title, {
					id: toastSession.id,
					description: toastSession.description,
				})
			}, 0)
		}
	}, [toastSession])
}
