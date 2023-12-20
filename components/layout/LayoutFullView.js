import { ContextData, ContextUpdate } from "/global/contextData";
import { useEffect, useState } from "react";

import MenuMobile from "/components/menu/MenuBottomMobile";
import { useRouter } from "next/router";

export default function LayoutFullView({ children }) {
	const router = useRouter();
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (window.performance) {
				if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
					console.log("LayoutFullView: Reload page !");
					ContextUpdate();
				}
			}

			if (typeof window.localStorage.loginInfo !== "undefined") {
				setIsLogin(true);
			} else {
				router.push("/auth");
			}
		} else {
			router.push("/auth");
		}
	}, []);

	return (
		<>
			{isLogin === true ? (
				<main className=" pb-[85px]">
					{children}
					<MenuMobile />
				</main>
			) : null}
		</>
	);
}
