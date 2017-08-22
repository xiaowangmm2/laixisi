import $ from 'jquery';
import popup from '../../plugn/popup/index'

var loadingRequests = {};
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
var util = {
    /**
     * 获取url参数值
     * @Author   wanghaiyan
     * @DateTime 2017-03-14
     * @param    {[type]}   name [description]参数
     * @return   {[type]}        [description]值
     */
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getUrlQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    },
    handleSearchParams: function(searchStr) {
        var arr = searchStr.slice(1).split('&');
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var p = arr[i].split('=');
            obj[p[0]] = p[1];
        }
        return obj;
    },
    /**
     * 封装的ajax
     * @Author   wanghaiyan
     * @DateTime 2017-03-14
     * @param    {[type]}   configs [description]
     * @return   {[type]}           [description]
     */
    ajax: function(configs) {
        var defaultConfig = {
            url: "",
            baseUrl: "",
            type: "GET",
            method: "",
            cache: true,
            dataType: "json",
            jsonpCallback: "",
            data: {},
            success: function() {
                console.warn("你没有定义success回调函数");
            },
            error: function() {
                popup.note('网络故障，请稍后再试');
            },
            complete: function() {

            },
            loginHandler: null
        };
        var config = $.extend(defaultConfig, configs);
        var urlKey = config.url;
        if (config.type === 'GET') {
            urlKey += Object.keys(config.data).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(config.data[k])
            }).join('&');
        }
        if (loadingRequests[urlKey]) {
            return;
        }
        loadingRequests[urlKey] = true;
        var loadingDialog;
        return $.ajax({
            type: config.type,
            url: config.url,
            data: config.data,
            dataType: config.dataType,
            jsonpCallback: config.jsonpCallback,
            cache: config.cache,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function() {
                if (!config.noDialog) {
                    loadingDialog = popup.loading({ mask: false });
                }
            },
            success: function(resp) {
                //登录校验
                if (resp && (resp.code === '401' || resp.code === '1')) {
                    if (config.loginHandler) {
                        config.loginHandler();
                    } else {
                        window.location.href = '/login.html';
                    }
                } else {
                    config.success(resp);
                }
            },
            error: config.error,
            complete: function() {
                loadingRequests[urlKey] = false;
                if (loadingDialog) {
                    loadingDialog.remove();
                }
                config.complete();
            }
        });
    },
    getEnv: function() {
        var env = 'http://10.7.15.56/dfs';
        return env;
    },
    htmlDecodeByRegExp: function(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    },
    base64encode: function(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    },
    base64decode: function(str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
}
module.exports = util;
