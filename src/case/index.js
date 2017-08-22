import './index.less';
import Swiper from "swiper";

import Xtemplate from 'xtemplate/lib/runtime.js';
import banner from 'common/js/banner';
import banner1 from 'image/banner1.jpg';
import caseModule from 'common/js/case';

$('#js-nav-box [data-type="case"]').addClass('active');
banner.init();
caseModule.init();
