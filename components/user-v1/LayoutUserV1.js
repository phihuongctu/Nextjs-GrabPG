import { Icon_Global_GoBack } from "/public/icon/iconGlobal";

export const NavTopTitleAction = ({ Back, Title, children }) => {
	return (
		<div className="nav-top flex flex-row justify-start items-center flex-nowrap bg-primary_6 px-5 p-3.5 heading-top">
			<button className="w-10 h-10 bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-full icon-Svg" onClick={Back}>
				<Icon_Global_GoBack />
			</button>
			<h2 className="text sub-heading-Medium ml-4">{Title}</h2>
			{children}
		</div>
	);
};
export const NavTopTitleActionNoBg = ({ Back, Title, children }) => {
	return (
		<div className="nav-top flex flex-row justify-start items-center flex-nowrap bg-transparent px-5 p-3.5 heading-top">
			<button className="w-10 h-10 bg-white bg-opacity-8 border-1 border-white border-opacity-20 rounded-full icon-Svg" onClick={Back}>
				<Icon_Global_GoBack />
			</button>
			<h2 className="text sub-heading-Medium ml-4">{Title}</h2>
			{children}
		</div>
	);
};
