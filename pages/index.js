import { ContextData, SaveDataToContext } from "/global/contextData";
import { get_api, get_total_balance, refresh_token } from "/global/apiHandle";
import { useEffect, useState } from "react";

import HomeScreen from "./nav/home";
import LayoutFullView from "/components/layout/LayoutFullView";
import globalData from "/global/globalData";

function Home() {
	useEffect(() => {
		getUserInfo();
		getGateway();

		// get_total_balance()
		// 	.then((res) => {
		// 		console.log("====================================index: get_total_balance");
		// 		console.log(res.data);
		// 		console.log("====================================");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		console.log("====================================index: get_total_balance");
		// 		console.log(err.response.data.status.message);
		// 		console.log("==================================== err");
		// 	});
	}, []);

	const getUserInfo = () => {
		var params = {
			path: globalData.api_channel.users + (typeof ContextData.loginInfo !== "undefined" ? ContextData.loginInfo.userId : JSON.parse(window.localStorage.loginInfo).userId),
			token: true,
		};

		get_api(params)
			.then((res) => {
				if (res.status.error) {
					// * Expired token
					if (res.status.code === 401) {
						refresh_token().then((response, error) => {
							if (error) {
								// TODO: Show popup refresh token failed
								alert("getUserInfo: Refresh token failed");
							} else {
								if (response.status.error) {
									// TODO: Show popup refresh token error
									alert("getUserInfo: Refresh token error");
								} else {
									getUserInfo();
								}
							}
						});
					} else {
						alert("getUserInfo: " + res.status.message);
						// TODO: Add popup get refresh token error
					}
				} else {
					console.log("==================================== Index: getUserInfo");
					console.log(res.data.data);
					console.log("====================================");

					SaveDataToContext("userInfo", res.data.data);
				}
			})
			.catch((err) => {
				console.log("==================================== getUserInfo");
				console.log(err.response.data.status.message);
				console.log("====================================");
			});
	};

	const getGateway = () => {
		var params = {
			path: globalData.api_channel.getGateway,
			token: true,
		};

		get_api(params)
			.then((res) => {
				if (res.status.error) {
					// * Expired token
					if (res.status.code === 401) {
						refresh_token().then((response, error) => {
							if (error) {
								// TODO: Show popup refresh token failed
								alert("Refresh token failed");
							} else {
								if (response.status.error) {
									// TODO: Show popup refresh token error
									alert("Index: Refresh token error");
								} else {
									getGateway();
								}
							}
						});
					} else {
						alert("getGateway: " + res.status.message);
						// TODO: Add popup get refresh token error
					}
				} else {
					console.log("==================================== getGateway");
					console.log(res.data);
					console.log("====================================");

					var arr = res.data.data;
					SaveDataToContext("gateWay", arr);
					arr.forEach((element, index) => {
						switch (element.type) {
							case "Point":
								SaveDataToContext("points", element.points);

								if (arr.length <= 2) {
									SaveDataToContext("defaultMethod", 0);
									SaveDataToContext("defaultCard", { index: 0, id: "wallet" });
								}
								break;
							case "Token":
								SaveDataToContext("token", element.points);
								break;
							default:
								if (typeof element.default !== "undefined" && element.default === true) {
									SaveDataToContext("defaultMethod", 0);
									SaveDataToContext("defaultCard", { index: index, id: element.cardId });
								}
								break;
						}
					});
				}
			})
			.catch((err) => {
				console.log("==================================== getGateway");
				console.log(err.response.data.status.message);
				console.log("====================================");
			});
	};

	return (
		<div>
			<HomeScreen />
		</div>
	);
}
Home.Layout = LayoutFullView;
export default Home;
