import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import {
	Icon_Acc_Eye,
	Icon_Activity_FoodGreen,
	Icon_Activity_Micro,
	Icon_Activity_Movie,
	Icon_Activity_Sport,
	Icon_Activity_Swim,
	Icon_Activity_Travel,
	Icon_Global_Arrow_Right,
	Icon_Global_Search_White,
	Icon_Home_Bag,
	Icon_Home_Buy,
	Icon_Home_Camping,
	Icon_Home_CaretDown,
	Icon_Home_Chat,
	Icon_Home_Clock,
	Icon_Home_Discount,
	Icon_Home_Female,
	Icon_Home_Fire,
	Icon_Home_Flash,
	Icon_Home_Heart,
	Icon_Home_Location,
	Icon_Home_New,
	Icon_Home_NewGray,
	Icon_Home_News,
	Icon_Home_OutOfStock,
	Icon_Home_Plus_Circle,
	Icon_Home_Shopping,
	Icon_Home_Star,
	Icon_Home_Ticket,
	Icon_Payment_Scan,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { put_api, refresh_token } from "/global/apiHandle";
import { useEffect, useState } from "react";

import { Icon_Noti_Chat } from "/public/icon/iconGlobal";
import Image from "next/image";
import ImageBgReChoose from "/public/img/home/home_img_bg_rechoose.svg";
import ImageBgRecently from "/public/img/home/home_img_bg_recently.svg";
import ImageFlashSale from "/public/img/home/home_img_flashsale.svg";
import ImageGift from "/public/img/home/home_img_gift.svg";
import ImageUser from "/public/img/img_user_info.png";
import LayoutFullView from "/components/layout/LayoutFullView";
import globalData from "/global/globalData";
import { useRouter } from "next/router";

SwiperCore.use([Pagination]);

export default function Home() {
	const router = useRouter();
	const dataAction = [
		{
			icon: <Icon_Activity_FoodGreen />,
			title: "Ăn uống",
		},
		{
			icon: <Icon_Activity_Movie />,
			title: "Xem phim",
		},
		{
			icon: <Icon_Activity_Micro />,
			title: "Karaoke",
		},
		{
			icon: <Icon_Activity_Travel />,
			title: "Đi du lịch",
		},
		{
			icon: <Icon_Activity_Swim />,
			title: "Bơi lội",
		},
		{
			icon: <Icon_Activity_Sport />,
			title: "Chơi thể thao",
		},
		{
			icon: <Icon_Home_Camping />,
			title: "Cắm trại",
		},
		{
			icon: <Icon_Home_Plus_Circle />,
			title: "Tất cả",
		},
	];
	const dataProduct = [
		{
			tag: "#freeship50k",
			name: "Trương Hoàng Mai Anh",
			content: "Đi dự tiệc hạng A giá cạnh tranh ưu đãi hot (đi siêu xe, phụ kiện hàng hiệu)",
			price: "250.000 đ",
			discount: "-20%",
		},
		{
			tag: "#freeship50k",
			name: "Trương Hoàng Mai Anh",
			content: "Đi dự tiệc hạng A giá cạnh tranh ưu đãi hot (đi siêu xe, phụ kiện hàng hiệu)",
			price: "250.000 đ",
			discount: "-20%",
		},
		{
			tag: "#freeship50k",
			name: "Trương Hoàng Mai Anh",
			content: "Đi dự tiệc hạng A giá cạnh tranh ưu đãi hot (đi siêu xe, phụ kiện hàng hiệu)",
			price: "250.000 đ",
			discount: "-20%",
		},
		{
			tag: "#freeship50k",
			name: "Trương Hoàng Mai Anh",
			content: "Đi dự tiệc hạng A giá cạnh tranh ưu đãi hot (đi siêu xe, phụ kiện hàng hiệu)",
			price: "250.000 đ",
			discount: "-20%",
		},
	];

	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			var urlencoded = new URLSearchParams();
			urlencoded.append("lat", position.coords.latitude);
			urlencoded.append("lng", position.coords.longitude);

			var params = {
				path: globalData.api_channel.updateLocation,
				token: true,
				data: urlencoded,
			};

			put_api(params).then((res, err) => {
				if (err) {
					alert("Update location error");
				} else {
					if (res.status.error) {
						// * Expired token
						if (res.status.code === 401) {
							refresh_token().then((response, error) => {
								if (error) {
									// TODO: Show popup refresh token failed
									alert("Update location failed 1");
								} else {
									if (response.status.error) {
										// TODO: Show popup refresh token error
										alert("Update location failed 2");
									} else {
										getLocation();
									}
								}
							});
						} else {
							alert("Update location: " + res.status.message);
							// TODO: Add popup get refresh token error
						}
					} else {
						console.log("Update location success");
					}
				}
			});
		});
	};

	function Nearest() {
		return (
			<div className="px-4.5 pb-8">
				<div className="flex justify-between items-center pb-5">
					<div className="w-full">
						<div className="flex">
							<span className="tracking-8 text-2 font-semibold leading-16 text-gray_4 mr-2">Gần bạn nhất</span>
							<Icon_Home_Location />
						</div>
						<span className="text-gray_4 text-3 leading-14 tracking-6 opacity-60">Đối tác gần bạn nhất</span>
					</div>
					<span className="text-gray_4 text-3 leading-14 tracking-6 mx-1 whitespace-nowrap opacity-60">150 người</span>
					<div className=" cursor-pointer" onClick={() => router.push("")}>
						<Icon_Global_Arrow_Right />
					</div>
				</div>
				<div className="w-full">
					<>
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{dataProduct.length > 0
								? dataProduct.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div className="rounded-2xl overflow-hidden relative text-white">
													<Image src={ImageUser} layout="fill" objectFit="cover" quality={100} alt="image user" />
													<div className="relative">
														<div className="px-2 py-1 m-2.5 bg-primary_6 rounded-3xl w-min flex z-10">{item.tag}</div>
														<div className="flex">
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageGift} width="33" height="26" alt="image flash sale" />
															</div>
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageFlashSale} width="33" height="26" alt="image flash sale" />
															</div>
														</div>
														<div className="absolute top-3 right-3 text-center">
															<div>
																<Icon_Home_Fire />
																<span className="text-smallest leading-3 font-medium tracking-7">Hot</span>
															</div>
															<div>
																<Icon_Home_New />
																<span className="text-smallest leading-3 font-medium tracking-7">Mới</span>
															</div>
															<div>
																<Icon_Home_Star />
																<span className="text-smallest leading-3 font-medium tracking-7">4.5</span>
															</div>
														</div>
														<div className=" pt-40 px-2 grid">
															<div className="w-4 h-4 bg-red_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-yellow_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-black rounded-full mb-2.5"></div>
														</div>
														<div className="px-2.5  bg-gradient-to-t to-gray_14 from-gray_15 backdrop-blur-xl">
															<div className="py-1 text-4 font-semibold leading-23 tracking-5 ">{item.content}</div>
															<div className="opacity-60 flex justify-between">
																<span className="text-3 leading-14 tracking-6">{item.name}</span>
																<div className="bg-white bg-opacity-10 rounded-2xl text-9 leading-14 tracking-6 flex px-1 py-0.5">
																	<Icon_Home_Female />
																	18
																</div>
															</div>
															<div className="pt-1 pb-2.5 flex justify-between items-center">
																<span className="px-1 py-0.5 bg-red_6 rounded-3xl font-semibold text-9 leading-17">
																	{item.discount}
																</span>
																<span className="px-1.5 tracking-5 leading-17 text-4 w-full text-right opacity-60 line-through">
																	{item.price}
																</span>
																<span className="text-5 tracking-2 leading-16 whitespace-nowrap">200.000 đ</span>
															</div>
														</div>
													</div>
												</div>
											</SwiperSlide>
										);
								  })
								: ""}
						</Swiper>
					</>
				</div>
			</div>
		);
	}

	function RecentlyView() {
		return (
			<div className="px-4.5 pb-8">
				<div className="flex justify-between items-center pb-5">
					<div className="w-full">
						<div className="flex">
							<span className="tracking-8 text-2 font-semibold leading-16 text-gray_4 mr-2">Xem gần đây</span>
							<Icon_Acc_Eye />
						</div>
						<span className="text-gray_4 text-3 leading-14 tracking-6 opacity-60">Đối tác bạn đã xem gần đây</span>
					</div>
					<span className="text-gray_4 text-3 leading-14 tracking-6 mx-1 whitespace-nowrap opacity-60">150 người</span>
					<div className=" cursor-pointer" onClick={() => router.push("")}>
						<Icon_Global_Arrow_Right />
					</div>
				</div>
				<div className="w-full">
					<>
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{dataProduct.length > 0
								? dataProduct.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div className="rounded-2xl overflow-hidden relative text-white">
													<Image src={ImageUser} layout="fill" objectFit="cover" quality={100} alt="image user" />
													<div className="relative">
														<div className="px-2 py-1 m-2.5 bg-primary_6 rounded-3xl w-min flex z-10">{item.tag}</div>
														<div className="flex">
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageGift} width="33" height="26" alt="image flash sale" />
															</div>
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageFlashSale} width="33" height="26" alt="image flash sale" />
															</div>
														</div>
														<div className="absolute top-3 right-3 text-center">
															<div>
																<Icon_Home_Fire />
																<span className="text-smallest leading-3 font-medium tracking-7">Hot</span>
															</div>
															<div>
																<Icon_Home_New />
																<span className="text-smallest leading-3 font-medium tracking-7">Mới</span>
															</div>
															<div>
																<Icon_Home_Star />
																<span className="text-smallest leading-3 font-medium tracking-7">4.5</span>
															</div>
														</div>
														<div className=" pt-40 px-2 grid">
															<div className="w-4 h-4 bg-red_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-yellow_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-black rounded-full mb-2.5"></div>
														</div>

														<div className="bg-gray_2 flex justify-between">
															<div className="relative px-2 grid items-center w-3/5">
																<Image src={ImageBgRecently} layout="fill" objectFit="cover" quality={100} alt="image user" />
																<div className="relative flex justify-between items-center">
																	<div>
																		<span className="text-3 font-semibold leading-3 tracking-5">Flashsale</span>
																		<div className="flex">
																			<Icon_Home_Buy />
																			<span className=" ml-1 text-4 font-semibold leading-22 tracking-9">
																				Đã bán 100.000+
																			</span>
																		</div>
																	</div>
																	<div className="absolute -right-1">
																		<Icon_Home_Flash />
																	</div>
																</div>
															</div>
															<div className="px-2 grid justify-items-end">
																<span className="text-9 leading-14 tracking-9 my-1">Kết thúc trong</span>
																<div>
																	<span className=" mx-1 px-1 bg-white rounded-md text-smallest leading-23 tracking-11 text-gray_2 font-semibold">
																		08
																	</span>
																	:
																	<span className="mx-1 px-1 bg-white rounded-md text-smallest leading-23 tracking-11 text-gray_2 font-semibold">
																		48
																	</span>
																	:
																	<span className=" mx-1 px-1 bg-white rounded-md text-smallest leading-23 tracking-11 text-gray_2 font-semibold">
																		28
																	</span>
																</div>
															</div>
														</div>

														<div className="px-2.5 bg-gradient-to-t to-gray_14 from-gray_15 backdrop-blur-xl">
															<div className="py-1 text-4 font-semibold leading-23 tracking-5 ">{item.content}</div>
															<div className="opacity-60 flex justify-between">
																<span className="text-3 leading-14 tracking-6">Trương Hoàng Mai Anh</span>
																<div className="bg-white bg-opacity-10 rounded-2xl text-9 leading-14 tracking-6 flex px-1 py-0.5">
																	<Icon_Home_Female />
																	18
																</div>
															</div>
															<div className="pt-1 pb-2.5 flex justify-between items-center">
																<span className="px-1 py-0.5 bg-red_6 rounded-3xl font-semibold text-9 leading-17">
																	{item.discount}
																</span>
																<span className="px-1.5 tracking-5 leading-17 text-4 w-full text-right opacity-60 line-through">
																	{item.price}
																</span>
																<span className="text-5 tracking-2 leading-16 whitespace-nowrap">200.000 đ</span>
															</div>
														</div>
													</div>
												</div>
											</SwiperSlide>
										);
								  })
								: ""}
						</Swiper>
					</>
				</div>
			</div>
		);
	}

	function ReChoose() {
		return (
			<div className="px-4.5 pb-8">
				<div className="flex justify-between items-center pb-5">
					<div className="w-full">
						<div className="flex">
							<span className="tracking-8 text-2 font-semibold leading-16 text-gray_4 mr-2">Chọn lại</span>
							<Icon_Home_Clock />
						</div>
						<span className="text-gray_4 text-3 leading-14 tracking-6 opacity-60">Đối tác bạn đã macth thành công</span>
					</div>
					<span className="text-gray_4 text-3 leading-14 tracking-6 mx-1 whitespace-nowrap opacity-60">9 người</span>
					<div className=" cursor-pointer" onClick={() => router.push("")}>
						<Icon_Global_Arrow_Right />
					</div>
				</div>
				<div className="w-full">
					<>
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{dataProduct.length > 0
								? dataProduct.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div className="rounded-2xl overflow-hidden relative text-white">
													<Image src={ImageUser} layout="fill" objectFit="cover" quality={100} alt="image user" />
													<div className="relative">
														<div className="px-2 py-1 m-2.5 bg-primary_6 rounded-3xl w-min flex z-10">{item.tag}</div>
														<div className="flex">
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageGift} width="33" height="26" alt="image flash sale" />
															</div>
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageFlashSale} width="33" height="26" alt="image flash sale" />
															</div>
														</div>
														<div className="absolute top-3 right-3 text-center">
															<div>
																<Icon_Home_Fire />
																<span className="text-smallest leading-3 font-medium tracking-7">Hot</span>
															</div>
															<div>
																<Icon_Home_New />
																<span className="text-smallest leading-3 font-medium tracking-7">Mới</span>
															</div>
															<div>
																<Icon_Home_Star />
																<span className="text-smallest leading-3 font-medium tracking-7">4.5</span>
															</div>
														</div>
														<div className=" pt-40 px-2 grid">
															<div className="w-4 h-4 bg-red_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-yellow_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-black rounded-full mb-2.5"></div>
														</div>
														<div className="bg-gray_2 flex justify-between">
															<div className="relative px-2 grid items-center w-3/5">
																<Image src={ImageBgReChoose} layout="fill" objectFit="cover" quality={100} alt="image user" />
																<div className="relative flex justify-between items-center">
																	<div>
																		<span className="text-3 font-semibold leading-3 tracking-5">Đặt trước</span>
																		<div className="flex">
																			<Icon_Home_Buy />
																			<span className=" ml-1 text-4 font-semibold leading-22 tracking-9">
																				Còn lại 1.000
																			</span>
																		</div>
																	</div>
																	<div className="absolute -right-1">
																		<Icon_Home_Shopping />
																	</div>
																</div>
															</div>
															<div className="px-2 grid justify-items-end">
																<span className="text-9 leading-14 tracking-9 my-1">Kết thúc trong</span>
																<div>
																	<span className=" mx-1 px-1 bg-white rounded-md text-smallest leading-23 tracking-11 text-gray_2 font-semibold">
																		08
																	</span>
																	:
																	<span className="mx-1 px-1 bg-white rounded-md text-smallest leading-23 tracking-11 text-gray_2 font-semibold">
																		48
																	</span>
																	:
																	<span className=" mx-1 px-1 bg-white rounded-md text-smallest leading-23 tracking-11 text-gray_2 font-semibold">
																		28
																	</span>
																</div>
															</div>
														</div>
														<div className="px-2.5 bg-gradient-to-t to-gray_14 from-gray_15 backdrop-blur-xl">
															<div className="py-1 text-4 font-semibold leading-23 tracking-5 ">{item.content}</div>
															<div className="opacity-60 flex justify-between">
																<span className="text-3 leading-14 tracking-6">{item.name}</span>
																<div className="bg-white bg-opacity-10 rounded-2xl text-9 leading-14 tracking-6 flex px-1 py-0.5">
																	<Icon_Home_Female />
																	18
																</div>
															</div>
															<div className="pt-1 pb-2.5 flex justify-between items-center">
																<span className="px-1 py-0.5 bg-red_6 rounded-3xl font-semibold text-9 leading-17">
																	{item.discount}
																</span>
																<span className="px-1.5 tracking-5 leading-17 text-4 w-full text-right opacity-60 line-through">
																	{item.price}
																</span>
																<span className="text-5 tracking-2 leading-16 whitespace-nowrap">200.000 đ</span>
															</div>
														</div>
													</div>
												</div>
											</SwiperSlide>
										);
								  })
								: ""}
						</Swiper>
					</>
				</div>
			</div>
		);
	}

	function Recommended() {
		return (
			<div className="px-4.5 pb-8">
				<div className="flex justify-between items-center pb-5">
					<div className="w-full">
						<div className="flex">
							<span className="tracking-8 text-2 font-semibold leading-16 text-gray_4 mr-2">Được đề xuất</span>
							<Icon_Home_Heart />
						</div>
						<span className="text-gray_4 text-3 leading-14 tracking-6 opacity-60">Lorem ipsum dolor sit amet</span>
					</div>
					<span className="text-gray_4 text-3 leading-14 tracking-6 mx-1 whitespace-nowrap opacity-60">30 người</span>
					<div className=" cursor-pointer" onClick={() => router.push("")}>
						<Icon_Global_Arrow_Right />
					</div>
				</div>
				<div className="w-full">
					<>
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{dataProduct.length > 0
								? dataProduct.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div className="rounded-2xl overflow-hidden relative text-white">
													<Image src={ImageUser} layout="fill" objectFit="cover" quality={100} alt="image user" />
													<div className="absolute content-center w-full grid items-center text-center justify-center z-20 h-80 ">
														<div className=" flex items-center justify-center">
															<Icon_Home_OutOfStock />
														</div>{" "}
														Hết hàng{" "}
													</div>
													<div className="relative backdrop-blur-sm pt-2.5">
														<div className="px-2 py-1 mx-2.5 bg-primary_6 rounded-3xl w-min flex">{item.tag}</div>
														<div className="flex mt-2.5">
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageGift} width="33" height="26" alt="image flash sale" />
															</div>
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageFlashSale} width="33" height="26" alt="image flash sale" />
															</div>
														</div>
														<div className="absolute top-3 right-3 text-center">
															<div>
																<Icon_Home_Fire />
																<span className="text-smallest leading-3 font-medium tracking-7">Hot</span>
															</div>
															<div>
																<Icon_Home_New />
																<span className="text-smallest leading-3 font-medium tracking-7">Mới</span>
															</div>
															<div>
																<Icon_Home_Star />
																<span className="text-smallest leading-3 font-medium tracking-7">4.5</span>
															</div>
														</div>
														<div className=" pt-40 px-2 grid">
															<div className="w-4 h-4 bg-red_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-yellow_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-black rounded-full mb-2.5"></div>
														</div>
													</div>
													<div className="px-2.5 bg-gradient-to-t to-gray_14 from-gray_15 backdrop-blur-xl">
														<div className="py-1 text-4 font-semibold leading-23 tracking-5 ">{item.content}</div>
														<div className="opacity-60 flex justify-between">
															<span className="text-3 leading-14 tracking-6">{item.name}</span>
															<div className="bg-white bg-opacity-10 rounded-2xl text-9 leading-14 tracking-6 flex px-1 py-0.5">
																<Icon_Home_Female />
																18
															</div>
														</div>
														<div className="pt-1 pb-2.5 flex justify-between items-center">
															<span className="px-1 py-0.5 bg-red_6 rounded-3xl font-semibold text-9 leading-17">
																{item.discount}
															</span>
															<span className="px-1.5 tracking-5 leading-17 text-4 w-full text-right opacity-60 line-through">
																{item.price}
															</span>
															<span className="text-5 tracking-2 leading-16 whitespace-nowrap">200.000 đ</span>
														</div>
													</div>
												</div>
											</SwiperSlide>
										);
								  })
								: ""}
						</Swiper>
					</>
				</div>
			</div>
		);
	}

	function Discount() {
		return (
			<div className="px-4.5 pb-8">
				<div className="flex justify-between items-center pb-5">
					<div className="w-full">
						<div className="flex">
							<span className="tracking-8 text-2 font-semibold leading-16 text-gray_4 mr-2">Khuyến mãi</span>
							<Icon_Home_Discount />
						</div>
						<span className="text-gray_4 text-3 leading-14 tracking-6 opacity-60">Đối tác có khuyến mãi đặc biệt</span>
					</div>
					<span className="text-gray_4 text-3 leading-14 tracking-6 mx-1 whitespace-nowrap opacity-60">50 người</span>
					<div className=" cursor-pointer" onClick={() => router.push("")}>
						<Icon_Global_Arrow_Right />
					</div>
				</div>
				<div className="w-full">
					<>
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{dataProduct.length > 0
								? dataProduct.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div className="rounded-2xl overflow-hidden relative text-white">
													<Image src={ImageUser} layout="fill" objectFit="cover" quality={100} alt="image user" />
													<div className="relative">
														<div className="px-2 py-1 m-2.5 bg-primary_6 rounded-3xl w-min flex z-10">{item.tag}</div>
														<div className="flex">
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageGift} width="33" height="26" alt="image flash sale" />
															</div>
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageFlashSale} width="33" height="26" alt="image flash sale" />
															</div>
														</div>
														<div className="absolute top-3 right-3 text-center">
															<div>
																<Icon_Home_Fire />
																<span className="text-smallest leading-3 font-medium tracking-7">Hot</span>
															</div>
															<div>
																<Icon_Home_New />
																<span className="text-smallest leading-3 font-medium tracking-7">Mới</span>
															</div>
															<div>
																<Icon_Home_Star />
																<span className="text-smallest leading-3 font-medium tracking-7">4.5</span>
															</div>
														</div>
														<div className=" pt-40 px-2 grid">
															<div className="w-4 h-4 bg-red_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-yellow_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-black rounded-full mb-2.5"></div>
														</div>
														<div className="px-2.5 bg-gradient-to-t to-gray_14 from-gray_15 backdrop-blur-xl">
															<div className="py-1 text-4 font-semibold leading-23 tracking-5 ">{item.content}</div>
															<div className="opacity-60 flex justify-between">
																<span className="text-3 leading-14 tracking-6">{item.name}</span>
																<div className="bg-white bg-opacity-10 rounded-2xl text-9 leading-14 tracking-6 flex px-1 py-0.5">
																	<Icon_Home_Female />
																	18
																</div>
															</div>
															<div className="pt-1 pb-2.5 flex justify-between items-center">
																<span className="px-1 py-0.5 bg-red_6 rounded-3xl font-semibold text-9 leading-17">
																	{item.discount}
																</span>
																<span className="px-1.5 tracking-5 leading-17 text-4 w-full text-right opacity-60 line-through">
																	{item.price}
																</span>
																<span className="text-5 tracking-2 leading-16 whitespace-nowrap">200.000 đ</span>
															</div>
														</div>
													</div>
												</div>
											</SwiperSlide>
										);
								  })
								: ""}
						</Swiper>
					</>
				</div>
			</div>
		);
	}

	function Lastest() {
		return (
			<div className="px-4.5 pb-8">
				<div className="flex justify-between items-center pb-5">
					<div className="w-full">
						<div className="flex">
							<span className="tracking-8 text-2 font-semibold leading-16 text-gray_4 mr-2">Mới nhất</span>
							<Icon_Home_NewGray />
						</div>
						<span className="text-gray_4 text-3 leading-14 tracking-6 opacity-60">Đối tác mới của GrapPG</span>
					</div>
					<span className="text-gray_4 text-3 leading-14 tracking-6 mx-1 whitespace-nowrap opacity-60">80 người</span>
					<div className=" cursor-pointer" onClick={() => router.push("")}>
						<Icon_Global_Arrow_Right />
					</div>
				</div>
				<div className="w-full">
					<>
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{dataProduct.length > 0
								? dataProduct.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div className="rounded-2xl overflow-hidden relative text-white">
													<Image src={ImageUser} layout="fill" objectFit="cover" quality={100} alt="image user" />
													<div className="relative">
														<div className="px-2 py-1 m-2.5 bg-primary_6 rounded-3xl w-min flex z-10">{item.tag}</div>
														<div className="flex">
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageGift} width="33" height="26" alt="image flash sale" />
															</div>
															<div className="bg-white rounded overflow-hidden ml-2.5 flex items-center">
																<Image src={ImageFlashSale} width="33" height="26" alt="image flash sale" />
															</div>
														</div>
														<div className="absolute top-3 right-3 text-center">
															<div>
																<Icon_Home_Fire />
																<span className="text-smallest leading-3 font-medium tracking-7">Hot</span>
															</div>
															<div>
																<Icon_Home_New />
																<span className="text-smallest leading-3 font-medium tracking-7">Mới</span>
															</div>
															<div>
																<Icon_Home_Star />
																<span className="text-smallest leading-3 font-medium tracking-7">4.5</span>
															</div>
														</div>
														<div className=" pt-40 px-2 grid">
															<div className="w-4 h-4 bg-red_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-yellow_3 rounded-full mb-2"></div>
															<div className="w-4 h-4 bg-black rounded-full mb-2.5"></div>
														</div>
														<div className="px-2.5 bg-gradient-to-t to-gray_to from-gray_from backdrop-blur-xl">
															<div className="py-1 text-4 font-semibold leading-23 tracking-5 ">{item.content}</div>
															<div className="opacity-60 flex justify-between">
																<span className="text-3 leading-14 tracking-6">{item.name}</span>
																<div className="bg-white bg-opacity-10 rounded-2xl text-9 leading-14 tracking-6 flex px-1 py-0.5">
																	<Icon_Home_Female />
																	18
																</div>
															</div>
															<div className="pt-1 pb-2.5 flex justify-between items-center">
																<span className="px-1 py-0.5 bg-red_6 rounded-3xl font-semibold text-9 leading-17">
																	{item.discount}
																</span>
																<span className="px-1.5 tracking-5 leading-17 text-4 w-full text-right opacity-60 line-through">
																	{item.price}
																</span>
																<span className="text-5 tracking-2 leading-16 whitespace-nowrap">200.000 đ</span>
															</div>
														</div>
													</div>
												</div>
											</SwiperSlide>
										);
								  })
								: ""}
						</Swiper>
					</>
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-auto">
			<div className="nav-top flex flex-row justify-between items-center flex-nowrap text-white bg-primary_6 px-5 py-3.5 heading-top">
				<div className="w-full">
					<span className=" text-4 leading-14 tracking-6">ĐIỂM HẸN</span>
					<div className="flex items-center">
						<span className="font-semibold text-1 leading-15 tracking-2 mr-2">Nguyễn Vũ Icafe Hẻm 51 - Hồ ...</span>
						<Icon_Home_CaretDown />
					</div>
				</div>
				<button className="button button-Base w-8 h-8 icon-Svg ml-5 cursor-pointer" onClick={() => router.push("")}>
					<Icon_Noti_Chat />
				</button>
				<button className="button button-Base w-8 h-8 icon-Svg ml-5 cursor-pointer" onClick={() => router.push("")}>
					<Icon_Home_News />
				</button>
			</div>

			<div className=" bg-primary_6 w-screen text-center pt-17 mt-2 p-5 flex justify-between items-center cursor-pointer">
				<div className="flex flex-nowrap w-full h-12 bg-white bg-opacity-5 border-solid border-white border-opacity-20 border rounded-xl py-3.5 px-4">
					<Icon_Global_Search_White />
					<input
						type="text"
						placeholder="Nhập tên ngân hàng cần tìm"
						className="w-full ml-4 py-1 outline-none text-5 leading-4 tracking-6 bg-white bg-opacity-0 placeholder-white placeholder-shown:opacity-60"
					></input>
				</div>
				<div className="bg-white bg-opacity-5 p-3.5 ml-3 border-solid border-white border-opacity-20 border rounded-xl">
					<Icon_Payment_Scan />
				</div>
			</div>

			<div className="pt-8 px-3 flex w-screen">
				<div className="flex flex-wrap">
					{dataAction.length > 0
						? dataAction.map(function (item, index) {
								return (
									<div
										className=" w-3/12 text-center mb-8 cursor-pointer"
										key={index}
										onClick={() => {
											router.push("/nav/activity");
										}}
									>
										<div className="grid items-center justify-center mb-2">
											<div className="p-2.5 bg-gray-200 rounded-full flex items-center">{item.icon}</div>
										</div>
										<span className=" text-3 tracking-6 leading-14 font-semibold text-gray_4">{item.title}</span>
									</div>
								);
						  })
						: ""}
				</div>
			</div>

			<div className="">
				<div className="mx-5 p-3 bg-red_12 rounded-xl flex justify-between items-center">
					<div className="m-1">
						<Icon_Home_Ticket />
					</div>
					<span className=" mx-4 w-full text-3 leading-14 font-semibold tracking-6 text-gray_4">Bạn đang có 40 ưu đãi mới</span>
					<span
						className="py-2 px-4 text-3 leading-14 font-semibold tracking-7 text-white bg-red_6 rounded-xl cursor-pointer "
						onClick={() => router.push("")}
					>
						Xem
					</span>
				</div>
			</div>

			<div className="py-8 w-screen relative">
				<>
					<Swiper slidesPerView={"auto"} pagination={true} className="mySwiper w-100-32 font-semibold text-1 leading-15 tracking-2 text-black">
						<SwiperSlide>
							<div className="h-32 mr-3 rounded-lg flex justify-center items-center bg-gray_13">Banner</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="h-32 mr-3 rounded-lg flex justify-center items-center bg-gray_13">Banner</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="h-32 mr-3 rounded-lg flex justify-center items-center bg-gray_13">Banner</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="h-32 mr-3 rounded-lg flex justify-center items-center bg-gray_13">Banner</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="h-32 mr-3 rounded-lg flex justify-center items-center bg-gray_13">Banner</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="h-32 mr-3 rounded-lg flex justify-center items-center bg-gray_13">Banner</div>
						</SwiperSlide>
					</Swiper>
				</>
			</div>
			<Nearest />
			<RecentlyView />
			<ReChoose />
			<Recommended />
			<Discount />
			<Lastest />
			<div className=" fixed right-5 bottom-20 z-10">
				<div className=" mb-5 cursor-pointer bg-white p-3.5 grid items-center justify-center w-min rounded-xl relative" onClick={() => router.push("")}>
					<div className="w-2 h-2 bg-red_6 rounded-full absolute top-2 right-3"></div>
					<Icon_Home_Chat />
				</div>
				<div className=" mb-5 cursor-pointer bg-white p-3.5 grid items-center justify-center w-min rounded-xl relative" onClick={() => router.push("")}>
					<div className="w-2 h-2 bg-red_6 rounded-full absolute top-2 right-3"></div>
					<Icon_Home_Bag />
				</div>
			</div>
		</div>
	);
}
Home.Layout = LayoutFullView;
