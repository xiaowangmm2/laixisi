import './index.less';
import Swiper from "swiper";
import Xtemplate from 'xtemplate/lib/runtime.js';
import banner from 'common/js/banner';
import newsTpl from './tmpl/news.xtpl';
import banner1 from 'image/news-bg.jpg';

$('#js-nav-box [data-type="news"]').addClass('active');

banner.init();

var newsArr = [{
    img: banner1,
    title: '张拉膜结构安装流程',
    date: '2015-06-18',
    content: '基础复测→钢构件、钢索、膜片验收→钢柱吊装→脚手架搭设→钢撑杆吊装→钢索安装→尼龙绳挂设→千斤顶顶升→盖口热合→膜清洗验收。'
}, {
    img: banner1,
    title: '膜结构工程如何保养',
    date: '2015-06-18',
    content: '膜结构产品作为新材料、新建筑已被广泛推广应用，基于表面经过特殊罩光处理的膜材具有寿命长及自洁性好等特点，膜结构有别于常见的普通建筑。'
}, {
    img: banner1,
    title: '膜结构工程后期维护',
    date: '2015-06-18',
    content: '张拉膜结构需要维护的频度由设计、功能、美观、材料和场地环境等许多因素决定，维护的频度从“几乎不用维护”到“定期维护”不等。'
}, {
    img: banner1,
    title: '膜材料的组成和分类',
    date: '2015-06-18',
    content: '膜材就是氟塑料表面涂层与织物布基按照特定的工艺粘合在一起的薄膜材料。常用的氟素材料涂层有PTFE（聚四氟乙烯）、PVDF（聚偏氟乙烯）、PVC（聚氯乙烯）等。织物布基主要用聚酯长丝（涤纶PES）和玻璃纤维两种。'
}]
var _html = new Xtemplate(newsTpl).render({ newsArr: newsArr });
$("#js-news-list").empty().html(_html);
