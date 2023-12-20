import { ContextData, ContextUpdate } from "/global/contextData";
import { Fragment, useEffect, useState } from "react";
import {
	Icon_Activity_Affiliate,
	Icon_Activity_Rank,
	Icon_Global_Arrow_Right,
	Icon_Global_Global,
	Icon_Global_Logout,
	Icon_Global_Package,
	Icon_Global_Pig_Bank,
	Icon_Global_Profile,
	Icon_Global_Promotion,
	Icon_Global_Rank_Member,
	Icon_Global_Support,
	Icon_Global_User_Info_Empty,
	Icon_Global_Work,
} from "/public/icon/iconGlobal";

import Image from "next/image";
import LayoutFullView from "/components/layout/LayoutFullView";
import Link from "next/link";
import ModalNotifyMedium from "/components/modal/ModalNotifyMedium";
import Theme from "/components/theme/Theme";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

const DataUser = {
	name: "Username",
	brand: "Premium",
	iconRank: <Icon_Activity_Rank />,
};

const menuList = [
	// {
	// 	name: "member",
	// 	description: "1.200 Điểm",
	// 	path: "/nav/account",
	// 	icon: <Icon_Global_Rank_Member />,
	// },
	// {
	// 	name: "ưu đãi",
	// 	description: "36 ưu đãi mới",
	// 	path: "/nav/account",
	// 	icon: <Icon_Global_Promotion />,
	// },
	{
		name: "hồ sơ cá nhân",
		description: "Mô tả tổng quan chuyên mục",
		path: "/nav/account/profile",
		icon: <Icon_Global_Profile />,
	},
	// {
	// 	name: "Đăng ký dịch vụ",
	// 	description: "Mô tả tổng quan chuyên mục",
	// 	path: "/nav/account/server",
	// 	icon: <Icon_Global_Profile />,
	// },
	// {
	// 	name: "thiết lập chung",
	// 	description: "Mô tả tổng quan chuyên mục",
	// 	path: "/nav/account",
	// 	icon: <Icon_Global_Global />,
	// },
	{
		name: "Bảo mật",
		description: "Mô tả tổng quan chuyên mục",
		path: "/nav/account/security",
		icon: <Icon_Global_Global />,
	},
	{
		name: "Sổ địa chỉ",
		description: "Mô tả tổng quan chuyên mục",
		path: "/nav/account/address",
		icon: <Icon_Global_Global />,
	},
	// {
	// 	name: "mời bạn bè",
	// 	description: "Mô tả tổng quan chuyên mục",
	// 	path: "/nav/account",
	// 	icon: <Icon_Activity_Affiliate />,
	// },
	// {
	// 	name: "gói hội viên",
	// 	description: "Mô tả tổng quan chuyên mục",
	// 	path: "/nav/account",
	// 	icon: <Icon_Global_Package />,
	// },
	// {
	// 	name: "gửi tiết kiệm",
	// 	description: "Mô tả tổng quan chuyên mục",
	// 	path: "/nav/account",
	// 	icon: <Icon_Global_Pig_Bank />,
	// },
	// {
	// 	name: "trung tâm trợ giúp",
	// 	description: "Mô tả tổng quan chuyên mục",
	// 	path: "/nav/account",
	// 	icon: <Icon_Global_Support />,
	// },
	{
		name: "Sắt đang test tính năng",
		description: "Nhấn vào sẽ lỗi đó ahihi",
		path: "/nav/account/test",
		icon: <Icon_Global_Work />,
	},
];

