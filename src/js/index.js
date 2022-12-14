import 'owl.carousel/dist/assets/owl.carousel.css';
import '../css/index.scss';

import { footerForm, fildsSelectors, footerFields, scrollToServices } from './const'
const { getFieldsElements, cleanFiledsForPayload, cleanFiledsValue, getFildsValue, handleScroll, handleListener } = require('./helpers')

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

scrollArrow.addEventListener('click', handleScroll(scrollToServices));
navList.addEventListener('click', handleScroll());

// scroll to Top
$("#footer-scroll-up").click(function () {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	return false;
});

// modal
const writeToUsModal = document.getElementById("write-to-us");
const discussCase = document.getElementById("discuss-case");

const slideBtns = document.querySelectorAll("button.discuss-case");
const discussBtns = document.querySelectorAll('button.write-to-us')

const handleClose = () => {
	document.body.style.overflowY = 'auto'
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
	const [selector] = e.currentTarget.classList;
	const tmpCloseElems = getTmpCloseElems();
	handleListener(tmpCloseElems, handleClose);
	if (selector) {
		document.getElementById(selector).classList.remove('close');
		document.body.style.overflowY = 'hidden'
	}
	tmpCloseElems.forEach(closeEl => removeEventListener('click', closeEl))
}

handleListener([...slideBtns, ...discussBtns], handleOpen);

// form payload
const [writeBtn, caseBtn, footerBtn] = document.querySelectorAll('.modal-submit');
const modalFileds = [];

const sendModalAnswer = (e) => {
	e.preventDefault();
	const currentForm = e.currentTarget.parentElement;
	cleanFiledsForPayload(modalFileds);
	const selectors = currentForm.id === footerForm ? footerFields : fildsSelectors;
	getFieldsElements(selectors, currentForm, modalFileds);
	const payload = getFildsValue(modalFileds);
	cleanFiledsValue(modalFileds);
	console.log(payload)
}

writeBtn.addEventListener('click', sendModalAnswer);
caseBtn.addEventListener('click', sendModalAnswer);
footerBtn.addEventListener('click', sendModalAnswer);
