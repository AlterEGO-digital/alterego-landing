export const footerForm = "footer-form";
export const burgerBtnClose = "burger-btn-close";
export const burgerBtnOpen = "burger-btn";
export const scrollToServices = "services";
export const scrollToFooter = "footer";
export const fieldsSelectors = ["name", "number", "email", "mainText","modalCheckbox"];
export const footerFields = ["name", "number", "email","agreeCheckbox"];
export const REGEXP_FIELDS = {
	number: 'number',
	mainText: 'mainText',
	agreeCheckbox: 'agreeCheckbox',
	modalCheckbox: 'modalCheckbox',
}
export const regExp = {
	name: new RegExp(/^[a-я ,.'-]+$/ui),
	email: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
	number: new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
}
