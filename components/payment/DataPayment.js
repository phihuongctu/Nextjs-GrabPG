import {
	Icon_Global_Momo,
	Icon_Global_Paypal,
	Icon_Global_Vietinbank,
	Icon_Payment_Billing_Method,
	Icon_Payment_Credit,
	Icon_Payment_Credit_Method,
	Icon_Payment_Download,
	Icon_Payment_History_Empty,
	Icon_Payment_Member,
	Icon_Payment_Not_Verified,
	Icon_Payment_Saving,
	Icon_Payment_Scan,
	Icon_Payment_Swap,
	Icon_Payment_Wallet_Add,
	Icon_Payment_Wallet_Method,
} from "/public/icon/iconGlobal";

import Mastercard from "/public/img/global-image_mastercard.png";
import Momo from "/public/img/global-image_momo.png";
import Paypal from "/public/img/global-image_paypal.png";
import Vietinbank from "/public/img/global-image_vietinbank.png";

// import Visa from "/public/img/global-image_visa.png";

export const dataStatus = [
	{
		status: "verification",
		// status: "no-verified",
	},
];

export const dataToolPayment = [
	{
		title: "payment_payment",
		icon: <Icon_Payment_Scan />,
		class: "payment",
		link: "/nav/payment/transaction",
	},
	{
		title: "payment_tranfers_moneny",
		icon: <Icon_Payment_Swap />,
		class: "transfers",
		link: "/nav/payment/transfer",
	},
	{
		title: "payment_recharges_money",
		icon: <Icon_Payment_Wallet_Add />,
		class: "recharge",
		link: "/nav/payment/deposit",
	},
	{
		title: "payment_receive_money",
		icon: <Icon_Payment_Download />,
		class: "receive",
		link: "/nav/payment/request",
	},
];

export const dataMethod = [
	{
		type: "wallet",
		hasChildren: true,
		children: [
			{
				name: "Wallet",
				value: "wallet",
				total: "2000000",
				currency: "VND",
				unit: "đ",
				point: "12300",
				status: null,
				data_status: "null",
				icon: Mastercard,
				urser_id: "tuyen123",
				user_name: "tranbichtuyen",
				full_name: "Trần Bích Tuyền",
				number_card: "1234567899979997",
				date_card: "2021-05-02T20:00:00",
				ccv: "123",
			},
		],
	},
	{
		type: "card",
		hasChildren: true,
		children: [
			{
				name: "payment_credit",
				type: "credit",
				value: "credit",
				status: null,
				data_status: "null",
				icon: Mastercard,
				user_id: "tuyen125",
				user_name: "tranbichtuyen",
				full_name: "Trần Bích Tuyền",
				number_card: "1234567899979997",
				date_card: "2021-05-02T20:00:00",
				ccv: "123",
			},
			{
				name: "Viettinbank",
				value: "viettinbank",
				status: null,
				data_status: "null",
				icon: Vietinbank,
				user_id: "tuyen125",
				user_name: "tranbichtuyen",
				full_name: "Trần Bích Tuyền",
				number_card: "1234567899979997",
				date_card: "2021-05-02T20:00:00",
				ccv: "123",
			},
			{
				name: "Momo",
				value: "momo",
				status: "payment_status_expired",
				data_status: "expired",
				icon: Momo,
				user_id: "tuyen127",
				user_name: "tranbichtuyen",
				full_name: "Trần Bích Tuyền",
				number_card: "1234567899979997",
				date_card: "2021-05-02T20:00:00",
				ccv: "123",
			},
			{
				name: "Paypal",
				value: "paypal",
				status: null,
				data_status: "null",
				icon: Paypal,
				user_id: "tuyen128",
				user_name: "tranbichtuyen",
				full_name: "Trần Bích Tuyền",
				number_card: "1234567899979997",
				date_card: "2021-05-02T20:00:00",
				ccv: "123",
			},
		],
	},
];

