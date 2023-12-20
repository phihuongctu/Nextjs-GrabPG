import { Icon_Global_Finger, Icon_Global_GoBack } from "/public/icon/iconGlobal";
import { useEffect, useState } from "react";

import LayoutLogin from "/components/layout/LayoutLogin";
import Link from "next/link";
import ModalNotify from "/components/modal/ModalNotify";
import globalData from "../../global/globalData";
import { post_api } from "../../global/apiHandle";
import { useRouter } from "next/router";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//modal notify
	const [modalNotify, setModalNotify] = useState(false);
	const [popupContent, setPopupContent] = useState("");
	const [status, setStatus] = useState(0);

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePass = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		var urlencoded = new URLSearchParams();
		urlencoded.append("email", email);
		urlencoded.append("password", password);

		var params = {
			path: globalData.api_channel.login,
			token: false,
			data: urlencoded,
		};

		post_api(params).then((res, err) => {
			console.log("==================================== login");
			console.log(res);
			console.log("====================================");
			if (err) {
				setPopupContent("Login failed !");
				setModalNotify(!modalNotify);
				setStatus(2);
			} else {
				if (res.status.error) {
					setStatus(2);
					setPopupContent(res.status.message);
					setModalNotify(!modalNotify);
				} else {
					setPopupContent("Login success !");
					setModalNotify(!modalNotify);
					setStatus(0);
					var loginData = {
						userId: res.data.user.id,
						accessToken: res.data.token.accessToken,
						refreshToken: res.data.token.refreshToken,
					};
					window.localStorage.setItem("loginInfo", JSON.stringify(loginData));
					setTimeout(() => {
						router.push("/");
					}, 2000);
				}
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="form-wrap p-6 mx-auto w-full lg:w-128 lg:p-14 h-full flex flex-col justify-between">
			<div>
				<div className="nav top flex flex-row justify-between items-center w-full pb-3.5" role="navigation">
					<button onClick={() => router.back()}>
						<a className="nav-left nav-back w-10 h-10 flex flex-row justify-center items-center rounded-full border border-gray_11">
							<Icon_Global_GoBack />
						</a>
					</button>
					{/* <Link href="/auth/register">
						<a className="nav-right nav-register text-large font-bold text-primary_6 ">Đăng ký</a>
					</Link> */}
					<button
						onClick={() => {
							router.push("/auth/register", undefined, { shallow: true });
						}}
					>
						<a className="nav-right nav-register text-large font-bold text-primary_6 ">Đăng ký</a>
					</button>
				</div>
				<div className="form login pt-4">
					<div className="form-inner flex flex-col min-h-96" method="post">
						<h1 className="title titleFr mb-4 capitalize headline text-gray_2">Đăng Nhập</h1>
						<label htmlFor="username" className="block mb-2">
							<span className="hidden">Number phone or email</span>
							<input
								type="text"
								className="text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"
								id="username"
								placeholder="Nhập số điện thoại / email"
								required
								onChange={handleEmail}
							/>
						</label>
						<label htmlFor="password" className="block mb-4">
							<span className="hidden">Password</span>
							<input
								type="password"
								className="text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"
								id="password"
								required
								placeholder="Nhập mật khẩu"
								onChange={handlePass}
							/>
						</label>
						<div className="forgot flex flex-row justify-end items-center flex-nowrap pb-4">
							<Link href="/auth/forgot">
								<a className="lost-pw text-medium text-gray_2">Quên mật khẩu</a>
							</Link>
						</div>
						<a
							// type="submit"
							className="Finger cursor-pointer border text-medium border-gray_11 rounded-xl py-3 px-4 flex items-center justify-center mb-4"
							name="login"
						>
							<Icon_Global_Finger />
							<span className="ml-3">Mở khóa bằng vân tay</span>
						</a>
						<div className="flex items-center caption-1 ">
							<p className=" text-gray_4/50">
								Bạn là đối tác của GrabPG ?
								<Link href="/">
									<a className="text-primary_6 font-semibold ml-1 ">Đăng nhập đối tác</a>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<button
					type="submit"
					className="finger border text-medium bg-primary_6 text-white w-full rounded-xl py-3 px-4 flex items-center justify-center mb-2 "
					name="login"
				>
					Đăng nhập
				</button>
			</div>

			<ModalNotify modalNotify={modalNotify} setModalNotify={setModalNotify} status={status} title="Thông báo" description={popupContent} />
		</form>
	);
}

Login.Layout = LayoutLogin;
