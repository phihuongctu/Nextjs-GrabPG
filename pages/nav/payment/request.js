import { Icon_Activity_Payment_ArrLeft, Icon_Payment_Question, Icon_Payment_Request_Money } from "/public/icon/iconGlobal";

import LayoutFullView from "/components/layout/LayoutFullView";
import Link from "next/link";
import { NavTopTitleAction } from "/components/payment/LayoutPayment";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function RequestMoney({ t }) {
	const router = useRouter();
	return (
		<div className="h-85 flex justify-center items-center bg-white w-full">
			<NavTopTitleAction Title={t("payment_receive_money")} Back={() => router.back()}>
				<button className="w-5 h-5 mr-0 ml-auto">
					<Icon_Payment_Question />
				</button>
			</NavTopTitleAction>
			<div>
				<Icon_Payment_Request_Money />
			</div>
			<div className="fixed bottom-0 w-full inset-x-0 pb-24 lg:pb-4 bg-white p-4">
				<div className="flex">
					<button onClick={() => router.back()} className="p-4 rounded-xl bg-gray-200 mr-4 flex justify-center">
						<Icon_Activity_Payment_ArrLeft />
					</button>

					<Link href="#">
						<button className="p-4 bg-primary_6 rounded-xl text-center text-5 leading-4 tracking-7 text-white font-semibold w-full">
							{t("transfer_link_recive_money")}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
RequestMoney.Layout = LayoutFullView;
export default withNamespaces()(RequestMoney);
