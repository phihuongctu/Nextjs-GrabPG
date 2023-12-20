import * as Yup from "yup";

import { ContextData, SaveDataToContext } from "../global/contextData";
import { Icon_Global_Finger, Icon_Global_GoBack_Gray } from "/public/icon/iconGlobal";
import { useEffect, useState } from "react";

import LayoutLogin from "/components/layout/LayoutLogin";
import Link from "next/link";
import ModalNotify from "/components/modal/ModalNotify";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import globalData from "/global/globalData";
import i18n from "/global/language/i18n";
import { post_api } from "/global/apiHandle";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function Login({ t }) {
	const router = useRouter();
	const [modalNotify, setModalNotify] = useState(false);
	const [status, setStatus] = useState(0);
	const [page, setPage] = useState(0);
	const [popupTitle, setPopupTitle] = useState("");
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [popupBtnPath, setPopupBtnPath] = useState("");

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

	const LoginModal = () => {
		const frmLogin = useFormik({
			initialValues: {
				email: "",
				password: "",
			},
			validationSchema: Yup.object({
				email: Yup.string().email(t("invalid_email")).required(t("please_input_data")),
				password: Yup.string().min(6, t("minimum_6_characters")).required(t("please_input_data")),
			}),
			onSubmit: (values) => {
				var params = {
					path: globalData.api_channel.login,
					token: false,
					data: {
						email: values.email,
						password: values.password,
					},
				};

				post_api(params)
					.then((res) => {
						if (res.status.error) {
							popupHandle(2, t("popup_error"), res.data.status.message, false);
						} else {
							SaveDataToContext("loginInfo", {
								userId: res.data.data.user.id,
								accessToken: res.data.data.token.accessToken,
								refreshToken: res.data.data.token.refreshToken,
							});
							router.push("/");
						}
					})
					.catch((err) => {
						console.log("==================================== LoginModal");
						console.log(err.response.data.status.message);
						console.log("==================================== err");

						popupHandle(2, t("popup_error"), err.response.data.status.message, false);
					});
			},
		});

		return (
			<form onSubmit={frmLogin.handleSubmit} className="form-wrap p-6 mx-auto w-full lg:w-128 lg:p-14 h-full flex flex-col justify-between">
				<div>
					<div className="nav top flex flex-row justify-between items-center w-full pb-3.5" role="navigation">
						<button onClick={() => router.back()}>
							<a className="nav-left nav-back w-10 h-10 flex flex-row justify-center items-center rounded-full border border-gray_11">
								<Icon_Global_GoBack_Gray />
							</a>
						</button>
						<button
							onClick={() => {
								setPage(1);
							}}
						>
							<a className="nav-right nav-register text-large font-bold text-primary_6 ">{t("account_register")}</a>
						</button>
					</div>
					<div className="form login pt-4">
						<div className="form-inner flex flex-col min-h-96" method="post">
							<h1 className="title titleFr mb-4 capitalize headline text-gray_2">{t("account_login")}</h1>
							<label htmlFor="username" className="block mb-2">
								<span className="hidden">{t("account_enter_phone_email")}</span>
								<input
									type="text"
									name="email"
									id="username"
									className={` ${
										frmLogin.errors.email ? "border-red_6" : "border-gray"
									}  text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2e"`}
									placeholder={t("account_enter_phone_email")}
									required
									value={frmLogin.values.email}
									onChange={frmLogin.handleChange}
								/>
								{frmLogin.errors.email && frmLogin.touched.email && <p className="text-body-small text-red_6">{frmLogin.errors.email}</p>}
							</label>
							<label htmlFor="password" className="block mb-4">
								<span className="hidden">{t("account_password")}</span>
								<input
									type="password"
									name="password"
									id="password"
									required
									className={` ${
										frmLogin.errors.email ? "border-red_6" : "border-gray"
									}  text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2e"`}
									placeholder={t("account_enter_password")}
									value={frmLogin.values.password}
									onChange={frmLogin.handleChange}
								/>
								{frmLogin.errors.password && frmLogin.touched.password && <p className="text-body-small text-red_6">{frmLogin.errors.password}</p>}
							</label>
							<div className="forgot flex flex-row justify-end items-center flex-nowrap pb-4">
								<a className="lost-pw text-medium text-gray_2" onClick={() => setPage(2)}>
									{t("account_forgot_password")}
								</a>
							</div>
							<a
								// type="submit"
								className="Finger cursor-pointer border text-medium border-gray_11 rounded-xl py-3 px-4 flex items-center justify-center mb-4"
								name="login"
							>
								<Icon_Global_Finger />
								<span className="ml-3">{t("account_fingerprint_unlock")}</span>
							</a>
							<div className="flex items-center caption-1 ">
								<p className=" text-gray_4/50">
									{t("account_partner_grabpg")}
									<Link href="/">
										<a className="text-primary_6 font-semibold ml-1 ">{t("account_partner_login")}</a>
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button type="submit" className="finger border text-medium bg-primary_6 text-white w-full rounded-xl py-3 px-4 flex items-center justify-center mb-2 " name="login">
						{t("account_login")}
					</button>
				</div>
			</form>
		);
	};

	const RegisterModal = () => {
		const router = useRouter();

		const frmRegister = useFormik({
			initialValues: {
				email: "",
				password: "",
				rePassword: "",
			},
			validationSchema: Yup.object({
				email: Yup.string().email(t("invalid_email")).required(t("please_input_data")),
				password: Yup.string().min(6, t("minimum_6_characters")).required(t("please_input_data")),
				rePassword: Yup.string().min(6, t("minimum_6_characters")).required(t("please_input_data")),
			}),
			onSubmit: (values) => {
				var params = {
					path: globalData.api_channel.register,
					token: false,
					data: {
						email: values.email,
						password: values.password,
						display_name: values.email,
					},
				};

				post_api(params)
					.then((res) => {
						if (res.status.error) {
							popupHandle(2, t("popup_error"), res.data.status.message, false);
						} else {
							popupHandle(0, t("popup_success"), res.data.status.message, false);

							setTimeout(() => {
								router.push("/");
							}, 2000);
						}
					})
					.catch((err) => {
						console.log("==================================== RegisterModal");
						console.log(err.response.data.status.message);
						console.log("==================================== err");

						popupHandle(2, t("popup_error"), err.response.data.status.message, false);
					});
			},
		});

		return (
			<form onSubmit={frmRegister.handleSubmit} className="form-wrap p-6 w-full lg:w-128 lg:p-14 h-full flex flex-col justify-between">
				<div>
					<div className="nav top flex flex-row justify-between items-center w-full pb-3.5" role="navigation">
						<button onClick={() => router.back()}>
							<a className="nav-left nav-back w-10 h-10 flex flex-row justify-center items-center rounded-full border border-gray_11">
								<Icon_Global_GoBack_Gray />
							</a>
						</button>
						<div onClick={() => setPage(0)}>
							<a className="nav-right nav-register text-large font-bold text-primary_6 ">{t("account_login")}</a>
						</div>
					</div>
					<div className="form login pt-4">
						<div className="form-inner flex flex-col min-h-96" method="post">
							<h1 className="title titleFr mb-4 capitalize headline text-gray_2">{t("account_register")}</h1>
							<label htmlFor="username" className="block mb-2">
								<span className="hidden">{t("account_enter_phone_email")}</span>
								<input
									type="text"
									id="username"
									name="email"
									required
									placeholder={t("account_enter_email")}
									className={` ${
										frmLogin.errors.email ? "border-red_6" : "border-gray"
									}  text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"`}
									value={frmRegister.values.email}
									onChange={frmRegister.handleChange}
								/>
							</label>
							{frmRegister.errors.email && frmRegister.touched.email && <p className="text-body-small text-red_6">{frmRegister.errors.email}</p>}
							<>
								<label htmlFor="password" className="block mb-2">
									<span className="hidden">{t("account_password")}</span>
									<input
										type="password"
										id="password"
										name="password"
										required
										placeholder={t("account_enter_password")}
										className={` ${
											frmLogin.errors.password ? "border-red_6" : "border-gray"
										}  text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"`}
										value={frmRegister.values.password}
										onChange={frmRegister.handleChange}
									/>
								</label>
								{frmRegister.errors.password && frmRegister.touched.password && <p className="text-body-small text-red_6">{frmRegister.errors.password}</p>}
								<label htmlFor="password" className="block mb-6">
									<span className="hidden">{t("account_re_enter_password")}</span>
									<input
										type="password"
										id="password"
										name="rePassword"
										required
										placeholder={t("account_enter_email")}
										className={` ${
											frmLogin.errors.rePassword ? "border-red_6" : "border-gray"
										}  text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"`}
										value={frmRegister.values.rePassword}
										onChange={frmRegister.handleChange}
									/>
								</label>
								{frmRegister.errors.rePassword && frmRegister.touched.rePassword && <p className="text-body-small text-red_6">{frmRegister.errors.rePassword}</p>}
							</>
							<div className="flex items-center caption-1 ">
								<p className=" text-gray_4/50">
									{t("account_make_money_grabpg")}
									<Link href="/">
										<a className="text-primary_6 font-semibold ml-1 ">{t("account_partner_register")}</a>
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button type="submit" className="finger border text-medium bg-primary_6 text-white w-full rounded-xl py-3 px-4 flex items-center justify-center mb-2 " name="login">
						{t("account_register")}
					</button>
				</div>
			</form>
		);
	};

	const ForgotModal = () => {
		return (
			<form className="form-wrap p-6 w-full lg:w-128 lg:p-14 h-full flex flex-col justify-between">
				<div>
					<div className="nav top flex flex-row justify-between items-center w-full pb-3.5" role="navigation">
						<a onClick={() => router.back()} className="nav-left cursor-pointer nav-back w-10 h-10 flex flex-row justify-center items-center rounded-full border border-gray_11">
							<Icon_Global_GoBack_Gray />
						</a>
					</div>
					<div className="form login pt-4">
						<div className="form-inner flex flex-col min-h-96" method="post">
							<h1 className="title titleFr mb-4 capitalize headline text-gray_2">{t("account_forgot_password")}</h1>
							<p className="text-body-small text-gray_8 mb-2">Chúng tối sẽ gửi mã xác thực OTP về số điện thoại / email của bạn</p>
							<label htmlFor="username" className="block mb-2">
								<span className="hidden">{t("account_enter_phone_email")}</span>
								<input
									type="text"
									className="text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"
									id="username"
									placeholder={t("account_enter_phone_email")}
								/>
							</label>
						</div>
					</div>
				</div>
				<div>
					<button type="submit" className="finger border text-medium bg-primary_6 text-white w-full rounded-xl py-3 px-4 flex items-center justify-center mb-2 " name="login">
						{t("global_continuos")}
					</button>
				</div>
			</form>
		);
	};

	return (
		<>
			{page === 0 ? <LoginModal /> : page === 1 ? <RegisterModal /> : page === 2 ? <ForgotModal /> : null}
			<ModalNotifyMedium
				modalNotify={flagPopup}
				setModalNotify={setFlagPopup}
				status={popupStatus}
				title={popupTitle}
				meta={popupContent}
				clickBtn={() => {
					setFlagPopup(!flagPopup);
				}}
				backBtn={() => setFlagPopup(!flagPopup)}
				btnValue={t("global_agree")}
				isGoBack={btnBack}
			/>
		</>
	);
}

Login.Layout = LayoutLogin;
export default withNamespaces()(Login);