const Account = ({ barMobile, setbarMobile, t }) => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [token, setToken] = useState(false);
	const [err, setErr] = useState(false);
	const [popupTitle, setPopupTitle] = useState("");
	const [popupStatus, setPopupStatus] = useState(0);
	const [btnBack, setBtnBack] = useState(true);
	const [popupContent, setPopupContent] = useState("");
	const [flagPopup, setFlagPopup] = useState(false);
	const [popupBtnPath, setPopupBtnPath] = useState("");

	useEffect(() => {
		setToken(typeof ContextData.loginInfo !== "undefined" ? ContextData.loginInfo.accessToken : JSON.parse(window.localStorage.loginInfo).accessToken);
		setName(typeof ContextData.userInfo !== "undefined" ? ContextData.userInfo.display_name : JSON.parse(window.localStorage.userInfo).display_name);
		setAvatar(typeof ContextData.userInfo !== "undefined" ? ContextData.userInfo.photoURL : JSON.parse(window.localStorage.userInfo).photoURL);
	}, [token, name, avatar]);

	const srcAvatar = typeof avatar !== "undefined" ? <Image src={avatar} width={40} height={40} alt="profile user" className="rounded-full" /> : <Icon_Global_User_Info_Empty />;

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

	const logoutHandle = () => {
		window.localStorage.removeItem("loginInfo");
		window.localStorage.removeItem("userInfo");
		router.push("/auth");
	};

	return (
		<>
			<nav id="sidebar" className={`${barMobile ? " block " : " "} h-nav-mobile w-full  fixed flex flex-col top-0 left-0 right-0 z-20 bg-white dark:bg-gray-1  lg:hidden `}>
				{token ? (
					<div className="flex items-center px-5 py-3.5 bg-primary_6 ">
						<div className="h-10 rounded-full">{srcAvatar}</div>
						<div className="flex-1 ml-4 pr-4">
							<div className="text-white capitalize text-large">{name}</div>

							<div className="flex items-center caption-1">
								<i className="mr-2">{DataUser.iconRank}</i>
								<div className=" text-yellow_3 capitalize">{DataUser.brand}</div>
							</div>
						</div>
						<div className="">
							<Theme />
						</div>
					</div>
				) : err ? (
					<div className="flex items-center px-5 py-3.5 bg-primary_6 ">
						<div className="h-10">{srcAvatar}</div>
						<div className="flex-1 ml-4 pr-4">
							<div className="text-white capitalize text-large">{name}</div>

							<div className="flex items-center caption-1">
								<i className="mr-2">{DataUser.iconRank}</i>
								<div className=" text-yellow_3 capitalize">{DataUser.brand}</div>
							</div>
						</div>
						<div className="">
							<Theme />
						</div>
					</div>
				) : null}
				<ul id="slide-menu" className=" overflow-y-auto  menu slide-menu flex-1">
					{menuList.map(function (items, index) {
						return (
							<Fragment key={index}>
								<li>
									{typeof items.path !== "undefined" ? (
										<Link href={items.path} scroll={false}>
											<a
												// onClick={(e) => showDropdown(index)}
												className="py-3.5 px-5 group hover:bg-primary_10  flex items-center justify-between border-bottom dark:border-white dark:border-opacity-20 cursor-pointer font-semibold text-sm"
											>
												<i className="p-2 bg-gray_12 text-gray_4 hover:text-blue-600 dark:text-white dark:bg-gray-3 rounded-full">{items.icon}</i>
												<div className="flex flex-1 flex-col px-4">
													<span className="label-bold group-hover:text-primary_6 capitalize   mb-1">{items.name}</span>
													<span className="caption-1 text-gray_4 dark:text-white dark:group-hover:text-black opacity-60">{items.description}</span>
												</div>
												<i className="text-gray-500 group-hover:text-blue-600">
													<Icon_Global_Arrow_Right />
												</i>
											</a>
										</Link>
									) : null}
								</li>
							</Fragment>
						);
					})}
					<li>
						<a
							onClick={() => {
								popupHandle(1, t("popup_warning_system"), t("popup_are_you_sure_logout"), true);
							}}
							class="py-3.5 px-5 group hover:bg-primary_10  flex items-center justify-between border-bottom dark:border-white dark:border-opacity-20 cursor-pointer font-semibold text-sm"
						>
							<i class="p-2 bg-gray_12 text-gray_4 hover:text-blue-600 dark:text-white dark:bg-gray-3 rounded-full">
								<Icon_Global_Logout />
							</i>
							<div class="flex flex-1 flex-col px-4">
								<span class="label-bold group-hover:text-primary_6 capitalize   mb-1">Đăng xuất</span>
								<span class="caption-1 text-gray_4 dark:text-white dark:group-hover:text-black opacity-60">Đăng xuất tài khoản</span>
							</div>
							<i class="text-gray-500 group-hover:text-blue-600">
								<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.25 2.50977L7.75 6.00977L4.25 9.50977" stroke="#4A4754" stroke-linecap="round" stroke-linejoin="round"></path>
								</svg>
							</i>
						</a>
					</li>

					<div className="banner py-3.5 px-6 grid place-items-center">
						<Image src="/img/banner.jpg" width={375} height={92} />
					</div>
				</ul>
			</nav>
			<ModalNotifyMedium
				modalNotify={flagPopup}
				setModalNotify={setFlagPopup}
				status={popupStatus}
				title={popupTitle}
				meta={popupContent}
				clickBtn={() => {
					setFlagPopup(!flagPopup);
					logoutHandle();
				}}
				backBtn={() => setFlagPopup(!flagPopup)}
				btnValue={t("global_agree")}
				isGoBack={btnBack}
			/>
		</>
	);
};
Account.Layout = LayoutFullView;
export default withNamespaces()(Account);
