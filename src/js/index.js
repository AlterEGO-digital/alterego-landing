import 'owl.carousel/dist/assets/owl.carousel.css';
import '../css/index.scss';

import {
	footerForm,
	fieldsSelectors,
	footerFields,
	scrollToServices,
	burgerBtnClose,
	burgerBtnOpen,
	scrollToFooter,
} from './const'

const {
	getFieldsElements,
	cleanFieldsForPayload,
	cleanFieldsValue,
	getFieldsValue,
	handleScroll,
	handleListener,
	disableScroll,
	enableScroll,
	getCountryCodeNum
} = require('./helpers')

// projects card slider
$(document).ready(function () {
	$('.projects-cards').owlCarousel({
		items: 5.5,
		autoWidth: true,
		autoplay: true,
		rewind: true,
		margin: 40,
	});
});

// main slider
$(document).ready(function () {
	$('.case-cards').owlCarousel({
		items: 1,
		dots: true,
		autoplay: true,
		dotsContainer: '#dots',
		dotsEach: true,
		rewind: true,
		margin: 30,
	});
});

const owl = $('.case-cards');
$('#slide-next-arrow').click(function () {
	owl.trigger('next.owl.carousel');
})

owl.on('changed.owl.carousel', function (e) {
	const counter = document.getElementById('slide-number');
	counter.innerHTML = `${e.item.index + 1}/${e.item.count}`;
})

// header scroll
const header = document.getElementById("header");
const sticky = header.offsetTop;

const headerScroll = () => {
	if (window.pageYOffset > sticky) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
}

window.addEventListener('scroll', headerScroll);

// onClick scroll
const scrollArrow = document.getElementById("scroll-arrow-info");
const navList = document.getElementById("nav");
const askBtn = document.querySelector('button[data-btn="ask-to-us"]')

scrollArrow.addEventListener('click', handleScroll(scrollToServices));
askBtn.addEventListener('click', handleScroll(scrollToFooter));
navList.addEventListener('click', handleScroll());

// scroll to Top
const scrollUpObserver = new IntersectionObserver(([e]) => {
	const scrollUpBtn = document.getElementById('footer-scroll-up');
	if (!scrollUpBtn) return;
	if (!e.isIntersecting) {
		return scrollUpBtn.classList.remove('close');
	}
	return scrollUpBtn.classList.add('close');
})

scrollUpObserver.observe(document.querySelector('.header-section section'));

const scrollUpArrow = document.getElementById("footer-scroll-up");
const scrollTop = () => header.scrollIntoView({ behavior: 'smooth' })
scrollUpArrow.addEventListener('click', scrollTop);

// modal
const writeToUsModal = document.getElementById("write-to-us");
const discussCase = document.getElementById("discuss-case");

const slideBtns = document.querySelectorAll('button[data-btn="discuss-case"]');
const discussBtns = document.querySelectorAll('button[data-btn="write-to-us"]')

const handleClose = () => {
	enableScroll()
	if (!writeToUsModal.classList.contains('close')) {
		writeToUsModal.classList.add('close');
	}

	if (!discussCase.classList.contains('close')) {
		discussCase.classList.add('close');
	}
}

const getTmpCloseElems = () => {
	const tmpOverlay = writeToUsModal.querySelector(".overlay");
	const tmpDiscussCaseOverlay = discussCase.querySelector(".overlay");
	const tmpCloseBtn = writeToUsModal.querySelector(".modal-close-ico");
	const tmpDiscussCaseCloseBtn = discussCase.querySelector(".modal-close-ico");
	return [tmpOverlay, tmpCloseBtn, tmpDiscussCaseOverlay, tmpDiscussCaseCloseBtn]
}

const handleOpen = (e) => {
	const selector = e.currentTarget.dataset.btn;
	const tmpCloseElems = getTmpCloseElems();
	handleListener(tmpCloseElems, handleClose);
	if (selector) {
		document.getElementById(selector).classList.remove('close');
		const numberInput = document.getElementById(selector).querySelector('#number')
		getCountryCodeNum(numberInput);
		disableScroll();
	}
	tmpCloseElems.forEach(closeEl => removeEventListener('click', closeEl))
}

handleListener([...slideBtns, ...discussBtns], handleOpen);

// form payload
const [writeBtn, caseBtn, footerBtn] = document.querySelectorAll('.modal-submit');
const modalFields = [];

const sendModalAnswer = (e) => {
	e.preventDefault();
	const currentForm = e.currentTarget.parentElement;
	cleanFieldsForPayload(modalFields);
	const selectors = currentForm.id === footerForm ? footerFields : fieldsSelectors;
	getFieldsElements(selectors, currentForm, modalFields);
	const payload = getFieldsValue(modalFields);
	let isValid = true;
	Object.values(payload).forEach(valid => !valid && (isValid = false))
	if(!isValid) return
	cleanFieldsValue(modalFields);
	getCountryCodeNum()
	console.log(payload)
}

writeBtn.addEventListener('click', sendModalAnswer);
caseBtn.addEventListener('click', sendModalAnswer);
footerBtn.addEventListener('click', sendModalAnswer);

// mobile menu
const menuBtn = document.getElementById(burgerBtnOpen);
const menuBtnClose = document.getElementById(burgerBtnClose);
const burgerMenu = document.getElementById("menu");


const handleOpenMenu = (e) => {
	disableScroll()
	if (e.currentTarget.id === burgerBtnOpen) burgerMenu.classList.remove('close')
}

const handleCloseMenu = (e) => {
	enableScroll()
	if (e.currentTarget.id === burgerBtnClose) burgerMenu.classList.add('close')
}

const handleScrollMenu = (e) => {
	enableScroll();
	e.preventDefault();
	burgerMenu.classList.add('close');
	const targetEl = e.target.className;
	const scrollTo = document.getElementById(targetEl);
	if (scrollTo) scrollTo.scrollIntoView({ behavior: 'smooth' });
}

const [_, burgerNavlist] = burgerMenu.getElementsByClassName("nav");
burgerNavlist.addEventListener('click', handleScrollMenu);
menuBtn.addEventListener('click', handleOpenMenu);
menuBtnClose.addEventListener('click', handleCloseMenu);

// number code for country
getCountryCodeNum();

