import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

import { ContextData, ContextUpdate } from "/global/contextData";
import { Fragment, useEffect, useState } from "react";
import {
	Icon_Activity_ArrLeft,
	Icon_Activity_Calendar,
	Icon_Activity_Dot,
	Icon_Activity_Empty,
	Icon_Activity_Female,
	Icon_Activity_FoodLg,
	Icon_Activity_Head,
	Icon_Activity_Location,
	Icon_Activity_Noti_FoodGray,
	Icon_Activity_Payment_ArrCarelRight,
	Icon_Activity_Star,
	Icon_Activity_Time,
	Icon_Global_Download,
	Icon_Global_Filter,
	Icon_Global_Heart,
	Icon_Global_Search_White,
	Icon_Global_Vietinbank,
	Icon_Payment_Head,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { dataMethod, dataStatus } from "../../../components/payment/DataPayment";

import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import ImageUser from "/public/img/img_user_info.png";
import ImageUserLeft from "/public/img/user-detail/user-detail_img_user_left.svg";
import ImageUserRight from "/public/img/user-detail/user-detail_img_user_right.svg";
import LayoutFullView from "/components/layout/LayoutFullView";
import Link from "next/link";
import { NavTopTitleAction } from "../../../components/payment/LayoutPayment";
import { useRouter } from "next/router";

export default function History() {
	const [status, setStatus] = useState("Tất cả");
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [verified, setVerified] = useState(false);
	const [points, setPoints] = useState(0);
	console.log(points);
	const dataTagActivity = [
		{
			tag: "Tất cả",
		},
		{
			tag: "Đi phượt",
		},
		{
			tag: "Hẹn hò",
		},
		{
			tag: "Ăn uống",
		},
		{
			tag: "Dự tiệc",
		},
	];
	const dataActivity = [
		{
			time: "20:00",
			day: "19",
			month: "T10",
			name: "Nguyễn Hoàng Phương Anh",
			address: "STS Tower, Đại lộ Hòa Bình, Ninh Kiều...",
			tag: "Đã huỷ",
			readed: false,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			name: "Nguyễn Hoàng Phương Anh",
			address: "STS Tower, Đại lộ Hòa Bình, Ninh Kiều...",
			tag: "Đã huỷ",
			readed: false,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			name: "Nguyễn Hoàng Phương Anh",
			address: "STS Tower, Đại lộ Hòa Bình, Ninh Kiều...",
			tag: "Đã huỷ",
			readed: true,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			name: "Nguyễn Hoàng Phương Anh",
			address: "STS Tower, Đại lộ Hòa Bình, Ninh Kiều...",
			tag: "Đã huỷ",
			readed: true,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			name: "Nguyễn Hoàng Phương Anh",
			address: "STS Tower, Đại lộ Hòa Bình, Ninh Kiều...",
			tag: "Đã huỷ",
			readed: true,
		},
		{
			time: "20:00",
			day: "19",
			month: "T10",
			name: "Nguyễn Hoàng Phương Anh",
			address: "STS Tower, Đại lộ Hòa Bình, Ninh Kiều...",
			tag: "Đã huỷ",
			readed: true,
		},
	];

	useEffect(() => {
		// var isVerified = typeof ContextData.listAllCard !== "undefined" ? ContextData.listAllCard.is_verified : false;
		setVerified(true);

		setPoints(typeof ContextData.points !== "undefined" ? ContextData.points : JSON.parse(window.localStorage.points));
	}, []);

	const HistoryModal = () => {
		return (
			<div id="activity-history" className="w-full bg-white h-full">
				<NavTopTitleAction Title="Lịch sử" Back={() => router.back()}>
					<div className="wallet relative mr-0 ml-auto flex flex-row justify-between items-center flex-nowrap" onClick={() => router.push("/")}>
						{verified === true ? (
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
																value={points}
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
						) : null}
					</div>
				</NavTopTitleAction>
				<div className=" bg-primary_6 w-full pt-14 text-center">
					<div className="flex justify-center">
						<Icon_Activity_Head />
					</div>
					<div className="flex m-4">
						<div className=" h-12 flex flex-nowrap w-full mr-4 my-0 bg-white-12 border-solid border-search border-opacity-50 border bg-opacity-30 rounded-xl p-3.5">
							<Icon_Global_Search_White />
							<input type="text" placeholder="Tìm kiếm..." className="w-full ml-4 outline-none bg-white bg-opacity-0 placeholder-white"></input>
						</div>
						<div className=" w-12 h-12 p-3.5 border border-solid border-opacity-50 bg-opacity-30 rounded-xl flex items-center">
							<Icon_Global_Filter />
						</div>
					</div>
					<div>
						<Swiper slidesPerView={"auto"} className="mySwiper sm:w-80" loop={true}>
							{dataTagActivity.map(function (item, index) {
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
					{dataActivity.length === 0 ? (
						<div className="grid justify-center text-center items-center py-28 mx-10">
							<div className="grid justify-center ">
								<div className="w-20 h-20 flex items-center justify-center bg-gray_12 rounded-full">
									<Icon_Activity_Empty />
								</div>
							</div>
							<span className="mb-3 mt-5 text-2 leading-16 tracking-8 text-dark font-semibold">Bạn chưa có thông báo nào !</span>
							<span className=" text-5 leading-18  text-dark_medium tracking-3">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit suspendisse commodo.
							</span>
							<div className="flex justify-center">
								<button className="p-4 my-5 w-max bg-gray_12 rounded-xl text-5 leading-4 tracking-7 font-bold">Trải nghiệm ngay</button>
							</div>
						</div>
					) : (
						dataActivity.map(function (item, index) {
							return (
								<div className="flex border-b mt-3 pb-3 justify-between items-center px-5" key={index}>
									<div className="h-10 w-10 min-w-max bg-gray-200 rounded-full flex justify-center items-center relative">
										<Image src={ImageUser} width="40" height="40" />
										<div className="absolute right-0 bottom-0 bg-white rounded-full p-1">
											<Icon_Activity_Noti_FoodGray />
										</div>
									</div>
									<div className="grid items-center w-full pl-4">
										<span className="text-xs text-red_6 ">
											{item.tag} - {item.time}
										</span>
										<h3 className=" text-base font-bold flex items-center text-gray_4">{item.name}</h3>
										<span className=" text-xs text-gray_4 opacity-60">{item.address}</span>
									</div>
									<div className="text-gray_4 opacity-60 grid px-4 content-center">
										<div className=" border border-opacity-50 rounded-t-lg text-4 px-4">{item.month}</div>
										<div className=" border border-t-0  border-opacity-50 rounded-b-lg text-5 py-2 px-4">{item.day}</div>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
		);
	};

	const HistoryDetailModal = () => {
		return (
			<div>
				<NavTopTitleAction Title="Chi tiết hoạt động" Back={() => router.back()}>
					<button className="w-5 h-5 mr-0 ml-auto">
						<Icon_Global_Download />
					</button>
				</NavTopTitleAction>
				<div className="bg-white relative mb-20 lg:mb-0 w-full text-gray_4 leading-18 tracking-2 overflow-auto mt-14">
					<div className="flex justify-center items-center mb-16 m-12">
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
					<div className="text-center w-full">
						<h2 className=" text-6 leading-19 font-bold">19:59</h2>
						<span className=" text-5 text-yellow_3 tracking-3">Chờ chấp nhận</span>
						<h3 className="p-5 text-left text-2 leading-16 font-semibold tracking-8">Thông tin cuộc hẹn</h3>
						<div className="p-4 border mx-4 relative rounded-lg">
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
									<span className="overflow-hidden overflow-ellipsis whitespace-nowrap leading-15">
										Nguyễn Vũ Icafe Hẻm 51 - Hồ Búng Xáng
									</span>
								</div>
							</div>
						</div>
						<h3 className="p-5 pt-8 text-left  text-2 leading-16 tracking-8  font-semibold">Lời nhắn</h3>
						<span className="text-sm px-5 text-left flex tracking-3">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non aliquam sit consequat tellus habitasse eu sit vulputate volutpat erat
						</span>
						<h3 className="p-5 pt-8 text-left  text-2 leading-16 font-semibold flex justify-between items-center ">Phương thức thanh toán </h3>
						<Link href="/nav/payment/choose-method">
							<div className="flex justify-between mx-5 border rounded-xl items-center">
								<div className="p-2 m-3 bg-gray-200 min-w-max flex items-center rounded-full">
									<Icon_Global_Vietinbank />
								</div>
								<div className="grid text-left w-full">
									<span className="text-1 font-bold tracking-2">Vietinbank</span>
									<span className="text-4 opacity-60 tracking-6">Mặc định</span>
								</div>
								<div className="min-w-max flex items-center pr-5">
									<Icon_Activity_Payment_ArrCarelRight />
								</div>
							</div>
						</Link>

						<h3 className="p-5 pt-8 text-left  text-2 leading-16 tracking-8 font-semibold">Tóm lượt</h3>
						<div className="pb-5 border-b border-gray_11 border-solid leading-15">
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">Mã giao dịch</span>
								<span>123456789</span>
							</div>
							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">Thời gian</span>
								<span>20-08-2021 18:00</span>
							</div>

							<div className="text-1 flex justify-between px-5 pb-5">
								<span className="opacity-60">Đi dự tiệc</span>
								<span>
									200.000<span> / giờ</span>
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
								<span className=" opacity-60">Phí giao dịch</span>
								<span>0</span>
							</div>
						</div>
						<div className="flex justify-between px-4 pt-5 items-center">
							<span className="font-semibold text-1 leading-15 opacity-60">Tổng cộng</span>
							<span className="font-semibold text-7 leading-16 tracking-8 text-primary_6">800.000</span>
						</div>
						<h3 className="p-5 pt-8 text-left  text-2 leading-16 tracking-8 font-semibold">Thông tin đối tác</h3>
						<div className=" pb-5 flex justify-between px-5 items-center">
							<div className="grid">
								<span className="text-1 leading-15 tracking-2 font-semibold">Trương Hoàng Mai Anh</span>
								<span className=" text-4 leading-14 tracking-6 opacity-60 pt-1.5">Sẵn sàng từ 12:00 - 11/06/2021</span>
								<div className="flex justify-between pt-2 items-center">
									<div className="flex items-center bg-gray_12 rounded-2xl px-2 min-w-max">
										<Icon_Activity_Female />
										<span className="ml-2 text-3 leading-14 tracking-6"> 18</span>
									</div>

									<div className="flex content-center items-center w-full mx-2">
										<Icon_Activity_Dot />
										<div className=" w-3.5 h-3.5">
											<Icon_Activity_Star />
										</div>
										<span className="ml-2 text-3 leading-14 tracking-6">5</span>
									</div>
								</div>
							</div>
							<div className="rounded-xl">
								<Image src={ImageUser} width="80" height="80" />
							</div>
						</div>
					</div>
					<div className="fixed bottom-0 z-10 mb-20 lg:mb-0 pb-1 inset-x-0 bg-white">
						<div className="flex p-4 tracking-7 text-5 leading-4 font-semibold">
							<Link href="/nav/activity/activity-waiting">
								<button className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4">
									<Icon_Activity_ArrLeft />
								</button>
							</Link>
							<Link href="#">
								<button className="p-4 bg-primary_6 rounded-xl text-center  text-white  w-full">Về trang chủ</button>
							</Link>
							<Link href="/nav/activity/activity-cancel">
								<button className="p-4 rounded-xl  bg-gray-200 ml-4">Huỷ</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return <>{page === 0 ? <HistoryModal /> : <HistoryDetailModal />}</>;
}
History.Layout = LayoutFullView;
