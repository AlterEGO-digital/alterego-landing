import '../css/index.scss';
import { testFunction } from './helpers';

document.addEventListener('readystatechange', () => {
	testFunction();
});

$(document).ready(function () {
	$('.projects-cards').owlCarousel({
		items: 5.5,
		autoWidth: true,
		autoplay: true,
		rewind: true,
		margin: 40,
	});
});

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
	const counter = document.getElementById('slide-number')
	counter.innerHTML = `${e.item.index + 1}/${e.item.count}`
})

const header = document.getElementById("header");
const sticky = header.offsetTop;

const headerScroll = () => {
	if (window.pageYOffset > sticky) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
}

window.addEventListener('scroll', headerScroll)
