import Link from "next/link";
import { Icon_Global_GoBack, Icon_Global_Finger } from "/public/icon/iconGlobal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutLogin from "/components/layout/LayoutLogin";
export default function Forgot() {
	const router = useRouter();
	return (
		<form className="form-wrap p-6 w-full lg:w-128 lg:p-14 h-full flex flex-col justify-between">
			<div>
				<div className="nav top flex flex-row justify-between items-center w-full pb-3.5" role="navigation">
					<a
						onClick={() => router.back()}
						className="nav-left cursor-pointer nav-back w-10 h-10 flex flex-row justify-center items-center rounded-full border border-gray_11"
					>
						<Icon_Global_GoBack />
					</a>
				</div>
				<div className="form login pt-4">
					<div className="form-inner flex flex-col min-h-96" method="post">
						<h1 className="title titleFr mb-4 capitalize headline text-gray_2">Quên mật khẩu</h1>
						<p className="text-body-small text-gray_8 mb-2">Chúng tối sẽ gửi mã xác thực OTP về số điện thoại / email của bạn</p>
						<label htmlFor="username" className="block mb-2">
							<span className="hidden">Number phone or email</span>
							<input
								type="text"
								className="text-body-small text-gray_8 w-full h-14 border-b focus:outline-none focus:border-primary_6 bg-transparent px-2"
								id="username"
								placeholder="Nhập số điện thoại / email"
							/>
						</label>
					</div>
				</div>
			</div>
			<div>
				<button
					type="submit"
					className="finger border text-medium bg-primary_6 text-white w-full rounded-xl py-3 px-4 flex items-center justify-center mb-2 "
					name="login"
				>
					Tiếp tục
				</button>
			</div>
		</form>
	);
}

Forgot.Layout = LayoutLogin;
