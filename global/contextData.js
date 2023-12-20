/**
 * @author Sat Nguyen
 * @create 2021-07-29 15:18:45
 * @description Process event shared data between component
 */

import React from "react";
export const ContextData = React.createContext();

/**
 * @author Sat.Nguyen
 * @create 02/08/2021
 * @description Process update data of ContextData when reload page
 */
export const ContextUpdate = () => {
	var localStorage = window.localStorage;
	var keyArr = Object.keys(localStorage);
	var valueArr = Object.values(localStorage);
	keyArr.forEach((item, index) => {
		switch (item) {
			case "loginInfo":
				ContextData.loginInfo = JSON.parse(valueArr[index]);
				break;
			case "userInfo":
				ContextData.userInfo = JSON.parse(valueArr[index]);
				break;
			case "listAllCard":
				ContextData.listAllCard = JSON.parse(valueArr[index]);
				break;
			case "pointServer":
				ContextData.pointServer = JSON.parse(valueArr[index]);
				break;
			case "totalBalance":
				ContextData.totalBalance = parseFloat(valueArr[index]);
				break;
			case "requestAll":
				ContextData.requestAll = JSON.parse(valueArr[index]);
				break;
			case "paymentHistory":
				ContextData.paymentHistory = JSON.parse(valueArr[index]);
				break;
			case "contactList":
				ContextData.contactList = JSON.parse(valueArr[index]);
				break;
			case "defaultCardSelected":
				ContextData.defaultCardSelected = valueArr[index];
				break;
			case "objectListFilter":
				ContextData.objectListFilter = JSON.parse(valueArr[index]);
				break;
			case "gateWay":
				ContextData.gateWay = JSON.parse(valueArr[index]);
				break;
			case "points":
				ContextData.points = parseFloat(valueArr[index]);
				break;
			case "token":
				ContextData.token = parseFloat(valueArr[index]);
				break;
			case "defaultMethod":
				ContextData.defaultMethod = parseFloat(valueArr[index]);
				break;
			case "defaultCard":
				ContextData.defaultCard = JSON.parse(valueArr[index]);
				break;
			case "userInfoTransfer":
				ContextData.userInfoTransfer = JSON.parse(valueArr[index]);
				break;
			case "profileData":
				ContextData.profileData = JSON.parse(valueArr[index]);
				break;
			default:
				break;
		}
	});
};

/**
 * @author Sat.Nguyen
 * @create 21/08/2021
 * @description Process save data to context and localStorage
 */
export const SaveDataToContext = (key, data) => {
	var value = "";
	if (Array.isArray(data) || typeof data === "object") {
		value = JSON.stringify(data);
	} else {
		value = data;
	}
	ContextData[key] = data;
	window.localStorage[key] = value;
};

export const GetTotalBalance = () => {};
