import {
	Icon_Modal_Notify_Close,
	Icon_Modal_Notify_Delete,
	Icon_Modal_Notify_Error,
	Icon_Modal_Notify_Success,
	Icon_Modal_Notify_Warning,
} from "/public/icon/iconGlobal";

import { BtnGroup } from "/components/payment/LayoutPayment";
import { useEffect } from "react";

export default function ModalNotifyMedium({ modalNotify, setModalNotify, title, status, btnValue, meta, typeBtn, clickBtn, backBtn, isGoBack }) {
	useEffect(() => {
		if (modalNotify === true) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = " unset";
		}
	}, [modalNotify]);

	return (
		<>
			{modalNotify && (
				<div className="modal modal-payment-Small flex flex-col" status={status}>
					<div
						className="modal-fill"
						onClick={() => {
							setModalNotify(!modalNotify);
						}}
					></div>
					<div className="inner bg-white flex flex-col justify-start items-center mt-auto mb-0 z-1 rounded-tl-3xl rounded-tr-3xl px-6 pt-6 pb-10">
						<button
							className="close w-8 h-8 mr-0 ml-auto icon-Svg"
							onClick={() => {
								setModalNotify(!modalNotify);
							}}
						></button>
						<div className="icon-Svg rounded-full bg-gray_12 w-4.5 h-[72px] mb-8">
							{status === 0 ? (
								<Icon_Modal_Notify_Success />
							) : status === 1 ? (
								<Icon_Modal_Notify_Warning />
							) : status === 2 ? (
								<Icon_Modal_Notify_Error />
							) : status === 3 ? (
								<Icon_Modal_Notify_Delete />
							) : (
								<Icon_Modal_Notify_Error />
							)}
						</div>
						<span className="headline text-center text-gray_4 mb-4 lowercase first-letter:capitalize">{title}</span>
						<span className="meta text-Large-Gray opacity-60 text-center line-clamp-2 mb-8">{meta}</span>
						<BtnGroup Title={btnValue} Type={status === "success" ? "submit" : typeBtn} Click={clickBtn} Back={backBtn} IsGoBack={isGoBack} />
					</div>
				</div>
			)}
		</>
	);
}
