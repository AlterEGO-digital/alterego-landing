import countryTelData from 'country-codes-list'

export const getFieldsElements = (selectors, current, fildsArr) => {
	selectors.forEach(
		selector => fildsArr.push(current.querySelector(`#${selector}`))
	);
}

export const cleanFiledsForPayload = (fieldsArr) => {
	fieldsArr.splice(0, fieldsArr.length)
}

export const cleanFiledsValue = (fieldsArr) => {
	fieldsArr.forEach(input => input.value = "");
}

export const getFildsValue = (fieldsArr) => {
	const answer = {};
	fieldsArr.forEach(fild => answer[fild.id] = fild.value)
	return answer;
}

export const handleScroll = (scrollElem) => (e) => {
	e.preventDefault();
	const targetEl = scrollElem || e.target.className;
	const scrollTo = document.getElementById(targetEl);
	if (scrollTo) scrollTo.scrollIntoView({ behavior: 'smooth' });
}

export const handleListener = (elems, func) => {
	elems.forEach(el => el.addEventListener('click', func));
}

export const disableScroll = () => {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	window.onscroll = function () {
		window.scrollTo(scrollLeft, scrollTop);
	};
}

export const enableScroll = () => {
	window.onscroll = function () { };
}

export const getCountry = () => {
	return Intl.DateTimeFormat().resolvedOptions().locale
}

export const getCountryCodeNum = (inp) => {
	const [country] = countryTelData.filter('officialLanguageCode', getCountry());
	if (inp) return inp.value = `+${country.countryCallingCode}`
	if (country) document.getElementById('number').value = `+${country.countryCallingCode}`
};
