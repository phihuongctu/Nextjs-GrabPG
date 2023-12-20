import Link from "next/link";
import LayoutLogin from "/components/layout/LayoutLogin";
import { Icon_Global_GoBack, Icon_Global_Finger } from "/public/icon/iconGlobal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { post_api } from "../../global/apiHandle";
import globalData from "../../global/globalData";
import ModalNotify from "/components/modal/ModalNotify";
export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const router = useRouter();
	const [modalNotify, setModalNotify] = useState(false);
	const [popupContent, setPopupContent] = useState("");

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePass = (e) => {
		setPassword(e.target.value);
	};
	const handleRePassword = (e) => {
		setRePassword(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		var urlencoded = new URLSearchParams();
		urlencoded.append("email", email);
		urlencoded.append("password", password);
		urlencoded.append("display_name", email);

		var params = {
			path: globalData.api_channel.register,
			token: false,
			data: urlencoded,
		};

		post_api(params).then((res, err) => {
			if (err) {
				alert("register error");
				// TODO: Show popup register failed
			} else {
				if (res.status.error) {
					setPopupContent(res.status.message);
					setModalNotify(!modalNotify);
				} else {
					setPopupContent("Register success !");
					setModalNotify(!modalNotify);
					router.push("/");
				}
			}
		});
	};
	return (
		<form onSubmit={handleSubmit} className="form-wrap p-6 w-full lg:w-128 lg:p-14 h-full flex flex-col justify-between">
			<div>
				<div className="nav top flex flex-row justify-between items-center w-full pb-3.5" role="navigation">
					<button onClick={() => router.back()}>
						<a className="nav-left nav-back w-10 h-10 flex flex-row justify-center items-center rounded-full border border-gray_11">
							<Icon_Global_GoBack />
						</a>
					</button>
					<Link href="./login">
						<a className="nav-right nav-register text-large font-bold text-primary_6 ">Đăng nhập</a>
					</Link>
				</div>
				<div className="form login pt-4">
					<div className="form-inner flex flex-col min-h-96" method="post">
						<h1 className="title titleFr mb-4 capitalize headline text-gray_2">Đăng Ký</h1>
						<label htmlFor="username" className="block mb-2">
							<span className="hidden">Number phone or Usename</span>
							<input
								type="text"
								className="text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"
								id="username"
								required
								placeholder="Nhập số điện thoại / Email"
								onChange={handleEmail}
							/>
						</label>
						<label htmlFor="password" className="block mb-2">
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
						<label htmlFor="password" className="block mb-6">
							<span className="hidden">Nhập lại mật khẩu</span>
							<input
								type="password"
								className="text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"
								id="password"
								required
								placeholder="Nhập lại mật khẩu"
								onChange={handleRePassword}
							/>
						</label>
						<div className="flex items-center caption-1 ">
							<p className=" text-gray_4/50">
								Bạn muốn kiếm tiền cùng GrapPG ?
								<Link href="/">
									<a className="text-primary_6 font-semibold ml-1 ">Đăng ký đối tác</a>
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
					Đăng ký
				</button>
			</div>

			<ModalNotify modalNotify={modalNotify} setModalNotify={setModalNotify} title="Thông báo" description={popupContent} />
		</form>
	);
}

Register.Layout = LayoutLogin;
