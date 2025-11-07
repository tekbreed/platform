import { Link } from "react-router"

import { getImgSrc } from "@repo/utils/misc"

export function Logo() {
	return (
		<Link
			to={"/"}
			className="relative z-10 flex items-center gap-1 font-bold text-xl md:text-2xl"
		>
			<img
				src={getImgSrc({ fileKey: "tekbreedlogo.png" })}
				width={40}
				alt="TekBreed Icon"
			/>
			<img
				src={getImgSrc({ fileKey: "tekbreedtext.png" })}
				alt="TekBreed Logo"
				width={100}
				className="hidden md:block"
			/>
		</Link>
	)
}
