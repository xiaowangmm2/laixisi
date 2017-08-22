import Swiper from "swiper";
import Xtemplate from 'xtemplate/lib/runtime.js';
import bannerTpl from '../tpl/banner.xtpl';
import banner1 from 'image/banner1.jpg';
import banner2 from 'image/banner2.jpg';

var banner = {
	init(){
		var _html = new Xtemplate(bannerTpl).render({ bannerArr: [{img: banner1},{img: banner2}]});
		$("#swiper-wrapper").empty().html(_html);
		//轮播
		var mySwiper = new Swiper('.js-swiper-banner', {
		    prevButton: '.swiper-button-prev',
		    nextButton: '.swiper-button-next',
		    autoplay: 5000,
		    loop: true,
		    effect: 'fade'
		});
	}
}
module.exports = banner;
