import Xtemplate from 'xtemplate/lib/runtime.js';
import caseTpl from '../tpl/case.xtpl';
import case1 from 'image/jingguan16.jpg';
import case2 from 'image/shangyejie02.jpg';
import case3 from 'image/tingchepeng06.jpg';
import case4 from 'image/tixulei11.jpg';
import case5 from 'image/shoufeizhan12.jpg';
import case6 from 'image/wushuichuli05.jpg';
var caseArr = [{
    type: 'jingguan',
    img: case1,
    title: '景观类',
    content: '景观设施工程涵盖了公共区域广场、游乐场、商业广场、公园等，造型自由、轻巧、柔美、充满力量感。'
}, {
    type: 'shangyejie',
    img: case2,
    title: '商业街及屋顶类',
    content: '商业街及屋顶设施工程涵盖了公共区域广场及屋顶加盖、游乐场、商业广场、公园等，造型自由、轻巧、柔美、充满力量感。'
},{
    type: 'tingchepeng',
    img: case3,
    title: '停车棚类',
    content: '停车棚及充电桩设施工程涵盖了公共区域停车场、高速公路停车场、游乐场、商业广场、公园等，造型自由、轻巧、柔美、充满力量感。'
},{
    type: 'tixulei',
    img: case4,
    title: '体育设施类',
    content: '体育设施工程涵盖了公共区域体育看台、足球场、篮球场、网球场等，造型自由、轻巧、柔美、充满力量感。'
}];

var host = window.location.pathname;
if(host === '/case.html'){
    caseArr.push({
        type: 'shoufeizhan',
        img: case5,
        title: '收费站类',
        content: '收费站设施工程涵盖了高速公路收费站、加油加气站等，造型自由、轻巧、柔美、充满力量感。等，造型自由、轻巧、柔美、充满力量感。'
    });

    caseArr.push({
        type: 'wushuichuli',
        img: case6,
        title: '污水处理类',
        content: '污水处理环保设施工程涵盖了污水处理池、环保工程加盖项目等，造型自由、轻巧、柔美、充满力量感。等，造型自由、轻巧、柔美、充满力量感。'
    });
}
var caseModule = {
    init(){
        var _html = new Xtemplate(caseTpl).render({ caseArr: caseArr });
        $("#js-case-list").empty().html(_html);
    }
};

module.exports = caseModule;
