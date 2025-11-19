import { AuthButtons } from "./auth-buttons"
import { MainNav } from "./main-nav"

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-14 items-center px-8">
				<MainNav />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none"></div>
					<nav className="flex items-center">
						<AuthButtons />
					</nav>
				</div>
			</div>
		</header>
	)
}
