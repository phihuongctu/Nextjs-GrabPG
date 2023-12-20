import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from "./en.json";

const resources = {
	en: {
		translation: translationEN,
	},
};

i18n.use(LanguageDetector)
	.use(reactI18nextModule)
	.init({
		resources,
		fallbackLng: "en",

		keySeparator: false,

		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
