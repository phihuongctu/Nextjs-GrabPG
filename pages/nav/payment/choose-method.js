import { ContextData, ContextUpdate } from "../../../global/contextData";
import { Fragment, useEffect, useState } from "react";
import {
	Icon_Activity_Payment_ArrLeft,
	Icon_Global_Arrow_Right,
	Icon_Global_Mastercard,
	Icon_Global_Vietinbank,
	Icon_Global_Visa,
	Icon_Payment_Checked,
	Icon_Payment_Wallet,
} from "/public/icon/iconGlobal";

import LayoutFullView from "/components/layout/LayoutFullView";
import { NavTopTitleAction } from "../../../components/payment/LayoutPayment";
import NumberFormat from "react-number-format";
import { dataEmpty } from "/components/payment/DataPayment";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

const chooseCard = ({ t }) => {
	const router = useRouter();
	const { goBack, pageBack } = router.query;
	const [input, setInput] = useState("");
	const [listCard, setListCard] = useState([]);
	const [flagSelected, setFlagSelected] = useState(false);
	const [defaultMethod, setDefaultMethod] = useState(0);
	const [goBackPath, setGoBackPath] = useState(null);
	const [goBackPage, setGoBackPage] = useState(0);

	useEffect(() => {
		setGoBackPage(typeof pageBack !== "undefined" ? pageBack : null);
		setGoBackPath(typeof goBack !== "undefined" ? goBack : null);
		setListCard(typeof ContextData.gateWay !== "undefined" ? ContextData.gateWay : JSON.parse(window.localStorage.gateWay));
		setDefaultMethod(typeof ContextData.defaultMethod !== "undefined" ? ContextData.defaultMethod : JSON.parse(window.localStorage.defaultMethod));
	}, []);

	const onClickSelectCard = (items, index) => {
		setInput(index);
		setFlagSelected(true);
		console.log("==================================== onClickSelectCard");
		console.log(index);
		console.log("====================================");
		ContextData.defaultMethod = index;
		window.localStorage.defaultMethod = index;
		setTimeout(() => {
			if (goBackPath === null) {
				router.push("/nav/payment");
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
		}, 500);
	};

	const onClickGoBack = () => {
		if (goBackPath === null) {
			router.push("/nav/payment");
		} else {
			if (goBackPage === null) {
				router.back();
			} else {
				router.push({
					pathname: goBackPath,
					query: {
						page: goBackPage,
					},
				});
			}
		}
	};

	return (
		<div className="payment payment-layout overflow-x-hidden lg:hidden w-full flex flex-col justify-start items-start">
			<NavTopTitleAction Title={t("payment_choose_payment_methods")} Back={() => onClickGoBack()} />
			<div className="choose relative pb-8 pt-17 mt-0 mb-auto w-full">
				<div className="list-method">
					{listCard.length > 0 ? (
						<>
							{listCard.map(function (items, index) {
								return (
									<div className="item px-5 group" key={index}>
										<label className="label  flex flex-row justify-between items-center flex-nowrap  py-3.5 border-t-1 border_gray_1 group-first-of-type:border-0">
											<input
												type="radio"
												name="method"
												className="hidden"
												id={typeof items.cardId != "undefined" ? items.cardId : index}
												value={items.type}
												checked={input === true}
												onChange={() => {
													onClickSelectCard(items, index);
												}}
											/>
											{flagSelected === false ? (
												<>
													<div className={` ${defaultMethod === index ? null : "grayscale"} icon-Svg svg-24 w-10 h-10 bg-gray_12 rounded-full mr-4`}>
														{items.type === "MasterCard" ? <Icon_Global_Mastercard /> : items.type === "Visa" ? <Icon_Global_Visa /> : <Icon_Payment_Wallet />}
													</div>
													<div className="relative flex-1 px-3">
														<span className={`name  ${defaultMethod === index ? "text-primary_6" : "  grayscale"} label-Bold_Gray ml-0 mr-auto`}>
															{(items.type !== "Token") & (items.type !== "Point") ? items.type + " **** **** " + items.cardLast4 : items.type}
														</span>
													</div>
													<span className="mr-2">{defaultMethod === index && <Icon_Payment_Checked />}</span>
												</>
											) : (
												<>
													<div className={` ${input === index ? null : "grayscale"} icon-Svg svg-24 w-10 h-10 bg-gray_12 rounded-full mr-4`}>
														{items.type === "MasterCard" ? <Icon_Global_Mastercard /> : items.type === "Visa" ? <Icon_Global_Visa /> : <Icon_Payment_Wallet />}
													</div>
													<div className="relative flex-1 px-3">
														<span className={`name  ${input === index ? "text-primary_6" : " grayscale"} label-Bold_Gray ml-0 mr-auto`}>
															{items.type === "Point" || items.type === "Token" ? items.type : items.type + " **** **** " + items.cardLast4}
														</span>
													</div>
													{input === index && <Icon_Payment_Checked />}
												</>
											)}
										</label>
									</div>
								);
							})}
						</>
					) : (
						<div className="empty h-68-85 relative w-full bg-white ">
							<div className="inner px-5 g h-full flex flex-col justify-start items-start flex-nowrap">
								{dataEmpty.map(function (items, index) {
									return (
										<Fragment key={index}>
											{items.type === "history" && (
												<div className="empty flex flex-col justify-center items-center py-7 text-center m-auto">
													<div className="w-16 h-16 icon-Svg rounded-full bg-gray_12">{items.icon}</div>
													<span className="heading-Label mt-5 mb-3">{items.heading}</span>
													<p className="text-Medium line-clamp-2">{items.meta}</p>
													<button className="button w-max button-Medium-Gray p-4 mt-5 rounded-xl bg-gray_12" value={items.button} type="submit">
														{items.button}
													</button>
												</div>
											)}
										</Fragment>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
chooseCard.Layout = LayoutFullView;
export default withNamespaces()(chooseCard);
