import "swiper/swiper.min.css";

import {
	Icon_Activity_Cake,
	Icon_Activity_Calendar_White,
	Icon_Activity_Edit_User,
	Icon_Activity_Female,
	Icon_Activity_Female_Filter,
	Icon_Activity_Fire,
	Icon_Activity_Heart_Small,
	Icon_Activity_Location_White,
	Icon_Activity_Male,
	Icon_Activity_Other_Sex,
	Icon_Activity_Start,
	Icon_Activity_Timer,
	Icon_Global_Check_Tick,
	Icon_Global_Filter,
	Icon_Global_Heart,
	Icon_Global_History_Clock,
	Icon_Global_Reset,
	Icon_Global_Search_Gray,
	Icon_Global_User_Rate,
	Icon_Home_Female,
	Icon_Home_Fire,
	Icon_Home_New,
	Icon_Home_Star,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { put_api, refresh_token } from "/global/apiHandle";
import { useEffect, useState } from "react";

import Autocomplete from "react-google-autocomplete";
import Image from "next/image";
import ImageFlashSale from "/public/img/home/home_img_flashsale.svg";
import ImageGift from "/public/img/home/home_img_gift.svg";
import ImageUser from "/public/img/img_user_info.png";
import LayoutFullView from "/components/layout/LayoutFullView";
import { NavTopTitleAction } from "/components/user-v1/LayoutUserV1";
import { getPartner } from "../../../global/firebaseUtils";
import globalData from "/global/globalData";
import { useRouter } from "next/router";

const GOOGLE_MAPS_API_KEY = "AIzaSyDq38-QJCuQZk8-QoTeuLO-diT-HCPohCA";

export default function UserV1() {
	const router = useRouter();

	console.log("==================================== Activity index");
	console.log(router);
	console.log("====================================");

	const [flagFitter, setFlagFitter] = useState(false);
	const [input, setInput] = useState({ value: "" });
	const [posStart, setPosStart] = useState({});
	const [posEnd, setPosEnd] = useState({});

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

	const [partner, setPartner] = useState([]);

	useEffect(() => {
		if (flagFitter === true) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		getListPartner();
	}, [flagFitter]);

	const getListPartner = () => {
		getPartner().then((result) => {
			console.log("==================================== getPartner");
			console.log(result);
			console.log("====================================");
			setPartner(result);
		});
	};

	const handleChange = (event) => {
		setInput({ value: event.target.value });
	};

	const posStartHandle = (place) => {
		var position = {
			address: place.formatted_address,
			placeId: place.place_id,
			lat: place.geometry.location.lat(),
			long: place.geometry.location.lng(),
		};
		console.log("==================================== Diem den");
		console.log(position);
		console.log("====================================");
		setPosStart(position);
	};

	const posEndHandle = (place) => {
		var position = {
			address: place.formatted_address,
			placeId: place.place_id,
			lat: place.geometry.location.lat(),
			long: place.geometry.location.lng(),
		};
		console.log("==================================== Diem hen");
		console.log(position);
		console.log("====================================");
		setPosEnd(position);
	};

	const ListPartnerHandle = () => {
		return (
			<div className="user-v1-layout-inner-large">
				<div className="relative w-full pb-5 bg-primary_6">
					<div className="relative flex flex-row justify-between items-center flex-wrap px-5">
						<span className="headline text-white text-left w-auto">Đi dự tiệc</span>
						<button className="history w-8 h-8 icon-Svg ml-3 mr-auto">
							<Icon_Activity_Edit_User />
						</button>
						<div className="inner flex flex-row justify-start items-center py-2 w-full">
							<Icon_Activity_Location_White />
							<div className="flex items-center justify-between pl-2">
								<Autocomplete
									apiKey={GOOGLE_MAPS_API_KEY}
									placeholder="Điểm đến"
									onPlaceSelected={(place) => {
										posEndHandle(place);
									}}
								/>
							</div>
						</div>
						<div className="inner flex flex-row justify-start items-center py-2 w-50/8">
							<Icon_Activity_Calendar_White />
							<span className="label-Bold_White_Normal ml-2">18:00 - 20/08/2021</span>
						</div>
						<div className="inner flex flex-row justify-start items-center py-2 w-50/8">
							<Icon_Activity_Timer />
							<span className="label-Bold_White_Normal ml-2">4 giờ</span>
						</div>
						<div className="inner flex flex-row justify-start items-center py-2 w-full">
							<Icon_Activity_Location_White />
							<div className="flex items-center justify-between pl-2">
								<Autocomplete
									apiKey={GOOGLE_MAPS_API_KEY}
									placeholder="Điểm hẹn"
									onPlaceSelected={(place) => {
										posStartHandle(place);
									}}
								/>
							</div>
						</div>
					</div>
					<div className="tool-sort w-full pt-3 bg-primary_6">
						<Swiper className="list mySwipe" loop={false} slidesPerView={"auto"}>
							<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min">
								<label className="inline-flex w-max bg-white border-opacity-20 rounded-xl px-3 py-2">
									<Icon_Activity_Heart_Small />
									<span className="button-Medium-Pri-3 ml-3">Được đề xuất</span>
									<input type="radio" name="sort" className="hidden" />
								</label>
							</SwiperSlide>
							<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min">
								<label className="inline-flex w-max bg-white border-opacity-20 rounded-xl px-3 py-2">
									<Icon_Activity_Female />
									<span className="button-Medium-Pri-3 ml-3">Nữ</span>
									<input type="radio" name="sort" className="hidden" />
								</label>
							</SwiperSlide>
							<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min">
								<label className="inline-flex w-max bg-white border-opacity-20 rounded-xl px-3 py-2">
									<Icon_Activity_Cake />
									<span className="button-Medium-Pri-3 ml-3">18 - 25 tuổi</span>
									<input type="radio" name="sort" className="hidden" />
								</label>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
				<div className="relative py-5 w-full h-full">
					<div className="info relative w-72 h-full min-h-24-5 m-auto rounded-2xl overflow-hidden ">
						<Swiper slidesPerView={"auto"} spaceBetween={16} className="mySwiper flex">
							{partner.length > 0
								? partner.map(function (item, index) {
										return (
											<SwiperSlide key={index}>
												<div
													className="rounded-2xl overflow-hidden relative text-white"
													onClick={() => {
														router.push({
															pathname: "/nav/activity/order",
															query: { id: item.id },
														});
													}}
												>
													<Image
														src={item?.photoURL ? item.photoURL : ImageUser}
														layout="fill"
														objectFit="cover"
														quality={100}
														alt="image user"
													/>
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
								: null}
						</Swiper>
					</div>
				</div>
			</div>
		);
	};

	const FilterHandle = () => {
		return (
			<div className="flagFitter-payment user-v1-layout">
				<NavTopTitleAction Title="Bộ lọc" Back={() => router.back()}></NavTopTitleAction>
				<div className="user-v1-layout-inner-large">
					<div className="relative px-5 pb-5 w-full">
						<div className="sort pt-5 w-full">
							<span className="heading-Label">Sắp xếp theo</span>
							<label htmlFor="filter" className="flex flex-row justify-start items-center py-3.5">
								<input
									type="radio"
									name="filter"
									id="filter"
									value="filter"
									checked={input.value === "filter"}
									status={input.value === "filter" ? "true" : "false"}
									onChange={handleChange}
									className="hidden"
								/>
								<div className="w-10 h-10 icon-Svg bg-gray_12 rounded-full">
									<Icon_Global_Heart />
								</div>
								<span className="label label-Bold_Gray mx-4">Được đề xuất</span>
								<span
									className={`checkmark w-6 h-6 rounded-lg mr-0 ml-auto ${
										input.value === "filter" ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
									}`}
								>
									{input.value === "filter" && <Icon_Global_Check_Tick />}
								</span>
							</label>
							<label htmlFor="outstanding" className="flex flex-row justify-start items-center py-3.5 border-t-1 border_gray_1 ">
								<input
									type="radio"
									name="filter"
									id="outstanding"
									value="outstanding"
									checked={input.value === "outstanding"}
									status={input.value === "outstanding" ? "true" : "false"}
									onChange={handleChange}
									className="hidden"
								/>
								<div className="w-10 h-10 icon-Svg bg-gray_12 rounded-full">
									<Icon_Activity_Fire />
								</div>
								<span className="label label-Bold_Gray mx-4">Nổi bật</span>
								<span
									className={`checkmark w-6 h-6 rounded-lg mr-0 ml-auto ${
										input.value === "outstanding" ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
									}`}
								>
									{input.value === "outstanding" && <Icon_Global_Check_Tick />}
								</span>
							</label>
							<label htmlFor="review" className="flex flex-row justify-start items-center py-3.5 border-t-1 border_gray_1 ">
								<input
									type="radio"
									name="filter"
									id="review"
									value="review"
									checked={input.value === "review"}
									status={input.value === "review" ? "true" : "false"}
									onChange={handleChange}
									className="hidden"
								/>
								<div className="w-10 h-10 icon-Svg bg-gray_12 rounded-full">
									<Icon_Activity_Start />
								</div>
								<span className="label label-Bold_Gray mx-4">Đánh giá</span>
								<span
									className={`checkmark w-6 h-6 rounded-lg mr-0 ml-auto ${
										input.value === "review" ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
									}`}
								>
									{input.value === "review" && <Icon_Activity_Fire />}
								</span>
							</label>
						</div>
						<div className="sort pt-5 w-full">
							<span className="heading-Label">Tìm kiếm</span>
							<form
								action=""
								className="search flex flex-row justify-start items-center flex-nowrap border-1 border-gray-1 rounded-xl px-4 py-3.5 mt-4"
							>
								<Icon_Global_Search_Gray />
								<input
									type="search"
									id="search"
									className="bg-transparent text-sm w-input-sort text-gray_8 tracking-3 placeholder-gray_8 pl-4 appearance-none focus-visible:outline-none"
									placeholder="Tìm kiếm"
								/>
							</form>
						</div>
						<div className="sort pt-5">
							<span className="heading-Label">Giới tính</span>
							<label htmlFor="male" className="flex flex-row justify-start items-center py-3.5">
								<input
									type="radio"
									name="filter"
									id="male"
									value="male"
									checked={input.value === "male"}
									status={input.value === "male" ? "true" : "false"}
									onChange={handleChange}
									className="hidden"
								/>
								<div className="w-10 h-10 icon-Svg bg-gray_12 rounded-full">
									<Icon_Activity_Male />
								</div>
								<span className="label label-Bold_Gray mx-4">Nam</span>
								<span
									className={`checkmark w-6 h-6 rounded-lg mr-0 ml-auto ${
										input.value === "male" ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
									}`}
								>
									{input.value === "male" && <Icon_Global_Check_Tick />}
								</span>
							</label>
							<label htmlFor="female" className="flex flex-row justify-start items-center py-3.5 border-t-1 border_gray_1 ">
								<input
									type="radio"
									name="filter"
									id="female"
									value="female"
									checked={input.value === "female"}
									status={input.value === "female" ? "true" : "false"}
									onChange={handleChange}
									className="hidden"
								/>
								<div className="w-10 h-10 icon-Svg bg-gray_12 rounded-full">
									<Icon_Activity_Female_Filter />
								</div>
								<span className="label label-Bold_Gray mx-4">Nữ</span>
								<span
									className={`checkmark w-6 h-6 rounded-lg mr-0 ml-auto ${
										input.value === "female" ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
									}`}
								>
									{input.value === "female" && <Icon_Global_Check_Tick />}
								</span>
							</label>
							<label htmlFor="other" className="flex flex-row justify-start items-center py-3.5 border-t-1 border_gray_1 ">
								<input
									type="radio"
									name="filter"
									id="other"
									value="other"
									checked={input.value === "other"}
									status={input.value === "other" ? "true" : "false"}
									onChange={handleChange}
									className="hidden"
								/>
								<div className="w-10 h-10 icon-Svg bg-gray_12 rounded-full">
									<Icon_Activity_Other_Sex />
								</div>
								<span className="label label-Bold_Gray mx-4">Khác</span>
								<span
									className={`checkmark w-6 h-6 rounded-lg mr-0 ml-auto ${
										input.value === "other" ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
									}`}
								>
									{input.value === "other" && <Icon_Global_Check_Tick />}
								</span>
							</label>
						</div>
						<div className="sort py-5">
							<span className="heading-Label">Cân nặng</span>
							<div className="list"></div>
						</div>
						<div className="sort py-5">
							<span className="heading-Label">Chiều cao</span>
							<div className="list"></div>
						</div>
						<div className="apply pt-4 mt-auto mb-0 w-full flex flex-row justify-between items-center flex-nowrap">
							<button className="reset w-12 h-12 icon-Svg bg-gray_12 rounded-xl">
								<Icon_Global_Reset />
							</button>
							<button className="button button-Medium-White p-4 w-1/60 rounded-xl bg-primary_6" value="apply" type="submit">
								Áp dụng
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="user-v1 user-v1-layout">
			<NavTopTitleAction Back={() => router.back()}>
				<button
					className="history w-8 h-8 mr-0 ml-auto icon-Svg"
					// onClick={() => {
					// 	router.push("/nav/activity/history");
					// }}
					onClick={() => {
						router.push({
							pathname: "/nav/activity/order",
							query: { id: 123 },
						});
					}}
				>
					<Icon_Global_History_Clock />
				</button>
				<button className="fillter w-8 h-8 ml-2 icon-Svg" onClick={() => setFlagFitter(!flagFitter)}>
					<Icon_Global_Filter />
				</button>
			</NavTopTitleAction>
			{flagFitter === false ? <ListPartnerHandle /> : <FilterHandle />}
		</div>
	);
}
UserV1.Layout = LayoutFullView;
