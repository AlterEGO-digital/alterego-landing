import '../css/index.scss';
import { testFunction } from './helpers';

document.addEventListener('readystatechange', () => {
	testFunction();
});

$(document).ready(function () {
	$('.owl-carousel').owlCarousel({
		items: 5.5,
		autoWidth: true,
		autoplay: true,
		rewind: true,
		margin: 40,
	});
});

