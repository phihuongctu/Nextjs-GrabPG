import { dataToolPayment } from "../DataPayment";
import i18n from "/global/language/i18n";
import { useRouter } from "next/router";
import { withNamespaces } from "react-i18next";

function ToolPayment({ t }) {
	const router = useRouter();
	return (
		<>
			{dataToolPayment.length > 0 ? (
				<div className="tool w-full  relative flex flex-row justify-between items-center flex-nowrap pt-5">
					{dataToolPayment.map(function (items, index) {
						return (
							<div
								className={`w-25/9 h-full cursor-pointer bg-white bg-opacity-8 border-1 border-opacity-20 rounded-lg py-2.5 px-2  ${items.class}`}
								key={index}
								onClick={() => router.push(items.link)}
							>
								<div className="flex flex-col justify-center items-center flex-nowrap text-center">
									{items.icon}
									<span className="label-Bottom_White mt-2 inline-block w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
										{t(items.title)}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</>
	);
}
export default withNamespaces()(ToolPayment);
