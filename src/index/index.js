// import "babel-polyfill";
import './index.less';
import Swiper from "swiper";
import Xtemplate from 'xtemplate/lib/runtime.js';
import 'plugn/slider/slider.js';
import caseMoreTpl from './tmpl/case-more.xtpl';
import newsTpl from './tmpl/news.xtpl';
import banner from 'common/js/banner';
import caseModule from 'common/js/case';
import jingguan01 from 'image/jingguan01.jpg';
import jingguan02 from 'image/jingguan02.jpg';
import tingchepeng01 from 'image/tingchepeng01.jpg';
import tingchepeng02 from 'image/tingchepeng02.jpg';
import tixulei01 from 'image/tixulei01.jpg';
import tixulei02 from 'image/tixulei02.jpg';
import shangyejie01 from 'image/shangyejie01.jpg';
import shangyejie02 from 'image/shangyejie02.jpg';
import shoufeizhan01 from 'image/shoufeizhan01.jpg';
import shoufeizhan02 from 'image/shoufeizhan02.jpg';
import wushuichuli01 from 'image/wushuichuli01.jpg';
import wushuichuli02 from 'image/wushuichuli02.jpg';
var caseMoreArr = [{
	img: jingguan01
},{
	img: jingguan02
},{
	img: tingchepeng01
},{
	img: tingchepeng02
},{
	img: tixulei01
},{
	img: tixulei02
},{
	img: shangyejie01
},{
	img: shangyejie02
},{
	img: shoufeizhan01
},{
	img: shoufeizhan02
},{
	img: wushuichuli01
},{
	img: wushuichuli02
}];

var newsArr = [{
	data: '06/19',
	year: '2015',
	title: '膜结构优点是什么?',
	content: '膜结构优点有：强度高、自重轻、大跨度在建造大型公共建筑时，具有较好的性能价格比。采用膜结构要比传统结构轻一个或几个数量级，且单位面积的结构自重与造价也不会随跨度的增加而明显地增加。'
},
{
	data: '06/19',
	year: '2015',
	title: '膜结构建筑的优点及特点',
	content: '膜结构建筑造型自由、轻巧、柔美，充满力量感，阻燃、制作简易、安装快捷、节能、使用安全等特性。是时代的产物。'
},{
	data: '06/19',
	year: '2015',
	title: '膜结构相比网架结构的优势',
	content: '网架结构由多根杆件按照一定的网格形式通过节点连结而成的空间结构，汇交于节点上的杆件数量较多，制作安装较平面结构复杂。 而膜结构是以钢结构及管桁架结构为基础，钢结构由型钢和钢板通过焊接、螺栓连接或铆接而制成的工程结构。钢结构建筑具有总重轻、施工快、环保节能、抗震抗风、隔音隔热等等优点。'
}];

$('#js-nav-box [data-type="index"]').addClass('active');
banner.init();
caseModule.init();

var _html = new Xtemplate(caseMoreTpl).render({ caseMoreArr: caseMoreArr});
$("#js-menu-imglist").empty().html(_html);

var _html = new Xtemplate(newsTpl).render({ newsArr: newsArr});
$("#js-news-list").empty().html(_html);
//滚动效果
$('#js-more-case').Xslider({
    unitdisplayed: 5,
    numtoMove: 1,
    unitlen: 240,
    loop: "cycle",
    autoscroll: 2000
});
