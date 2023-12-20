import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "react-phone-number-input/style.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-input-range/lib/css/index.css";

import { BtnGroup, NavTopTitleAction } from "/components/payment/LayoutPayment";
import { ContextData, ContextUpdate } from "/global/contextData";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Fragment, useEffect, useState } from "react";
import {
	Icon_Acc_Apple,
	Icon_Acc_Building,
	Icon_Acc_Camera,
	Icon_Acc_CheckCircle,
	Icon_Acc_EditGray,
	Icon_Acc_Ekyc,
	Icon_Acc_Eye,
	Icon_Acc_Facebook,
	Icon_Acc_FlagVietNam,
	Icon_Acc_Google,
	Icon_Acc_Minus,
	Icon_Acc_MinusRed,
	Icon_Acc_Plus,
	Icon_Acc_ProfileGreen,
	Icon_Acc_X_Circle,
	Icon_Activity_ArrDown,
	Icon_Activity_BirthCake,
	Icon_Activity_Body,
	Icon_Activity_FemaleGreen,
	Icon_Activity_Female_Filter,
	Icon_Activity_Graduation,
	Icon_Activity_Height,
	Icon_Activity_Home,
	Icon_Activity_Libra,
	Icon_Activity_Male_Filter,
	Icon_Activity_Other_Sex_Filter,
	Icon_Activity_Payment_ArrLeft,
	Icon_Activity_Star,
	Icon_Activity_Weigh,
	Icon_Global_Check_Tick,
	Icon_Global_Search_White,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import Image from "next/image";
import ImageUser from "/public/img/img_user_info.png";
import InputRange from "react-input-range";
import LayoutFullView from "/components/layout/LayoutFullView";
import Link from "next/link";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { data } from "autoprefixer";
import i18n from "/global/language/i18n";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

SwiperCore.use([Pagination]);
const dataInfo = [
	{
		icon: <Icon_Acc_EditGray />,
		title: "None",
		content: "Tuỳ chỉnh",
		filter: true,
	},
	{
		icon: <Icon_Activity_BirthCake />,
		title: "age",
		content: "",
	},
	{
		icon: <Icon_Activity_Libra />,
		title: "horoscope",
		content: "",
	},
	{
		icon: <Icon_Activity_Weigh />,
		title: "weight",
		content: "",
	},
	{
		icon: <Icon_Activity_Height />,
		title: "height",
		content: "",
	},
	{
		icon: <Icon_Activity_Body />,
		title: "body_size",
		content: "",
	},
	{
		icon: <Icon_Activity_Home />,
		title: "city",
		content: "",
	},
	{
		icon: <Icon_Activity_Graduation />,
		title: "graduation",
		content: "",
	},
	{
		icon: <Icon_Activity_FemaleGreen />,
		title: "gender",
		content: "",
	},
];

const data_Gender = [
	{
		name: "userv1_male",
		icon: <Icon_Activity_Male_Filter />,
		value: "male",
	},
	{
		name: "userv1_female",
		icon: <Icon_Activity_Female_Filter />,
		value: "female",
	},
	{
		name: "userv1_other",
		icon: <Icon_Activity_Other_Sex_Filter />,
		value: "other",
	},
];

const data_Constellation = [
	{
		name: "activity_zodiac_tianstronomer",
		icon: <Icon_Activity_Libra />,
		value: "tianstronomer",
	},
	{
		name: "activity_zodiac_birch",
		icon: <Icon_Activity_Libra />,
		value: "birch",
	},
	{
		name: "activity_zodiac_lion",
		icon: <Icon_Activity_Libra />,
		value: "lion",
	},
	{
		name: "activity_zodiac_sagittarius",
		icon: <Icon_Activity_Libra />,
		value: "sagittarius",
	},
];

const data_Academic = [
	{
		name: "userv1_academic_junior_school",
		icon: <Icon_Activity_Libra />,
		value: "junior_school",
	},
	{
		name: "userv1_academic_high_school",
		icon: <Icon_Activity_Libra />,
		value: "high_school",
	},
	{
		name: "userv1_academic_college",
		icon: <Icon_Activity_Libra />,
		value: "college",
	},
	{
		name: "activity_level_university",
		icon: <Icon_Activity_Libra />,
		value: "university",
	},
];

const dataGiven = ["Âm nhạc", "Chơi goft"];
function UserProfile({ t }) {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [userInfo, setUserInfo] = useState();
	const [showEdit, setShowEdit] = useState(false);
	const [fullName, setFullName] = useState("");
	const [mail, setMail] = useState("");
	const [phone, setPhone] = useState("+8491912345");
	const { control, handleSubmit } = useForm();
	const [employeeID, serEmployeeID] = useState("");
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");
	const [date, onChangeDate] = useState(new Date());
	const [modalProfile, setModalProfile] = useState(false);
	const [search, setSearch] = useState("");
	const [gender, setGender] = useState("female");
	const [constellation, setConstellation] = useState("birch");
	const [academic, setAcademic] = useState("college");
	const [checkedGender, setCheckedGender] = useState(false);
	const [checkedHeight, setCheckedHeight] = useState(false);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const [weight, setWeight] = useState({
		value: "",
	});

	const [height, setHeight] = useState({
		value: "",
	});

	const [roundOne, setRoundOne] = useState({
		value: "",
	});

	const [roundTwo, setRoundTwo] = useState({
		value: "",
	});

	const [roundThree, setRoundThree] = useState({
		value: "",
	});

	const handleWeight = (event) => {
		setWeight({ value: event });
	};

	const handleHeight = (event) => {
		setHeight({ value: event });
	};

	const handleRoundOne = (event) => {
		setRoundOne({ value: event });
	};

	const handleRoundTwo = (event) => {
		setRoundTwo({ value: event });
	};

	const handleRoundThree = (event) => {
		setRoundThree({ value: event });
	};

	const handleGender = (e) => {
		setGender(e.target.value);
	};

	const handleConstellation = (e) => {
		setConstellation(e.target.value);
	};

	const handleAcademic = (e) => {
		setAcademic(e.target.value);
	};

	// const handleChecked = () => {
	//   setChecked(!checked);
	// };

	var obj = {
		data_UserV1: {
			search: search,
			gender: gender,
			weight: weight,
			height: height,
			roundOne: roundOne,
			roundTwo: roundTwo,
			roundThree: roundThree,
			constellation: constellation,
			academic: academic,
		},
	};
	JSON.stringify(obj, null, "    ");
	const handleSubmitFilter = () => {
		console.log(obj);
	};

	useEffect(() => {
		if (modalProfile) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = " unset";
		}
	}, [modalProfile]);

	useEffect(() => {
		// * Event reload page to update data of context
		if (window.performance) {
			if (performance.navigation.type == 1) {
				ContextUpdate();
			}
		}

		// * Check info user is undefined to update data
		if (typeof ContextData.userInfo === "undefined") {
			ContextUpdate();
		}

		// * Update all data of user for component
		intiData();
	}, []);

	/**
	 * @author sat.nguyen
	 * @create 29/07/2021
	 * @description Init data global
	 */
	const intiData = () => {
		console.log("====================================profile: ContextData.userInfo");
		console.log(ContextData.userInfo);
		console.log("====================================");

		var context = ContextData.userInfo;
		setUserInfo(ContextData.userInfo);
		setFullName(typeof context.display_name !== "undefined" ? context.display_name : "N/A");
		setPhone(typeof context.phone_number !== "undefined" ? context.phone_number : "N/A");
		setMail(typeof context.email !== "undefined" ? context.email : "N/A");
		serEmployeeID(typeof context.employee_id !== "undefined" ? context.employee_id : "N/A");

		// ! Simulator data get form api
		var testData = {
			address: "Đường 3/2, Quận Ninh Kiều, Tp. Cần thơ",
			birthday: "2002-01-13",
			body_size: "90-68-95",
			city: "Can tho",
			gender: "0",
			graduation: "Đại học CTU",
			height: "62",
			national: "Việt Nam",
			weight: "168",
			age: "18",
			horoscope: "Thiên Bình",
			email: "satnguyen@gmail.com",
			phone: "0919123456",
			display_name: "Sat Nguyen",
			employee_id: "123465789",
		};

		var item = "";
		dataInfo.forEach((element, index) => {
			item = element.title;
			dataInfo[index].item = typeof testData[item] !== "undefined" ? testData[item] : "N/A";
		});
	};

	const UserProfileDefault = () => {
		const [info_active, setInfoActive] = useState(false);
		const handleInfo = (e) => {
			setInfoActive(!info_active);
		};
		const [social_active, setSocialActive] = useState(false);
		const handleSocial = (e) => {
			setSocialActive(!social_active);
		};
		const [password_active, setPasswordActive] = useState(false);
		const handlePassword = (e) => {
			setPasswordActive(!password_active);
		};
		const [pass_old_hidden, setPassOldHidden] = useState(false);
		const passOldHidden = (e) => {
			setPassOldHidden(!pass_old_hidden);
		};
		const [pass_hidden, setPassHidden] = useState(false);
		const passHidden = (e) => {
			setPassHidden(!pass_hidden);
		};
		const [re_pass_hidden, setRePassHidden] = useState(false);
		const rePassHidden = (e) => {
			setRePassHidden(!re_pass_hidden);
		};
		const addGiven = (e) => {
			if (e.key === "Enter") {
				dataGiven.push(e.target.value);
				e.target.value = "";
			}
		};
		const removeGiven = (e) => {
			dataGiven.pop(e.item);
		};

		return (
			<div className="bg-white text-gray_4 w-full overflow-auto tracking-3 py-8 leading-18">
				<div className="px-5 text-center">
					<div className="flex items-center justify-center">
						<h2 className="text-2xl tracking-8 font-bold text-gray-2 pr-2 ">Trương Hoàng Mai Anh</h2>
						<Icon_Acc_CheckCircle />
					</div>
					<div className="flex items-center justify-center pt-4">
						<Icon_Activity_Star />
						<Icon_Activity_Star />
						<Icon_Activity_Star />
						<Icon_Activity_Star />
						<Icon_Activity_Star />
					</div>
				</div>
				<div className="mx-5 pt-8 border-b h-32 min">
					<input
						className=" p-2 pr-4 pb-2.5 text-5 leading-18 tracking-3 text-gray_8 outline-none  bg-opacity-0 bg-white"
						placeholder="Nhập tên sở thích"
						onKeyDown={addGiven}
					></input>
					<div className="flex">
						{
							// TODO update dataGiven fail
							dataGiven.length != 0
								? dataGiven.map(function (item, index) {
										return (
											<div className="p-2 flex items-center bg-gray_12 rounded-full w-min mr-2" key={index}>
												<span className="pr-2.5 text-5 leading-4 tracking-7 whitespace-nowrap ">{item}</span>
												<div onClick={removeGiven}>
													<Icon_Acc_X_Circle />
												</div>
											</div>
										);
								  })
								: ""
						}
					</div>
				</div>
				<div className="pt-8">
					<div className="flex flex-wrap">
						{dataInfo.length > 0
							? dataInfo.map(function (item, index) {
									return (
										<div className="w-4/12 text-center mb-5" key={index}>
											<div className="grid items-center justify-center mb-2">
												<div
													className="p-3 bg-gray-200 rounded-full flex items-center"
													onClick={() => {
														item.filter && setModalProfile(!modalProfile);
													}}
												>
													{item.icon}
												</div>
											</div>
											<span className="text-5 tracking-3 leading-18">{item.content}</span>
										</div>
									);
							  })
							: null}
					</div>
				</div>
				<div className="p-5 mt-0.5">
					<div className="flex justify-between">
						<h2 className={`text-2 font-semibold tracking-8 leading-16 mr-3 ${info_active === true ? " text-primary_6" : " text-gray_4"} `}>
							Thông tin liên hệ
						</h2>
						<div onClick={handleInfo}> {info_active === true ? <Icon_Acc_Minus /> : <Icon_Acc_Plus />}</div>
					</div>
					<div className={`${info_active === true ? "block" : "hidden"}`}>
						<div className="flex justify-between py-5">
							<div className="py-2.5 px-2 bg-primary_12 rounded-lg border-primary_8 border border-solid grid justify-center items-center w-50/8 mr-2">
								<div className="flex justify-center">
									<Icon_Acc_ProfileGreen />
								</div>
								<span className="font-medium mt-2.5 leading-3 text-smallest tracking-7 text-primary_6">Cá nhân</span>
							</div>
							<div className="py-2.5 px-2 rounded-lg border-gray_11 border border-solid grid justify-center items-center w-50/8 ml-2">
								<div className="flex justify-center">
									<Icon_Acc_Building />
								</div>
								<span className="font-medium mt-2.5 leading-3 text-smallest tracking-7 text-gray_4">Doanh nghiệp</span>
							</div>
						</div>
						<div className=" grid items-center p-2 mb-2">
							<label className="text-5 leading-18 tracking-3 text-gray_8">Họ và tên</label>
							<input
								className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"
								value={fullName}
							></input>
						</div>
						<div className=" grid items-center p-2 mb-2">
							<label className="text-5 leading-18 tracking-3 text-gray_8">CMND/CCCD</label>
							<input
								className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"
								value={employeeID}
							></input>
						</div>
						{/* <div className="flex justify-between items-center px-2 mb-2">
							<div className="mr-4 py-4.5 flex items-center">
								<Icon_Acc_FlagVietNam />
								<select className=" px-3 outline-none bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>+084</option>
									<option>+082</option>
								</select>
								<Icon_Activity_ArrDown />
							</div>
							<div className=" grid items-center w-full">
								<input
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0 placeholder-shown:text-gray_8 placeholder-shown:font-normal"
									placeholder="Số điện thoại"
									value={phone}
								></input>
							</div>
						</div> */}
						<div className="grid mt-4">
							<label className="text-clampSm mb-1">Số điện thoại</label>
							<div className=" w-auto  rounded-lg flex items-center justify-between">
								<PhoneInputWithCountry
									name="phoneInputWithCountrySelect"
									control={control}
									defaultValue={phone}
									onChange={setPhone}
									rules={{ required: true }}
								/>
							</div>
						</div>
						<div className=" grid items-center p-2 mb-2">
							<label className="text-5 leading-18 tracking-3 text-gray_8">Địa chỉ email</label>
							<input className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0" value={mail}></input>
						</div>
						{/* <div className=" flex justify-between items-center p-2 mb-2">
							<div className="grid w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Quốc gia / Khu vực</label>
								<select className=" w-1/60 outline-none  bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>Regular </option>
								</select>
							</div>
							<Icon_Activity_ArrDown />
						</div>
						<div className=" flex justify-between items-center p-2 mb-2">
							<div className="grid w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Thị trấn / Thành phố</label>
								<select className=" w-1/60 outline-none bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>Regular </option>
								</select>
							</div>
							<Icon_Activity_ArrDown />
						</div>
						<div className=" flex justify-between items-center p-2 mb-2">
							<div className="grid w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Quận / Huyện</label>
								<select className=" w-1/60 outline-none  bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>Regular </option>
								</select>
							</div>
							<Icon_Activity_ArrDown />
						</div> */}
						<div className=" mt-4 grid items-center grid-cols-2 gap-3">
							<div className="">
								<label className="text-clampSm mb-1">Thành phố</label>
								<div className="p-4 bg-gray-100 rounded-lg">
									<RegionDropdown
										country={country}
										value={region}
										onChange={(val) => {
											setRegion(val);
										}}
									/>
								</div>
							</div>
							<div className="">
								<label className="text-clampSm mb-1">Quốc gia</label>
								<div className="p-4 bg-gray-100 rounded-lg">
									<CountryDropdown
										value={country}
										onChange={(val) => {
											setCountry(val);
										}}
									/>
								</div>
							</div>
						</div>
						<div className=" grid items-center p-2 mb-2">
							<label className="text-5 leading-18 tracking-3 text-gray_8">Địa chỉ</label>
							<input className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"></input>
						</div>
					</div>
				</div>
				<div className="p-5 mt-0.5">
					<div className="flex justify-between">
						<h2 className={`text-2 font-semibold tracking-8 leading-16 mr-3 ${social_active === true ? " text-primary_6" : " text-gray_4"} `}>
							Kết nối hồ sơ mạng xã hội
						</h2>
						<div onClick={handleSocial}> {social_active === true ? <Icon_Acc_Minus /> : <Icon_Acc_Plus />}</div>
					</div>
					<div className={`${social_active === true ? "block" : "hidden"} pt-4`}>
						<div className="py-4.5 border-b flex justify-between items-center">
							<div className="p-2.5 bg-gray_12 rounded-full">
								<Icon_Acc_Google />
							</div>
							<span className=" w-full px-4 font-semibold text-1 leading-15 tracking-2 text-gray_4">Google</span>
							<div className="relative">
								<label htmlFor="google" className="flex items-center justify-between w-full py-3 cursor-pointer">
									<input type="checkbox" id="google" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute items-center bg-white w-5 h-5 rounded-full transition" />
								</label>
							</div>
						</div>
						<div className="py-4.5 border-b flex justify-between items-center">
							<div className="p-2.5 bg-gray_12 rounded-full">
								<Icon_Acc_Facebook />
							</div>
							<span className=" w-full px-4 font-semibold text-1 leading-15 tracking-2 text-gray_4">Facebook</span>
							<div className="relative">
								<label htmlFor="facebook" className="flex items-center justify-between w-full py-3 cursor-pointer">
									<input type="checkbox" id="facebook" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute items-center bg-white w-5 h-5 rounded-full transition" />
								</label>
							</div>
						</div>
						<div className="py-4.5 border-b flex justify-between items-center">
							<div className="p-2.5 bg-gray_12 rounded-full">
								<Icon_Acc_Apple />
							</div>
							<span className=" w-full px-4 font-semibold text-1 leading-15 tracking-2 text-gray_4">Apple</span>
							<div className="relative">
								<label htmlFor="apple" className="flex items-center justify-between w-full py-3 cursor-pointer">
									<input type="checkbox" id="apple" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute items-center bg-white w-5 h-5 rounded-full transition" />
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="p-5 mt-0.5 mb-10">
					<div className="flex justify-between mb-6">
						<h2 className={`text-2 font-semibold tracking-8 leading-16 mr-3 ${password_active === true ? " text-primary_6" : " text-gray_4"} `}>
							Đổi mật khẩu
						</h2>
						<div onClick={handlePassword}> {password_active === true ? <Icon_Acc_Minus /> : <Icon_Acc_Plus />}</div>
					</div>
					<div className={`${password_active === true ? "block" : "hidden"}`}>
						<div className="flex justify-between items-center">
							<div className=" grid items-center p-2 mb-2 w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Mật khẩu cũ</label>
								<input
									type={`${pass_old_hidden === true ? "text" : "password"}`}
									className=" text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"
								></input>
							</div>
							<div className=" p-4.5" onClick={passOldHidden}>
								<Icon_Acc_Eye />
							</div>
						</div>
						<div className="flex justify-between items-center w-full">
							<div className=" grid items-center p-2 mb-2">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Nhập mật khẩu</label>
								<input
									type={`${pass_hidden === true ? "text" : "password"}`}
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"
								></input>
							</div>
							<div className=" p-4.5" onClick={passHidden}>
								<Icon_Acc_Eye />
							</div>
						</div>
						<div className="flex justify-between items-center w-full">
							<div className=" grid items-center p-2 mb-2">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Nhập lại mật khẩu</label>
								<input
									type={`${re_pass_hidden === true ? "text" : "password"}`}
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"
								></input>
							</div>
							<div className=" p-4.5" onClick={rePassHidden}>
								<Icon_Acc_Eye />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const UserProfileError = () => {
		const router = useRouter();
		const [info_active, setInfoActive] = useState(false);
		const handleInfo = (e) => {
			setInfoActive(!info_active);
		};
		const [social_active, setSocialActive] = useState(false);
		const handleSocial = (e) => {
			setSocialActive(!social_active);
		};
		const [password_active, setPasswordActive] = useState(false);
		const handlePassword = (e) => {
			setPasswordActive(!password_active);
		};

		return (
			<div className="bg-white text-gray_4 w-full overflow-auto tracking-3 leading-18">
				<div className="mx-5 my-8 rounded-xl border-gray_11 border border-solid">
					<div className="flex p-4">
						<div className=" p-3.5 bg-gray_12 rounded-full">
							<Icon_Acc_Ekyc />
						</div>
						<div className="grid pl-4">
							<span className="text-gray_4 font-semibold text-1 leading-15 tracking-2">Xác minh người dùng</span>
							<span className="text-dark_medium text-5 leading-18 tracking-3 opacity-60">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit{" "}
							</span>
						</div>
					</div>
					<div className="m-4 mt-0 flex items-center justify-center p-4 bg-gray_12 font-semibold rounded-xl text-gray_4 text-5 leading-4 tracking-7">
						Xác minh ngay
					</div>
				</div>
				<div className="px-5 text-center">
					<div className="flex items-center justify-center">
						<h2 className="text-2xl tracking-8 font-bold text-gray-2 pr-2 ">Trương Hoàng Mai Anh</h2>
						<Icon_Acc_CheckCircle />
					</div>
					<div className="flex items-center justify-center pt-4">
						<Icon_Activity_Star />
						<Icon_Activity_Star />
						<Icon_Activity_Star />
						<Icon_Activity_Star />
						<Icon_Activity_Star />
					</div>
				</div>
				<div className="mx-5 pt-8 border-b h-32 min">
					<input
						className=" p-2 pr-4 pb-2.5 text-5 leading-18 tracking-3 text-gray_8 outline-none  bg-opacity-0 bg-white"
						placeholder="Nhập tên sở thích"
					></input>
					<div className="flex">
						<div className="p-2 flex items-center bg-gray_12 rounded-full w-min mr-2">
							<span className="pr-2.5 text-5 leading-4 tracking-7 whitespace-nowrap ">Âm thanh</span>
							<Icon_Acc_X_Circle />
						</div>
						<div className="p-2 flex items-center bg-gray_12 rounded-full w-min mr-2 ">
							<span className="pr-2.5 text-5 leading-4 tracking-7 whitespace-nowrap ">Âm thanh</span>
							<Icon_Acc_X_Circle />
						</div>
					</div>
				</div>
				<div className="pt-8">
					<div className="flex flex-wrap">
						{dataInfo.map(function (item, index) {
							return (
								<div className="w-4/12 text-center mb-5" key={index}>
									<div className="grid items-center justify-center mb-2">
										<div className="p-3 bg-gray-200 rounded-full flex items-center">{item.icon}</div>
									</div>
									<span className="text-5 tracking-3 leading-18">{item.title}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="p-5 mt-0.5">
					<div className="flex justify-between">
						<h2 className={`text-2 font-semibold tracking-8 leading-16 mr-3 ${info_active === true ? " text-red_6" : " text-gray_4"} `}>
							Thông tin liên hệ
						</h2>
						<div onClick={handleInfo}> {info_active === true ? <Icon_Acc_MinusRed /> : <Icon_Acc_Plus />}</div>
					</div>
					<div className={`${info_active === true ? "block" : "hidden"}`}>
						<div className="flex justify-between py-5">
							<div className="py-2.5 px-2 bg-primary_12 rounded-lg border-primary_8 border border-solid grid justify-center items-center w-50/8 mr-2">
								<div className="flex justify-center">
									<Icon_Acc_ProfileGreen />
								</div>
								<span className="font-medium mt-2.5 leading-3 text-smallest tracking-7 text-primary_6">Cá nhân</span>
							</div>
							<div className="py-2.5 px-2 rounded-lg border-gray_11 border border-solid grid justify-center items-center w-50/8 ml-2">
								<div className="flex justify-center">
									<Icon_Acc_Building />
								</div>
								<span className="font-medium mt-2.5 leading-3 text-smallest tracking-7 text-gray_4">Doanh nghiệp</span>
							</div>
						</div>
						<div>
							<div className=" grid items-center p-2 border-b border-red_6">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Họ và tên</label>
								<input
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0"
									value="Trương Hoàng Mai Anh"
								></input>
							</div>
							<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
						</div>
						<div>
							<div className=" grid items-center p-2 border-b border-red_6">
								<label className="text-5 leading-18 tracking-3 text-gray_8">CMND/CCCD</label>
								<input
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0"
									value="Valued"
								></input>
							</div>
							<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
						</div>

						<div className="flex justify-between items-center px-2 mb-2">
							<div className="mr-4 py-4.5 flex items-center">
								<Icon_Acc_FlagVietNam />
								<select className=" px-3 outline-none bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>+084</option>
									<option>+082</option>
								</select>
								<Icon_Activity_ArrDown />
							</div>
							<div>
								<div className=" grid items-center w-full p-2 border-b border-red_6">
									<label className="text-5 leading-18 tracking-3 text-gray_8">Số điện thoại</label>
									<input
										className="text-5  outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0 placeholder-shown:text-gray_8 placeholder-shown:font-normal"
										value="0909090909"
									></input>
								</div>
								<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
							</div>
						</div>
						<div>
							<div className=" grid items-center p-2 border-b border-red_6">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Địa chỉ email</label>
								<input
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0"
									value="phihuongtu@gmail.com"
								></input>
							</div>
							<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
						</div>

						<div className=" flex justify-between items-center p-2 mb-2">
							<div className="grid w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Quốc gia / Khu vực</label>
								<select className=" w-1/60 outline-none  bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>Regular </option>
								</select>
							</div>
							<Icon_Activity_ArrDown />
						</div>
						<div className=" flex justify-between items-center p-2 mb-2">
							<div className="grid w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Thị trấn / Thành phố</label>
								<select className=" w-1/60 outline-none bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>Regular </option>
								</select>
							</div>
							<Icon_Activity_ArrDown />
						</div>
						<div className=" flex justify-between items-center p-2 mb-2">
							<div className="grid w-full">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Quận / Huyện</label>
								<select className=" w-1/60 outline-none  bg-white bg-opacity-0 text-gray_2 font-semibold text-5 leading-4 appearance-none">
									<option>Regular </option>
								</select>
							</div>
							<Icon_Activity_ArrDown />
						</div>
						<div>
							<div className="grid items-center p-2">
								<label className="text-5 leading-18 tracking-3 text-gray_8">Địa chỉ</label>
								<input
									className="text-5 outline-none leading-4 font-semibold tracking-7 text-gray_2 bg-white bg-opacity-0"
									value="Vauled"
								></input>
							</div>
						</div>
					</div>
				</div>
				<div className="p-5 mt-0.5">
					<div className="flex justify-between">
						<h2 className={`text-2 font-semibold tracking-8 leading-16 mr-3 ${social_active === true ? " text-primary_6" : " text-gray_4"} `}>
							Kết nối hồ sơ mạng xã hội
						</h2>
						<div onClick={handleSocial}> {social_active === true ? <Icon_Acc_Minus /> : <Icon_Acc_Plus />}</div>
					</div>
					<div className={`${social_active === true ? "block" : "hidden"} pt-4`}>
						<div className="py-4.5 border-b flex justify-between items-center">
							<div className="p-2.5 bg-gray_12 rounded-full">
								<Icon_Acc_Google />
							</div>
							<span className=" w-full px-4 font-semibold text-1 leading-15 tracking-2 text-gray_4">Google</span>
							<div className="relative">
								<label htmlFor="google" className="flex items-center justify-between w-full py-3 cursor-pointer">
									<input type="checkbox" id="google" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute items-center bg-white w-5 h-5 rounded-full transition" />
								</label>
							</div>
						</div>
						<div className="py-4.5 border-b flex justify-between items-center">
							<div className="p-2.5 bg-gray_12 rounded-full">
								<Icon_Acc_Facebook />
							</div>
							<span className=" w-full px-4 font-semibold text-1 leading-15 tracking-2 text-gray_4">Facebook</span>
							<div className="relative">
								<label htmlFor="google" className="flex items-center justify-between w-full py-3 cursor-pointer">
									<input type="checkbox" id="google" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute items-center bg-white w-5 h-5 rounded-full transition" />
								</label>
							</div>
						</div>
						<div className="py-4.5 border-b flex justify-between items-center">
							<div className="p-2.5 bg-gray_12 rounded-full">
								<Icon_Acc_Apple />
							</div>
							<span className=" w-full px-4 font-semibold text-1 leading-15 tracking-2 text-gray_4">Apple</span>
							<div className="relative">
								<label htmlFor="google" className="flex items-center justify-between w-full py-3 cursor-pointer">
									<input type="checkbox" id="google" className="input-switch sr-only" />
									<div className="switch-bg block bg-gray_11 w-12 h-6 rounded-full" />
									<div className="dot absolute items-center bg-white w-5 h-5 rounded-full transition" />
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="p-5 mt-0.5 mb-10">
					<div className="flex justify-between mb-6">
						<h2 className={`text-2 font-semibold tracking-8 leading-16 mr-3 ${password_active === true ? "text-red_6" : " text-gray_4"} `}>
							Đổi mật khẩu
						</h2>
						<div onClick={handlePassword}> {password_active === true ? <Icon_Acc_MinusRed /> : <Icon_Acc_Plus />}</div>
					</div>
					<div className={`${password_active === true ? "block" : "hidden"}`}>
						<div>
							<div className="flex justify-between items-center border-b border-red_6">
								<div className=" grid items-center p-2 mb-2">
									<label className="text-5 leading-18 tracking-3 text-gray_8">Mật khẩu cũ</label>
									<input
										className=" text-5 outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0"
										value="Wrong Value"
									></input>
								</div>
								<div>
									<Icon_Acc_Eye />
								</div>
							</div>
							<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
						</div>
						<div>
							<div className="flex justify-between items-center border-b border-red_6">
								<div className=" grid items-center p-2 mb-2">
									<label className="text-5 leading-18 tracking-3 text-gray_8">Nhập mật khẩu</label>
									<input
										className="text-5 outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0"
										value="Wrong Value"
									></input>
								</div>
								<div>
									<Icon_Acc_Eye />
								</div>
							</div>
							<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
						</div>

						<div>
							<div className="flex justify-between items-center border-b border-red_6">
								<div className=" grid items-center p-2 mb-2">
									<label className="text-5 leading-18 tracking-3 text-gray_8">Nhập lại mật khẩu</label>
									<input
										className="text-5 outline-none leading-4 font-semibold tracking-7 text-red_6 bg-white bg-opacity-0"
										value="Wrong Value"
									></input>
								</div>
								<div>
									<Icon_Acc_Eye />
								</div>
							</div>
							<span className="my-2 text-red_6 text-3 tracking-6 leading-14">Error Notification</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const FilterHandle = () => {
		return (
			<div className="user-v1 user-v1-layout">
				<div className="flagFitter-payment user-v1-layout">
					<NavTopTitleAction Title={t("global_set_options")} Back={() => setModalProfile(!modalProfile)}></NavTopTitleAction>
					<div className="user-v1-layout-inner-large">
						<div
							className="relative w-full grid justify-items-start grid-cols-1 gap-8 pb-28"
							// onSubmit={handleSubmit}
						>
							<div className="relative w-full bg-primary_6 px-5 pb-5">
								<div className="search flex flex-row justify-start items-center flex-nowrap bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-xl px-4 py-3.5">
									<Icon_Global_Search_White />
									<input
										type="search"
										id="search-history"
										className="bg-transparent text-sm text-white tracking-3 placeholder-white pl-4 w-input-sort appearance-none focus-visible:outline-none"
										placeholder={t("global_search")}
										onChange={handleSearch}
										defaultValue={search}
									/>
								</div>
							</div>

							{data_Gender.length > 0 && (
								<label className="relative w-full" htmlFor="gender">
									<input
										type="checkbox"
										name="CheckBoxFilter"
										id="gender"
										defaultChecked={checkedGender}
										onChange={() => setCheckedGender(!checkedGender)}
										className="hidden"
									/>
									<div className="px-5 pb-5 flex flex-row justify-start items-center flex-wrap">
										<span
											className={`checkmark w-6 h-6 rounded-lg ${
												checkedGender === true ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
											}`}
										>
											{checkedGender === true && <Icon_Global_Check_Tick />}
										</span>
										<h3 className="heading-Label pl-4">{t("userv1_gender")}</h3>
										<span className="current_gernder text-Small_Regular ml-auto">
											{data_Gender.map(function (items, index) {
												return <Fragment key={index}>{gender === items.value && <>{t(items.name)}</>}</Fragment>;
											})}
										</span>
									</div>
									<div className="flex flex-row justify-between items-center flex-wrap pl-14 pr-5 w-full">
										{data_Gender.map(function (items, index) {
											return (
												<Fragment key={index}>
													<label
														htmlFor={items.value}
														className={`w-33/8 border-1 rounded-lg  px-2 py-2.5 text-center cursor-pointer ${
															gender === items.value ? "border-primary_6 bg-primary_12" : "border-gray-1 bg-white bg-opacity-8"
														}`}
													>
														<i className="icon-Svg svg w-6 h-6 m-auto">{items.icon}</i>
														<input
															type="radio"
															name="gender"
															id={items.value}
															defaultValue={items.value}
															className="hidden"
															checked={gender === items.value}
															onChange={handleGender}
														/>
														<span
															className={`font-ProDisplay ${gender === items.value ? "label-Bottom_Pri_6" : "label-Bottom_Gray"}`}
														>
															{t(items.name)}
														</span>
													</label>
												</Fragment>
											);
										})}
									</div>
								</label>
							)}

							<label className="relative w-full" htmlFor="height">
								<input
									type="checkbox"
									name="CheckBoxFilter"
									id="height"
									defaultChecked={checkedHeight}
									onChange={() => setCheckedHeight(!checkedHeight)}
									className="hidden"
								/>
								<div className="px-5 pb-5 flex flex-row justify-start items-center flex-wrap">
									<span
										className={`checkmark w-6 h-6 rounded-lg ${
											checkedHeight === true ? "bg-primary_6 icon-Svg" : "border-2 border-gray-1"
										}`}
									>
										{checkedHeight === true && <Icon_Global_Check_Tick />}
									</span>
									<h3 className="heading-Label pl-4">{t("userv1_height")}</h3>
									<span className="current_gernder text-Small_Regular ml-auto">{height.value} cm</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap pl-14 pr-5 w-full h-8">
									<InputRange value={height.value} onChange={(value) => handleHeight(value)} />
								</div>
							</label>

							<div className="relative w-full">
								<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
									<h3 className="heading-Label">{t("userv1_weight")}</h3>
									<span className="current_gernder text-Small_Regular">
										{weight.value} {t("userv1_kg")}
									</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap pl-14 pr-5 w-full h-8">
									<InputRange value={weight.value} onChange={(value) => handleWeight(value)} />
								</div>
							</div>

							<div className="relative w-full">
								<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
									<h3 className="heading-Label">{t("userv1_round_1")}</h3>
									<span className="current_gernder text-Small_Regular">{roundOne.value} cm</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap pl-14 pr-5 w-full h-8">
									<InputRange value={roundOne.value} onChange={(value) => handleRoundOne(value)} />
								</div>
							</div>

							<div className="relative w-full">
								<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
									<h3 className="heading-Label">{t("userv1_round_2")}</h3>
									<span className="current_gernder text-Small_Regular">{roundTwo.value} cm</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap pl-14 pr-5 w-full h-8">
									<InputRange value={roundTwo.value} onChange={(value) => handleRoundTwo(value)} />
								</div>
							</div>

							<div className="relative w-full">
								<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
									<h3 className="heading-Label">{t("userv1_round_3")}</h3>
									<span className="current_gernder text-Small_Regular">{roundThree.value}cm</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap pl-14 pr-5 w-full h-8">
									<InputRange value={roundThree.value} onChange={(value) => handleRoundThree(value)} />
								</div>
							</div>

							{data_Constellation.length > 0 && (
								<div className="relative w-full">
									<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
										<h3 className="heading-Label">{t("userv1_constellation")}</h3>
										<span className="current_gernder text-Small_Regular">
											{data_Constellation.map(function (items, index) {
												return <Fragment key={index}>{constellation === items.value && <>{t(items.name)}</>}</Fragment>;
											})}
										</span>
									</div>
									<div className="flex flex-row justify-between items-center flex-wrap w-full">
										<Swiper className="mySwipe w-full" loop={false} slidesPerView={3.2}>
											{data_Constellation.map(function (items, index) {
												return (
													<SwiperSlide key={index} className="pr-3 first-of-type:ml-14 w-33/8">
														<label
															htmlFor={items.value}
															className={` flex flex-col justify-center items-center border-1 rounded-lg px-2 py-2.5 text-center cursor-pointer ${
																constellation === items.value
																	? "border-primary_6 bg-primary_12"
																	: "border-gray-1 bg-white bg-opacity-8"
															}`}
														>
															<i className="icon-Svg svg w-6 h-6 m-auto">{items.icon}</i>
															<input
																type="radio"
																name="constellation"
																id={items.value}
																defaultValue={items.value}
																className="hidden"
																checked={constellation === items.value}
																onChange={handleConstellation}
															/>
															<span
																className={`font-ProDisplay mt-2 ${
																	constellation === items.value ? "label-Bottom_Pri_6" : "label-Bottom_Gray"
																}`}
															>
																{t(items.name)}
															</span>
														</label>
													</SwiperSlide>
												);
											})}
										</Swiper>
									</div>
								</div>
							)}

							<div className="relative w-full">
								<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
									<h3 className="heading-Label">{t("userv1_date_birth")}</h3>
									<span className="current_gernder text-Small_Regular">Nam</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap px-5 w-full">
									{/* <InputRange maxValue={20} minValue={0} /> */}
								</div>
							</div>

							<div className="relative w-full">
								<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
									<h3 className="heading-Label">{t("userv1_come_from")}</h3>
									<span className="current_gernder text-Small_Regular">Nam</span>
								</div>
								<div className="flex flex-row justify-between items-center flex-wrap px-5 w-full">
									{/* <InputRange maxValue={20} minValue={0} /> */}
								</div>
							</div>

							{data_Academic.length > 0 && (
								<div className="relative w-full">
									<div className="px-5 pb-5 flex flex-row justify-between items-center flex-wrap">
										<h3 className="heading-Label">{t("userv1_academic_level")}</h3>
										<span className="current_gernder text-Small_Regular">
											{data_Academic.map(function (items, index) {
												return <Fragment key={index}>{constellation === items.value && <>{t(items.name)}</>}</Fragment>;
											})}
										</span>
									</div>
									<div className="flex flex-row justify-between items-center flex-wrap w-full">
										<Swiper className="mySwipe w-full" loop={false} slidesPerView={3.2}>
											{data_Academic.map(function (items, index) {
												return (
													<SwiperSlide key={index} className="pr-3 first-of-type:ml-14 w-33/8">
														<label
															htmlFor={items.value}
															className={` flex flex-col justify-center items-center border-1 rounded-lg px-2 py-2.5 text-center cursor-pointer ${
																academic === items.value
																	? "border-primary_6 bg-primary_12"
																	: "border-gray-1 bg-white bg-opacity-8"
															}`}
														>
															<i className="icon-Svg svg w-6 h-6 m-auto">{items.icon}</i>
															<input
																type="radio"
																name="academic"
																id={items.value}
																defaultValue={items.value}
																className="hidden"
																checked={academic === items.value}
																onChange={handleAcademic}
															/>
															<span
																className={`font-ProDisplay mt-2 ${
																	academic === items.value ? "label-Bottom_Pri_6" : "label-Bottom_Gray"
																}`}
															>
																{t(items.name)}
															</span>
														</label>
													</SwiperSlide>
												);
											})}
										</Swiper>
									</div>
								</div>
							)}

							<BtnGroup
								Title={t("userv1_apply")}
								AddClass="px-5 py-4 fixed left-0 bottom-85 z-1 bg-white"
								// Type="submit"
								Click={handleSubmitFilter}
								// Back={() => router.back()}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{modalProfile ? (
				<FilterHandle />
			) : (
				<div className="overflow-auto">
					<NavTopTitleAction Title="Hồ sơ cá nhân" Back={() => router.back()}></NavTopTitleAction>
					<div className=" text-center pt-17">
						<>
							<Swiper pagination={true} className="mySwiper">
								<SwiperSlide className="relative ">
									<div className=" w-10 top-5 right-5 z-1 h-10 bg-gray-3 rounded-full p-2.5 absolute">
										<Icon_Acc_Camera />
									</div>
									<Image src={ImageUser} width="375" height="563" />
								</SwiperSlide>
								<SwiperSlide className="relative ">
									<div className=" w-10 top-5 right-5 z-1 h-10 bg-gray-3 rounded-full p-2.5 absolute">
										<Icon_Acc_Camera />
									</div>
									<Image src={ImageUser} width="375" height="563" />
								</SwiperSlide>
								<SwiperSlide className="relative ">
									<div className=" w-10 top-5 right-5 z-1 h-10 bg-gray-3 rounded-full p-2.5 absolute">
										<Icon_Acc_Camera />
									</div>
									<Image src={ImageUser} width="375" height="563" />
								</SwiperSlide>
								<SwiperSlide className="relative ">
									<div className=" w-10 top-5 right-5 z-1 h-10 bg-gray-3 rounded-full p-2.5 absolute">
										<Icon_Acc_Camera />
									</div>
									<Image src={ImageUser} width="375" height="563" />
								</SwiperSlide>
								<SwiperSlide className="relative ">
									<div className=" w-10 top-5 right-5 z-1 h-10 bg-gray-3 rounded-full p-2.5 absolute">
										<Icon_Acc_Camera />
									</div>
									<Image src={ImageUser} width="375" height="563" />
								</SwiperSlide>
							</Swiper>
						</>
					</div>
					{error === false ? <UserProfileDefault /> : <UserProfileError />}
					<div className="fixed flex bottom-0 inset-x-0 bg-white p-4 lg:pb-4 pb-24">
						<button className="p-4 flex justify-center items-center min-w-max rounded-xl bg-gray-200 mr-4">
							<Icon_Activity_Payment_ArrLeft />
						</button>
						<button className="p-4 bg-primary_6 rounded-xl text-center text-5 leading-4 font-semibold w-full text-white">Đồng ý</button>
					</div>
				</div>
			)}
		</>
	);
}
UserProfile.Layout = LayoutFullView;
export default withNamespaces()(UserProfile);
