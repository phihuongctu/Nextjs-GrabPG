import "swiper/swiper.min.css";

import { Fragment, React, useEffect, useState } from "react";
import {
	Icon_Global_Arrow_Right,
	Icon_Global_Arrow_Right_White,
	Icon_Global_History_Clock,
	Icon_Global_Mastercard,
	Icon_Global_Vietinbank,
	Icon_Global_Visa,
	Icon_Payment_ArrSwap,
	Icon_Payment_Layout_Crow,
	Icon_Payment_Wallet,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { dataEmpty, dataMembers, dataSaving, dataToolPayment } from "/components/payment/DataPayment";

import { ContextData } from "/global/contextData";
import CurrencyFormat from "react-currency-format";
import { Icon_Payment_Head_Logout } from "/public/icon/iconGlobal";
import LayoutFullView from "/components/layout/LayoutFullView";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import { NavTopTitle } from "/components/payment/LayoutPayment";
import NumberFormat from "react-number-format";
import { get_total_balance } from "/global/apiHandle";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function Payment({ t }) {
	const router = useRouter();
	const [verified, setVerified] = useState(false);
	const [points, setPoints] = useState(0);
	const [token, setToken] = useState(0);
	const [page, setPage] = useState(0);
	const [listCard, setListCard] = useState([]);
	const [defaultMethod, setDefaultMethod] = useState(0);
	const [popupTitle, setPopupTitle] = useState("");
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [popupBtnPath, setPopupBtnPath] = useState();

	useEffect(() => {
		// var isVerified = typeof ContextData.listCard !== "undefined" ? ContextData.listCard.is_verified : false;
		get_total_balance();
		setVerified(true);
		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : JSON.parse(window.localStorage.points));
		setListCard(typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay));
		setDefaultMethod(typeof ContextData.defaultMethod !== "undefined" ? ContextData.defaultMethod : window.localStorage.defaultMethod);
	}, []);

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

	const LayoutEmptyModal = ({ heading, icon, meta, className, children, to }) => {
		return (
			<div className={`pt-5 px-5 ${className}`}>
				<div className="empty flex flex-row justify-between items-center flex-wrap border-1 border-gray-1 rounded-xl p-4">
					<div className="w-16 h-16 icon-Svg rounded-full bg-gray_12">{icon}</div>
					<div className="flex-1 px-3 overflow-hidden">
						<span className="label-Bold_Gray truncate inline-block w-full">{heading}</span>
						<p className="text-Medium line-clamp-2">{meta}</p>
					</div>
					<button className="button w-full button-Medium-Gray p-4 mt-4 rounded-xl bg-gray_12" value={children} type="submit" onClick={to}>
						{children}
					</button>
				</div>
			</div>
		);
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

	const WalletInfoModal = () => {
		return (
			<div className="wallet  relative w-64-25 h-64-25 flex flex-col justify-center items-center bg-white bg-opacity-8 rounded-full border-1 border-opacity-20">
				<span className="title text-white text-sm leading-12 tracking-3 font-normal">{t("payment_account_balance")}</span>
				<div className="total my-5 label-Bold">
					<CurrencyFormat value={verified === false ? 0 : points} displayType={"text"} thousandSeparator="." decimalSeparator="," />
					<span>{t("global_point")}</span>
				</div>
				<div className="point flex flex-row justify-center items-center flex-nowrap">
					<Icon_Payment_Layout_Crow />
					<span className="label-Bold_White mx-1">
						<NumberFormat value={verified === false ? 0 : token} displayType={"text"} thousandSeparator="." decimalSeparator="," className="mr-1" />
						{t("token")}
					</span>
					{/* <Icon_Global_Arrow_Right_White /> */}
				</div>
			</div>
		);
	};

	const ToolPayment = () => {
		const checkPermission = (items) => {
			if (verified === true) {
				if (points === 0 && listCard.length <= 2) {
					switch (items.class) {
						case "payment":
							popupHandle(1, t("popup_warning"), t("payment_deposit_not_card"), true, {
								pathname: "/nav/payment/manage",
								query: {
									goBack: "/nav/payment",
									goPage: 2,
								},
							});
							break;
						case "transfers":
							popupHandle(1, t("popup_warning"), t("payment_deposit_not_card"), true, {
								pathname: "/nav/payment/manage",
								query: {
									goBack: "/nav/payment",
									goPage: 2,
								},
							});
							break;
						case "recharge":
							popupHandle(1, t("popup_warning"), t("payment_deposit_not_card"), true, {
								pathname: "/nav/payment/manage",
								query: {
									goBack: "/nav/payment",
									goPage: 2,
								},
							});
							break;
						case "receive":
							router.push(items.link);
						default:
							break;
					}
				} else if (points === 0 && listCard.length > 2) {
					switch (items.class) {
						case "payment":
							popupHandle(1, t("popup_warning"), t("please_recharge_to_account"), true, {
								pathname: "/nav/payment/deposit",
								query: {
									goBack: "/nav/payment",
								},
							});
							break;
						case "transfers":
							popupHandle(1, t("popup_warning"), t("please_recharge_to_account"), true, {
								pathname: "/nav/payment/deposit",
								query: {
									goBack: "/nav/payment",
								},
							});
							break;
						case "recharge":
							router.push(items.link);
							break;
						case "receive":
							router.push(items.link);
						default:
							break;
					}
				} else if (points > 0 && listCard.length <= 2) {
					if (items.class === "recharge") {
						popupHandle(1, t("popup_warning"), t("payment_deposit_not_card"), true, {
							pathname: "/nav/payment/manage",
							query: {
								goBack: "/nav/payment",
								goPage: 2,
							},
						});
					} else {
						router.push(items.link);
					}
				} else if (points > 0 && listCard.length <= 2) {
					switch (items.class) {
						case "payment":
							router.push(items.link);
							break;
						case "transfers":
							router.push(items.link);
							break;
						case "recharge":
							popupHandle(1, t("popup_warning"), t("payment_deposit_not_card"), true, {
								pathname: "/nav/payment/manage",
								query: {
									goBack: "/nav/payment",
									goPage: 2,
								},
							});
							break;
						case "receive":
							router.push(items.link);
						default:
							break;
					}
				} else {
					router.push(items.link);
				}
			} else {
				popupHandle(1, t("popup_warning"), t("please_verification_account"), true);
			}
		};

		return (
			<>
				{dataToolPayment.length > 0 ? (
					<div className="tool cursor-pointer w-full relative flex flex-row justify-between items-center flex-nowrap pt-5">
						{dataToolPayment.map(function (items, index) {
							return (
								<div
									className={`w-25/9 h-full bg-white bg-opacity-8 border-1 border-opacity-20 rounded-lg py-2.5 px-2  ${items.class}`}
									key={index}
									onClick={() => checkPermission(items)}
								>
									<div className="flex flex-col justify-center items-center flex-nowrap text-center">
										{items.icon}
										<span className="label-Bottom_White mt-2 inline-block w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
											{t(items.title)}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : null}
			</>
		);
	};

	const VerificationModal = () => {
		return (
			<>
				{verified === true ? (
					<DefaultMethodModal />
				) : (
					<div className="verified relative pb-8 w-full">
						<div className="not-verified pt-4">
							<LayoutEmptyModal heading={t(dataEmpty[0].heading)} icon={dataEmpty[0].icon} meta={dataEmpty[0].meta} className={dataEmpty[0].type}>
								{t(dataEmpty[0].button)}
							</LayoutEmptyModal>
						</div>
					</div>
				)}
			</>
		);
	};

	const DefaultMethodModal = () => {
		return (
			<div className="method w-full pt-8">
				<>
					<TitleGroup title={t("payment_payment_methods")} event={() => router.push("/nav/payment/manage")}>
						{t("payment_manage")}
					</TitleGroup>
					{verified === true ? (
						<>
							<div className="method pt-5 px-5">
								<div
									className="inner h-16  flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl px-3 py-2.5"
									// onClick={() => router.push("/nav/payment/choose-method")}
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
													{/* <div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
														<Icon_Payment_ArrSwap />
														<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
													</div> */}
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
														{/* <div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
												<Icon_Payment_ArrSwap />
												<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
											</div> */}
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
											{/* <div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
												<Icon_Payment_ArrSwap />
												<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
											</div> */}
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
								{/* <div className="choose flex flex-row justify-between items-center flex-nowrap opacity-60">
												<Icon_Payment_ArrSwap />
												<span className="text-3 leading-13 text-gray-1 ml-2">{t("global_choose")}</span>
											</div> */}
							</div>
						</div>
					)}
				</>
			</div>
		);
	};

	const MemberModal = () => {
		return (
			<div className="members pt-8">
				<TitleGroup title={t("payment_membership_package")}>{t("global_view_all")}</TitleGroup>
				{verified === true ? (
					<Swiper className="mySwipe member" slidesPerView={1} loop={false}>
						{dataMembers.map(function (items, index) {
							return (
								<SwiperSlide
									className="inner cursor-pointer flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl p-3 max-w-1 mr-4 mt-5 first-of-type:ml-5"
									key={index}
								>
									<div className="w-16 h-16 flex flex-col justify-center items-center rounded-xl bg-gray_12 px-1">
										<span className="price text-Small_Bold pb-1 truncate w-full text-center">{items.label}</span>

										<span className="date inline-flex justify-center label-Bottom_Gray truncate w-full text-center">
											/ {items.date} <p className="unit">{t(items.unit)}</p>
										</span>
									</div>
									<div className="relative flex-1 px-3">
										<span className="name label-Bold_Gray">{t(items.title)}</span>
										<p className="meta text-Small line-clamp-2">{items.meta}</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				) : (
					<>
						{dataEmpty.map(function (items, index) {
							return (
								<Fragment key={index}>
									{items.type == "members" && (
										<LayoutEmptyModal heading={items.heading} icon={items.icon} meta={items.meta} className={items.type}>
											{t(items.button)}
										</LayoutEmptyModal>
									)}
								</Fragment>
							);
						})}
					</>
				)}
			</div>
		);
	};

	const SavingModal = () => {
		return (
			<div className="saving pt-8">
				<TitleGroup title={t("payment_savings_package")}>{t("global_view_all")}</TitleGroup>
				{verified === true ? (
					<Swiper className="mySwipe saving" slidesPerView={1} loop={false}>
						{dataSaving.map(function (items, index) {
							return (
								<SwiperSlide
									className="inner cursor-pointer flex flex-row justify-between items-center flex-nowrap border-1 border-gray-1 rounded-xl p-3 max-w-1 mr-4 mt-5 first-of-type:ml-5"
									key={index}
								>
									<div className="w-16 h-16 flex flex-col justify-center items-center rounded-xl bg-gray_12 px-1">
										<span className="title text-Small_Bold pb-1 truncate w-full text-center"> {t(items.label)}</span>
										<span className="percent inline-flex justify-center label-Bottom_Gray truncate w-full text-center">
											7%
											<p className="unit">/ {t(items.unit)}</p>
										</span>
									</div>
									<div className="relative flex-1 px-3">
										<span className="name label-Bold_Gray">{t(items.title)}</span>
										<p className="meta text-Small line-clamp-2">{items.meta}</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				) : (
					<>
						{dataEmpty.map(function (items, index) {
							return (
								<Fragment key={index}>
									{items.type == "saving" && (
										<LayoutEmptyModal heading={items.heading} icon={items.icon} meta={items.meta} className={items.type}>
											{t(items.button)}
										</LayoutEmptyModal>
									)}
								</Fragment>
							);
						})}
					</>
				)}
			</div>
		);
	};

	const WalletDetailModal = () => {
		return (
			<div className="payment payment-layout">
				<NavTopTitleAction Title={t("payment_personal_wallet")} Back={() => setPage(0)}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Payment_Head_Logout />
					</button>
				</NavTopTitleAction>
				<div className="history payment-layout-inner-large">
					<div className="relative bg-primary_6 w-full flex flex-col justify-center items-center px-5 pb-5">
						<WalletInfoModal />
						<ToolPayment />
					</div>
					<div className="relative p-5 w-full">
						<div
							className="flex items-center justify-center w-full"
							onClick={() => {
								ContextData.defaultMethod = "wallet";
								window.localStorage.defaultMethod = "wallet";
								console.log("WalletDetailModal select wallet is default");
							}}
						>
							<label htmlFor="toggle" className="flex items-center justify-between w-full py-3 cursor-pointer">
								<span className="label-Bold_Gray ">{t("payment_choose_default")}</span>
								<div className="relative">
									<input type="checkbox" id="toggle" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition" />
								</div>
							</label>
						</div>
					</div>
					<div className=" pb-4 px-5 mt-auto mb-0 w-full">
						<button className="button button-Medium-White p-4 w-full rounded-xl bg-primary_12 text-primary_6" value="view" type="submit">
							{t("global_about_grabpg")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{page === 0 ? (
				<div className="payment payment-layout">
					<NavTopTitle Title={t("payment_payment")} To={() => router.push("/nav/payment/history")}>
						<Icon_Global_History_Clock />
					</NavTopTitle>
					<div className=" flex w-full flex-col items-start justify-start pt-15 pb-8">
						<div className="relative bg-primary_6 w-full flex flex-col justify-center items-center px-5 pb-5">
							<WalletInfoModal />
							<ToolPayment />
						</div>
						<VerificationModal />
						<MemberModal />
						<SavingModal />
					</div>
				</div>
			) : page === 1 ? (
				<WalletDetailModal />
			) : null}
			<ModalNotifyMedium
				modalNotify={flagPopup}
				setModalNotify={setFlagPopup}
				status={popupStatus}
				title={popupTitle}
				meta={popupContent}
				clickBtn={() => {
					setFlagPopup(!flagPopup);
					router.push(popupBtnPath);
				}}
				backBtn={() => setFlagPopup(!flagPopup)}
				btnValue={t("global_agree")}
				isGoBack={btnBack}
			/>
		</>
	);
}
Payment.Layout = LayoutFullView;
export default withNamespaces()(Payment);
