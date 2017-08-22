import './index.less';


$('#js-nav-box [data-type="concat"]').addClass('active');

var sContent = "杭州市余杭区良渚街道名城博园3幢305室";
var map = new BMap.Map("map");
var point = new BMap.Point(120.10596, 30.381435);
map.centerAndZoom(point, 15);
var marker2 = new BMap.Marker(point);
map.addOverlay(marker2);
var infoWindow = new BMap.InfoWindow(sContent, {
    width: 200,
    height: 70,
    title: "公司地址："
});
map.openInfoWindow(infoWindow, point);
