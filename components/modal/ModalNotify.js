import { Icon_Modal_Notify_Error, Icon_Modal_Notify_Success } from "../../public/icon/iconGlobal";

import { useEffect } from "react";

export default function ModalNotify({ modalNotify, setModalNotify, status, title, description }) {
	useEffect(() => {
		if (modalNotify === true) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = " unset";
		}
	}, [modalNotify]);

	// * 0: Success, 1: Warning, 2: Error
	const colorValue = status === "error" ? "bg-red_6" : status === "warning" ? "warning" : "bg-primary_6";
	const imgValue = status === "error" ? <Icon_Modal_Notify_Error /> : status === "warning" ? <Icon_Modal_Notify_Error /> : <Icon_Modal_Notify_Success />;

	return (
		<div
			className={` ${
				modalNotify ? "" : "hidden"
			} min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover `}
			id="modal-id"
		>
			<div className="absolute bg-black opacity-80 inset-0 z-0" onClick={() => setModalNotify(!modalNotify)} />
			<div className="w-100-32 max-w-md p-6 relative mx-auto my-auto rounded-3xl shadow-lg  bg-white ">
				<div className>
					<div className="text-center flex-auto justify-center">
						<div
							onClick={() => setModalNotify(!modalNotify)}
							className="close  cursor-pointer w-8 h-8 flex items-center justify-center ml-auto mr-0"
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M0.270363 0.270363C0.630847 -0.090121 1.21531 -0.090121 1.57579 0.270363L8 6.69457L14.4242 0.270363C14.7847 -0.090121 15.3692 -0.090121 15.7296 0.270363C16.0901 0.630847 16.0901 1.21531 15.7296 1.57579L9.30543 8L15.7296 14.4242C16.0901 14.7847 16.0901 15.3692 15.7296 15.7296C15.3692 16.0901 14.7847 16.0901 14.4242 15.7296L8 9.30543L1.57579 15.7296C1.21531 16.0901 0.630847 16.0901 0.270363 15.7296C-0.090121 15.3692 -0.090121 14.7847 0.270363 14.4242L6.69457 8L0.270363 1.57579C-0.090121 1.21531 -0.090121 0.630847 0.270363 0.270363Z"
									fill="black"
									fillOpacity="0.38"
								/>
							</svg>
						</div>
						<div className="thumbnail inline-flex p-4 bg-gray_12 rounded-full">{imgValue}</div>
						<h2 className="headline first-letter:capitalize font-bold pb-4 pt-8 text-gray_4 ">{title}</h2>
						<p className=" text-gray_4 opacity-60 text-base text first-letter:capitalize ">{description}</p>
					</div>
					<div className="mt-8 cursor-pointer text-center space-x-4 md:block">
						<div
							onClick={() => setModalNotify(!modalNotify)}
							className={` ${colorValue} first-letter:capitalize w-full md:mb-0   p-3.5 text-sm shadow-sm font-medium tracking-wider text-white rounded-xl`}
						>
							Đồng ý
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
