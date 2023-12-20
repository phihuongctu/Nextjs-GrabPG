import "../styles/globals.css";

import { ContextData, ContextUpdate } from "/global/contextData";

import Head from "next/head";
import LayoutFullView from "/components/layout/LayoutFullView";
import LayoutLogin from "/components/layout/LayoutLogin";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const Layout = Component.Layout || LayoutLogin || LayoutFullView;
	const [isLogin, setIsLogin] = useState(true);

	//* Support event detect reload page update Context data
	if (typeof window !== "undefined") {
		if (window.performance) {
			if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
				console.log("MyApp: Reload page !");
				ContextUpdate();
			}
		}

		// const data = window.localStorage.loginInfo;
		// if (typeof data !== "undefined") {
		// 	var loginInfo = JSON.parse(data);
		// 	if (typeof loginInfo.userId !== "undefined" || typeof loginInfo.accessToken !== "undefined" || typeof loginInfo.refreshToken !== "undefined") {
		// 		ContextData.loginInfo = {
		// 			userId: loginInfo.userId,
		// 			accessToken: loginInfo.accessToken,
		// 			refreshToken: loginInfo.refreshToken,
		// 		};
		// 		console.log("MyApp ------> 1");
		// 		setIsLogin(true);
		// 	} else {
		// 		console.log("MyApp ------> 2");
		// 	}
		// } else {
		// 	console.log("MyApp ------> 3");
		// 	//router.push("/auth");
		// }
	}
	console.log(pageProps);
	return (
		<ThemeProvider enableSystem={false} attribute="class">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
				<link rel="shortcut icon" href="#" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
