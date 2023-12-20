import {
	Icon_Menu_Bottom_Activity,
	Icon_Menu_Bottom_Activity_Active,
	Icon_Menu_Bottom_Compass,
	Icon_Menu_Bottom_Compass_Active,
	Icon_Menu_Bottom_Notification,
	Icon_Menu_Bottom_Notification_Active,
	Icon_Menu_Bottom_Profile,
	Icon_Menu_Bottom_Profile_Active,
	Icon_Menu_Bottom_Wallet,
	Icon_Menu_Bottom_Wallet_Active,
} from "/public/icon/iconGlobal";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const tabBottom = [
	{
		name: "Trang chủ",
		path: "/",
		icon: <Icon_Menu_Bottom_Compass />,
		iconActive: <Icon_Menu_Bottom_Compass_Active />,
	},
	{
		name: "Hoạt động",
		path: "/nav/activity/overview",
		icon: <Icon_Menu_Bottom_Activity />,
		iconActive: <Icon_Menu_Bottom_Activity_Active />,
	},
	{
		name: "Thanh toán",
		path: "/nav/payment",
		icon: <Icon_Menu_Bottom_Wallet />,
		iconActive: <Icon_Menu_Bottom_Wallet_Active />,
	},
	{
		name: "Thông báo",
		path: "/nav/notification",
		icon: <Icon_Menu_Bottom_Notification />,
		iconActive: <Icon_Menu_Bottom_Notification_Active />,
	},
	{
		name: "Tài khoản",
		path: "/nav/account",
		popup: true,
		icon: <Icon_Menu_Bottom_Profile />,
		iconActive: <Icon_Menu_Bottom_Profile_Active />,
	},
];

export default function MenuMobile() {
	const router = useRouter();
	// const [barMobile, setbarMobile] = useState(true);
	// const showSidebarMobile = () => setbarMobile(!barMobile);
	return (
		<div id="menu-mobile" className=" z-20 fixed bottom-0 left-0 right-0 pb-6 pt-1 bg-primary_3  shadow-lg lg:hidden">
			<div className="flex">
				{tabBottom.map(function (items, index) {
					return (
						<div className="flex-1 group flex items-center relative" key={index}>
							{typeof items.path !== "undefined" ? (
								<Link href={typeof items.path !== "undefined" && items.path}>
									<a
										className={` ${
											items.description === "home" ? " absolute -top-1/3" : ""
										} flex items-end justify-center text-center mx-auto  w-full text-white group-hover:text-white border-b-2 border-transparent `}
									>
										<div className="flex flex-col items-center  p-1  ">
											{items.path === router.pathname ? items.iconActive : items.icon}
											<span className=" block mt-2 capitalize text-smallest font-medium ">{items.name}</span>
										</div>
									</a>
								</Link>
							) : (
								<div className=" flex items-end justify-center text-center mx-auto  w-full text-white group-hover:text-white border-b-2 border-transparent ">
									<span className="flex flex-col items-center p-1 ">
										{items.icon}
										<span className=" block mt-2 capitalize text-smallest font-medium ">{items.name}</span>
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
