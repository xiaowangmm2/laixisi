/**
 * Created by fuyun on 2017/2/20.
 */
;(function () {
    //TODO:应该根据icon有无判断是否需要加span和class
    var defaults = {
        // icon: 2,
        title: '',
        closeBtn: 0,
        // shadeClose: true,
        shade: [0.3, '#000'],
        maxWidth: 500,
        time: 0
    };
    var msgWrapStart = '<span><span class="layui-layer-text-msg">';
    var msgWrapEnd = '</span></span>';

    window.popup = window.popup || {};
    window.popup.open = function (cfg) {
        var config = $.extend({}, defaults, cfg || {});
        if (config.icon) {
            config.content = msgWrapStart + config.content + msgWrapEnd;
        }
        layer.open(config);
    };
    window.popup.msg = function (msg, cfg) {
        cfg.time = cfg.time || 3000;
        layer.msg(msgWrapStart + msg + msgWrapEnd, $.extend({shadeClose: true}, defaults, cfg || {}));
    };
    window.popup.alert = function (msg, cfg) {
        layer.alert(msg, $.extend({shadeClose: true}, defaults, cfg || {}));
    };
    window.popup.confirm = function (msg, cfg) {
        var config = $.extend({}, defaults, cfg || {});
        if (config.icon) {
            msg = msgWrapStart + msg + msgWrapEnd;
        }
        layer.confirm(msg, config);
    };
})();