;(function(window){

    function factory(){
        var regs= {
            //校验手机
            name:function(v){
                if(!v)return false;
                var reg=/^[\u4E00-\u9FA5A-Za-z0-9]{2,50}$/g;
                return this.run(v,reg);
            },
            name1:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g;
                return this.run(v,reg);
            },
            contactCom:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z\u4e00-\u9fa5\s?]+$/g;
                return this.run(v,reg);
            },
            contact:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z\u4e00-\u9fa5]+$/g;
                return this.run(v,reg);
            },
            // 是否是汉字
            chinaChar:function(v){
                if(!v)return false;
                var reg=/^[\u4e00-\u9fa5]+$/g;
                return this.run(v,reg);
            },
            // 身份证号验证
            cardId:function(v){
                if(!v)return false;
                var reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
                return this.run(v,reg);
            },
            //校验固定电话
            phone:function(v){
                if(!v)return false;
                // var reg = /0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/;
                var reg = /^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})+(\-?[0-9]{1,5})?$/;  //3-4位区号，7-8位直播号码，1－5位分机号
                return this.run(v,reg);
            },
            //校验工作地区ID  格式：34,398,1001
            workPlaceId:function(v){
                if(!v)return false;
                var reg = /\d{2}[,，]\d{3}[,，]\d{4}/;
                return this.run(v,reg);
            },
            //校验发布地区ID  格式：34,398
            payPlaceId:function(v){
                if(!v)return false;
                var reg = /\d{2}[,，]\d{3}/;
                return this.run(v,reg);
            },
            //校验特殊字符
            punctuation:function(v){
                if(!v)return false;
                var reg = /^[\u4e00-\u9fa5a-z0-9]+$/i;
                return this.run(v,reg);
            },
            mobile:function(v){
                if(!v)return false;
                var _emp=/^\s*|\s*$/g;
                v=v.replace(_emp,"");
                var _d=/^1[3-9][0-9]\d{8}$/g;
                if(_d.test(v)){
                    return true;
                }
                return false;
            },
            mobileAndEmail:function(v){
                if(!v)return false;
                var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w{2,}/;
                var reg2=/^1[3-9][0-9]\d{8}$/g
                if(reg.test(v)||reg2.test(v)){
                    return true;
                }else{
                    return false;
                }
            },
            userName:function(v){
                if(!v)return false;
                //var reg=/(?!.*0x.*|^\d{6,20}$)^[a-zA-Z0-9_@.]{6,20}$/g;
                var reg=/(?!^\d{6,20}$)^[a-zA-Z0-9_@.]{6,20}$/g;
                return this.run(v,reg);
            },
            account:function(v){
                if(!v)return false;
                var reg=/^[a-zA-Z0-9_@.]{6,20}$/;
                return this.run(v,reg);
            },
            //校验密码
            password:function(v){
                if(!v)return false;
                var reg = /^([a-zA-Z0-9]|[*_#^@%$&\-=\+~!():;',.\]\[\{\}]){6,20}$/;
                return this.run(v,reg);
            },
            //校验邮箱
            email:function(v){
                if(!v)return false;
                var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w{2,}/;
                return this.run(v,reg);
            },
            sms:function(v){
                if(!v)return false;
                var reg = /^\d{4}$/;
                return this.run(v,reg);
            },
            sms6:function(v){
                if(!v)return false;
                var reg = /^\d{6}$/;
                return this.run(v,reg);
            },
            captch:function(v){
                if(!v)return false;
                var reg = /^[a-z0-9]{4}$/i;
                return this.run(v,reg);
            },
            num:function(v){
                if(!v)return false;
                var reg = /^\d+$/;
                return this.run(v,reg);
            },
            qq:function(v){
                if(!v)return false;
                var reg = /^[0-9]{5,10}$/;
                return this.run(v,reg);
            },
            weixin:function(v){
                if(!v)return false;
                var reg = /^[a-zA-Z\d_]{5,}$/;
                return this.run(v,reg);
            },
            //执行匹配
            run:function(v,reg){
                if(!v || !reg){return false;}
                if(reg.test(v)){
                    return true;
                }
                return false;
            },
            trim:function(v) {
                v += "";
                return v.replace(/(^\s+)|(\s+$)/g, "");
            },
            empty:function(v){
                var reg=/^\s*$/g;
                if(reg.test(v)){
                    return true;
                }
                return false;
            },
            linkNumber:function(v){
                if(!v)return false;
                var reg=/^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-?[0-9]{1,4})?$|^0?1[3|4|5|7|8][0-9]{9}$/;
                return this.run(v,reg);
            }, 
            carNumber:function(v){
                if(!v)return false;
                var reg=/^([1-9](\.[0-9]*)?$|^[1-4][0-9](\.[0-9]*)?$)|50/;
                return this.run(v,reg);
            }, 
            float:function(v){
                if(!v)return false;
                var reg=/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
                return this.run(v,reg);
            },
            encnCut:function(str,len){
                var char_length = 0;
                for (var i = 0; i < str.length; i++){
                    var son_str = str.charAt(i);
                    encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
                    if (char_length >= len){
                        var sub_len = char_length == len ? i+1 : i;
                        return str.substr(0, sub_len);
                        break;
                    }
                }
            },
            encnLen:function(s){
                var char_length = 0;
                for (var i = 0; i < s.length; i++){
                    var son_char = s.charAt(i);
                    encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
                }
                return char_length;
            },
            //自动按长度截取
            autocut:function(txt,length,type){
                if(!length) return txt;
                if(type!="ench"){
                    return (txt.length <= length)? txt : txt.substring(0,length)
                }else{
                    var len = this.encnLen(txt)
                    if(len <= length){
                        return txt;
                    }else{
                        return this.encnCut(txt,length);
                    }
                }
            }

        }

        if(window.ValidateForm){
            window.ValidateForm.regs=regs;
        }
            return regs;
    }




    if (typeof define === 'function' && define.amd){
        // support amd
        define(factory);
    }else if (typeof define === 'function' && define.cmd){
        // support cmd
        define(function(require,exports,module) {
            return factory();
        });

    } else if (typeof exports !== 'undefined') {
        //suport node
        module.exports = factory();
    } else {
        this.regs = factory();
    }
})(window)