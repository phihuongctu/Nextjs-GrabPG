import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import * as Yup from "yup";

import { ContextData, ContextUpdate } from "/global/contextData";
import { Fragment, React, useEffect, useState } from "react";
import {
	Icon_Activity_Payment_ArrCarelRight,
	Icon_Activity_Payment_ArrLeft,
	Icon_Global_Arrow_Right,
	Icon_Global_Download,
	Icon_Global_Mastercard,
	Icon_Global_Search_White,
	Icon_Global_User_Info_Empty,
	Icon_Global_Vietinbank,
	Icon_Global_Visa,
	Icon_Payment_ArrSwap,
	Icon_Payment_ArrSwap_White,
	Icon_Payment_Bank,
	Icon_Payment_Card,
	Icon_Payment_Dot,
	Icon_Payment_Head_User,
	Icon_Payment_Inficator,
	Icon_Payment_Info,
	Icon_Payment_Money,
	Icon_Payment_Pen,
	Icon_Payment_Phone,
	Icon_Payment_Question,
	Icon_Payment_Transfer_Head,
	Icon_Payment_User,
	Icon_Payment_Wallet,
	Icon_Payment_Wallet_White,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { get_api, post_api, refresh_token } from "/global/apiHandle";

import LayoutFullView from "/components/layout/LayoutFullView";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import Moment from "moment";
import { NavTopTitleAction } from "/components/payment/LayoutPayment";
import NumberFormat from "react-number-format";
import globalData from "/global/globalData";
import i18n from "/global/language/i18n";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

var priceValue = 100000;
var msgValue = "";

function Transfer({ t }) {
	const router = useRouter();
	const { pageBack } = router.query;
	const [page, setPage] = useState(0); //* 0: Transfer method, 1: Transfer to user, 2: Transfer to bank, 3: Transfer to user detail, 4: Transfer to bank detail
	const [color, setGradient] = useState();
	const [name, setName] = useState("");
	const [checked, setChecked] = useState(false);
	const [verified, setVerified] = useState(false);
	const [points, setPoints] = useState(0);
	const [popupTitle, setPopupTitle] = useState("");
	const [contactList, setContactList] = useState([]);
	const [userIndex, setUserIndex] = useState(0);
	const [listCard, setListCard] = useState([]);
	const [userInfoSelected, setUserInfoSelected] = useState({});
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [feeTransaction, setFeeTransaction] = useState(0);
	const [token, setToken] = useState("");
	const [timeTransfer, setTimeTransfer] = useState("");
	const [popupBtnPath, setPopupBtnPath] = useState("");
	const [defaultMethod, setDefaultMethod] = useState(0);

	const dataBank = [
		{
			icon: <Icon_Global_Vietinbank />,
			name: "Vietinbank",
		},
		{
			icon: <Icon_Global_Vietinbank />,
			name: "Vietinbank",
		},
	];
	const dataGradient = [
		{
			id: 1,
			from: "purple",
			to: "green",
		},
		{
			id: 2,
			from: "green",
			to: "blue",
		},
		{
			id: 3,
			from: "orange",
			to: "yellow",
		},
		{
			id: 4,
			from: "purple",
			to: "yellow",
		},
		{
			id: 5,
			from: "yellow",
			to: "green",
		},
		{
			id: 6,
			from: "purple",
			to: "orange",
		},
		{
			id: 7,
			from: "yellow",
			to: "pink",
		},
		{
			id: 8,
			from: "orange",
			to: "green",
		},
	];
	const dataPrice = [
		{
			price: 50000,
		},
		{
			price: 100000,
		},
		{
			price: 150000,
		},
		{
			price: 200000,
		},
		{
			price: 250000,
		},
		{
			price: 500000,
		},
	];
	const dataUserBank = [
		{
			image: <Icon_Global_Vietinbank />,
			name: "TekNix Corp",
			stk: "**** 1234",
		},
		{
			image: <Icon_Global_Vietinbank />,
			name: "TekNix Corp",
			stk: "**** 1234",
		},
		{
			image: <Icon_Global_Vietinbank />,
			name: "TekNix Corp",
			stk: "**** 1234",
		},
		{
			image: <Icon_Global_Vietinbank />,
			name: "TekNix Corp",
			stk: "**** 1234",
		},
		{
			image: <Icon_Global_Vietinbank />,
			name: "TekNix Corp",
			stk: "**** 1234",
		},
	];

	useEffect(() => {
		setVerified(true);
		setPage(typeof pageBack !== "undefined" ? parseInt(pageBack) : 0);
		setToken(typeof ContextData.token !== "undefined" ? ContextData.token : window.localStorage.token);
		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : window.localStorage.points);
		setListCard(typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay));
		setDefaultMethod(typeof ContextData.defaultMethod !== "undefined" ? ContextData.defaultMethod : window.localStorage.defaultMethod);
		getContactAll();
	}, []);

	const getContactAll = () => {
		var params = {
			path: globalData.api_channel.usersAll,
			token: true,
		};

		get_api(params)
			.then((res) => {
				if (res.status.error) {
					// * Expired token
					if (res.status.code === 401) {
						refresh_token().then((response, error) => {
							if (error) {
								popupHandle(2, t("popup_error"), t("expired_token_err"), true);
							} else {
								if (response.status.error) {
									popupHandle(2, t("popup_error"), t("expired_token_err"), true);
								} else {
									getListCard();
								}
							}
						});
					} else {
						popupHandle(2, t("popup_error"), res.status.message, true);
					}
				} else {
					console.log("==================================== getContactAll");
					console.log(res.data);
					console.log("====================================");

					var data = res.data.data.users;
					ContextData.contactList = data;
					window.localStorage.setItem("contactList", JSON.stringify(data));
					setContactList(data);
				}
			})
			.catch((err) => {
				console.log("==================================== getHistory");
				console.log(err.response.data.status.message);
				console.log("====================================");
				popupHandle(2, t("popup_error"), err.response.data.status.message, true);
			});
	};

	const handleBankid = (e) => {
		setBankid(e.target.value);
	};

	const handleName = (e) => {
		setName(e.target.value);
	};

	const popupHandle = (type, title, content, isGoBack, isOnclick) => {
		setPopupStatus(type);
		setPopupTitle(title);
		setPopupContent(content);
		setBtnBack(isGoBack);
		setFlagPopup(!flagPopup);
		if (isOnclick) {
			setPopupBtnPath(isOnclick);
		}
	};

	const TitleGroup = ({ title, children, event }) => {
		return (
			<div className="title-group w-screen relative px-5 flex flex-row justify-between items-center flex-nowrap">
				<h2 className="title heading-Label">{title}</h2>
				<button className="option flex flex-row justify-between items-center flex-nowrap opacity-60" onClick={event}>
					<span className="btn-Caption-1  mr-2">{children}</span>
					<Icon_Global_Arrow_Right />
				</button>
			</div>
		);
	};

	const DefaultMethodModal = () => {
		const onChangeManage = () => {
			router.push({
				pathname: "/nav/payment/manage",
				query: {
					goBack: "/nav/payment/transfer",
					pageBack: page,
				},
			});
		};

		const onChangeMethod = () => {
			router.push({
				pathname: "/nav/payment/choose-method",
				query: {
					goBack: "/nav/payment/transfer",
					pageBack: page,
				},
			});
		};

		return (
			<div className="method w-full pt-8">
				<>
					<TitleGroup title={t("payment_payment_methods")} event={() => onChangeManage()}>
						{t("payment_manage")}
					</TitleGroup>
					{verified === true ? (
						<>
							<div className="method cursor-pointer pt-5 px-5">
								<div
									className="inner h-16  flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl px-3 py-2.5"
									onClick={() => onChangeMethod()}
								>
									{listCard.length > 2 ? (
										<>
											{typeof defaultMethod !== "undefined" && listCard.length >= defaultMethod ? (
												<>
													<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
														{listCard[defaultMethod].type === "MasterCard" ? (
															<Icon_Global_Mastercard />
														) : listCard[defaultMethod].type === "Visa" ? (
															<Icon_Global_Visa />
														) : (
															<Icon_Payment_Wallet />
														)}
													</div>
													<div className="relative flex-1 px-3">
														<span className="name text-primary_6 label-bold ">
															{listCard[defaultMethod].type === "Point" || listCard[defaultMethod].type === "Token"
																? listCard[defaultMethod].type
																: listCard[defaultMethod].type + " **** **** " + listCard[defaultMethod].cardLast4}
														</span>
														<p className="text-small text-gray_4">{t("global_default")}</p>
													</div>
													<button className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
														<Icon_Payment_ArrSwap />
														<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
													</button>
												</>
											) : (
												<div className="method pt-5 px-5">
													<div className="method inner h-16  flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl py-2.5 px-5">
														<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
															<Icon_Payment_Wallet />
														</div>
														<div className="relative flex-1 px-3">
															<span className="name text-primary_6 label-bold">{listCard[defaultMethod].type}</span>
															<p className="text-small text-gray_4">{t("global_default")}</p>
														</div>
														<div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
															<Icon_Payment_ArrSwap />
															<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
														</div>
													</div>
												</div>
											)}
										</>
									) : (
										<>
											<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
												<Icon_Payment_Wallet />
											</div>
											<div className="relative flex-1 px-3">
												<span className="name text-primary_6 label-bold">{listCard[defaultMethod].type}</span>
												<p className="text-small text-gray_4">{t("global_default")}</p>
											</div>
											<div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
												<Icon_Payment_ArrSwap />
												<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
											</div>
										</>
									)}
								</div>
							</div>
						</>
					) : (
						<div className="method pt-5 px-5">
							<div className="method inner h-16  flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl py-2.5 px-5">
								<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
									<Icon_Payment_Wallet />
								</div>
								<div className="relative flex-1 px-3">
									<span className="name text-primary_6 label-bold">{listCard[defaultMethod].type}</span>
									<p className="text-small text-gray_4">{t("global_default")}</p>
								</div>
								<div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
									<Icon_Payment_ArrSwap />
									<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
								</div>
							</div>
						</div>
					)}
				</>
			</div>
		);
	};

	const TransferModal = () => {
		return (
			<div className="bg-white w-full pb-4 text-gray_4">
				<NavTopTitleAction Title={t("payment_transfer_money")} Back={() => router.back()}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Payment_Question />
					</button>
				</NavTopTitleAction>
				<div className="w-full flex justify-center items-center pb-4 pt-28">
					<Icon_Payment_Transfer_Head />
				</div>
				<div className="px-5">
					<div
						className="flex justify-between cursor-pointer items-center mt-4 border-b border-gray_11"
						onClick={() => {
							setPage(1);
						}}
					>
						<div className="p-2 flex w-10 h-10 min-w-max justify-center items-center bg-gray_12 rounded-full ">
							<Icon_Payment_Wallet />
						</div>
						<div className="py-4 grid w-full ml-4">
							<span className="text-1 leading-15 tracking-2 font-semibold">{t("payment_send")}</span>
							<span className="text-4 leading-14 tracking-6 opacity-60"> {t("payment_free_safe_convenient")} </span>
						</div>
						<div className="mx-3.5">
							<Icon_Global_Arrow_Right />
						</div>
					</div>
					<div
						className="flex  cursor-pointer  justify-between items-center mt-4"
						// onClick={() => {
						// 	setPage(5);
						// }}
					>
						<div className="p-2 flex w-10 h-10 min-w-max justify-center items-center bg-gray_12 rounded-full ">
							<Icon_Payment_Bank />
						</div>
						<div className="py-4 grid w-full ml-4">
							<span className="text-1 leading-15 tracking-2 font-semibold"> {t("deposit_bank_transfer_withdraw")} </span>
							<span className="text-4 leading-14 tracking-6 opacity-60">{t("deposit_bank_45")} </span>
						</div>
						<div className="mx-3.5">
							<Icon_Global_Arrow_Right />
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5">{t("deposit_recent_contact")}</h2>
					{/* <Swiper slidesPerView={"4"} className="mySwiper" loop={true}>
						{dataUser.map(function (item, index) {
							return (
								<SwiperSlide className="ml-3 text-center  cursor-pointer " key={index}>
									<div
										onClick={() => {
											setPage(2);
										}}
									>
										<div className="grid justify-center items-center pb-3">
											{item.avatar === "name" ? (
												<div className=" w-12 h-12 bg-orange_9 text-orange_3 rounded-full p-2 text-2 leading-16 tracking-8 font-semibold flex justify-center items-center relative">
													<span className="absolute top-0 right-0">
														<Icon_Payment_Dot />
													</span>
													DK
												</div>
											) : item.avatar === "image" ? (
												<div className="rounded-full grid place-items-center bg-primary_8 w-12 h-12 relative">
													<Icon_Payment_User />
													<div className="absolute right-0 top-0  z-10">
														<Icon_Payment_Dot />
													</div>
												</div>
											) : (
												<div className="rounded-full  w-12 h-12 bg-primary_8 flex justify-center items-center relative ">
													<Icon_Global_User_Info_Empty />
													<div className="absolute z-10 right-0 top-0 ">
														<Icon_Payment_Dot />
													</div>
												</div>
											)}
										</div>
										<span className="text-3 font-semibold leading-14 tracking-6">{item.name}</span>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper> */}
				</div>
			</div>
		);
	};

	const TransferToIUserModal = () => {
		return (
			<div className="bg-white w-full pb-5 text-gray_4">
				<NavTopTitleAction Title={t("transfer_contacts")} Back={() => setPage(0)}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Payment_Head_User />
					</button>
				</NavTopTitleAction>
				<div className=" bg-primary_6 w-full text-center  pt-17 p-5">
					<div className="flex flex-nowrap h-12 bg-white-12 border-solid border-search border-opacity-50 border bg-opacity-30 rounded-xl p-3 px-4">
						<Icon_Global_Search_White />
						<input
							type="text"
							placeholder={t("transfer_enter_name_number_phone")}
							className="w-full ml-4 text-white outline-none text-5 leading-4 tracking-6 bg-white bg-opacity-0 placeholder-white"
						></input>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5 mt-8">{t("deposit_recent_contact")}</h2>
					{/* <Swiper slidesPerView={"4"} className="mySwiper" loop={true}>
						{dataUser.map(function (item, index) {
							return (
								<SwiperSlide className="ml-3 text-center cursor-pointer" key={index}>
									<div
										onClick={() => {
											setPage(2);
										}}
									>
										<div className="grid justify-center items-center pb-3">
											{item.avatar === "name" ? (
												<div className=" w-12 h-12 bg-orange_9 text-orange_3 rounded-full p-2 text-2 leading-16 tracking-8 font-semibold flex justify-center items-center relative">
													<div className="absolute right-0 top-0 z-10">
														<Icon_Payment_Dot />
													</div>{" "}
													DK
												</div>
											) : item.avatar === "image" ? (
												<div className="rounded-full w-12 h-12 relative">
													<Icon_Global_User_Info_Empty />
													<div className="absolute right-0 top-0  z-10">
														<Icon_Payment_Dot />
													</div>
												</div>
											) : (
												<div className="rounded-full  w-12 h-12 bg-primary_8 flex justify-center items-center relative ">
													<Icon_Payment_User />
													<div className="absolute z-10 right-0 top-0 ">
														<Icon_Payment_Dot />
													</div>
												</div>
											)}
										</div>
										<span className="text-3 font-semibold leading-14 tracking-6">{item.name}</span>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper> */}
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5 mt-8">{t("transfer_contacts")}</h2>
					<div>
						{contactList.length > 0 ? (
							<>
								{contactList.map(function (item, index) {
									return (
										<div
											className="flex cursor-pointer justify-between items-center border-b border-gray_11 border-solid "
											onClick={() => {
												setPage(2);
												setUserIndex(index);
												var info = contactList[index];
												setUserInfoSelected(info);
												ContextData.userInfoTransfer = info;
												window.localStorage.userInfoTransfer = JSON.stringify(info);
											}}
										>
											<div className="grid justify-center items-center py-3">
												<div className="rounded-full w-12 h-12 relative">
													<Icon_Global_User_Info_Empty />
												</div>
											</div>
											<div className="w-full ml-4 my-4 text-gray_4 grid items-center">
												<span className="text-1 truncate font-semibold leading-15 tracking-2 mb-1">{item.display_name}</span>
												<span className="text-3 leading-14 tracking-6 opacity-60">{item.id}</span>
											</div>
										</div>
									);
								})}
							</>
						) : null}
					</div>
				</div>
			</div>
		);
	};

	const TransferToUserDetailModal = () => {
		const frmTransfer = useFormik({
			initialValues: {
				price: priceValue,
				message: "",
			},
			validationSchema: Yup.object({
				price: Yup.number()
					.min(50000, t("payment_transfer_ruler") + points.toLocaleString().split(",").join("."))
					.max(99000000, t("payment_transfer_ruler") + points.toLocaleString().split(",").join("."))
					.required(t("please_input_data")),
				message: Yup.string().max(11, t("maximum_100_characters")),
			}),
			onSubmit: (values) => {
				priceValue = values.price;
				msgValue = values.message;
				if (values.price > points) {
					popupHandle(2, t("popup_error"), t("payment_transfer_not_enough_money"), true, "/nav/payment/deposit");
				} else {
					setPage(3);
				}
			},
		});

		return (
			<div className="bg-white">
				<NavTopTitleAction Title={t("payment_send")} Back={() => setPage(1)}>
					<div className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap">
						{verified === true ? (
							<Fragment>
								<Icon_Payment_Wallet_White />
								<div className="total text-Large ml-2">
									<NumberFormat value={points} displayType={"text"} thousandSeparator="." decimalSeparator="," />
									<span className="text-white">{t("global_point")}</span>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<Icon_Payment_Wallet_White />
								<div className="total text-Large ml-2">
									<NumberFormat value="0" displayType={"text"} thousandSeparator="." decimalSeparator="," />
									<span className="text-white">{t("global_point")}</span>
								</div>
							</Fragment>
						)}
					</div>
				</NavTopTitleAction>
				<div className="flex justify-between items-center pt-17 px-5">
					<div className="grid justify-center items-center py-3">
						<div className="rounded-full w-12 h-12 flex justify-center items-center relative">
							<Icon_Global_User_Info_Empty />
						</div>
					</div>
					<div className="w-full p-4 text-gray_4 grid items-center">
						<span className="text-1 truncate font-semibold leading-15 tracking-2 mb-1">{userInfoSelected.display_name}</span>
						<span className="text-3 leading-14 tracking-6 opacity-60">{userInfoSelected.id}</span>
					</div>
					<button
						className="flex items-center min-w-max bg-primary_6 px-3 rounded-xl"
						onClick={() => {
							setPage(1);
						}}
					>
						<Icon_Payment_ArrSwap_White />
						<span className="p-2 text-3 leading-14 tracking-7 text-white">{t("global_choose")}</span>
					</button>
				</div>
				<form onSubmit={frmTransfer.handleSubmit}>
					<div
						className={`h-150-68-85 flex flex-col justify-between bg-gradient-to-r px-5
                    ${
						color === 2
							? "from-green to-blue"
							: color === 3
							? "from-orange_3 to-yellow_3"
							: color === 4
							? "from-purple to-yellow_3"
							: color === 5
							? "from-yellow_3 to-green"
							: color === 6
							? "from-purple to-orange_3"
							: color === 7
							? "from-yellow_3 to-pink"
							: color === 8
							? "from-orange_3 to-green"
							: "from-purple to-green"
					}
                `}
					>
						<div className="w-full">
							{/* <div className="w-full border-solid border-b-1 pt-10 pb-2">
								<NumberFormat
									value={frmTransfer.values.price}
									onValueChange={frmTransfer.handleChange}
									name="price"
									type="number"
									thousandSeparator="."
									decimalSeparator=","
									className={` ${
										frmTransfer.errors.price ? "border-red_6" : "border-white"
									}  w-full text-6 leading-19 font-bold ml-2 text-white bg-white outline-none bg-opacity-0`}
								/>
							</div> */}

							<input
								value={frmTransfer.values.price}
								onChange={frmTransfer.handleChange}
								type="number"
								name="price"
								className={` ${
									frmTransfer.errors.price ? "border-red_6" : "border-white"
								}  w-full border-solid border-b-1 placeholder-white pt-10 pb-2 text-6 leading-19 font-bold ml-2 text-white bg-white outline-none bg-opacity-0`}
								placeholder={t("transfer_enter_money")}
							></input>

							{frmTransfer.errors.price && frmTransfer.touched.price && (
								<p className="text-body-small px-2 pt-1 text-red_6">{frmTransfer.errors.price}</p>
							)}
							<div>
								<input
									value={frmTransfer.values.message}
									onChange={frmTransfer.handleChange}
									type="text"
									name="message"
									className={` ${
										frmTransfer.errors.message ? "border-red_6" : "border-white"
									}  w-full border-solid border-b-1 pt-10 pb-2 grid font-semibold text-5 leading-4 placeholder-white text-white tracking-7 bg-white bg-opacity-0 ml-2 outline-none`}
									placeholder={t("transfer_enter_message")}
								></input>
							</div>
							{frmTransfer.errors.message && frmTransfer.touched.message && (
								<p className="text-body-small px-2 pt-1 text-red_6">{frmTransfer.errors.message}</p>
							)}
						</div>
						<div className="  w-full max-h-full relative pb-5">
							<Swiper slidesPerView={"8"} className="mySwiper flex justify-between" loop={true}>
								{dataGradient.map(function (item, index) {
									const changeColor = () => setGradient(item.id);
									return (
										<SwiperSlide className="pr-3  w-9" key={index} onClick={changeColor}>
											<div
												className={`w-9 h-9 m-0 border-2 border-solid border-white rounded-xl bg-gradient-to-r
                                     ${
											item.from === "purple"
												? "from-purple"
												: item.from === "blue"
												? "from-blue"
												: item.from === "green"
												? "from-green"
												: item.from === "orange"
												? " from-orange_3"
												: item.from === "yellow"
												? " from-yellow_3"
												: item.from === "pink"
												? " from-pink"
												: item.from === "black"
												? "from-black"
												: "from-white"
										}
                                     ${
											item.to === "purple"
												? "to-purple"
												: item.to === "blue"
												? "to-blue"
												: item.to === "green"
												? "to-green"
												: item.to === "orange"
												? " to-orange_3"
												: item.to === "yellow"
												? " to-yellow_3"
												: item.to === "pink"
												? " to-pink"
												: item.to === "black"
												? "to-black"
												: "to-white"
										}`}
											></div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					</div>
					<div className="fixed bottom-0 min-w-max inset-x-0 z-10 pb-24 lg:pb-4  bg-white p-3.5">
						<div className="flex">
							<button onClick={() => setPage(1)} className="p-3.5 rounded-xl bg-gray-200 mr-4 flex justify-center">
								<Icon_Activity_Payment_ArrLeft />
							</button>
							<button
								type="submit"
								className="p-3.5 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full"
							>
								{t("payment_transfer_money")}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	};

	const TransferToUserCheckOutModal = () => {
		const onClickTransfer = () => {
			var params = {
				path: globalData.api_channel.donate,
				token: true,
				data: {
					amount: priceValue,
					recipient_id: typeof userInfoSelected.id !== "undefined" ? userInfoSelected.id : ContextData.userInfoTransfer.id,
				},
			};

			post_api(params)
				.then((res) => {
					if (res.status.error) {
						// * Expired token
						if (res.status.code === 401) {
							refresh_token().then((response, error) => {
								if (error) {
									popupHandle(2, t("popup_error"), t("expired_token_err"), true);
								} else {
									if (response.status.error) {
										popupHandle(2, t("popup_error"), t("expired_token_err"), true);
									} else {
										onClickTransfer();
									}
								}
							});
						} else {
							popupHandle(2, t("popup_error"), res.status.message, true);
						}
					} else {
						var amount = parseFloat(points) - parseFloat(priceValue);

						console.log("==================================== onClickTransfer");
						console.log(priceValue);
						console.log("==================================== success");
						console.log(points);

						ContextData.points = amount;
						window.localStorage.setItem("points", amount);
						popupHandle(0, t("popup_success"), t("payment_transfer_success"), false, "/nav/payment");
					}
				})
				.catch((err) => {
					console.log("==================================== onClickTransfer");
					console.log(err);
					console.log("==================================== err");
					popupHandle(2, t("popup_error"), err.response.data.status.message, true);
				});
		};

		return (
			<div className="bg-white w-full pb-24 text-gray_4">
				<NavTopTitleAction Title={t("payment_confirm_transaction")} Back={() => setPage(2)}></NavTopTitleAction>
				<div className=" pt-17">
					<DefaultMethodModal />
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-2 font-semibold my-5 mt-8">{t("activity_summary")}</h2>
					<div className=" tracking-2 text-gray_4 leading-15">
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_amount_money")}</span>
							<span>
								<NumberFormat value={priceValue} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>
						<div className="text-1 flex justify-between pb-5 border-b border-gray_11 border-solid">
							<span className="opacity-60">{t("payment_transaction_fee")}</span>
							<span>0</span>
						</div>
						<div className="flex justify-between items-center pt-5">
							<span className="font-semibold text-1 tracking-9 opacity-60">{t("payment_into_money")}</span>
							<span className="font-semibold  text-7 leading-21 tracking-10  text-primary_6">
								<NumberFormat value={priceValue} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold mt-8">{t("transfer_recipient_info")}</h2>
					<div className="flex justify-between items-center pt-6">
						<div className="w-full text-gray_4 grid items-center">
							<span className="text-1 truncate font-semibold leading-15 tracking-2 mb-1">{userInfoSelected.display_name}</span>
							<span className="text-3 leading-14 tracking-6 opacity-60">{userInfoSelected.id}</span>
						</div>
						<div className="flex items-center">
							<div className=" w-12 h-12 bg-orange_9 text-orange_3 rounded-full p-2 text-2 leading-16 tracking-8 font-semibold flex justify-center items-center relative">
								<Icon_Global_User_Info_Empty />
							</div>
						</div>
					</div>
				</div>
				{msgValue !== "" ? (
					<div className="px-5">
						<h2 className="text-2 leading-16 tracking-8 font-semibold mb-4 mt-8">{t("transfer_message")}</h2>
						<span className="text-5 leading-18 tracking-3 ">
							<input disabled type="text" value={msgValue} class="w-full text-1 leading-19 text-gray-600 bg-white outline-none bg-opacity-0 " />
						</span>
					</div>
				) : null}
				<div className="fixed bottom-0 inset-x-0 z-10 pb-24 lg:pb-4 bg-white p-4">
					<div className="flex">
						<button
							className="p-3.5 rounded-xl bg-gray-200 mr-4 flex justify-center"
							onClick={() => {
								setPage(2);
							}}
						>
							<Icon_Activity_Payment_ArrLeft />
						</button>
						<button
							className="p-3.5 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full"
							onClick={() => {
								setPage(4);
								onClickTransfer();
								setTimeTransfer(Moment().format("DD-MM-YYYY HH:mm"));
							}}
						>
							{t("payment_confirm")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const TransferToUserHistoryModal = () => {
		return (
			<div className="bg-white w-full pb-24 text-gray_4">
				<NavTopTitleAction Title={t("transfer_recipient_info")} Back={() => setPage(3)}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Global_Download />
					</button>
				</NavTopTitleAction>
				<div className="pt-17">
					<DefaultMethodModal />
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-2 font-semibold my-5 mt-8">{t("activity_summary")}</h2>
					<div className="tracking-2 text-gray_4 leading-15">
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_trading_code")}</span>
							<span>123456789</span>
						</div>
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("activity_times")}</span>
							<span>{timeTransfer}</span>
						</div>
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_amount_money")}</span>
							<span>
								<NumberFormat value={priceValue} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>
						<div className="text-1 flex justify-between pb-5 border-b border-gray_11 border-solid">
							<span className="opacity-60">{t("payment_transaction_fee")}</span>
							<span>{feeTransaction}</span>
						</div>
						<div className="flex justify-between items-center pt-5">
							<span className="font-semibold text-1 tracking-9 opacity-60">{t("payment_into_money")}</span>
							<span className="font-semibold  text-7 leading-21 tracking-10  text-primary_6">
								<NumberFormat value={priceValue} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold mt-8">{t("transfer_recipient_info")}</h2>
					<div className="flex justify-between items-center pt-6">
						<div className="w-full text-gray_4 grid items-center">
							<span className="text-1 truncate font-semibold leading-15 tracking-2 mb-1">{userInfoSelected.display_name}</span>
							<span className="text-3 leading-14 tracking-6 opacity-60">{userInfoSelected.id}</span>
						</div>
						<div className="flex items-center">
							<div className=" w-12 h-12 bg-orange_9 text-orange_3 rounded-full p-2 text-2 leading-16 tracking-8 font-semibold flex justify-center items-center relative">
								DK
							</div>{" "}
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5 mt-8">{t("activity_message")}</h2>
					<span className="text-5 leading-18 tracking-3 mb-8">
						<input
							type="text"
							disabled
							placeholder={t("transfer_message")}
							value={msgValue}
							class="w-full text-1 leading-19 text-gray-600 bg-white outline-none bg-opacity-0 "
						/>
					</span>
				</div>
				<div className="fixed bottom-0 inset-x-0 z-10 pb-24 lg:pb-4 bg-white p-4">
					<div className="flex">
						<button
							className="p-3.5 rounded-xl bg-gray-200 mr-4 flex justify-center"
							onClick={() => {
								setPage(3);
							}}
						>
							<Icon_Activity_Payment_ArrLeft />
						</button>
						<button
							className="p-3.5 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full"
							onClick={() => {
								setPage(2);
							}}
						>
							{t("payment_confirm")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const TransferToBankModal = () => {
		return (
			<div className="bg-white w-full pb-4 text-gray_4">
				<NavTopTitleAction Title={t("transfer_list_bank")} Back={() => router.back()}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Payment_Question />
					</button>
				</NavTopTitleAction>
				<div className=" bg-primary_6 w-full text-center pt-17 p-5">
					<div className="flex flex-nowrap h-12 bg-white-12 border-solid border-search border-opacity-50 border bg-opacity-30 rounded-xl p-3 px-4">
						<Icon_Global_Search_White />
						<input
							type="text"
							placeholder={t("transfer_input_bank_name")}
							className="w-full ml-4 outline-none text-5 leading-4 tracking-6 bg-white bg-opacity-0 placeholder-white"
						></input>
					</div>
				</div>
				<div>
					{dataBank.map(function (item, index) {
						return (
							<div
								key={index}
								className="flex justify-between mx-5 py-3.5 border-b border-gray_11 border-solid items-center"
								onClick={() => {
									setPage(6);
								}}
							>
								<div className="p-2 mr-4 bg-gray_12 min-w-max flex items-center rounded-full">{item.icon}</div>
								<div className="grid text-left w-full">
									<span className="text-1 leading-15 font-semibold tracking-2">{item.name}</span>
								</div>
								<div className="min-w-max flex items-center">
									<Icon_Activity_Payment_ArrCarelRight />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	const TransferToBankDetailModal = () => {
		const [price, setPrice] = useState(0);
		const [message, setMessage] = useState("");
		ContextData.price = price;
		ContextData.message = message;

		const handleMessage = (e) => {
			debugger;
			setMessage(e.target.value);
		};

		const handlePrice = (e) => {
			setPrice(e.floatValue);
		};

		return (
			<div className="bg-white w-full text-gray_4 overflow-y-auto">
				<NavTopTitleAction Title={t("transfer_transfer_withdraw")} Back={() => router.back()}>
					<div
						className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap"
						onClick={() => router.push("/nav/payment")}
					>
						{verified === true ? (
							<Fragment>
								<Icon_Payment_Wallet_White />
								<div className="total text-Large ml-2">
									<NumberFormat value={points} displayType={"text"} thousandSeparator="." decimalSeparator="," />
									<span className="text-white"> {t("global_point")}</span>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<Icon_Payment_Wallet_White />
								<div className="total text-Large ml-2">
									<NumberFormat value={0} displayType={"text"} thousandSeparator="." decimalSeparator="," />
									<span className="text-white"> {t("global_point")}</span>
								</div>
							</Fragment>
						)}
					</div>
				</NavTopTitleAction>
				{/* <div className="flex justify-between items-center pt-17 px-5 border-b">
					<div className="flex items-center">
						<div className=" w-12 h-12 bg-gray_12 rounded-full p-2 text-2 leading-16 tracking-8 font-semibold flex justify-center items-center relative">
							<Icon_Global_Vietinbank />
						</div>
					</div>
					<div className="w-full ml-4 text-gray_4 grid items-center">
						<span className="text-1 font-semibold leading-15 tracking-2 mb-1">Vietinbank</span>
					</div>
					<div className="py-5">
						<button
							className="flex items-center min-w-max bg-primary_6 px-3 rounded-xl"
							onClick={() => {
								setPage(5);
							}}
						>
							<Icon_Payment_ArrSwap_White />
							<span className="py-2.5 mx-2 text-3 leading-14 tracking-7 text-white">{t("global_choose")}</span>
						</button>
					</div>
				</div> */}
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5 mt-8">{t("deposit_recent_contact")}</h2>
					<Swiper slidesPerView={"4"} className="mySwiper" loop={true}>
						{dataUserBank.map(function (item, index) {
							return (
								<SwiperSlide className=" text-center" key={index}>
									<div className="grid justify-center items-center pb-3">
										<div className="bg-gray_12 rounded-full w-12 h-12 flex justify-center items-center">{item.image}</div>
									</div>
									<div className="grid">
										<span className="text-3 font-semibold leading-14 tracking-6 pb-1">{item.name}</span>
										<span className=" text-4 leading-14 tracking-6 opacity-60">{item.stk}</span>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<div className="pt-8 pb-28">
					<div className="flex justify-between items-center border-b mx-5">
						<div className="grid">
							<span className="text-gray_8 text-5 leading-18 tracking-3 pt-2 pl-2">{t("payment_amount_money_withdraw")}</span>
							<NumberFormat
								value={price}
								onValueChange={handlePrice}
								thousandSeparator="."
								decimalSeparator=","
								className="w-full text-6 leading-19 font-bold ml-2 border-gray_11 bg-white outline-none bg-opacity-0 "
							/>
						</div>
						<div className="mx-5">
							<Icon_Payment_Money />
						</div>
					</div>
					<div className="p-5 pb-3 flex text-left">
						<Swiper slidesPerView={"4"}>
							{dataPrice.map(function (item, index) {
								const changePrice = () => setPrice(item.price);
								return (
									<SwiperSlide key={index}>
										<div
											className={`border w-min rounded-xl text-5 leading-4 tracking-7 font-bold border-gray_11 px-3 py-2 mr-3  text-center
                                        hover:text-primary_6 hover:border-primary_8 hover:bg-primary_12
                                        ${price === item.price ? "text-primary_6 border-primary_8 bg-primary_12" : ""}
                                        `}
											onClick={changePrice}
										>
											{item.price}
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
					<div className="flex justify-between items-center border-b mx-5">
						<div className="grid">
							<span className="text-gray_8 text-5 leading-18 tracking-3 pt-2 pl-2">{t("transfer_numbercard_acc")}</span>
							<input
								type="text"
								className="text-gray_2 text-5 leading-4 tracking-7 font-semibold pl-2 pb-2 bg-white bg-opacity-0 outline-none"
								defaultValue="0909090909"
								onChange={handleBankid}
							></input>
						</div>
						<div className="mx-5">
							<Icon_Payment_Card />
						</div>
					</div>
					<div className="flex justify-between items-center border-b mx-5">
						<div className="grid">
							<span className="text-gray_8 text-5 leading-18 tracking-3 pt-2 pl-2">{t("transfer_recipient_name")}</span>
							<input
								className="text-gray_2 text-5 leading-4 tracking-7 font-semibold pl-2 pb-2 bg-white bg-opacity-0 outline-none"
								defaultValue="TU PHI HUONG"
								onChange={handleName}
							></input>
						</div>
						<div className="mx-5">
							<Icon_Payment_Phone />
						</div>
					</div>
					<div className="flex justify-between items-center border-b mx-5">
						<div className="grid">
							<span className="text-gray_8 text-5 leading-18 tracking-3 pt-2 pl-2">{t("transfer_message")}</span>
							<input
								className="text-gray_2 text-5 leading-4 tracking-7 font-semibold pl-2 pb-2 bg-white bg-opacity-0 outline-none"
								defaultValue="Tra tien com trua"
								onChange={handleMessage}
							></input>
						</div>
						<div className="mx-5">
							<Icon_Payment_Pen />
						</div>
					</div>
					<div className="py-8 flex justify-between items-center px-5">
						<span className="text-1 leading-15 tracking-2 font-semibold">{t("transfer_recipient_info_save")}</span>
						<div
							className={`w-12 h-6 p-0.5 bg-primary_6 rounded-full ml-5 flex items-center justify-between ${
								checked === false ? " bg-gray_11" : ""
							}`}
							onClick={() => setChecked(!checked)}
						>
							<div className={`w-5 h-5 bg-white rounded-full ${checked === false ? "visible" : "invisible"}`}></div>
							<div className={`w-5 h-5 bg-white rounded-full ${checked === true ? "visible" : "invisible"}`}></div>
						</div>
					</div>
					<div className="flex justify-between items-center mx-5 py-4 bg-gray_12 rounded-2xl">
						<div>
							<Icon_Payment_Inficator />
						</div>
						<div className=" px-4.5">
							<Icon_Payment_Info />
						</div>
						<span className=" text-3 leading-14 tracking-6 opacity-60 flex flex-wrap w-full ">
							Dịch vụ thu hộ chi hộ do GrabPG hỗ trợ các Ngân hàng đối các cung cấp
						</span>
					</div>
				</div>

				<div className="fixed bottom-0 w-full inset-x-0 z-10 pb-24 mb-1 lg:pb-4  bg-white p-4">
					<div className="flex">
						<button
							onClick={() => {
								router.back();
							}}
							className="p-3.5 rounded-xl bg-gray-200 mr-4 flex justify-center"
						>
							<Icon_Activity_Payment_ArrLeft />
						</button>

						<button
							className="p-3.5 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full"
							onClick={() => {
								setPage(7);
							}}
						>
							{t("transfer_conecting")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const TransferToBankCheckOutModal = () => {
		return (
			<div className="bg-white w-full h-screen text-gray_4">
				<NavTopTitleAction Title={t("payment_confirm_transaction")} Back={() => router.back()}></NavTopTitleAction>
				<div className="px-5 pt-17">
					<h2 className="text-2 leading-16 tracking-8 font-semibold mb-5 pt-8">{t("payment_payment_methods")}</h2>
					<div
						className="flex justify-between items-center mt-4 border rounded-xl border-gray_11 pl-3 py-2.5 h-15 "
						onClick={() => {
							setPage(0);
						}}
					>
						<div className="p-2 flex w-10 h-10 min-w-max justify-center items-center bg-gray_12 rounded-full ">
							<Icon_Payment_Wallet />
						</div>
						<div className="grid w-full rounded-full ml-3">
							<span className="text-1 leading-15 tracking-2 font-semibold">{t("transfer_e_wallet")}</span>
						</div>
						<div className="mx-3.5 flex items-center">
							<Icon_Global_Arrow_Right />
						</div>
					</div>
				</div>
				<div className="px-5 ">
					<h2 className="text-2 leading-16 tracking-2 font-semibold my-5 mt-8">{t("activity_summary")}</h2>
					<div className=" tracking-2 text-gray_4 leading-15">
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_amount_money")}</span>
							<span>4 {t("global_unit_hour")}</span>
						</div>
						<div className="text-1 flex justify-between pb-5 border-b border-gray_11 border-solid">
							<span className="opacity-60">{t("payment_transaction_fee")}</span>
							<span>0</span>
						</div>
						<div className="flex justify-between items-center pt-5">
							<span className="font-semibold text-1 tracking-9 opacity-60">{t("payment_into_money")}</span>
							<span className="font-semibold  text-7 leading-21 tracking-10  text-primary_6">100.000</span>
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold mt-8">{t("transfer_recipient_info")}</h2>
					<div className="flex justify-between items-center pt-6 min-w-max">
						<div className="w-full text-gray_4 grid items-center">
							<span className="text-1 font-semibold leading-15 tracking-2 mb-1">TU PHI HUONG</span>
							<span className="text-3 leading-14 tracking-6 opacity-60">**** 9111</span>
						</div>
						<div className="bg-gray_12 rounded-full p-2 ml-4 grid justify-center items-center">
							<Icon_Global_Vietinbank />
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5 mt-8">{t("transfer_message")}</h2>
					<span className="text-5 leading-18 tracking-3 mb-8">Sat Nguyen: Thay doi thanh the input !</span>
				</div>
				<div className="fixed bottom-0 inset-x-0 z-10 pb-24 lg:pb-4 bg-white p-4">
					<div className="flex">
						<button
							onClick={() => {
								router.back();
							}}
							className="p-3.5 rounded-xl bg-gray-200 mr-4 flex justify-center"
						>
							<Icon_Activity_Payment_ArrLeft />
						</button>
						<button
							className="p-3.5 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full"
							onClick={() => {
								setPage(8);
							}}
						>
							{t("payment_confirm")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const TransferToBankHistoryModal = () => {
		return (
			<div className="bg-white w-full pb-24 text-gray_4">
				<NavTopTitleAction Title="Thông tin chi tiết" Back={() => router.back()}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Global_Download />
					</button>
				</NavTopTitleAction>
				<div className="px-5 pt-17">
					<h2 className="text-2 leading-16 tracking-8 font-semibold mb-5 pt-8">{t("payment_payment_methods")}</h2>
					<div
						className="flex justify-between items-center mt-4 border rounded-xl border-gray_11 pl-3 py-2.5 h-15 "
						onClick={() => {
							setPage(0);
						}}
					>
						<div className="p-2 flex w-10 h-10 min-w-max justify-center items-center bg-gray_12 rounded-full ">
							<Icon_Payment_Wallet />
						</div>
						<div className="grid w-full rounded-full ml-3">
							<span className="text-1 text-primary_6 leading-15 tracking-2 font-semibold">{t("transfer_e_wallet")}</span>
						</div>
						<div className="mx-3.5 flex items-center">
							<Icon_Global_Arrow_Right />
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-2 font-semibold my-5 mt-8">{t("activity_summary")}</h2>
					<div className="tracking-2 text-gray_4 leading-15">
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_trading_code")}</span>
							<span>123456789</span>
						</div>
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("activity_times")}</span>
							<span>20-08-2021 18:00</span>
						</div>
						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_amount_money")}</span>
							<span>4 {t("global_unit_hour")}</span>
						</div>
						<div className="text-1 flex justify-between pb-5 border-b border-gray_11 border-solid">
							<span className="opacity-60">{t("payment_transaction_fee")}</span>
							<span>0</span>
						</div>
						<div className="flex justify-between items-center pt-5">
							<span className="font-semibold text-1 tracking-9 opacity-60">{t("payment_into_money")}</span>
							<span className="font-semibold  text-7 leading-21 tracking-10  text-primary_6">100.000</span>
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold mt-8">{t("transfer_recipient_info")}</h2>
					<div className="flex justify-between items-center pt-6">
						<div className="w-full text-gray_4 grid items-center">
							<span className="text-1 font-semibold leading-15 tracking-2 mb-1">TU PHI HUONG</span>
							<span className="text-3 leading-14 tracking-6 opacity-60">**** 9111</span>
						</div>
						<div className="bg-gray_12 rounded-full p-2 flex justify-center items-center">
							<Icon_Global_Vietinbank />
						</div>
					</div>
				</div>
				<div className="px-5">
					<h2 className="text-2 leading-16 tracking-8 font-semibold my-5 mt-8">{t("transfer_message")}</h2>
					<span className="text-5 leading-18 tracking-3 mb-8">Sat Nguyen: Thay doi thanh the input !</span>
				</div>
				<div className="fixed bottom-0 inset-x-0 z-10 pb-24 lg:pb-4 bg-white p-4">
					<div className="flex">
						<button
							onClick={() => {
								router.back();
							}}
							className="p-3.5 rounded-xl bg-gray-200 mr-4 flex justify-center"
						>
							<Icon_Activity_Payment_ArrLeft />
						</button>
						<button
							className="p-3.5 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full"
							onClick={() => {
								setPage(6);
							}}
						>
							{t("payment_confirm")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{page === 0 ? (
				<TransferModal />
			) : page === 1 ? (
				<TransferToIUserModal />
			) : page === 2 ? (
				<TransferToUserDetailModal />
			) : page === 3 ? (
				<TransferToUserCheckOutModal />
			) : page === 4 ? (
				<TransferToUserHistoryModal />
			) : page === 5 ? (
				<TransferToBankModal />
			) : page === 6 ? (
				<TransferToBankDetailModal />
			) : page === 7 ? (
				<TransferToBankCheckOutModal />
			) : page === 8 ? (
				<TransferToBankHistoryModal />
			) : null}
			<ModalNotifyMedium
				modalNotify={flagPopup}
				setModalNotify={setFlagPopup}
				status={popupStatus}
				title={popupTitle}
				meta={popupContent}
				clickBtn={() => {
					setFlagPopup(!flagPopup);
					setPage(0);
					router.push(popupBtnPath);
				}}
				backBtn={() => setFlagPopup(!flagPopup)}
				btnValue={t("global_agree")}
				isGoBack={btnBack}
			/>
		</>
	);
}
Transfer.Layout = LayoutFullView;
export default withNamespaces()(Transfer);
