import {
	Icon_Global_Vietinbank,
	Icon_Payment_Barcode_Bar,
	Icon_Payment_Barcode_QR,
	Icon_Payment_FlashLight,
	Icon_Payment_QR,
	Icon_Payment_QR_Background,
	Icon_Payment_Question,
	Icon_Payment_Wallet,
	Icon_Payment_Wallet_White,
} from "/public/icon/iconGlobal";
import { React, useEffect, useState } from "react";

import { ContextData } from "/global/contextData";
import CurrencyFormat from "react-currency-format";
import { NavTopTitleAction } from "/components/payment/LayoutPayment";
import { NavTopTitleActionNoBg } from "/components/payment/LayoutPayment";
import { get_total_balance } from "/global/apiHandle";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function Payment({ t }) {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		get_total_balance();
		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : window.localStorage.points);
	}, []);

	const QrWalletModal = () => {
		return (
			<div className="payment overflow-x-hidden lg:hidden w-full h-screen flex flex-col justify-start items-start">
				<NavTopTitleActionNoBg Title={t("qr_scan_code")} Back={() => router.back()}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Payment_Question />
					</button>
				</NavTopTitleActionNoBg>
				<div className="relative mt-0 mb-auto w-full h-full flex flex-col justify-start items-stretch">
					<div className="fill w-full h-screen overflow-hidden bg-gray_13 bg-opacity-50 backdrop-blur-sm z-1 fixed top-0 left-0"></div>
					<Icon_Payment_QR_Background />
					<div className="frame relative w-full z-1 m-auto px-16 text-center">
						<span className="text-Large">{t("qr_code_in_frame")}</span>
						<div className="frame-qr w-60 h-60 m-auto border-1 border-white mt-8  flex flex-col">
							<div className="light mt-auto mb-6 flex flex-col justify-center items-center wf text-center">
								<Icon_Payment_FlashLight />
								<span className="label-Bottom_White mt-2">{t("qr_turn_on_flashlight")}</span>
							</div>
						</div>
					</div>
					<div className="button w-full z-1 pb-8">
						<button
							className="rounded-xl p-4 text-gray_11 bg-white bg-opacity-20 backdrop-blur-sm flex flex-row justify-center items-center m-auto"
							value="add-method"
							type="submit"
							onClick={() => setPage(1)}
						>
							<Icon_Payment_QR />
							<span className="button-Medium-White ml-3">{t("qr_qr_codebar")}</span>
						</button>
					</div>
					<div className="relative flex flex-row justify-start items-center flex-nowrap z-1 px-4 pt-5 pb-8 bg-white bg-opacity-10 backdrop-blur-2xl">
						<div className="w-10 h-10 bg-white bg-opacity-20 rounded-full icon-Svg">
							<Icon_Payment_Wallet_White />
						</div>
						<CurrencyFormat
							value={points}
							displayType={"text"}
							thousandSeparator="."
							decimalSeparator=","
							className="price label-Bold_White ml-3 mr-1"
						/>
						<span className="label-Bold_White">{t("global_point")}</span>
						{points <= 5000000 ? (
							<span className="status ml-3 text-small text-red_6_1 border-1 border-red_6_2 rounded-3xl px-3 py-1">{t("qr_low")}</span>
						) : points > 5000000 ? (
							<span className="status ml-3 text-small text-orange_6 border-1 border-orange_6 rounded-3xl px-3 py-1">{t("qr_medium")}</span>
						) : points > 10000000 ? (
							<span className="status ml-3 text-small text-primary_6 border-1 border-primary_6 rounded-3xl px-3 py-1">{t("qr_hight")}</span>
						) : (
							0
						)}

						<button
							onClick={() => router.push("/nav/payment/deposit")}
							className="button text-small text-white px-4 py-2 rounded-xl bg-primary_6 ml-auto mr-0"
							value="add-method"
							type="submit"
						>
							{t("qr_recharges_money")}
						</button>
					</div>
				</div>
			</div>
		);
	};

	const ShowQrModal = () => {
		const [modalBar, setModalBar] = useState(false);
		const [modalQr, setModalQr] = useState(false);
		const [timer, setTimer] = useState(59);

		useEffect(() => {
			if ((modalBar, modalQr)) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = " unset";
			}

			timerCount();
		}, [modalBar, modalQr]);

		const timerCount = () => {
			var time = 59;
			var value = "";
			setInterval(() => {
				time--;
				value = time.toString() + "s";
				setTimer(value);
				if (time === 0) clearInterval;
			}, 1000);
		};

		return (
			<div className="payment overflow-x-hidden lg:hidden w-full h-screen flex flex-col justify-start items-start">
				<NavTopTitleAction Title={t("qr_scan_code")} Back={() => router.back()}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Payment_Question />
					</button>
				</NavTopTitleAction>
				<div className="relative mt-0 mb-auto pt-17 w-full h-full flex flex-col justify-start items-stretch bg-primary_3">
					<div className="frame-qr w-full h-full m-auto px-5 py-8 flex flex-col justify-center items-center">
						<div className="inner w-full h-full bg-white rounded-2xl flex flex-col justify-between items-center text-center p-8">
							<span className="text-Large text-gray-1">{t("qr_barcoder_cashiery")}</span>
							<div className="code-bar w-full cursor-pointer" onClick={() => setModalBar(!modalBar)}>
								<div className="inner h-16 relative">
									<Icon_Payment_Barcode_Bar />
								</div>
							</div>
							<div className="relative">
								<button className="text-Small">{t("qr_click_enlarge")}</button>
							</div>
							<div className="code-qr cursor-pointer" onClick={() => setModalQr(!modalQr)}>
								<div className="inner w-52 h-52 m-auto relative">
									<Icon_Payment_Barcode_QR />
								</div>
							</div>
							<div className="relative flex items-center">
								<div className="text-body-small flex items-center">
									{t("qr_auto_update")} {timer}
								</div>
								<span className="text-medium ml-1 text-primary_6">{t("global_update")}</span>
							</div>
						</div>
					</div>
					<div className="relative flex flex-row justify-start items-center flex-nowrap z-1 px-4 pt-5 pb-8 bg-white">
						<div className="w-10 h-10 bg-gray_11 rounded-full icon-Svg">
							<Icon_Payment_Wallet />
						</div>
						<CurrencyFormat
							value={points}
							displayType={"text"}
							thousandSeparator="."
							decimalSeparator=","
							className="price  label-Bold_Gray ml-3 mr-1"
						/>
						<span className="label-Bold_Gray">{t("global_point")}</span>
						<span className="status text-small ml-3 text-red_6_1 border-1 border-red_6_2 rounded-3xl px-3 py-1">{t("qr_low")}</span>
						<button
							onClick={() => router.push("/nav/payment/deposit")}
							className="button text-small text-white px-4 py-2 rounded-xl bg-primary_6 ml-auto mr-0"
							value="add-method"
							type="submit"
						>
							{t("qr_recharges_money")}
						</button>
					</div>
				</div>
				{modalBar && (
					<div className="modal-payment" onClick={() => setModalBar(!modalBar)}>
						<div className="inner relative w-full h-full p-6 flex flex-col justify-center items-center text-center">
							<div className="code-bar w-full pb-5">
								<div className="inner h-36 relative m-auto">
									<Icon_Payment_Barcode_Bar />
								</div>
							</div>
							<span className="text-body-small text-gray-1 text-opacity-60 ">{t("qr_not_share_code")}</span>
						</div>
					</div>
				)}
				{modalQr && (
					<div className="modal-payment" onClick={() => setModalQr(!modalQr)}>
						<div className="inner relative w-full h-full flex flex-col justify-center items-center text-center px-5">
							<div className="code-qr pb-5">
								<div className="inner w-52 h-52 m-auto relative">
									<Icon_Payment_Barcode_QR />
								</div>
							</div>
							<span className="text-body-small text-gray-1 text-opacity-60 ">{t("qr_not_share_code")}</span>
						</div>
					</div>
				)}
			</div>
		);
	};

	// const QrCardModel = () => {
	// 	return (
	// 		<div className="payment overflow-x-hidden lg:hidden w-full h-screen flex flex-col justify-start items-start">
	// 			<NavTopTitleActionNoBg Title="Quét mã" Back={() => router.back()}>
	// 				<button className="w-5 h-5 mr-0 ml-auto">
	// 					<Icon_Payment_Question />
	// 				</button>
	// 			</NavTopTitleActionNoBg>
	// 			<div className="relative mt-0 mb-auto w-full h-full flex flex-col justify-start items-stretch">
	// 				<div className="fill w-full h-screen overflow-hidden bg-gray_13 bg-opacity-50 backdrop-blur-sm z-1 fixed top-0 left-0"></div>
	// 				<Icon_Payment_QR_Background />
	// 				<div className="frame relative w-full z-1 m-auto px-16 text-center">
	// 					<span className="text-Large ">{t("qr_code_in_frame")}</span>
	// 					<div className="frame-qr w-60 h-60 m-auto border-1 border-white mt-8  flex flex-col">
	// 						<div className="light mt-auto mb-6 flex flex-col justify-center text-center">
	// 							<Icon_Payment_FlashLight />
	// 							<span className="label-Bottom_White mt-2">{t("qr_turn_on_flashlight")}</span>
	// 						</div>
	// 					</div>
	// 				</div>
	// 				<div className="button w-full z-1 pb-8">
	// 					<button
	// 						className="rounded-xl p-4 text-gray_11 bg-white bg-opacity-20 backdrop-blur-sm flex flex-row justify-center items-center m-auto"
	// 						value="add-method"
	// 						type="submit"
	// 					>
	// 						<Icon_Payment_QR />
	// 						<span className="button-Medium-White ml-3"> {t("qr_qr_codebar")}</span>
	// 					</button>
	// 				</div>
	// 				<div className="relative flex flex-row justify-start items-center flex-nowrap z-1 px-4 pt-5 pb-8 bg-white bg-opacity-10 backdrop-blur-2xl">
	// 					<div className="w-10 h-10 bg-white bg-opacity-20 rounded-full icon-Svg">
	// 						<Icon_Global_Vietinbank />
	// 					</div>
	// 					<span className="label-Bold_White mx-3">Vietinbank</span>
	// 					<button className="button button-Medium-White px-4 py-2 rounded-xl bg-primary_6 ml-auto mr-0" value="add-method" type="submit">
	// 						{t("qr_change")}
	// 					</button>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	return <>{page === 0 ? <QrWalletModal /> : page === 1 ? <ShowQrModal /> : page === 2 ? <ShowQrModal /> : null}</>;
}
export default withNamespaces()(Payment);
