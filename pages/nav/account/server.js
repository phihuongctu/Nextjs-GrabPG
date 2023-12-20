import "swiper/swiper.min.css";

import { BtnGroup, NavTopTitleAction } from "/components/payment/LayoutPayment";
import {
	Icon_Acc_Buy,
	Icon_Acc_Eye,
	Icon_Activity_Heart_Small,
	Icon_Activity_Start,
	Icon_Global_Filter,
	Icon_Global_Placeholder,
	Icon_Global_Question,
	Icon_Global_Search_White,
} from "/public/icon/iconGlobal";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import LayoutFullView from "/components/layout/LayoutFullView";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function ResgiterService({ t }) {
	return (
		<div className="user-v1 user-v1-layout">
			<div className="flagFitter-payment user-v1-layout">
				<NavTopTitleAction Title={t("account_service_product")} Back={() => router.back()}>
					<button className="history w-8 h-8 mr-0 ml-auto icon-Svg" type="button">
						<Icon_Global_Question />
					</button>
					<button type="button" className="fillter w-8 h-8 ml-2 icon-Svg">
						<Icon_Global_Filter />
					</button>
				</NavTopTitleAction>
				<div className="user-v1-layout-inner-large">
					<div className="relative bg-primary_6 w-full flex flex-col justify-center items-center pb-5">
						<div className="search w-full flex flex-row justify-between items-center flex-nowrap px-5">
							<form
								action=""
								className="search w-full flex flex-row justify-start items-center flex-nowrap bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-xl px-4 py-3.5"
							>
								<Icon_Global_Search_White />
								<input
									type="search"
									id="search-history"
									className="bg-transparent text-sm text-white tracking-3 placeholder-white pl-4 w-input-sort appearance-none focus-visible:outline-none"
									placeholder={t("global_search")}
								/>
							</form>
						</div>
						<div className="tool-sort w-full pt-3 bg-primary_6">
							<Swiper className="list mySwipe" loop={false} slidesPerView={"auto"}>
								<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min">
									<label className="inline-flex w-max bg-white border-opacity-20 rounded-xl px-3 py-2">
										<Icon_Activity_Heart_Small />
										<span className="button-Medium-Pri-3 ml-3">{t("userv1_recommended")}</span>
										<input type="radio" name="sort" className="hidden" />
									</label>
								</SwiperSlide>
								<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min">
									<label className="inline-flex bg-white bg-opacity-8 border-1 border-white border-opacity-20 w-max rounded-xl px-3 py-2">
										<Icon_Global_Placeholder />
										<span className="button-Medium-White  ml-3">{t("Label")}</span>
										<input type="radio" name="sort" className="hidden" />
									</label>
								</SwiperSlide>
								<SwiperSlide className="item mr-3 first-of-type:ml-5 max-w-min">
									<label className="inline-flex bg-white bg-opacity-8 border-1 border-white border-opacity-20 w-max rounded-xl px-3 py-2">
										<Icon_Global_Placeholder />
										<span className="button-Medium-White  ml-3">{t("Label")}</span>
										<input type="radio" name="sort" className="hidden" />
									</label>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
					<div className="relative w-full p-5 grid grid-cols-1 gap-5">
						<div className="item flex flex-row justify-between items-start flex-nowrap h-134">
							<div className="img-info w-108 h-134 rounded-xl overflow-hidden relative">
								<Image src="/img/img_user_info.png" objectFit="cover" layout="fill" alt="img_user_info" />
								<div className="flex flex-col justify-between py-4 px-1">
									<div className="grid justify-items-start grid-rows-3 gap-3 max-w-max mr-auto">
										<div className="item brightness-0 invert text-center flex flex-col justify-center items-center w-7">
											<i className="icon-Svg w-3 h-3 mb-1">
												<Icon_Acc_Eye />
											</i>
											<span className="label-Bottom_White">10K+</span>
										</div>
										<div className="item brightness-0 invert text-center flex flex-col justify-center items-center w-7">
											<i className="icon-Svg w-3 h-3 mb-1">
												<Icon_Acc_Buy />
											</i>
											<span className="label-Bottom_White">500</span>
										</div>
										<div className="item brightness-0 invert text-center flex flex-col justify-center items-center w-7">
											<i className="icon-Svg w-3 h-3 mb-1">
												<Icon_Activity_Start />
											</i>
											<span className="label-Bottom_White">4.5</span>
										</div>
									</div>
								</div>
							</div>
							<div className="info w-1/120 flex flex-row justify-start items-start flex-wrap h-full">
								<span class="text-small text-gray_4 w-full line-clamp-2">
									Đi dự tiệc hạng A giá cạnh tranh ưu đãi hot (đi siêu xe, phụ kiện hàng hiệu)
								</span>
								<span class="caption-1 text-gray_4 w-full opacity-60">Giải trí, âm nhạc,...</span>
								<span class="px-2 bg-primary_6 rounded-3xl max-w-max flex text-small text-white">#freeship50k</span>
								<div className="relative w-full grid justify-items-start grid-cols-6 gap-1">
									<Image
										src="/img/userv1/userv1-img-gift.png"
										width={36}
										height={29}
										objectFit="cover"
										alt="userv1-img-gift"
										className="bg-white rounded"
									/>
									<Image
										src="/img/userv1/userv1-img-installment.png"
										width={36}
										height={29}
										objectFit="cover"
										alt="userv1-img-installment"
										className="bg-white rounded"
									/>
								</div>
								<div className="relative flex flex-row justify-end items-center w-full mt-auto">
									<span className="px-0.5 bg-red_6 rounded-3xl ml-0 mr-auto caption-1 text-white">-20%</span>
									<span className="price text-smallest font-normal text-gray_4 text-opacity-60 mr-1.5 line-through">250.000 đ</span>
									<span className="price text-xs font-semibold text-primary_6">200.000 đ</span>
								</div>
							</div>
						</div>

						<div className="item flex flex-row justify-between items-start flex-nowrap h-134">
							<div className="img-info w-108 h-134 rounded-xl overflow-hidden relative">
								<Image src="/img/img_user_info.png" objectFit="cover" layout="fill" alt="img_user_info" />
								<div className="flex flex-col justify-between py-4 px-1">
									<div className="grid justify-items-start grid-rows-3 gap-3 max-w-max mr-auto">
										<div className="item brightness-0 invert text-center flex flex-col justify-center items-center w-7">
											<i className="icon-Svg w-3 h-3 mb-1">
												<Icon_Acc_Eye />
											</i>
											<span className="label-Bottom_White">10K+</span>
										</div>
										<div className="item brightness-0 invert text-center flex flex-col justify-center items-center w-7">
											<i className="icon-Svg w-3 h-3 mb-1">
												<Icon_Acc_Buy />
											</i>
											<span className="label-Bottom_White">500</span>
										</div>
										<div className="item brightness-0 invert text-center flex flex-col justify-center items-center w-7">
											<i className="icon-Svg w-3 h-3 mb-1">
												<Icon_Activity_Start />
											</i>
											<span className="label-Bottom_White">4.5</span>
										</div>
									</div>
								</div>
							</div>
							<div className="info w-1/120 flex flex-row justify-start items-start flex-wrap h-full">
								<span class="text-small text-gray_4 w-full line-clamp-2">
									Đi dự tiệc hạng A giá cạnh tranh ưu đãi hot (đi siêu xe, phụ kiện hàng hiệu)
								</span>
								<span class="caption-1 text-gray_4 w-full opacity-60">Giải trí, âm nhạc,...</span>
								<span class="px-2 bg-primary_6 rounded-3xl max-w-max flex text-small text-white">#freeship50k</span>
								<div className="relative w-full grid justify-items-start grid-cols-6 gap-1">
									<Image
										src="/img/userv1/userv1-img-gift.png"
										width={36}
										height={29}
										objectFit="cover"
										alt="userv1-img-gift"
										className="bg-white rounded"
									/>
									<Image
										src="/img/userv1/userv1-img-installment.png"
										width={36}
										height={29}
										objectFit="cover"
										alt="userv1-img-installment"
										className="bg-white rounded"
									/>
								</div>
								<div className="relative flex flex-row justify-end items-center w-full mt-auto">
									<span className="px-0.5 bg-red_6 rounded-3xl ml-0 mr-auto caption-1 text-white">-20%</span>
									<span className="price text-smallest font-normal text-gray_4 text-opacity-60 mr-1.5 line-through">250.000 đ</span>
									<span className="price text-xs font-semibold text-primary_6">200.000 đ</span>
								</div>
							</div>
						</div>
					</div>
					<BtnGroup Title={t("payment_add_new")} AddClass="px-5 py-4 fixed left-0 bottom-85 z-1 bg-white" Back={() => router.back()} />
				</div>
			</div>
		</div>
	);
}
ResgiterService.Layout = LayoutFullView;
export default withNamespaces()(ResgiterService);
