import countryTelData from 'country-codes-list'
import { regExp } from './const';

export const getFieldsElements = (selectors, current, fieldsArr) => {
	selectors.forEach(
		selector => fieldsArr.push(current.querySelector(`#${selector}`))
	);
}

export const cleanFieldsForPayload = (fieldsArr) => {
	fieldsArr.splice(0, fieldsArr.length)
}

export const cleanFieldsValue = (fieldsArr) => {
	fieldsArr.forEach(input => input.value = "");
}

export const getFieldsValue = (fieldsArr) => {
	const answer = {};
	fieldsArr.forEach(field => {
		answer[field.id] = validate(field)
	})
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

const validate = (field) => {
	const perentEl = field.closest('.form-row') || field.closest('.form__info')
	const errorTost = perentEl.querySelector('.form-error')

	if(field.id === 'number') {
		if (field.value.length <= 10 || !regExp[field.id].test(field.value)) {
			errorTost.classList.remove('hide')
			field.focus()
			return false
		}
		errorTost.classList.add('hide')
		return field.value
	}
	if(field.id === 'mainText') {
		if (field.value.length <= 5) {
			errorTost.classList.remove('hide')
			field.focus()
			return false
		}
		errorTost.classList.add('hide')
		return field.value
	}
	if (field.id === 'agreeCheckbox' || field.id === 'modalCheckbox') {
		if (!field.checked) {
			errorTost.classList.remove('hide')
			return false
		}
		errorTost.classList.add('hide')
		return field.checked
	}
	if (!regExp[field.id].test(field.value)) {
		errorTost.classList.remove('hide')
		field.focus()
		return false
	}
	errorTost.classList.add('hide')
	return field.value
}
