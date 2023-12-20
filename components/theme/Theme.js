import { Icon_Global_Theme_Mode_Night, Icon_Global_Theme_Mode_Sun } from "/public/icon/iconGlobal";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

function Theme() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme("");

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className=" flex items-center border border-white/20 rounded-3xl p-1 ">
			<button className="theme-black w-full text-center">
				{theme === "light" ? (
					<i className=" block" onClick={() => setTheme("dark")}>
						<Icon_Global_Theme_Mode_Night />
					</i>
				) : (
					<i className=" block" onClick={() => setTheme("light")}>
						<Icon_Global_Theme_Mode_Sun />
					</i>
				)}
			</button>
		</div>
	);
}
export default Theme;
