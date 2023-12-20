import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import {
	Icon_Activity_Noti_FoodGray,
	Icon_Global_Search_White,
	Icon_Noti_Chat,
	Icon_Noti_Discount,
	Icon_Noti_DotNotice,
	Icon_Noti_Empty,
	Icon_Noti_Head,
	Icon_Noti_Setting,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";

import LayoutFullView from "/components/layout/LayoutFullView";
import Link from "next/link";
import { NavTopTitle } from "../../../components/payment/LayoutPayment";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Notification() {
	const [status, setStatus] = useState("Tất cả");
	const router = useRouter();
	const dataTagNotify = [
		{
			tag: "Tất cả",
		},
		{
			tag: "Dịch vụ & Thanh toán",
		},
		{
			tag: "Ưu đãi",
		},
		{
			tag: "Hệ thống",
		},
		{
			tag: "Đăng nhập & thiết bị",
		},
	];
	const dataNotify = [
		{
			time: "20:00",
			day: "19",
			month: "T10",
			title: "Khuyến mãi đặc biệt",
			content: "Đặt hẹn nhận ưu đãi lên đến 70%",
			tag: "Ưu đãi",
			readed: false,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			title: "Thay đổi mật khẩu",
			content: "Bạn vừa cập nhật mật khẩu mới",
			tag: "Hệ thống",
			readed: false,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			title: "Khuyến mãi đặc biệt",
			content: "Đặt hẹn nhận ưu đãi lên đến 70%",
			tag: "Ưu đãi",
			readed: true,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			title: "Thay đổi mật khẩu",
			content: "Bạn vừa cập nhật mật khẩu mới",
			tag: "Hệ thống",
			readed: true,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			title: "Thay đổi mật khẩu",
			content: "Bạn vừa cập nhật mật khẩu mới",
			tag: "Hệ thống",
			readed: true,
		},
	];

	return (
		<div id="notification" className=" bg-white h-screen">
			<NavTopTitle Title="Thông báo" To={() => router.push("/nav/notification/chat")}>
				<Icon_Noti_Chat />
			</NavTopTitle>
			<div className=" bg-primary_6 w-full text-center pt-17">
				<div className="flex justify-center">
					<Icon_Noti_Head />
				</div>
				<div className="flex flex-nowrap h-12 m-4 my-0 bg-white-12 border-solid border-search border-opacity-50 border bg-opacity-30 rounded-xl p-4">
					<Icon_Global_Search_White />
					<input type="text" placeholder="Tìm kiếm..." className="w-full ml-4 outline-none bg-white bg-opacity-0 placeholder-white"></input>
				</div>
				<div>
					<Swiper slidesPerView={"auto"} className="mySwiper sm:w-80" loop={true}>
						{dataTagNotify.map(function (item, index) {
							const changeStatus = () => setStatus(item.tag);
							return (
								<SwiperSlide key={index} className="max-w-min">
									<Link href="#">
										<div
											className={`bg-white bg-opacity-10 border-opacity-50 border border-solid w-min px-3 py-2 justify-start ml-3 my-5 rounded-xl text-white text-sm cursor-pointer
                                        ${item.tag === status ? " bg-white bg-opacity-95 text-primary_3" : ""}`}
											onClick={changeStatus}
										>
											<span className="whitespace-nowrap">{item.tag}</span>
										</div>
									</Link>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
			<div className=" contents items-center min-h-96 text-black px-2">
				{dataNotify.length === 0 ? (
					<div className="grid justify-center text-center items-center py-28 mx-10">
						<div className="grid justify-center ">
							<div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full">
								<Icon_Noti_Empty />
							</div>
						</div>
						<span className="mb-3 mt-5 text-lg font-semibold">Bạn chưa có thông báo nào !</span>
						<span className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit suspendisse commodo.</span>
						<div className="flex justify-center">
							<button className="p-4 my-5 w-max bg-gray-100 font-bold rounded-xl">Trải nghiệm ngay</button>
						</div>
					</div>
				) : (
					dataNotify.map(function (item, index) {
						return (
							<>
								{status === "Tất cả" ? (
									<div
										className={`flex border-b mt-3 pb-3 justify-between items-center px-5 ${item.readed === true ? "opacity-50" : ""}`}
										key={index}
									>
										<div className="right-0 bottom-0 bg-white rounded-full p-1">
											{item.tag === "Ưu đãi" ? (
												<Icon_Noti_Discount />
											) : item.tag === "Hệ thống" ? (
												<Icon_Noti_Setting />
											) : (
												<Icon_Activity_Noti_FoodGray />
											)}
										</div>
										<div className="grid items-center w-full ml-4">
											<span className={`text-base text-primary_6 ${item.readed === true ? " text-gray-500" : ""}`}>{item.time}</span>
											<h3 className=" text-base font-bold flex items-center">
												{item.title}
												<div className={`ml-2 flex items-center ${item.readed === true ? "hidden" : "block"}`}>
													<Icon_Noti_DotNotice />
												</div>
											</h3>
											<span className=" text-xs text-gray-500">{item.content}</span>
										</div>
										<div className="text-gray-600 grid px-4 content-center">
											<div className=" border border-opacity-50 rounded-t-lg text-4 px-4">{item.month}</div>
											<div className=" border border-t-0  border-opacity-50 rounded-b-lg text-5 py-2 px-4">{item.day}</div>
										</div>
									</div>
								) : item.tag === status ? (
									<div className={`flex border-b mt-3 pb-3 justify-between px-2 ${item.readed === true ? "opacity-50" : ""}`} key={index}>
										<div className="right-0 bottom-0 bg-white rounded-full p-1">
											{item.tag === "Ưu đãi" ? (
												<Icon_Noti_Discount />
											) : item.tag === "Hệ thống" ? (
												<Icon_Noti_Setting />
											) : (
												<Icon_Noti_FoodGray />
											)}
										</div>
										<div className="grid items-center w-full">
											<span className={`text-base text-primary_6 ${item.readed === true ? " text-gray-500" : ""}`}>{item.time}</span>
											<h3 className=" text-base font-bold flex items-center">
												{item.title}
												<div className={`ml-2 flex items-center ${item.readed === true ? "hidden" : "block"}`}>
													<Icon_Noti_DotNotice />
												</div>
											</h3>
											<span className=" text-xs text-gray-500">{item.content}</span>
										</div>
										<div className="text-gray-600 grid px-4 content-center">
											<div className=" border border-opacity-50 rounded-t-lg text-4 px-4">{item.month}</div>
											<div className=" border border-t-0  border-opacity-50 rounded-b-lg text-5 py-2 px-4">{item.day}</div>
										</div>
									</div>
								) : null}
							</>
						);
					})
				)}
			</div>
		</div>
	);
}
Notification.Layout = LayoutFullView;
