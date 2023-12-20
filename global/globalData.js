const HOST = "https://pg-api.teknix.vn/api/v1/";
const exportedObject = {
	api_channel: {
		login: HOST + "auth/login/",
		users: HOST + "users/",
		usersAll: HOST + "users/all/",
		register: HOST + "auth/register/",
		refreshToken: HOST + "auth/refresh-token/",
		updateUser: HOST + "user/profile/update/",
		card: HOST + "payment_methods/cards/",
		getWallet: HOST + "users/balance/",
		getPointServer: HOST + "services/point/",
		chargePoint: HOST + "payment_methods/charge/",
		updateLocation: HOST + "users/location/update/",
		paymentHistory: HOST + "payment_methods/history/",
		donate: HOST + "donations/",
		requestAll: HOST + "requests/",
		defaultCard: HOST + "payment_methods/cards/attach/",
		changePass: HOST + "auth/password/change/",
		service: HOST + "services/",
		getGateway: HOST + "payment_methods/",
	},
	order_status: {
		completed: "completed",
		hold: "on-hold",
		processing: "processing",
		pending: "pending",
		failed: "failed",
		cancelled: "cancelled",
	},
};
export default exportedObject;
