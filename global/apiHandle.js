import { ContextData } from "./contextData";
import axios from "axios";
/**
 * @author sat.nguyen
 * @create 2021-07-27 09:25:45
 * @description Process communication between UI and Server
 */
import globalData from "./globalData";

export const api_post_method = async (params) => {
	var token = typeof ContextData.loginInfo !== "undefined" ? ContextData.loginInfo.accessToken : JSON.parse(window.localStorage.loginInfo).accessToken;
	let headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};

	var config = {
		url: params.path,
		method: "POST",
		headers: headers,
		data: params.data,
	};

	return await axios(config);
};

/**
 * @author sat.nguyen
 * @description Process event communication to server in in the POST method
 * @param {object} params []
 * @returns {object} []
 */
export const post_api = async (params) => {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	if (typeof params.token !== "undefined" && params.token === true) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.localStorage.loginInfo).accessToken}`;
	}

	return await axios({ method: "post", url: params.path, data: params.data });
};

/**
 * @author sat.nguyen
 * @description Process event communication to server in in the DELETE method
 * @param {object} params []
 * @returns {object} []
 */
export const delete_api = async (params) => {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	if (typeof params.token !== "undefined" && params.token === true) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.localStorage.loginInfo).accessToken}`;
	}

	return await axios({ method: "delete", url: params.path, data: params.data });
};

/**
 * @author sat.nguyen
 * @description Process event communication to server in in the PUT method
 * @param {object} params []
 * @returns {object} []
 */
export const put_api = async (params) => {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	if (typeof params.token !== "undefined" && params.token === true) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.localStorage.loginInfo).accessToken}`;
	}

	return await axios({ method: "put", url: params.path });
};

/**
 * @author sat.nguyen
 * @description Process event communication to server in in the GET method
 * @param {object} params []
 * @returns {object} []
 */
export const get_api = async (params) => {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	if (typeof params.token !== "undefined" && params.token === true) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.localStorage.loginInfo).accessToken}`;
	}

	return await axios({ method: "get", url: params.path });
};

/**
 * @author sat.nguyen
 * @description Process event refresh token
 * @returns {Objects}
 */
export const refresh_token = async () => {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.localStorage.loginInfo).refreshToken}`;

	return await axios({
		method: "post",
		url: globalData.api_channel.refreshToken,
		data: {
			refreshToken: JSON.parse(window.localStorage.loginInfo).refreshToken,
		},
	});
};

export const get_total_balance = async () => {
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(window.localStorage.loginInfo).accessToken}`;

	return await axios({
		method: "get",
		url: globalData.api_channel.getWallet,
	});
};