export const dataMembers = [
	{
		title: "payment_savings_package",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit.",
		label: "60k",
		date: "7",
		unit: "global_unit_day",
	},
	{
		title: "payment_savings_package",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit.",
		label: "80k",
		date: "8",
		unit: "global_unit_day",
	},
	{
		title: "payment_savings_package",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit.",
		label: "80k",
		date: "8",
		unit: "global_unit_day",
	},
	{
		title: "payment_savings_package",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit.",
		label: "80k",
		date: "8",
		unit: "global_unit_day",
	},
	{
		title: "payment_savings_package",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit.",
		label: "80k",
		date: "8",
		unit: "global_unit_day",
	},
];

export const dataSaving = [
	{
		title: "payment_non_term_accumulation",
		meta: "Gói tích lũy quen thuộc. Rút bất cứ khi nào. Bắt đầu chỉ với 500k.",
		label: "payment_interest",
		percent: "7%",
		unit: "global_unit_year",
	},
	{
		title: "payment_non_term_accumulation",
		meta: "Gói tích lũy quen thuộc. Rút bất cứ khi nào. Bắt đầu chỉ với 500k.",
		label: "payment_interest",
		percent: "17%",
		unit: "global_unit_year",
	},
];

export const dataEmpty = [
	{
		type: "not-verified",
		type_name: "payment_user_verification",
		icon: <Icon_Payment_Not_Verified />,
		heading: "payment_user_verification",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit  ",
		button: "payment_verify_now",
	},
	{
		type: "method",
		type_name: "payment_payment_methods",
		icon: <Icon_Payment_Credit_Method />,
		icon_2: <Icon_Payment_Billing_Method />,
		heading: "Heading",
		heading_sub: "payment_not_method_user",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit  ",
		button: "payment_add_method",
	},
	{
		type: "members",
		type_name: "payment_membership_package",
		icon: <Icon_Payment_Member />,
		heading: "Heading",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit  ",
		button: "payment_buy_now",
	},
	{
		type: "saving",
		type_name: "payment_savings_package",
		icon: <Icon_Payment_Saving />,
		heading: "Heading",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit  ",
		button: "payment_send_now",
	},
	{
		type: "history",
		type_name: "global_history",
		icon: <Icon_Payment_History_Empty />,
		heading: "payment_not_method_user",
		meta: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit suspendisse commodo.",
		button: "payment_experience_now",
	},
];

export const dataSortHistory = [
	{
		name: "global_all",
		value: "all",
		slug: "all",
		id: "all",
	},
	{
		name: "payment_recharges_money",
		value: "recharge",
		slug: "recharge",
		id: "recharge",
		hasChildren: true,
		children: [
			{
				name: "payment_shoot_tip",
				method: "payment_for",
				user: "Nguyễn Phương Anh",
				status: "payment_paid",
				total: "2000000",
				datetime: "2021-05-02T20:00:00",
				currency: "đ",
				slug: "recharge",
				id: "1234",
			},
			{
				name: "payment_recharges_money",
				method: "payment_for",
				user: "Nguyễn Phương Anh",
				status: "payment_paid",
				total: "2000000",
				currency: "đ",
				datetime: "2021-05-02T20:00:00",
				slug: "recharge",
				id: "1234",
			},
		],
	},
	{
		name: "payment_withdrawal_money",
		value: "withdrawal",
		slug: "withdrawal",
		id: "withdrawal",
		hasChildren: true,
		children: [
			{
				name: "payment_withdrawal_money",
				method: "payment_for",
				user: "Nguyễn Phương Anh",
				status: "payment_paid",
				total: "2000000",
				currency: "đ",
				datetime: "2021-05-02T20:00:00",
				slug: "withdrawal",
				id: "1234",
			},
			{
				name: "payment_refund_money",
				method: "payment_for",
				user: "Nguyễn Phương Anh",
				status: "payment_paid",
				total: "2000000",
				currency: "đ",
				datetime: "2021-05-02T20:00:00",
				slug: "withdrawal",
				id: "1234",
			},
		],
	},
	{
		name: "payment_refund_money",
		value: "refund",
		slug: "refund",
		id: "refund",
	},
];
