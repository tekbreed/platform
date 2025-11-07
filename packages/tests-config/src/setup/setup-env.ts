import "vitest-browser-react"

import { afterEach, beforeEach, vi } from "vitest"

afterEach(() => {
	vi.restoreAllMocks()
})

beforeEach(() => {
	vi.clearAllMocks()
})
