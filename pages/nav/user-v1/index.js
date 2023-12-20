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
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import Autocomplete from "react-google-autocomplete";
import Image from "next/image";
import LayoutFullView from "/components/layout/LayoutFullView";
import { NavTopTitleAction } from "/components/user-v1/LayoutUserV1";
import { useRouter } from "next/router";

const GOOGLE_MAPS_API_KEY = "AIzaSyDq38-QJCuQZk8-QoTeuLO-diT-HCPohCA";

export default function UserV1() {
	const router = useRouter();
	const [flagFitter, setFlagFitter] = useState(false);
	const [input, setInput] = useState({ value: "" });
	const [position, setPosition] = useState({});

	useEffect(() => {
		if (flagFitter === true) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [flagFitter]);

	const handleChange = (event) => {
		setInput({ value: event.target.value });
	};

	const locationHandle = (place) => {
		var position = {
			address: place.formatted_address,
			placeId: place.place_id,
			lat: place.geometry.location.lat(),
			long: place.geometry.location.lng(),
		};
		console.log("====================================locationHandle");
		console.log(position);
		console.log("====================================");
		setPosition(position);
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
						<span className="location text-body-small text-white w-full mt-2 mb-3">Nguyễn Vũ Icafe Hẻm 51 - Hồ Búng Xáng (Vị trí của nó)</span>
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
									onPlaceSelected={(place) => {
										locationHandle(place);
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
				<div
					className="relative py-5 w-full h-full"
					onClick={() => {
						router.push("/nav/activity/activity-partner-info");
					}}
				>
					<div className="info relative w-72 h-full min-h-24-5 m-auto rounded-2xl overflow-hidden ">
						<Image src="/img/img_user_info.png" layout="fill" objectFit="cover" />
						<div className="content px-5 py-4 absolute bottom-0 left-0 w-full z-1 bg-gray_12 bg-opacity-50 backdrop-blur-2xl flex flex-row justify-start items-center flex-wrap">
							<span className="name sub-heading-Medium w-full">Trương Hoàng Mai Anh</span>
							<span className="text-Small text-white opacity-60 w-full mt-2 mb-3">Sẵn sàng từ 12:00 - 11/06/2021</span>
							<div className="icon-Svg px-2 py-1 bg-white bg-opacity-10 rounded-3xl">
								<Icon_Activity_Female />
								<span className="caption-1 text-white ml-1">18</span>
							</div>
							<span className="dot w-1 h-1 bg-white bg-opacity-50 rounded-full mx-2"></span>
							<div className="icon-Svg ">
								<Icon_Global_User_Rate />
								<span className="caption-1 text-white ml-1">5</span>
							</div>
							<div className="relative mr-0 ml-auto">
								<span className="total text-medium text-white">200.000 đ</span>
								<span className="caption-1 text-white opacity-60 ml-1">/ giờ</span>
							</div>
						</div>
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
					onClick={() => {
						router.push("/nav/activity/activity-history");
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
