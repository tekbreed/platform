import { Link } from "react-router";

import { getImgSrc } from "@repo/utils/misc";
import { getModuleUrl } from "@repo/utils/constants/client";

export function Logo() {
  return (
    <Link
      to={getModuleUrl("web", "/")}
      className="relative z-10 flex items-center gap-1 text-xl font-bold md:text-2xl"
    >
      <img src={getImgSrc({ fileKey: "tekbreedlogo.png" })} width={40} />
      <img
        src={getImgSrc({ fileKey: "tekbreedtext.png" })}
        width={100}
        className="hidden md:block"
      />
    </Link>
  );
}
