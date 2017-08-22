function slideScroll(navItem, callback) {
    var navEl = navItem,
        navLeftEl = navItem.find('.js-nav-left'),
        navListEl = navItem.find('.js-nav-list'),
        sideEl = navItem.find('.js-side-line');
    var fl_w = navListEl.width();
    var flb_w = navLeftEl.width();
    navListEl.find('li').on('click', function() {
        var nav_w = $(this).width();
        sideEl.stop(true);
        sideEl.css({ width: nav_w });
        sideEl.animate({ left: $(this).position().left }, 400);
        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        var fn_w = (navEl.width() - nav_w) / 2;
        var fnl_l;
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        navListEl.animate({
            "left": fnl_l
        }, 300);
        //回调
        callback && callback();
    });
    navListEl.find('li').eq(0).trigger('click');
}

module.exports = slideScroll;
