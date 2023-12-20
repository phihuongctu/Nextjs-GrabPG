import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import * as Yup from "yup";

import { ContextData, ContextUpdate } from "/global/contextData";
import { Fragment, useEffect, useState } from "react";
import {
	Icon_Activity_Payment_ArrCarelRight,
	Icon_Activity_Payment_ArrLeft,
	Icon_Activity_Payment_ArrSwap,
	Icon_Global_Arrow_Right,
	Icon_Global_Download,
	Icon_Global_Mastercard,
	Icon_Global_Vietinbank,
	Icon_Global_Visa,
	Icon_Payment_ArrSwap,
	Icon_Payment_ArrSwap_White,
	Icon_Payment_Head,
	Icon_Payment_Wallet,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { get_total_balance, post_api, refresh_token } from "/global/apiHandle";

import LayoutFullView from "/components/layout/LayoutFullView";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import Moment from "moment";
import { NavTopTitleAction } from "../../../components/payment/LayoutPayment";
import NumberFormat from "react-number-format";
import globalData from "/global/globalData";
import i18n from "/global/language/i18n";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function Deposit({ t }) {
	const router = useRouter();
	const { pageBack } = router.query;
	const [page, setPage] = useState(0);
	const [price, setPrice] = useState(50000);
	const [points, setPoints] = useState(0);
	const [disableButton, setDisableButton] = useState(false);
	const [listCard, setListCard] = useState([]);
	const [verified, setVerified] = useState(false);
	const [feeDeposit, setFeeDeposit] = useState(0);
	const [popupTitle, setPopupTitle] = useState("");
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [defaultCard, setDefaultCard] = useState("");
	const [timeDeposit, setTimeDeposit] = useState("");
	const [defaultMethod, setDefaultMethod] = useState(0);
	const [popupBtnPath, setPopupBtnPath] = useState("");

	useEffect(() => {
		get_total_balance();
		setPage(typeof pageBack !== "undefined" ? parseInt(pageBack) : 0);
		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : JSON.parse(window.localStorage.points));
		setListCard(typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay));
		setDefaultMethod(typeof ContextData.defaultMethod !== "undefined" ? ContextData.defaultMethod : window.localStorage.defaultMethod);
		setVerified(true);
	}, []);

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

	const popupHandle = (type, title, content, isGoBack, isOnclick) => {
		setPopupStatus(parseInt(type));
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
				<div className="option flex flex-row justify-between items-center flex-nowrap lg:cursor-pointer opacity-60" onClick={event}>
					<span className="btn-Caption-1  mr-2">{children}</span>
					<Icon_Global_Arrow_Right />
				</div>
			</div>
		);
	};

	const DefaultMethodModal = () => {
		const onChangeManage = () => {
			router.push({
				pathname: "/nav/payment/manage",
				query: {
					goBack: "/nav/payment/deposit",
					pageBack: page,
				},
			});
		};

		const onChangeMethod = () => {
			router.push({
				pathname: "/nav/payment/choose-method",
				query: {
					goBack: "/nav/payment/deposit",
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
													{setDefaultCard(listCard[defaultMethod].type)}
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
												<>
													<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
														<Icon_Payment_Wallet />
													</div>
													<div className="relative flex-1 px-3">
														<span className="name text-primary_6 label-bold">{t("payment_personal_wallet")}</span>
														<p className="text-small text-gray_4">{t("global_default")}</p>
													</div>
													<button
														className="choose flex flex-row justify-between items-center flex-nowrap opacity-60"
														onClick={() => onChangeMethod()}
													>
														<Icon_Payment_ArrSwap />
														<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
													</button>
												</>
											)}
										</>
									) : (
										<>
											<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
												<Icon_Payment_Wallet />
											</div>
											<div className="relative flex-1 px-3">
												<span className="name text-primary_6 label-bold">{t("payment_personal_wallet")}</span>
												<p className="text-small text-gray_4">{t("global_default")}</p>
											</div>
											<button
												className="choose flex flex-row justify-between items-center flex-nowrap opacity-60"
												onClick={() => onChangeMethod()}
											>
												<Icon_Payment_ArrSwap />
												<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
											</button>
										</>
									)}
								</div>
							</div>
						</>
					) : (
						<div className="method pt-5 px-5">
							<div
								className="inner flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl px-3 py-2.5"
								onClick={() => onChangeMethod()}
							>
								<div className="w-10 h-10 icon-Svg rounded-full bg-gray_12">
									<Icon_Payment_Wallet />
								</div>
								<div className="relative flex-1 px-3">
									<span className="name label-Bold_Pri">{t("global_default")}</span>
									<p className="caption-3">{t("global_default")}</p>
								</div>
								<button className="choose flex flex-row justify-between items-center flex-nowrap opacity-60" onClick={() => onChangeMethod()}>
									<Icon_Payment_ArrSwap />
									<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
								</button>
							</div>
						</div>
					)}
				</>
			</div>
		);
	};

	const DepositModal = () => {
		const frmDeposit = useFormik({
			initialValues: {
				price: price,
			},
			validationSchema: Yup.object({
				price: Yup.number().min(50000, t("payment_deposit_ruler")).max(99000000, t("payment_deposit_ruler")).required(t("please_input_data")),
			}),
			onSubmit: (values) => {
				setPrice(values.price);
				if (listCard[defaultMethod].method === "wallet") {
					popupHandle(2, t("popup_error"), t("payment_deposit_wrong_method"), true);
				} else {
					setPage(1);
				}
			},
		});
		return (
			<form onSubmit={frmDeposit.handleSubmit}>
				<div className="pt-8 bg-white pb-4 w-full text-gray_4">
					<NavTopTitleAction Title={t("payment_recharges_money")} Back={() => router.push("/nav/payment")}>
						<div className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap">
							<Icon_Payment_Head />
							<NumberFormat
								value={verified === true ? points : 0}
								displayType={"text"}
								thousandSeparator="."
								decimalSeparator=","
								className="total text-Large ml-2"
							/>
							<span className="ml-1 text-white  text-Large">{t("global_point")}</span>
						</div>
					</NavTopTitleAction>
					<div className="grid mx-5 pt-17">
						<span className="text-gray_8 text-5  leading-18 tracking-3 pt-2 pl-2">{t("payment_amount_money_recharges")}</span>
						<input
							value={frmDeposit.values.price}
							onChange={frmDeposit.handleChange}
							type="number"
							name="price"
							className={` ${
								frmDeposit.errors.price ? "border-red_6" : "border-gray-1"
							}   text-gray_4 text-5 border-b leading-4 tracking-7 font-semibold pl-2 pb-2 bg-white bg-opacity-0 outline-none`}
							placeholder="Nhập số tiền"
						></input>
						{/* <NumberFormat
							value={frmDeposit.values.price}
							onChange={frmDeposit.handleChange}
							name="price"
							thousandSeparator="."
							decimalSeparator=","
							className={` ${
								frmDeposit.errors.price ? "border-red_6" : "border-gray-1"
							}   text-gray_4 text-5 border-b leading-4 tracking-7 font-semibold pl-2 pb-2 bg-white bg-opacity-0 outline-none`}
							placeholder="Nhập số tiền"
						/> */}
						{frmDeposit.errors.price && frmDeposit.touched.price && <p className="caption-1 mt-2 text-red_6">{frmDeposit.errors.price}</p>}
					</div>
					<div className="p-5 pb-3 flex text-left">
						<Swiper slidesPerView={"4"}>
							{dataPrice.map(function (item, index) {
								const changePrice = () => setPrice(item.price);
								return (
									<SwiperSlide key={index}>
										<div
											className={`border rounded-xl text-5 leading-4 tracking-7 font-bold border-gray_11 px-3 py-2 mr-3  text-center
                                        hover:text-primary_6 hover:border-primary_8 hover:bg-primary_12
                                        ${price === item.price ? "text-primary_6 border-primary_8 bg-primary_12" : ""}
                                        `}
											onClick={changePrice}
										>
											<NumberFormat value={item.price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
					<DefaultMethodModal />
					<div>
						<h3 className="p-5 text-left  text-2 leading-16  font-semibold tracking-8">{t("activity_summary")}</h3>
						<div className="text-1 tracking-2 text-gray_4 leading-15 border-b border-gray_11 border-solid">
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className=" opacity-60">{t("global_choose")}</span>
								<span>
									<NumberFormat value={frmDeposit.values.price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
								</span>
							</div>
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">{t("payment_payment_methods")}</span>
								<span>{defaultCard}</span>
							</div>
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">{t("payment_transaction_fee")}</span>
								<span>{feeDeposit}</span>
							</div>
						</div>
						<div className="flex justify-between p-5">
							<span className="opacity-60 font-semibold text-1 leading-15 tracking-9">{t("payment_into_money")}</span>
							<span className="text-primary_6 text-7 leading-21 tracking-10 font-bold">
								<NumberFormat value={frmDeposit.values.price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>
					</div>
					<div className="fixed bottom-0 inset-x-0 z-30 bg-white pt-4">
						<div className="flex p-4">
							<div
								// type="button"
								onClick={() => router.push("/nav/payment")}
								className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4 lg:cursor-pointer"
							>
								<Icon_Activity_Payment_ArrLeft />
							</div>

							<button className="type=submit p-4 bg-primary_6 rounded-xl text-center text-5 text-white font-semibold w-full">
								{t("global_agree")}
							</button>
						</div>
					</div>
				</div>
			</form>
		);
	};

	const DepositCheckoutModal = () => {
		const rechargeHandle = () => {
			var params = {
				path: globalData.api_channel.chargePoint,
				token: true,
				data: {
					point_id: 193,
					method: "custom",
					amount: price,
					card_id: typeof ContextData.defaultCard !== "undefined" ? ContextData.defaultCard.id : JSON.parse(window.localStorage.defaultCard).id,
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
										rechargeHandle();
									}
								}
							});
						} else {
							popupHandle(2, t("popup_error"), res.status.message, true);
						}
					} else {
						console.log("==================================== rechargeHandle");
						console.log(res.data);
						console.log("==================================== success");

						var mount = res.data.data.total;
						setPoints(mount);
						ContextData.points = mount;
						window.localStorage.setItem("points", mount);
						popupHandle(0, t("popup_success"), t("payment_deposit_success"), false, "/nav/payment/");
					}
				})
				.catch((err) => {
					console.log("==================================== rechargeHandle");
					console.log(err);
					console.log("==================================== error");
					popupHandle(2, t("popup_error"), err.response.data.status.message, true);
				});
		};

		return (
			<div className="pt-8 bg-white w-full text-gray_4">
				<NavTopTitleAction Title={t("payment_confirm_transaction")} Back={() => setPage(0)}></NavTopTitleAction>
				<div className="pt-8">
					<DefaultMethodModal />
				</div>

				<div>
					<h3 className="p-5 text-left  text-2 leading-16  font-semibold tracking-8">{t("activity_summary")}</h3>
					<div className="text-1 tracking-2 text-gray_4 leading-15 border-b border-gray_11 border-solid mx-5">
						<div className="text-1 flex justify-between pb-5">
							<span className=" opacity-60">{t("payment_amount_money")}</span>
							<span>
								<NumberFormat value={price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>

						<div className="text-1 flex justify-between pb-5">
							<span className="opacity-60">{t("payment_transaction_fee")}</span>
							<span>{feeDeposit}</span>
						</div>
					</div>
					<div className="flex justify-between p-5">
						<span className="opacity-60 font-semibold text-1 leading-15 tracking-9">{t("payment_into_money")}</span>
						<span className="text-primary_6 text-7 leading-21 tracking-10 font-bold">
							<NumberFormat value={price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
						</span>
					</div>
				</div>
				<div className="fixed bottom-0 inset-x-0 z-30 bg-white pt-4">
					<div className="flex p-4">
						<button
							type="button"
							onClick={() => {
								setPage(0);
							}}
							className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4"
						>
							<Icon_Activity_Payment_ArrLeft />
						</button>

						{/* <Link href="/nav/payment/deposit-history">
						<button className="p-4 bg-primary_6 rounded-xl text-center text-5 text-white font-semibold w-full">Xác nhận</button>
					</Link> */}
						<button
							type="submit"
							className="p-4 bg-primary_6 rounded-xl text-center text-5 text-white font-semibold w-full"
							onClick={() => {
								rechargeHandle();
								setPage(2);
								setTimeDeposit(Moment().format("DD-MM-YYYY HH:mm"));
							}}
						>
							{t("payment_confirm")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const DepositHistoryModal = () => {
		return (
			<>
				<div className="pt-8 bg-white w-full text-gray_4">
					<NavTopTitleAction
						Title={t("deposit_detail_info")}
						Back={() => {
							setPage(1);
							setDisableButton(!disableButton);
						}}
					>
						<button className="w-5 h-5 mr-0 ml-auto">
							<Icon_Global_Download />
						</button>
					</NavTopTitleAction>
					<div className="pt-8">
						<DefaultMethodModal />
					</div>
					<div>
						<h3 className="p-5 text-left  text-2 leading-16  font-semibold tracking-8">{t("activity_summary")}</h3>
						<div className="text-1 tracking-2 text-gray_4 leading-15 border-b border-gray_11 border-solid">
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">{t("payment_trading_code")}</span>
								<span>123456789</span>
							</div>
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">{t("activity_times")}</span>
								<span>{timeDeposit}</span>
							</div>
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">{t("payment_amount_money")}</span>
								<span>
									<NumberFormat value={price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
								</span>
							</div>

							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">{t("payment_transaction_fee")}</span>
								<span>{feeDeposit}</span>
							</div>
						</div>
						<div className="flex justify-between p-5">
							<span className="opacity-60 font-semibold text-1 leading-15 tracking-9">{t("payment_into_money")}</span>
							<span className="text-primary_6 text-7 leading-21 tracking-10 font-bold">
								<NumberFormat value={price} displayType={"text"} thousandSeparator="." decimalSeparator="," />
							</span>
						</div>
					</div>
					<div className="fixed bottom-0 inset-x-0 z-30 bg-white pt-4">
						<div className="flex p-4">
							<button
								type="button"
								onClick={() => {
									setPage(1);
									setDisableButton(!disableButton);
								}}
								className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4"
							>
								<Icon_Activity_Payment_ArrLeft />
							</button>

							<button
								disabled={disableButton === true ? false : true}
								onClick={() => {
									setPage(0);
									setDisableButton(!disableButton);
								}}
								className={`${
									disableButton === true ? null : "opacity-60"
								} p-4  bg-primary_6 rounded-xl text-center text-5 text-white font-semibold w-full`}
							>
								{t("global_agree")}
							</button>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			{page === 0 ? <DepositModal /> : page === 1 ? <DepositCheckoutModal /> : page === 2 ? <DepositHistoryModal /> : null}
			<ModalNotifyMedium
				modalNotify={flagPopup}
				setModalNotify={setFlagPopup}
				status={popupStatus}
				title={popupTitle}
				meta={popupContent}
				clickBtn={() => {
					setFlagPopup(!flagPopup);
					setDisableButton(!disableButton);
					router.push(popupBtnPath);
				}}
				backBtn={() => setFlagPopup(!flagPopup)}
				btnValue={t("global_agree")}
				isGoBack={btnBack}
			/>
		</>
	);
}
Deposit.Layout = LayoutFullView;
export default withNamespaces()(Deposit);
