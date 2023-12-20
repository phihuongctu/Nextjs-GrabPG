import {
	Icon_Activity_Arr_Counter,
	Icon_Activity_Payment_ArrLeft,
	Icon_Global_Arrow_Right,
	Icon_Global_Arrow_Right_White,
	Icon_Global_GoBack,
	Icon_Global_GoBack_Gray,
	Icon_Payment_Close,
	Icon_Payment_Layout_Crow,
} from "/public/icon/iconGlobal";

import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import Link from "next/link";
import Moment from "moment";
import NumberFormat from "react-number-format";

export const NavTopTitle = ({ Title, children, To }) => {
	return (
		<div className="nav-top flex flex-row justify-between items-center flex-nowrap bg-primary_6 px-5 py-3.5 heading-top">
			<h2 className="text label-Large">{Title}</h2>
			<div className="button button-Base w-8 h-8 icon-Svg lg:hover:cursor-pointer" onClick={To}>
				{children}
			</div>
		</div>
	);
};

export const NavTopTitleAction = ({ Back, Title, children }) => {
	return (
		<div className="nav-top flex flex-row justify-start items-center flex-nowrap bg-primary_6 px-5 p-3.5 heading-top">
			<div
				className="w-10 h-10 bg-white bg-opacity-8 border-1  border-white border-opacity-20 rounded-full icon-Svg brightness-0 invert lg:hover:cursor-pointer"
				onClick={Back}
			>
				<Icon_Global_GoBack />
			</div>
			<h2 className="text sub-heading-Medium ml-4">{Title}</h2>
			{children}
		</div>
	);
};

export const NavTopTitleActionNoBg = ({ Back, Title, children }) => {
	return (
		<div className="nav-top flex flex-row justify-start items-center flex-nowrap bg-transparent px-5 p-3.5 heading-top">
			<div
				className="w-10 h-10 bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-full icon-Svg brightness-0 invert lg:hover:cursor-pointer"
				onClick={Back}
			>
				<Icon_Global_GoBack />
			</div>
			<h2 className="text sub-heading-Medium ml-4">{Title}</h2>
			{children}
		</div>
	);
};

export const TitleGroup = ({ Title, children, event }) => {
	return (
		<div className="title-group relative px-5 flex flex-row justify-between items-center flex-nowrap">
			<h2 className="title heading-Label">{Title}</h2>
			<button className="option flex flex-row justify-between items-center flex-nowrap opacity-60" onClick={event}>
				<span className="btn-Caption-1 mr-2">{children}</span>
				<Icon_Global_Arrow_Right />
			</button>
		</div>
	);
};

export const LayoutEmpty = ({ Heading, Icon, Meta, Class, children, To }) => {
	return (
		<div className={`pt-5 px-5 ${Class}`}>
			<div className="empty flex flex-row justify-between items-center flex-wrap border-1 border-gray-1 rounded-xl p-4">
				<div className="w-16 h-16 icon-Svg rounded-full bg-gray_12">
					<Image src={Icon} width={36} height={36} />
				</div>
				<div className="flex-1 px-3 overflow-hidden">
					<span className="label-Bold_Gray truncate inline-block w-full">{Heading}</span>
					<p className="text-Medium line-clamp-2">{Meta}</p>
				</div>
				<button className="button w-full button-Medium-Gray p-4 mt-4 rounded-xl bg-gray_12" value={children} type="submit" onClick={To}>
					{children}
				</button>
			</div>
		</div>
	);
};

export const BtnGroup = ({ Click, Title, Back, ChangeClass, Type, DisableBtn, IsGoBack }) => {
	return (
		<div className="mt-auto mb-0 relative w-full flex flex-row justify-between items-center flex-nowrap">
			{IsGoBack === true ? (
				<div className="w-12 h-12 icon-Svg rounded-xl bg-gray_12 lg:hover:cursor-pointer" onClick={Back}>
					<Icon_Activity_Payment_ArrLeft />
				</div>
			) : null}
			<button
				className={`button button-Medium-White p-4 ${IsGoBack === false ? "w-full" : " w-1/60 "} rounded-xl bg-primary_6 ${
					ChangeClass ? ChangeClass : ""
				} `}
				type={Type}
				onClick={Click}
				disabled={DisableBtn}
			>
				{Title}
			</button>
		</div>
	);
};

