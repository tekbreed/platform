import { Link } from "react-router"

import { getImgSrc } from "@repo/utils/misc"

export function Logo() {
	return (
		<Link
			className="relative z-10 flex items-center gap-1 font-bold text-xl md:text-2xl"
			to={"/"}
		>
			<img
				alt="TekBreed Icon"
				src={getImgSrc({ fileKey: "tekbreedlogo.png" })}
				width={40}
			/>
			<img
				alt="TekBreed Logo"
				className="hidden md:block"
				src={getImgSrc({ fileKey: "tekbreedtext.png" })}
				width={100}
			/>
		</Link>
	)
}
