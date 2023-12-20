import "swiper/swiper.min.css";

import { ContextData, ContextUpdate } from "/global/contextData";
import { Fragment, useEffect, useState } from "react";
import { Icon_Activity_Head, Icon_Global_Filter, Icon_Global_Search_White, Icon_Payment_Head, Icon_Payment_Wallet } from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { get_api, refresh_token } from "/global/apiHandle";

import CurrencyFormat from "react-currency-format";
import LayoutFullView from "/components/layout/LayoutFullView";
import Link from "next/link";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import { NavTopTitleAction } from "/components/payment/LayoutPayment";
import globalData from "/global/globalData";
import i18n from "/global/language/i18n";
import moment from "moment";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function History({ t }) {
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [popupTitle, setPopupTitle] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [popupBtnPath, setPopupBtnPath] = useState("");
	const router = useRouter();
	const [verified, setVerified] = useState(true);
	const [points, setPoints] = useState(0);
	const [history, setHistory] = useState([]);
	const [input, setInput] = useState({
		value: "all",
	});

	const dataFilter = [
		{ name: "Tất cả", value: "all" },
		{ name: "Nạp tiền", value: "woocommerce_payment" },
		{ name: "Chuyển / Nhận tiền", value: "transfer" },
	];

	useEffect(() => {
		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : JSON.parse(window.localStorage.points));
		setVerified(true);
		getHistory();
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

	const getHistory = () => {
		var params = {
			path: globalData.api_channel.paymentHistory,
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
									getHistory();
								}
							}
						});
					} else {
						popupHandle(2, t("popup_error"), res.status.message, true);
					}
				} else {
					var data = res.data.data;
					ContextData.paymentHistory = data;
					window.localStorage.setItem("paymentHistory", JSON.stringify(data));
					setHistory(data);
				}
			})
			.catch((err) => {
				console.log("==================================== getHistory");
				console.log(err.response.data.status.message);
				console.log("====================================");
				popupHandle(2, t("popup_error"), err.response.data.status.message, true);
			});
	};

	const handleChange = (event) => {
		setInput({ value: event.target.value });
	};

	const LayoutItemHistory = ({ Href, Status, DateTime, Name, Total, Currency, User, IDPost }) => {
		const Method =
			(Name === "transfer") & (Total > 0)
				? "Nhận tiền"
				: (Name === "transfer") & (Total < 0)
				? "Chuyển tiền"
				: Name === "woocommerce_payment"
				? "Nạp tiền"
				: "N/A";
		return (
			<Link href={Href}>
				<a className="link  flex flex-row justify-start items-center flex-nowrap w-full border-t-1 border_gray_1 group-first-of-type:border-0 py-3.5">
					<div className="icon-Svg svg-24  w-10 h-10 bg-gray_12 rounded-full mr-1">
						<Icon_Payment_Wallet />
					</div>

					<div className="info truncate w-1/84 px-3 flex flex-col justify-start items-start ">
						<span className="status block caption-1 text-primary_6">{Status}</span>
						<div className="relative truncate py-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden w-full">
							<span className="label-Bold_Gray opacity-60">{Method}</span>
							&nbsp;
							<CurrencyFormat
								value={Total}
								suffix={Currency}
								displayType={"text"}
								thousandSeparator="."
								decimalSeparator=","
								className="label-Bold_Gray opacity-60"
							/>
							&nbsp;
							{(Name === "transfer") & (Total > 0) ? (
								<span className="method label-Bold_Gray opacity-60 ">{t("global_from")}</span>
							) : (Name === "transfer") & (Total < 0) ? (
								<span className="method label-Bold_Gray opacity-60 ">{t("global_to")}</span>
							) : Name === "woocommerce_payment" ? (
								<span className="method label-Bold_Gray opacity-60 ">{t("global_into_wallet")}</span>
							) : null}
							&nbsp;
							<span className="meta label-Bold_Gray opacity-60 truncate">{Name !== "woocommerce_payment" && User}</span>
						</div>
						<span className="meta caption-1 text-gray-1 opacity-60 inline-block">
							#{IDPost}&nbsp;-&nbsp;
							{moment.unix(DateTime).utc().format("hh:mm")}
						</span>
					</div>
					<div className="date ml-auto mr-0 opacity-60 w-12 h-11 rounded border-1 border_gray_1 flex flex-col justify-center child-center text-center">
						<p className="month label-Bottom_Gray w-full border-b-1 border_gray_1">{moment.unix(DateTime).utc().format("MMMM")}</p>
						<p className="day text-Small_Bold my-1">{moment.unix(DateTime).utc().format("DD")}</p>
					</div>
				</a>
			</Link>
		);
	};

	return (
		<div className="payment payment-layout">
			<NavTopTitleAction Title={t("global_history")} Back={() => router.back()}>
				<div className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap">
					{verified === true ? (
						<Fragment>
							<Icon_Payment_Head />
							<div className="total text-Large ml-2">
								<CurrencyFormat value={points} displayType={"text"} thousandSeparator="." decimalSeparator="," />
								<span className="text-white"> {t("global_point")}</span>
							</div>
						</Fragment>
					) : (
						<Fragment>
							<Icon_Payment_Head />
							<div className="total text-Large ml-2">
								<CurrencyFormat value={0} displayType={"text"} thousandSeparator="." decimalSeparator="," />
								<span className="text-white"> {t("global_point")}</span>
							</div>
						</Fragment>
					)}
				</div>
			</NavTopTitleAction>
			<div className="history payment-layout-inner-large">
				<div className="relative bg-primary_6 w-full flex flex-col justify-center items-center pb-5">
					<Icon_Activity_Head />
					<div className="search w-full pt-5 flex flex-row justify-between items-center flex-nowrap px-5">
						<form
							action=""
							className="search w-form-sort flex flex-row justify-start items-center flex-nowrap bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-xl px-4 py-3.5"
						>
							<Icon_Global_Search_White />
							<input
								type="search"
								id="search-history"
								className="bg-transparent text-sm text-white tracking-3 placeholder-white pl-4 w-input-sort appearance-none focus-visible:outline-none"
								placeholder={t("global_search")}
							/>
						</form>
						<div className="filter w-12 h-12 icon-Svg bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-xl ml-3">
							<Icon_Global_Filter />
						</div>
					</div>
					<div className="sort pt-5 w-full">
						<Swiper className="list mySwipe" loop={false} slidesPerView={"auto"}>
							{dataFilter.length > 0
								? dataFilter.map(function (items, index) {
										return (
											<SwiperSlide className="item lg:hover:cursor-pointer mr-3 first-of-type:ml-5 max-w-min" key={index}>
												<label
													className={`inline-flex w-max  border-1 border-white border-opacity-20 rounded-xl px-3 py-2 ${
														input.value === items.value ? " bg-white" : ""
													}`}
													htmlFor={items.value}
												>
													<span
														className={
															input.value === items.value ? "button-Medium-Pri-3 capitalize " : "button-Medium-White capitalize"
														}
													>
														{t(items.name)}
													</span>
													<input
														type="radio"
														name="sort"
														id={items.value}
														value={t(items.value)}
														checked={input.value === items.value ? true : false}
														onChange={handleChange}
														className="hidden "
													/>
												</label>
											</SwiperSlide>
										);
								  })
								: null}
						</Swiper>
					</div>
				</div>
				<div className="relative w-full h-full bg-white ">
					{history.length > 0 ? (
						<div className="inner px-5 g h-full flex flex-col justify-start items-start flex-nowrap">
							{input.value === "all"
								? history.map(function (items, index) {
										return (
											<Fragment key={index}>
												<LayoutItemHistory
													Href="#"
													Status={t("payment_paid")}
													DateTime={items.time}
													Name={t(items.ref)}
													Total={items.creds}
													Currency="đ"
													Method={t(items.ref)}
													User={items.display_name ? items.display_name : items.ref_id}
													IDPost={items.id}
												/>
											</Fragment>
										);
								  })
								: history
										.filter((status) => status.ref === input.value)
										.map(function (items, index) {
											return (
												<Fragment key={index}>
													<LayoutItemHistory
														Href="#"
														Status={t("payment_paid")}
														DateTime={items.time}
														Name={t(items.ref)}
														Total={items.creds}
														Currency="đ"
														Method={t(items.ref)}
														User={items.display_name ? items.display_name : items.ref_id}
														IDPost={items.id}
													/>
												</Fragment>
											);
										})}
						</div>
					) : null}
				</div>
			</div>
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
		</div>
	);
}

History.Layout = LayoutFullView;
export default withNamespaces()(History);
