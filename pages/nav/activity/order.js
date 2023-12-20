import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import {
	Icon_Activity_ArrDown,
	Icon_Activity_BirthCake,
	Icon_Activity_Body,
	Icon_Activity_Calendar,
	Icon_Activity_Checked,
	Icon_Activity_Dot,
	Icon_Activity_Female,
	Icon_Activity_FemaleGreen,
	Icon_Activity_FoodGreen,
	Icon_Activity_FoodLg,
	Icon_Activity_Gift,
	Icon_Activity_Graduation,
	Icon_Activity_Height,
	Icon_Activity_Home,
	Icon_Activity_Libra,
	Icon_Activity_Location,
	Icon_Activity_Micro,
	Icon_Activity_Movie,
	Icon_Activity_Payment_ArrLeft,
	Icon_Activity_Payment_ArrSwap,
	Icon_Activity_Sport,
	Icon_Activity_Star,
	Icon_Activity_Swim,
	Icon_Activity_Time,
	Icon_Activity_Travel,
	Icon_Activity_Weigh,
	Icon_Global_Arrow_Right,
	Icon_Global_GoBack_Bottom,
	Icon_Global_Heart,
	Icon_Global_Vietinbank,
	Icon_Payment_Head,
} from "/public/icon/iconGlobal";
import React, { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { dataMethod, dataStatus } from "../../../components/payment/DataPayment";
import { useRouter, withRouter } from "next/router";

import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import ImageUser from "/public/img/img_user_info.png";
import ImageUserLeft from "/public/img/user-detail/user-detail_img_user_left.svg";
import ImageUserRight from "/public/img/user-detail/user-detail_img_user_right.svg";
import Link from "next/link";
import { NavTopTitleAction } from "../../../components/payment/LayoutPayment";

// install Swiper modules
SwiperCore.use([Pagination]);
export default function OrderInfo() {
	const router = useRouter();

	console.log("==================================== OrderInfo");
	console.log(router);
	console.log("====================================");

	const [flagInfoUser, setFlagInfoUser] = useState(true);
	const [page, setPage] = useState(0);
	const [choose, setChoose] = useState();
	const [status, setStatus] = useState("");
	const dataInfo = [
		{
			icon: <Icon_Activity_FoodGreen />,
			title: "Đi dự tiệc",
		},
		{
			icon: <Icon_Activity_Movie />,
			title: "Đi xem phim",
		},
		{
			icon: <Icon_Activity_Micro />,
			title: "Đi karaoke",
		},
		{
			icon: <Icon_Activity_Travel />,
			title: "Đi du lịch",
		},
		{
			icon: <Icon_Activity_Swim />,
			title: "Đi bơi",
		},
		{
			icon: <Icon_Activity_Sport />,
			title: "Chơi thể thao",
		},
		{
			icon: <Icon_Activity_FemaleGreen />,
			title: "Nữ",
		},
		{
			icon: <Icon_Activity_BirthCake />,
			title: "18 tuổi",
		},
		{
			icon: <Icon_Activity_Libra />,
			title: "Thiên bình",
		},
		{
			icon: <Icon_Activity_Weigh />,
			title: "60kg",
		},
		{
			icon: <Icon_Activity_Height />,
			title: "1m84",
		},
		{
			icon: <Icon_Activity_Body />,
			title: "87 - 76 - 96",
		},
		{
			icon: <Icon_Activity_Home />,
			title: "Cần Thơ",
		},
		{
			icon: <Icon_Activity_Graduation />,
			title: "Đại học",
		},
	];
	const dataDiscount = [
		{
			id: 1,
			title: "Giảm 50k",
			content: "Giảm ngay 50.000 cho hóa đơn trên 500.000",
			date: "Hết hạn vào 20/8/2021",
		},
		{
			id: 2,
			title: "Giảm 50k",
			content: "Giảm ngay 50.000 cho hóa đơn trên 500.000",
			date: "Hết hạn vào 20/8/2021",
		},
		{
			id: 3,
			title: "Giảm 50k",
			content: "Giảm ngay 50.000 cho hóa đơn trên 500.000",
			date: "Hết hạn vào 20/8/2021",
		},
		{
			id: 4,
			title: "Giảm 50k",
			content: "Giảm ngay 50.000 cho hóa đơn trên 500.000",
			date: "Hết hạn vào 20/8/2021",
		},
		{
			id: 5,
			title: "Giảm 50k",
			content: "Giảm ngay 50.000 cho hóa đơn trên 500.000",
			date: "Hết hạn vào 20/8/2021",
		},
	];
	const dataCancel = [
		{
			title: "Thay đổi thời gian hẹn",
		},
		{
			title: "Thay đổi dịch vụ",
		},
		{
			title: "Không thích nữa",
		},
		{
			title: "Có lựa chọn khác",
		},
		{
			title: "Phản hồi chậm",
		},
		{
			title: "Bận đột xuất",
		},
		{
			title: "Khác",
		},
	];

	const InfoUserModal = () => {
		return (
			<div className="flex flex-wrap mb-32">
				{dataInfo.length > 0
					? dataInfo.map(function (item, index) {
							return (
								<div className="w-4/12 text-center mt-5" key={index}>
									<div className="grid items-center justify-center mb-2">
										<div className="p-3 bg-gray-200 rounded-full flex items-center">{item.icon}</div>
									</div>
									<span className="text-5">{item.title}</span>
								</div>
							);
					  })
					: null}
			</div>
		);
	};

	const InfoRatingModal = () => {
		return (
			<div className="flex flex-wrap mb-32">
				{dataInfo.length > 0
					? dataInfo.map(function (item, index) {
							return (
								<div className="w-4/12 text-center mt-5" key={index}>
									<div className="grid items-center justify-center mb-2">
										<div className="p-3 bg-gray-200 rounded-full flex items-center">{item.icon}</div>
									</div>
									<span className="text-5">{item.title}</span>
								</div>
							);
					  })
					: null}
			</div>
		);
	};

	const PartnerInfoModal = () => {
		return (
			<div className="bg-white text-gray_4 w-full overflow-auto tracking-3 leading-18">
				<NavTopTitleAction Title="Lịch sử" Back={() => router.back()}>
					<div
						className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap"
						onClick={() => {
							router.push("/nav/activity");
						}}
					>
						{dataStatus.map(function (items, index) {
							return (
								<Fragment key={index}>
									{items.status === "verification" && (
										<>
											{dataMethod.map(function (items, index) {
												return (
													<Fragment key={index}>
														{items.type === "wallet" &&
															items.hasChildren &&
															items.children.map(function (child, index) {
																return (
																	<Fragment key={index}>
																		<Icon_Payment_Head />
																		<CurrencyFormat
																			value={child.total}
																			displayType={"text"}
																			thousandSeparator="."
																			decimalSeparator=","
																			className="total text-Large ml-2"
																		/>
																	</Fragment>
																);
															})}
													</Fragment>
												);
											})}
										</>
									)}
								</Fragment>
							);
						})}
					</div>
				</NavTopTitleAction>

				<div className=" text-center pt-17">
					<>
						<Swiper pagination={true} className="mySwiper">
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" objectFit={"cover"} />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
						</Swiper>
					</>
				</div>
				<div className="bg-primary_6 flex py-4 items-center text-white">
					<div className="p-2 bg-gray_12 rounded-full mx-4 flex items-center min-w-max">
						<Icon_Global_Heart />
					</div>
					<div className="grid w-full">
						<span className="text-1 leading-15 tracking-2 font-semibold mb-0.5 ">Đi dự tiệc</span>
						<span className="text-3 leading-14 tracking-6  text-yellow_2 ">Đang chờ chấp nhận</span>
					</div>
					<div className="mx-4 px-2 py-1 bg-white bg-opacity-20 rounded-md text-base_2 leading-18 tracking-8">19:59</div>
				</div>
				<div className="p-5 ">
					<h2 className="text-2xl tracking-8 font-bold text-gray-2">Trương Hoàng Mai Anh</h2>
					<span className=" text-5 leading-18  text-gray_4">Sẵn sàng từ 12:00 - 11/06/2021 </span>
					<div className="flex justify-between pt-3">
						<div className="flex items-center bg-gray_12 rounded-2xl px-2 min-w-max">
							<Icon_Activity_Female />
							<span className="ml-2 text-3 leading-14 tracking-6"> 18</span>
						</div>
						<div className="flex items-center w-full mx-2">
							<Icon_Activity_Dot />
							<Icon_Activity_Star />
							<span className="ml-2 text-3 leading-14 tracking-6">5</span>
						</div>
						<div className="flex items-center font-semibold text-7 leading-20 tracking-8 text-primary_6 ">
							200.000
							<span className=" text-5 text-gray_4 opacity-60 whitespace-nowrap ml-2 "> / giờ</span>
						</div>
					</div>
				</div>
				<div className="p-4 border mx-4 relative tracking-2">
					<div className=" absolute opacity-30 right-0">
						<div className=" absolute opacity-30 right-0">
							<Icon_Activity_FoodLg />
						</div>
					</div>
					<div className="grid text-left pb-4">
						<span className=" text-2 leading-16 font-semibold tracking-8">Đi dự tiệc</span>
						<span className=" text-5 text-gray_4 tracking-3 leading-18">Nguyễn Vũ Icafe Hẻm 51 - Hồ Bún Xáng</span>
					</div>
					<div className="pr-5 text-5 flex flex-wrap">
						<div className="flex items-center justify-between pb-2 pr-2">
							<div className="pr-2 flex items-center">
								<div className="pr-2 flex items-center">
									<Icon_Activity_Calendar />
								</div>
							</div>
							<span className="leading-15">18:00 - 20/8/2021</span>
						</div>
						<div className="flex items-center justify-between pb-2">
							<div className="pr-2 flex items-center">
								<Icon_Activity_Time />
							</div>
							<span className="leading-15">4 giờ</span>
						</div>
						<span className=" text-5 text-gray_4 tracking-3 leading-18">Nguyễn Vũ Icafe Hẻm 51 - Hồ Bún Xáng</span>
					</div>
				</div>
				<div>
					<div className="flex justify-between py-4">
						<span
							className="hover:text-primary_6 hover:border-b-2 border-primary_6 p-4 flex justify-center w-6/12 items-center text-sm font-semibold"
							onClick={() => {
								setFlagInfoUser(true);
							}}
						>
							Thông tin
						</span>
						<span
							className="hover:text-primary_6 hover:border-b-2 border-primary_6 p-4 flex justify-center w-6/12 items-center text-sm font-semibold"
							onClick={() => {
								setFlagInfoUser(false);
							}}
						>
							Đánh giá
						</span>
					</div>
					<div>{flagInfoUser === true ? <InfoUserModal /> : <InfoRatingModal />}</div>
				</div>
				<div className="fixed flex bottom-0 inset-x-0 bg-white p-4 lg:pb-4">
					<button className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4">
						<Icon_Activity_Payment_ArrLeft />
					</button>
					<button
						className="p-4 bg-primary_6 rounded-xl text-center text-5 leading-4 font-semibold w-full text-white"
						onClick={() => {
							setPage(1);
						}}
					>
						Tiếp Tục
					</button>
				</div>
			</div>
		);
	};

	const RequestModal = () => {
		return (
			<div className="bg-white relative w-full text-gray_4 leading-18 tracking-3 overflow-auto">
				<NavTopTitleAction Title="Gửi" Back={() => router.back()}></NavTopTitleAction>
				<div className="flex justify-center items-center mb-16 m-12 pt-17">
					<div className="relative left-4">
						<Image src={ImageUserLeft} width="160" height="160"></Image>
					</div>
					<div className="w-12 h-12 bg-white rounded-full flex justify-center items-center absolute z-1">
						<Icon_Global_Heart />
					</div>
					<div className="relative right-4">
						<Image src={ImageUserRight} width="160" height="160"></Image>
					</div>
				</div>
				<div className="text-center w-full h-full">
					<h2 className="text-2xl font-bold tracking-8 ">Đi dự tiệc</h2>
					<span className="text-5 py-3">Nguyễn Vũ Icafe Hẻm 51 - Hồ Búng Xáng </span>
					<h3 className="p-5 text-left text-2 leading-16 tracking-8 font-semibold">Thông tin cuộc hẹn</h3>
					<div className="pr-5 text-5">
						<div className="flex items-center justify-between pb-2 border-b">
							<div className="p-4 pl-5">
								<Icon_Activity_Calendar />
							</div>
							<div className="grid w-full text-left">
								<span className=" text-gray_8">Bắt đầu</span>
								<span className="font-semibold text-gray_2 leading-4 tracking-7">18:00 - 20/8/2021</span>
							</div>
							<div>
								<Icon_Activity_ArrDown />
							</div>
						</div>
						<div className="flex items-center justify-between pb-2 border-b">
							<div className="p-4 pl-5">
								<Icon_Activity_Time />
							</div>
							<div className="grid w-full text-left">
								<span className="text-gray_8">Tổng thời gian</span>
								<span className="font-semibold text-gray_2 leading-4 tracking-7">4 giờ</span>
							</div>
							<div>
								<Icon_Activity_ArrDown />
							</div>
						</div>
						<div className="flex items-center justify-between pb-2 border-b">
							<div className="p-4 pl-5">
								<Icon_Activity_Location />
							</div>
							<div className="grid w-full text-left">
								<span className="text-gray_8">Điểm hẹn</span>
								<span className=" text-5 text-gray_4 tracking-3 leading-18">Nguyễn Vũ Icafe Hẻm 51 - Hồ Bún Xáng</span>
							</div>
						</div>
						<div className="flex justify-between text-sm text-gray_8 px-5 pt-5">
							<span>Lời nhắc</span>
							<span>180/200</span>
						</div>
						<textarea className=" h-auto w-full bg-white  text-sm border-b outline-none mx-auto pt-5 px-5 text-gray_2">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non aliquam sit consequat tellus habitasse eu sit vulputate volutpat erat
						</textarea>
					</div>
					<h3 className="p-5 text-left text-2 leading-16 font-semibold flex justify-between items-center tracking-8">
						Ưu đãi
						<span className="flex items-center text-xs  ">
							<Icon_Activity_Gift /> <span className=" pl-2 tracking-6 opacity-60">Mã quà tặng</span>
						</span>
					</h3>
					<Swiper
						className="mySwiper mx-5"
						loop={true}
						breakpoints={{
							320: {
								slidesPerView: 1,
							},
							450: {
								slidesPerView: 2,
							},
							// when window width is >= 768px
							768: {
								slidesPerView: 3,
							},
						}}
					>
						{dataDiscount.map(function (item, index) {
							const Choose = () => setChoose(item.id);
							return (
								<SwiperSlide className="w-9/12 sm:w-3/5 md:w-2/5 pb-2 px-1" key={index}>
									<a onClick={Choose}>
										<div className="flex group justify-between mr-3 rounded-xl border relative">
											<div className={`absolute right-0 top-0 group-hover:block ${choose != item.id ? "hidden" : ""}`}>
												<Icon_Activity_Checked />
											</div>
											<div
												className={`p-4 m-3  group-hover:bg-primary_6 group-hover:bg-opacity-30 
                                        group-hover:text-primary_6 text-3 font-semibold rounded-md tracking-5 
                                        ${choose != item.id ? "bg-gray-200 text-dark_medium" : "text-primary_6 bg-primary_6 bg-opacity-30 "}`}
											>
												{item.title}
											</div>
											<div className="grid py-4 pr-6  text-left">
												<span className=" text-5 font-medium mb-1">{item.content}</span>
												<span className={`text-3 group-hover:text-red_6 ${choose != item.id ? "" : "text-red_6"}`}>{item.date}</span>
											</div>
										</div>
									</a>
								</SwiperSlide>
							);
						})}
					</Swiper>
					<h3 className="p-5 text-left  text-2 leading-16 font-semibold flex justify-between items-center ">
						Phương thức thanh toán
						<Link href="/nav/payment/manage">
							<div className="flex items-center text-xs text-gray_8 tracking-6">
								<span className="mr-3">Quản lý</span>
								<Icon_Global_Arrow_Right />
							</div>
						</Link>
					</h3>
					<Link href="/nav/payment/choose-method">
						<div className="flex justify-between mx-5 border rounded-xl items-center">
							<div className="p-2 m-3 bg-gray-200 min-w-max flex items-center rounded-full">
								<Icon_Global_Vietinbank />
							</div>
							<div className="grid text-left w-full">
								<span className="text-1 font-bold tracking-2">Vietinbank</span>
								<span className="text-4 opacity-60 tracking-6">Mặc định</span>
							</div>
							<div className="min-w-max flex items-center">
								<Icon_Activity_Payment_ArrSwap />
							</div>
							<span className="text-3 opacity-60 p-5 pl-2 tracking-5">Chọn</span>
						</div>
					</Link>

					<h3 className="p-5 text-left  text-2 leading-16  font-semibold tracking-8">Tóm lượt</h3>
					<div className="pb-10 tracking-2 text-gray_4 leading-15">
						<div className="text-1 flex justify-between px-5 pb-5">
							<span className=" opacity-60">Đi dự tiệc</span>
							<span>
								200.000 <span className="leading-17 tracking-5"> / giờ</span>
							</span>
						</div>
						<div className="text-1 flex justify-between px-5 pb-5">
							<span className="opacity-60">Tổng thời gian</span>
							<span>4 giờ</span>
						</div>
						<div className="text-1 flex justify-between px-5 pb-5">
							<span className="opacity-60">Ưu đãi</span>
							<span>-50.000</span>
						</div>
						<div className="text-1 flex justify-between px-5 pb-5">
							<span className="opacity-60">Phương thức thanh toán</span>
							<span>Paypal</span>
						</div>
						<div className="text-1 flex justify-between px-5 pb-5">
							<span className="opacity-60">Phí giao dịch</span>
							<span>0</span>
						</div>
					</div>
					<div className="fixed bottom-0 inset-x-0 z-10 pb-20 lg:pb-4 bg-white pt-4">
						<div className="flex justify-between px-4 items-center">
							<span className="font-semibold text-1 text-gray_8">Tổng cộng</span>
							<span className="font-semibold text-xl text-primary_6">800.000</span>
						</div>
						<div className="flex p-4">
							<Link href="#">
								<button className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4">
									<Icon_Activity_Payment_ArrLeft />
								</button>
							</Link>
							<button
								className="p-4 bg-primary_6 rounded-xl text-center text-5 text-white font-semibold w-full"
								onClick={() => {
									setPage(2);
								}}
							>
								Gửi ngay
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const WaitingModal = () => {
		return (
			<div className="bg-white text-gray_4 w-full overflow-auto tracking-3 leading-18">
				<NavTopTitleAction Title="Lịch sử" Back={() => router.back()}>
					<div
						className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap"
						onClick={() => router.push("/nav/payment")}
					>
						{dataStatus.map(function (items, index) {
							return (
								<Fragment key={index}>
									{items.status === "verification" && (
										<>
											{dataMethod.map(function (items, index) {
												return (
													<Fragment key={index}>
														{items.type === "wallet" &&
															items.hasChildren &&
															items.children.map(function (child, index) {
																return (
																	<Fragment key={index}>
																		<Icon_Payment_Head />
																		<CurrencyFormat
																			value={child.total}
																			displayType={"text"}
																			thousandSeparator="."
																			decimalSeparator=","
																			className="total text-Large ml-2"
																		/>
																	</Fragment>
																);
															})}
													</Fragment>
												);
											})}
										</>
									)}
								</Fragment>
							);
						})}
					</div>
				</NavTopTitleAction>

				<div className=" text-center pt-17">
					<>
						<Swiper pagination={true} className="mySwiper">
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" objectFit={"cover"} />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={ImageUser} width="375" height="563" />
							</SwiperSlide>
						</Swiper>
					</>
				</div>
				<div className="bg-primary_6 flex py-4 items-center text-white">
					<div className="p-2 bg-gray_12 rounded-full mx-4 flex items-center min-w-max">
						<Icon_Global_Heart />
					</div>

					<div className="grid w-full">
						<span className="text-1 leading-15 tracking-2 font-semibold mb-0.5 ">Đi dự tiệc</span>
						<span className="text-3 leading-14 tracking-6  text-yellow_2 ">Đang chờ chấp nhận</span>
					</div>
					<div className="mx-4 px-2 py-1 bg-white bg-opacity-20 rounded-md text-base_2 leading-18 tracking-8">19:59</div>
				</div>
				<div className="p-5 ">
					<h2 className="text-2xl tracking-8 font-bold text-gray-2">Trương Hoàng Mai Anh</h2>
					<span className=" text-5 leading-18  text-gray_4">Sẵn sàng từ 12:00 - 11/06/2021 </span>
					<div className="flex justify-between pt-3">
						<div className="flex items-center bg-gray_12 rounded-2xl px-2 min-w-max">
							<Icon_Activity_Female />
							<span className="ml-2 text-3 leading-14 tracking-6"> 18</span>
						</div>
						<div className="flex items-center w-full mx-2">
							<Icon_Activity_Dot />
							<Icon_Activity_Star />
							<span className="ml-2 text-3 leading-14 tracking-6">5</span>
						</div>
						<div className="flex items-center font-semibold text-7 leading-20 tracking-8 text-primary_6 ">
							200.000<span className=" text-5 text-gray_4 opacity-60 whitespace-nowrap ml-2 "> / giờ</span>
						</div>
					</div>
				</div>
				<div className="p-4 border mx-4 relative tracking-2">
					<div className=" absolute opacity-30 right-0">
						<Icon_Activity_FoodLg />
					</div>
					<div className="grid text-left pb-4">
						<span className=" text-2 leading-16 font-semibold tracking-8">Đi dự tiệc</span>
						<span className=" text-5 text-gray_4 tracking-3 leading-18">Nguyễn Vũ Icafe Hẻm 51 - Hồ Bún Xáng</span>
					</div>
					<div className="pr-5 text-5 flex flex-wrap">
						<div className="flex items-center justify-between pb-2 pr-2">
							<div className="pr-2 flex items-center">
								<Icon_Activity_Calendar />
							</div>
							<span className="leading-15">18:00 - 20/8/2021</span>
						</div>
						<div className="flex items-center justify-between pb-2">
							<div className="pr-2 flex items-center">
								<Icon_Activity_Time />
							</div>
							<span className="leading-15">4 giờ</span>
						</div>
						<div className="flex items-center justify-between pb-2">
							<div className="pr-2 flex items-center">
								<Icon_Activity_Location />
							</div>
							<span className="overflow-hidden overflow-ellipsis whitespace-nowrap leading-15">Nguyễn Vũ Icafe Hẻm 51 - Hồ Búng Xáng</span>
						</div>
					</div>
				</div>
				<div>
					<div className="flex justify-between py-4">
						<span className=" hover:text-primary_6 hover:border-b-2 border-primary_6 p-4 flex justify-center w-6/12 items-center text-sm font-semibold">
							Thông tin
						</span>
						<span className="hover:text-primary_6 hover:border-b-2 border-primary_6 p-4 flex justify-center w-6/12 items-center text-sm font-semibold">
							Đánh giá
						</span>
					</div>
					<div className="flex flex-wrap mb-32">
						{dataInfo.map(function (item, index) {
							return (
								<div className="w-4/12 text-center mt-5" key={index}>
									<div className="grid items-center justify-center mb-2">
										<div className="p-3 bg-gray-200 rounded-full flex items-center">{item.icon}</div>
									</div>
									<span className="text-5">{item.title}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="fixed bottom-0 inset-x-0 z-10 bg-white">
					<div className="flex p-4 text-5 leading-4 tracking-7">
						<Link href="/">
							<button className="p-4 bg-primary_6 rounded-xl text-center text-5 text-white font-semibold w-full">Về trang chủ</button>
						</Link>
						<button className="p-4 rounded-xl bg-gray-200 ml-4 text-gray_4" onClick={() => setPage(3)}>
							Huỷ
						</button>
					</div>
				</div>
			</div>
		);
	};

	const CancelModal = () => {
		return (
			<div className="bg-white relative w-full h-screen">
				<NavTopTitleAction Title="Huỷ yêu cầu" Back={() => router.back()}></NavTopTitleAction>
				<div className="flex justify-center items-center pt-17 mb-16 m-12">
					<div className="relative left-4">
						<Image src={ImageUserLeft} width="160" height="160"></Image>
					</div>
					<div className="w-12 h-12 bg-white rounded-full flex justify-center items-center absolute z-1">
						<Icon_Global_Heart />
					</div>
					<div className="relative right-4">
						<Image src={ImageUserRight} width="160" height="160"></Image>
					</div>
				</div>
				<div className="text-center grid justify-center w-full text-gray_4">
					<h2 className=" text-2xl leading-20  tracking-8 font-bold">Lý do huỷ</h2>
					<div className="flex flex-wrap p-5 text-5 leading-4">
						{dataCancel.map(function (item, index) {
							const changeStatus = () => setStatus(item.title);
							return (
								<div
									className={`p-2 m-2 border rounded-xl text-sm  font-semibold w-max ${
										item.title === status ? "text-primary_6 border-primary_6 bg-opacity-10 bg-primary_6" : ""
									}`}
									onClick={changeStatus}
									key={index}
								>
									<span>{item.title}</span>
								</div>
							);
						})}
					</div>
					<textarea className="h-28 w-11/12 bg-white p-4  text-sm border-b outline-none mx-5" placeholder="Lý do khác"></textarea>
					<div className="fixed flex bottom-0 inset-x-0 bg-white p-4 lg:pb-4 pb-24">
						<button className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4">
							<Icon_Global_GoBack_Bottom />
						</button>
						<button className="p-4 bg-primary_6 rounded-xl text-center text-5 leading-4 font-semibold w-full text-white">Huỷ yêu cầu</button>
					</div>
				</div>
			</div>
		);
	};

	return <>{page === 0 ? <PartnerInfoModal /> : page === 1 ? <RequestModal /> : page === 2 ? <WaitingModal /> : page === 3 ? <CancelModal /> : null}</>;
}