export const LayoutModal = ({ Class, OnClickModal, Icon, Title, Meta, OnSubmit, BtnValue }) => {
	return (
		<div className={`${Class} modal modal-payment-Small flex flex-col`}>
			<div className="modal-fill" onClick={OnClickModal}></div>
			<div className="inner bg-white flex flex-col justify-start items-center mt-auto mb-0 z-1 rounded-tl-3xl rounded-tr-3xl px-6 pt-6 pb-10">
				<button className="close w-8 h-8 mr-0 ml-auto icon-Svg" onClick={OnClickModal}>
					<Icon_Payment_Close />
				</button>
				<div className="icon-Svg rounded-full bg-gray_12 w-4.5 h-4.5 mb-8">{Icon}</div>
				<span className="headline text-center mb-4">{Title}</span>
				<span className="meta text-Large-Gray text-center line-clamp-2 mb-8">{Meta}</span>
				<button
					className="button button-Medium-White p-4 w-full rounded-xl bg-primary_6"
					value={BtnValue}
					onClick={OnClickModal}
					// OnSubmit
				>
					{BtnValue}
				</button>
			</div>
		</div>
	);
};

export const LayoutHeroPayment = ({ ValueCurrency, ValuePoint, OnClickWallet }) => {
	return (
		<>
			<div
				className="wallet  cursor-pointer relative w-64-25 h-64-25 flex flex-col justify-center items-center bg-white bg-opacity-8 rounded-full border-1 border-opacity-20"
				onClick={OnClickWallet}
			>
				<span className="title text-white text-sm leading-12 tracking-3 font-normal">Số dư tài khoản</span>
				<CurrencyFormat value={ValueCurrency} displayType={"text"} thousandSeparator="." decimalSeparator="," className="total my-5 label-Bold" />
				<div className="point flex flex-row justify-center items-center flex-nowrap">
					<Icon_Payment_Layout_Crow />
					<span className="label-Bold_White mx-2">
						<NumberFormat value={ValuePoint} displayType={"text"} thousandSeparator="." decimalSeparator="," className="mr-1" />
						Điểm
					</span>
					<Icon_Global_Arrow_Right_White />
				</div>
			</div>
		</>
	);
};

export const LayoutItemHistory = ({ Href, Status, DateTime, Name, Total, Currency, Method, User, IDPost }) => {
	return (
		<Link href={Href}>
			<a className="link opacity-60 flex flex-row justify-start items-center flex-nowrap w-full border-t-1 border_gray_1 group-first-of-type:border-0 py-3.5">
				<i className="icon-Svg w-10 h-10 bg-gray_12 rounded-full"></i>
				<div className="info w-1/84 px-3 flex flex-col justify-start items-start truncate">
					<span className="status block caption-1 text-primary_6">{Status}</span>
					<div className="relative py-1 flex flex-row justify-start items-center flex-nowrap overflow-hidden w-full">
						<span className="label-Bold_Gray opacity-60">{Name}</span>
						&nbsp;
						<CurrencyFormat
							value={Total}
							suffix={Currency}
							displayType={"text"}
							thousandSeparator="."
							decimalSeparator=","
							className="label-Bold_Gray opacity-60"
						/>
						&nbsp;
						<span className="method label-Bold_Gray opacity-60">{Method}</span>
						&nbsp;
						<span className="meta label-Bold_Gray opacity-60 truncate">{User}</span>
					</div>
					<span className="meta caption-1 text-gray-1 opacity-60 inline-block">
						#{IDPost}&nbsp;-&nbsp;{Moment(DateTime).format("HH:mm")}
					</span>
				</div>
				<div className="date ml-auto mr-0 w-12 h-11 rounded border-1 border_gray_1 flex flex-col justify-center child-center text-center">
					<p className="month label-Bottom_Gray w-full border-b-1 border_gray_1">{Moment(DateTime).format("MMMM")}</p>
					<p className="day text-Small_Bold my-1">{Moment(DateTime).format("DD")}</p>
				</div>
			</a>
		</Link>
	);
};

export const BtnGroupPrimary = ({ Click, Title, Back, ChangeClass, Type, DisableBtn, AddClass, ChangeBtn, RowDirection, BtnText }) => {
	return (
		<div
			className={`btn_group_primary mt-auto mb-0 w-full flex justify-between items-center flex-nowrap px-5 py-4 fixed left-0 bottom-85 z-1 bg-white ${
				RowDirection ? "flex-row-reverse" : "flex-row"
			} ${AddClass ? AddClass : ""}`}
		>
			<div className={`h-12 icon-Svg rounded-xl bg-gray_12 lg:hover:cursor-pointer ${BtnText ? "button-Medium-Gray w-14" : "w-12"}`} onClick={Back}>
				{BtnText ? BtnText : <>{ChangeBtn ? <Icon_Activity_Arr_Counter /> : <Icon_Global_GoBack_Gray />}</>}
			</div>
			<button
				className={`button button-Medium-White p-4 rounded-xl bg-primary_6 ${ChangeClass ? ChangeClass : ""} ${BtnText ? "w-1/68" : "w-1/60"}`}
				type={Type}
				onClick={Click}
				disabled={DisableBtn}
			>
				{Title}
			</button>
		</div>
	);
};
