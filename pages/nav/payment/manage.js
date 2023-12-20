import "swiper/swiper.min.css";

import { BtnGroup, NavTopTitleAction } from "/components/payment/LayoutPayment";
import { Fragment, useEffect, useState } from "react";
import {
	Icon_Activity_Payment_ArrLeft,
	Icon_Global_Arrow_Right,
	Icon_Global_Discover,
	Icon_Global_GoBack,
	Icon_Global_Maestro,
	Icon_Global_Mastercard,
	Icon_Global_Vietinbank,
	Icon_Global_Visa,
	Icon_Payment_Delete,
	Icon_Payment_Head_Logout,
	Icon_Payment_Layout_Crow,
	Icon_Payment_Wallet,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { delete_api, get_total_balance, post_api, refresh_token } from "/global/apiHandle";

import { ContextData } from "/global/contextData";
import Image from "next/image";
import LayoutFullView from "/components/layout/LayoutFullView";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import NumberFormat from "react-number-format";
import { dataMethod } from "/components/payment/DataPayment";
import { dataToolPayment } from "/components/payment/DataPayment";
import globalData from "/global/globalData";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

const Payment = ({ t }) => {
	const router = useRouter();
	const { goBack, pageBack, goPage } = router.query;
	const [idCard, setIdCard] = useState("");
	const [page, setPage] = useState(0);
	const [cardIndexSelected, setCardIndexSelected] = useState(0);
	const [listCard, setListCard] = useState([]);
	const [points, setPoints] = useState(0);
	const [cardIndexDefault, setCardIndexDefault] = useState(0);
	const [verified, setVerified] = useState(false);
	const [popupTitle, setPopupTitle] = useState("");
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [token, setToken] = useState(0);
	const [defaultCard, setDefaultCard] = useState("");
	const [goBackPath, setGoBackPath] = useState(null);
	const [goBackPage, setGoBackPage] = useState(0);
	const [popupBtnPath, setPopupBtnPath] = useState("");

	useEffect(() => {
		get_total_balance();
		setVerified(true);
		setGoBackPath(typeof goBack !== "undefined" ? goBack : null);
		setGoBackPage(typeof pageBack !== "undefined" ? pageBack : null);
		setPage(typeof goPage !== "undefined" ? parseInt(goPage) : 0);
		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : JSON.parse(window.localStorage.points));
		setListCard(typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay));
		setDefaultCard(typeof ContextData.defaultCard !== "undefined" ? ContextData.defaultCard.index : JSON.parse(window.localStorage.defaultCard).index);
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

					{/* <div className="relative p-5 w-full">
						<div
							className="flex items-center justify-center w-full"
							onClick={() => {
								setDefaultCard(cardIndexSelected);
								ContextData.defaultCard = { index: cardIndexSelected, id: defaultCard };
								window.localStorage.setItem("defaultCard", JSON.stringify({ index: cardIndexSelected, id: "wallet" }));
								console.log("WalletDetailModal select wallet is default: " + cardIndexSelected);
							}}
						>
							<label htmlFor="toggle" className="flex items-center justify-between w-full py-3  lg:hover:cursor-pointer">
								<span className="label-Bold_Gray ">{t("payment_choose_default")}</span>
								<div className="relative">
									<input type="checkbox" id="toggle" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition" />
								</div>
							</label>
						</div>
					</div> */}
					<div className=" pb-4 px-5 mt-auto mb-0 w-full">
						<button className="button button-Medium-White p-4 w-full rounded-xl bg-primary_12 text-primary_6" value="view" type="submit">
							{t("global_about_grabpg")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const WalletInfoModal = () => {
		return (
			<div className="wallet  relative w-64-25 h-64-25 flex flex-col justify-center items-center bg-white bg-opacity-8 rounded-full border-1 border-opacity-20">
				<span className="title text-white text-sm leading-12 tracking-3 font-normal">{t("payment_account_balance")}</span>
				<div className="total my-5 label-Bold">
					<NumberFormat value={verified === false ? 0 : points} displayType={"text"} thousandSeparator="." decimalSeparator="," />
					<span>{t("global_point")}</span>
				</div>
				<div className="point flex flex-row justify-center items-center flex-nowrap">
					<Icon_Payment_Layout_Crow />
					<span className="label-Bold_White mx-2">
						<NumberFormat value={verified === false ? 0 : token} displayType={"text"} thousandSeparator="." decimalSeparator="," className="mr-1" />
						{t("token")}
					</span>
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
										<span className="label-Bottom_White mt-2 inline-block w-full whitespace-nowrap overflow-hidden overflow-ellipsis">{t(items.title)}</span>
									</div>
								</div>
							);
						})}
					</div>
				) : null}
			</>
		);
	};

	const MethodAllModal = () => {
		const onClickGoBack = () => {
			if (goBackPath === null) {
				router.back();
			} else {
				if (goBackPage === null) {
					router.push(goBackPath);
				} else {
					router.push({
						pathname: goBackPath,
						query: {
							pageBack: goBackPage,
						},
					});
				}
			}
		};

		return (
			<div className="payment payment-layout">
				<NavTopTitleAction Title={t("payment_payment_methods")} Back={() => onClickGoBack()} />
				<div className="manage payment-layout-inner-large">
					<div className="list-method relative w-full px-5">
						{listCard.length > 0
							? listCard.map(function (items, index) {
									if (items.default === true) setCardIndexDefault(index);
									return (
										<div className="item group lg:hover:cursor-pointer" key={index}>
											<div
												className="label flex flex-row justify-between items-center flex-nowrap py-3.5 border-t-1 border_gray_1 group-first-of-type:border-0"
												onClick={() => {
													items.type === "Point" || items.type === "Token" ? setPage(3) : setPage(1);
													setIdCard(items.type === "Point" || items.type === "Token" ? items.type : items.cardId);
													setCardIndexSelected(index);
												}}
											>
												<div className={` ${items.default === true || defaultCard === index ? null : "grayscale"}  icon-Svg svg-24  w-10 h-10 bg-gray_12 rounded-full mr-3`}>
													{items.type === "MasterCard" ? <Icon_Global_Mastercard /> : items.type === "Visa" ? <Icon_Global_Visa /> : <Icon_Payment_Wallet />}
												</div>
												<div className="relative flex-1 px-3">
													<span
														className={` ${
															items.default === true || defaultCard === index ? "text-primary_6" : "  grayscale"
														} name label-Bold_Gray  max-w-2 truncate ml-0 mr-auto`}
													>
														{items.type === "Point" || items.type === "Token" ? items.type : items.type + " **** **** " + items.cardLast4}
													</span>
													{items.default === true || defaultCard === index ? <p className="text-small text-gray_4">{t("global_default")}</p> : null}
												</div>
												<Icon_Global_Arrow_Right />
											</div>
										</div>
									);
							  })
							: null}
					</div>
					<div className="add-method py-4 px-5 mt-auto mb-0 relative w-full">
						<div className="flex">
							<button onClick={() => onClickGoBack()} className="p-4 rounded-xl bg-gray-200 mr-4 flex justify-center">
								<Icon_Activity_Payment_ArrLeft />
							</button>
							<button
								className="button button-Medium-White p-4 w-full rounded-xl bg-primary_6"
								value="add-method"
								onClick={() => {
									setPage(2);
								}}
							>
								{t("payment_add_method")}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const MethodDetailModal = () => {
		const [isDefault, setIsDefault] = useState(false);
		const [name, setName] = useState("");

		const handleName = (e) => {
			setName(e.target.value);
		};

		const onClickUpdateCard = (e) => {
			e.preventDefault();

			const selectedCard = listCard[cardIndexSelected].cardId;

			var params = {
				path: globalData.api_channel.defaultCard,
				token: true,
				data: {
					card_id: selectedCard,
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
										onClickUpdateCard();
									}
								}
							});
						} else {
							popupHandle(2, t("popup_error"), res.status.message, true);
						}
					} else {
						popupHandle(0, t("popup_success"), t("payment_update_card_success"), false);

						const list = typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay);
						list[cardIndexDefault].default = false;
						list[cardIndexSelected].default = true;
						setListCard(list);
						ContextData.gateWay = list;
						window.localStorage.setItem("gateWay", JSON.stringify(list));

						setDefaultCard(cardIndexSelected);
						ContextData.defaultCard = { index: cardIndexSelected, id: defaultCard };
						window.localStorage.setItem("defaultCard", JSON.stringify({ index: cardIndexSelected, id: selectedCard }));
					}
				})
				.catch((err) => {
					console.log("==================================== onClickUpdate");
					console.log(err);
					console.log("==================================== err");
					popupHandle(2, t("popup_error"), err.response.data.status.message, true);
				});
		};

		const onClickDeleteCard = (e) => {
			e.preventDefault();

			if (typeof listCard[cardIndexSelected].default !== "undefined" && listCard[cardIndexSelected].default === true) {
				popupHandle(2, t("popup_error"), t("can_not_remove_default_card"), true);
			} else {
				var params = {
					path: globalData.api_channel.card + idCard,
					token: true,
					data: {
						card_id: idCard,
					},
				};

				delete_api(params)
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
											onClickDeleteCard();
										}
									}
								});
							} else {
								popupHandle(2, t("popup_error"), res.status.message, true);
							}
						} else {
							popupHandle(0, t("popup_success"), t("payment_delete_card_success"), false);

							const list = typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay);
							list.splice(cardIndexSelected, 1);
							setListCard(list);
							ContextData.gateWay = list;
							window.localStorage.setItem("gateWay", JSON.stringify(list));

							console.log("==================================== onClickDeleteCard");
							console.log(list);
							console.log("====================================");
						}
					})
					.catch((err) => {
						console.log("==================================== onClickDelete");
						console.log(err);
						console.log("==================================== err");
						popupHandle(2, t("popup_error"), err.response.data.status.message, true);
					});
			}
		};

		return (
			<div className="payment-layout">
				<form onSubmit={onClickDeleteCard} className="nav-top flex flex-row justify-start items-center flex-nowrap bg-primary_6 px-5 p-3.5 heading-top">
					<div className="w-10 lg:hover:cursor-pointer h-10 bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-full icon-Svg" onClick={() => setPage(0)}>
						<Icon_Global_GoBack />
					</div>
					<h2 className="text sub-heading-Medium ml-4">{t("payment_card_info")}</h2>
					<button
						className="w-5 h-5 mr-0 ml-auto"
						type="submit"
						// onClick={() => setModalDelete(!modalDelete)}
					>
						<Icon_Payment_Delete />
					</button>
				</form>
				<form className="detail-method payment-layout-inner-large">
					<div className=" px-5 py-8 flex flex-row justify-between items-center flex-wrap w-full">
						{listCard.length > 0
							? listCard.map(function (items, index) {
									return (
										<Fragment key={index}>
											{idCard === items.cardId && (
												<>
													<label htmlFor="full_name" className="w-full block p-2 mb-2 border-b-1 border_gray_1">
														<span className="full-name text-body-small text-gray_8">{t("global_first_last_name")}</span>
														<input
															type="text"
															name="full_name"
															id="full_name"
															disabled
															autoComplete="nope"
															required
															defaultValue={name || items.cardName}
															className="w-full text-medium text-gray_2 placeholder-gray_2 uppercase appearance-none focus:outline-none bg-transparent"
															onChange={handleName}
														/>
													</label>
													<label htmlFor="number_card" className="w-full block p-2 mb-2 border-b-1 border_gray_1">
														<span className="number-listCard  text-body-small text-gray_8">{t("payment_card_number")}</span>
														<NumberFormat
															format="**** **** **** ####"
															name="number_card"
															disabled={true}
															defaultValue={items.cardLast4}
															required
															className="w-full text-medium text-gray_2 placeholder-gray_2 appearance-none focus:outline-none bg-transparent"
														/>
													</label>
													<label htmlFor="date_card" className="w-50/8 block p-2 mb-2 border-b-1 border_gray_1">
														<span className="date-listCard text-body-small text-gray_8">{t("global_mm/yy")}</span>
														<NumberFormat
															format="##/####"
															name="date_card"
															disabled={true}
															mask={["M", "M", "Y", "Y"]}
															defaultValue={
																items.cardExpMonth < 10 ? ("0" + items.cardExpMonth).slice(-2) + "/" + items.cardExpYear : items.cardExpMonth + "/" + items.cardExpYear
															}
															required
															className="w-full text-medium text-gray_2 placeholder-gray_2 appearance-none focus:outline-none bg-transparent"
														/>
													</label>
													<label htmlFor="CCV" className="w-50/8 block p-2 mb-2 border-b-1 border_gray_1">
														<span className="CCV text-body-small text-gray_8">{t("payment_ccv")}</span>
														<input
															type="password"
															name="cvc"
															disabled
															defaultValue="***"
															// items.cvc_check

															required
															className="w-full  text-medium text-gray_2 placeholder-gray_2 appearance-none focus:outline-none bg-transparent"
														/>
													</label>
													<div className="flex items-center justify-center w-full mb-4 mt-8">
														<label htmlFor="toggle" className="flex items-center justify-between w-full py-3 lg:hover:">
															<span className="label-Bold_Gray ">{t("payment_choose_default")}</span>
															<div className="relative">
																<input
																	type="checkbox"
																	id="toggle"
																	defaultChecked={items.default === true ? true : isDefault}
																	onChange={() => {
																		setIsDefault(!isDefault);
																	}}
																	className="input-switch sr-only"
																/>
																<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
																<div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition" />
															</div>
														</label>
													</div>
												</>
											)}
										</Fragment>
									);
							  })
							: null}
					</div>
					<div className={`add-method py-4 px-5 mt-auto mb-0 w-full `}>
						<div className="flex">
							<button onClick={() => setPage(0)} className="p-4 rounded-xl bg-gray-200 mr-4 flex justify-center">
								<Icon_Activity_Payment_ArrLeft />
							</button>
							<button
								className={`button ${!isDefault && "opacity-60"} button-Medium-White  p-4 w-full rounded-xl bg-primary_6`}
								type="submit"
								disabled={isDefault ? false : true}
								onClick={(e) => {
									onClickUpdateCard(e);
								}}
							>
								{t("global_update")}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	};

	const AddCardModal = () => {
		const [expDetails, setExpDetails] = useState("");
		const [name, setName] = useState("");
		const [number, setNumber] = useState("");
		const [cvc, setCvc] = useState("");
		const [typeCard, setTypeCard] = useState("credit");
		const [isDefaultAdd, setIsDefaultAdd] = useState(false);

		const handleName = (e) => {
			if (e.target.value.match("^[a-zA-Z ]*$") != null) {
				setName(e.target.value.toUpperCase());
			}
		};

		const handleNumber = (e) => {
			setNumber(e.target.value);
		};

		const handleCvc = (e) => {
			setCvc(e.target.value);
		};

		const handleExpDetails = (e) => {
			setExpDetails(e.target.value);
		};

		const month = expDetails.slice(0, 2);
		const year = expDetails.slice(-4);

		const getTypeCard = (event) => {
			setTypeCard(event.target.value);
		};

		const onClickAddCard = (e) => {
			e.preventDefault();

			var params = {
				path: globalData.api_channel.card,
				token: true,
				data: {
					name: name,
					number: number,
					exp_month: month,
					exp_year: year,
					cvc: cvc,
					is_default: isDefaultAdd,
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
										onClickAddCard();
									}
								}
							});
						} else {
							popupHandle(2, t("popup_error"), res.status.message, true);
						}
					} else {
						popupHandle(0, t("popup_success"), t("payment_add_card_success"), false);

						const list = typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay);
						var newData = res.data.data;
						newData.method = "card";
						newData.type = newData.cardType;
						newData.default = false;
						list.push(newData);
						setListCard(list);
						ContextData.gateWay = list;
						window.localStorage.setItem("gateWay", JSON.stringify(list));

						console.log("==================================== onClickAddCard");
						console.log(res.data);
						console.log("====================================");
					}
				})
				.catch((err) => {
					console.log("==================================== onClickAdd");
					console.log(err);
					console.log("==================================== err");
					popupHandle(2, t("popup_error"), err.response.data.status.message, true);
				});
		};

		return (
			<>
				<div className="payment payment-layout">
					<NavTopTitleAction Title={t("payment_add_new")} Back={() => router.back()} />
					<div className="add-method payment-layout-inner-large">
						<div className="tool-sort w-full pb-5 bg-primary_6">
							<Swiper className="list mySwipe" loop={false} slidesPerView={"auto"}>
								{dataMethod.map(function (items, index) {
									return (
										<Fragment key={index}>
											{items.type === "card" &&
												items.hasChildren &&
												items.children.map(function (child, index) {
													return (
														<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min" key={index}>
															<label
																className={`inline-flex items-center w-max bg-white bgo border-1 border-white border-opacity-20 rounded-xl px-3 py-2 ${
																	typeCard === child.value ? "bg-opacity-100" : "bg-opacity-0"
																}`}
																htmlFor={child.value}
															>
																<Image src={child.icon} width={16} height={16}></Image>
																<span className={typeCard === child.value ? "button-Medium-Pri-3 ml-3" : "button-Medium-White ml-3"}>{t(child.name)}</span>
																<input
																	type="radio"
																	name="sort"
																	id={child.value}
																	value={child.value}
																	checked={typeCard === child.value && true}
																	status={typeCard === child.value ? "true" : "false"}
																	onChange={getTypeCard}
																	className="hidden"
																/>
															</label>
														</SwiperSlide>
													);
												})}
										</Fragment>
									);
								})}
							</Swiper>
						</div>
						{typeCard === "credit" ? (
							<form className="add-method h-full px-5 pt-8 pb-4 flex flex-col justify-between items-start content-start flex-wrap w-full" onSubmit={onClickAddCard}>
								<div className="heading-group flex flex-row justify-between items-center flex-nowrap w-full pb-5">
									<h2 className="text heading-Label">{t("payment_card_info")}</h2>
									<div className="image w-120">
										<Swiper className="mySwipe h-6" loop={false} slidesPerView={"auto"}>
											<SwiperSlide className="max-w-2.5 text-center">
												<Icon_Global_Discover />
											</SwiperSlide>
											<SwiperSlide className="max-w-2.5 text-center">
												<Icon_Global_Visa />
											</SwiperSlide>
											<SwiperSlide className="max-w-2.5 text-center">
												<Icon_Global_Maestro />
											</SwiperSlide>
											<SwiperSlide className="max-w-2.5 text-center">
												<Icon_Global_Visa />
											</SwiperSlide>
										</Swiper>
									</div>
								</div>
								<div className="relative w-full flex flex-row justify-between items-start flex-wrap">
									<label htmlFor="full_name" className="w-full block p-2 mb-2 border-b-1 border_gray_1">
										<span className="full-name text-body-small text-gray_8"> {t("global_first_last_name")}</span>
										<input
											type="text"
											name="full_name"
											id="full_name"
											autoComplete="nope"
											required
											className="w-full text-medium text-gray_2 placeholder-gray_2 uppercase appearance-none focus:outline-none bg-transparent"
											defaultValue={name}
											onChange={handleName}
										/>
									</label>
									<label htmlFor="number_card" className="w-full block p-2 mb-2 border-b-1 border_gray_1">
										<span className="number-card  text-body-small text-gray_8"> {t("payment_card_number")}</span>
										<NumberFormat
											id="number_card"
											autoComplete="nope"
											format="#### #### #### ####"
											name="number_card"
											required
											className="w-full text-medium text-gray_2 placeholder-gray_2 appearance-none focus:outline-none bg-transparent"
											defaultValue={number}
											onChange={handleNumber}
										/>
									</label>
									<label htmlFor="date_card" className="w-50/8 block p-2 mb-2 border-b-1 border_gray_1">
										<span className="date-card text-body-small text-gray_8"> {t("global_mm/yy")}</span>
										<NumberFormat
											id="date_card"
											autoComplete="nope"
											format="##/####"
											name="date_card"
											required
											className="w-full text-medium text-gray_2 placeholder-gray_2 appearance-none focus:outline-none bg-transparent"
											defaultValue={expDetails}
											onChange={handleExpDetails}
										/>
									</label>
									<label htmlFor="CCV" className="w-50/8 block p-2 mb-2 border-b-1 border_gray_1">
										<span className="CCV text-body-small text-gray_8">
											<span className="CCV text-body-small text-gray_8">{t("payment_ccv")}</span>
										</span>
										<NumberFormat
											type="password"
											name="cvc"
											maxLength="3"
											required
											className="w-full text-medium text-gray_2 placeholder-gray_2 appearance-none focus:outline-none bg-transparent"
											defaultValue={cvc}
											onChange={handleCvc}
										/>
									</label>
								</div>
								<div className="flex items-center justify-center w-full py-3">
									<label htmlFor="toggle" className="flex items-center justify-between w-full py-3 lg:hover:">
										<span className="label-Bold_Gray "> {t("payment_choose_default")}</span>
										<div className="relative">
											<input type="checkbox" id="toggle" className="input-switch sr-only" onClick={() => setIsDefaultAdd(!isDefaultAdd)} />
											<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
											<div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition" />
										</div>
									</label>
								</div>
								<BtnGroup
									Title={t("payment_link_now")}
									Type="submit"
									ChangeClass={(name && number && expDetails && cvc) === "" && "bg-opacity-40"}
									Disblebtn={(name && number && expDetails && cvc) === "" && "disable"}
									Back={() => router.back()}
									IsGoBack={true}
								/>
							</form>
						) : (
							<>
								{dataMethod.map(function (items, index) {
									return (
										<Fragment key={index}>
											{items.type === "card" &&
												items.hasChildren &&
												items.children.map(function (child, index) {
													return (
														<Fragment key={index}>
															{typeCard === child.value && (
																<div className="add-method h-full px-5 pt-8 pb-4 flex flex-col justify-between items-start content-start flex-wrap w-full">
																	<div className="flex flex-col justify-center items-center p-5 text-center m-auto">
																		<div className="w-20 h-20 icon-Svg rounded-full bg-gray_12"></div>
																		<span className="heading-Label mt-5 mb-3">
																			{t("payment_connect_with")} {child.name}
																		</span>
																		<p className="text-Medium line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit</p>
																	</div>
																	{/* <BtnGroup Title="Liên kết ngay" Type="submit" Back={() => router.back()} /> */}
																</div>
															)}
														</Fragment>
													);
												})}
										</Fragment>
									);
								})}
							</>
						)}
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			{page === 0 ? <MethodAllModal /> : page === 1 ? <MethodDetailModal /> : page === 2 ? <AddCardModal /> : page === 3 ? <WalletDetailModal /> : null}
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
};

Payment.Layout = LayoutFullView;
export default withNamespaces()(Payment);
