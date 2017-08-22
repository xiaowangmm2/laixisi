
;(function(window){


    function factory($){
        //DOM操作对象
        var DOM={};
        DOM.domToArray=function (eles){
            try{
                var a=Array.prototype.slice.call(eles,0);
            }catch(e){
                var a=[];
                for(var i=0;i<eles.length;i++){
                    a.push(eles[i]);
                }
            }
            return a;

        }
        DOM.find=function(selector,context){
            context=context||document;
            if(context.nodeType==1||context.nodeType==9){
                var reg=/^\s+|\s+$/g;
                selector=selector.replace(reg,"");
                var aselector=selector.split(",");
                var eles=context.getElementsByTagName("*");
                var all=[];
                for(var i=0;i<aselector.length;i++){
                    var curResult=bySelector(aselector[i],context);
                    if(curResult.nodeType&&curResult.nodeType==1){
                        all.push(curResult);
                    }else{
                        curResult=DOM.domToArray(curResult);
                        all=all.concat(curResult);
                    }
                }
                return all;
            }
            function bySelector(selector,context){
                var m = selector.match(/([#\.\[])([\w\W]+)/i);
                var type, key, attrName, result;
                if(m){
                    if(m[1]=="."){
                        type="class";
                        key=m[2];
                    }else if(m[1]=="#"){
                        type="id";
                        key=m[2];
                    }else if(m[1]=='['){
                        type='attr';
                        m=m[2].match(/(\w+)=(\w+)/i);
                        attrName=m[1];
                        key=m[2];

                    }
                }else{
                    type="tag";key= selector;
                }

                if(type=="class"){
                    result=DOM.getElesByClass(key,context)
                }else if(type=="id"){
                    result =context.getElementById(key);
                }else if(type=="attr"){
                    result =DOM.getElesByAttribute(attrName,key,context);
                }else if(type =="tag"){
                    result = context.getElementsByTagName(key);
                }
                return result;
            }
        }

        DOM.not=function(selector,eles){
            var removeEles=DOM.find(selector);
            for(var i=0,len=removeEles.length;i<len;i++){
                contains(eles,removeEles[i]);
            }
            return eles;

            function contains(arry,value){
                for(var i=0;i<arry.length;i++){
                    if(arry[i]==value){
                        arry.splice(i,1);
                        return true;
                    }
                }
                return false;
            }
        }


        DOM.getElesByAttribute=function(attrName,attrValue,context){
            context=context||document;
            if(context.nodeType!=1&&context.nodeType!=9){
                throw new Error('第三个参数context错误!');
            }
            var eles=context.getElementsByTagName("*");
            var a=[];
            for(var i=0;i<eles.length;i++){
                if(eles[i].getAttribute(attrName)==attrValue){
                    a.push(eles[i]);
                }
            }
            return a;
        }
        DOM.getElesByClass=function (strClassName,context){
            if(typeof strClassName){
                context=context||document;

                if(context.nodeType==1||context.nodeType==9){
                    if(context.getElementsByClassName)
                        return context.getElementsByClassName(strClassName);
                    var reg=/^\s+|\s+$/g;
                    strClassName=strClassName.replace(reg,"");
                    var aClass=strClassName.split(/\s+/);
                    var eles=context.getElementsByTagName("*");
                    for(var i=0;i<aClass.length;i++){
                        eles=byClass(aClass[i],eles);
                    }
                    return eles;
                }else{
                    throw new Error("第二个参数类型错误");
                }
            }else{
                throw new Error("第一个参数必需是一个字符串");
            }


            function byClass(strClassName,eles){
                var reg=new RegExp("(^| )"+strClassName+"( |$)");
                //var eles=document.getElementsByTagName("*");
                var a=[];//把找到的放到这个数组里
                for(var i=0,len=eles.length;i<len;i++){
                    var ele=eles[i];
                    if(reg.test(ele.className)){//5
                        a.push(ele);
                    }
                }
                return a;
            }
        }

        DOM.getChecked=function(eles){
            var arry=[];
            for(var i=0,len=eles.length;i<len;i++){
                if(eles[i].checked){
                    arry.push(eles[i]);
                }
            }
            return arry;
        }

        //处理事件的对象
        var Ev={
            on:function(ele,type,fn){
                if(ele.attachEvent){
                    //ele.attachEvent("on"+type,fn);
                    if(!ele["aEvent"+type]){
                        ele["aEvent"+type]=[];
                        ele.attachEvent("on"+type,function(){Ev.run.call(ele)});//这儿只负责把run绑定在浏览器事件上
                    }
                    var a=ele["aEvent"+type];
                    for(var i=0;i<a.length;i++){
                        if(a[i]==fn)return ;
                    }
                    a.push(fn);

                }else if(ele.addEventListener){
                    ele.addEventListener(type,fn,false);
                }
            },
            off:function(ele,type,fn){
                if(ele.detachEvent){
                    var a=ele["aEvent"+type];
                    for(var i=0;i<a.length;i++){
                        if(a[i]==fn){
                            a[i]=null;
                            ele["tempEvent"][i]=null;
                        };
                    };
                }else if(ele.removeEventListener){
                    ele.removeEventListener(type,fn,false);
                }
            },
            run:function(){
                var e=window.event;
                var a1=this["aEvent"+e.type];
                e.target=e.srcElement;
                e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
                e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
                if(!e.stopPropagation){
                    e.stopPropagation=function(){e.cancelBubble=true;}
                }
                if(!e.preventDefault){
                    e.preventDefault=function(){e.returnValue=false;};
                }
                if(a1){
                    var a=this["tempEvent"]=a1.slice(0);//a1是真正的存储器，a是它的副本
                }else{
                    return;
                }
                for(var i=0;i<a.length;i++){
                    if(typeof a[i]=="function"){
                        a[i].call(this,e)
                    }else {
                        a.splice(i,1);
                        i--;
                    }

                }
            }
        };
        //工具对象
        var Util={};

        Util.isPlainObject=function(obj){
            var hasOwn = Object.prototype.hasOwnProperty;
            if(!obj || Util.type(obj)!=="object" || obj.nodeType || Util.isWindow(obj)){
                return false;
            }

            if(obj.constructor && !hasOwn.call(obj,"constructor") && !hasOwn.call(obj.constructor.prototype,"isPrototypeOf") ){
                console.log('constructor');
                return false;
            }

            var key;
            for(key in obj){

            }
            return key === undefined || hasOwn.call(obj,key);
        }

        Util.isArray=function(obj){
            return Util.type(obj)==='array';
        }

        Util.isWindow=function(obj){
            return obj && typeof obj == "object" && "setInterval" in obj;
        }

        Util.type=function(obj){
            var toString=Object.prototype.toString;

            var class2type={
                '[object Boolean]' : 'boolean',
                '[object Number]' : 'number',
                '[object String]' : 'string',
                '[object Function]' : 'function',
                '[object Array]' : 'array',
                '[object Date]' : 'date',
                '[object RegExp]' : 'regExp',
                '[object Object]' : 'object'

            }
            return obj==null?String(obj):class2type[toString.call(obj)]||"object";
        }


        Util.extend=function(deep,target,option){
            var copyIsArray;
            for(name in option){
                var src= target[name];
                var copy = option[name];
                if(target=== copy){continue;}

                if(deep && copy && (Util.isPlainObject(copy) || (copyIsArray=Util.isArray(copy)))){
                    if(copyIsArray){
                        copyIsArray=false;
                        clone= src && Util.isArray(src)?src:[];
                    }else{
                        clone=src && Util.isPlainObject(src)?src:{};
                    }

                    target[name]=Util.extend(deep,clone,copy);
                }else{
                    target[name]= copy;
                }
            }

            return target;

        }


        function isRegExp(o) {
            return Object.prototype.toString.call(o) === '[object RegExp]';
        }
        function isFunction(o) {
            return Object.prototype.toString.call(o) === '[object Function]';
        }
        function isEmpty(v){
            var reg=/^\s*$/g;
            if(reg.test(v)){
                return true;
            }
            return false;
        }
        function run(v,reg){
            if(!v || !reg){return false;}
            if(reg.test(v)){
                return true;
            }
            return false;
        }

        var ValidateForm=function(opt){
            this.opt={
                wrap:'',
                fields:null
            };
            Util.extend(true,this.opt,opt);
            this.wrap=DOM.find(this.opt.wrap)[0];
            this.init();
        }
        ValidateForm.prototype={
            init:function(){
                this.getEles();
                this.bindEvent();
            },
            bindEvent:function(){
                var self=this;
                var texts=this.eles;

                for(var i=0,length=texts.length;i<length;i++){
                    bindText(texts[i]);
                }


                function bindText(ele){
                    var fieldName=ele.getAttribute("name");
                    var curField=self.opt.fields[fieldName];
                    if(curField&&curField.onBlur){
                        Ev.on(ele,"blur",function(e){
                            curField.onBlur.call(this,e)
                        });
                    }

                    if(curField&&curField.onFocus){
                        Ev.on(ele,"focus",function(e){
                            curField.onFocus.call(this,e);
                        });
                    }
                    if(curField&&curField.onKeyup){
                        Ev.on(ele,"keyup",function(e){
                            curField.onKeyup.call(this,e);
                        });
                    }
                }

            },
            getEles:function(){
                this.eles=DOM.find('input,textarea',this.wrap);
                this.eles=DOM.not('[type=radio],[type=checkbox],[type=submit],[type=button]', this.eles);
                this.radios=this.getFieldName(DOM.find('input[type=radio]',this.wrap));
                this.checkboxs=this.getFieldName(DOM.find('input[type=checkbox]',this.wrap));
                return this.eles;
            },
            getFieldName:function(eles){
                var self=this;
                var names=[];
                for(var i=0;i<eles.length;i++){
                    var name=eles[i].getAttribute("name");

                    if(!self.contains(names,name)){
                        names.push(name);
                    }
                }
                return names;

            },
            contains:function(arry,value){
                for(var i=0;i<arry.length;i++){
                    if(arry[i]==value){
                        return true;
                    }
                }
                return false;
            },
            valid:function(opt){
                var ignore=opt&&opt.ignore||null;
                var result=this.checkForm(ignore);
                return result;
            },
            checkForm:function(ignore){
                var self=this;
                function getEles(array,ignore,type){
                    if(ignore){
                        var temArray=[];
                        for(var i=0;i<array.length;i++){
                            if(type=="radio" || type=="checkbox"){
                                //单选或者复选框
                                if(array[i]!=ignore){
                                    temArray.push(array[i]);
                                }
                            }else{
                                //普通输入框
                                if(array[i].getAttribute("name")!=ignore){
                                    temArray.push(array[i]);
                                }
                            }
                        }
                        return temArray;
                    }else{
                        return array;
                    }

                }

                function check(eles,ignore,type){
                    var eles=getEles(eles,ignore,type);
                    var flag=true;
                    for(var i=0,length=eles.length;i<length;i++){
                        var result=self.checkField(eles[i],type);
                        if(!result.status){
                            return false;
                        }
                    }

                    return true;
                }

                if(check(this.eles,ignore,"text")&&check(this.radios,ignore,"radio")&&check(this.checkboxs,ignore,"checkbox")){
                    return true;
                }else{
                    return false;
                }

            },
            checkField:function(ele,fieldType,notip){
                var flag=true;
                var error="";
                var fieldName="";
                var self=this;

                if(fieldType=="radio"||fieldType=="checkbox"){
                    fieldName=ele;
                }else{
                    fieldName=ele.getAttribute("name");
                }

                var curField=this.opt.fields[fieldName];

                if(!curField) return {status:true};

                var curRule=curField.rule?curField.rule:curField.shortcutRule?curField.shortcutRule:null;

                var regs=ValidateForm.regs?ValidateForm.regs:{};

                var emptyTip= curField["emptyTip"];
                var errorTip=curField["errorTip"];

                var sucCb=curField.onSuccess?curField.onSuccess:null;
                var failCb=curField.onFailed?curField.onFailed:null;



                if(fieldType=="radio"||fieldType=="checkbox"){
                    //单选按钮或者复选框传ele是name值
                    var checkedEles=DOM.getChecked(DOM.find('input[name='+fieldName+']',this.wrap));
                    ele=DOM.find('input[name='+fieldName+']',this.wrap)[0];
                }


                var value=getValue(ele,fieldType);

                function getValue(ele,fieldType){
                    var temArray=[];
                    if(fieldType=="radio"){
                        if(checkedEles.length>0){
                            return checkedEles[0].value;
                        }else{
                            return "";
                        }
                    }else if(fieldType=="checkbox"){
                        for(var i=0;i<checkedEles.length;i++){
                            temArray.push(checkedEles[i].value);
                        }
                        return temArray;
                    }else{
                        return ele.value;
                    }

                }

                function validEmpty(value){
                    if(fieldType=="checkbox"){
                        if(value.length<1){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return isEmpty(value);

                    }
                }

                if(validEmpty(value)){
                    if(curField["required"]){
                        //不能为空
                        if(!notip){
                            self.showError(emptyTip,ele,failCb);
                        }
                        error=emptyTip;
                        flag=false;
                    }else{
                        flag=true;
                        this.hideError(value,ele,sucCb);
                    }
                }else{
                    if(curRule){
                        if(typeof curRule == "string"){
                            if(regs[curRule]){
                                if(!regs[curRule](value)){
                                    //正则不匹配
                                    if(errorTip){
                                        if(!notip){
                                            self.showError(errorTip,ele,failCb);
                                        }
                                        error=errorTip;
                                        flag=false;
                                    }
                                }else{
                                    flag=true;
                                    this.hideError(value,ele,sucCb);
                                }
                            }else{
                                flag=false;
                                error="暂无"+curRule+"校验方法";
                                self.showError(error,ele,failCb);
                            }
                        }else if(isRegExp(curRule)){
                            if(!run(value,curRule)){
                                //正则不匹配
                                if(errorTip){
                                    if(!notip){
                                        self.showError(errorTip,ele,failCb);
                                    }
                                    error=errorTip;
                                    flag=false;
                                }
                            }else{
                                flag=true;
                                this.hideError(value,ele,sucCb);
                            }
                        }else if(isFunction(curRule)){
                            if(!curRule(value)){
                                //正则不匹配
                                if(errorTip){
                                    if(!notip){
                                        self.showError(errorTip,ele,failCb);
                                    }
                                    error=errorTip;
                                    flag=false;
                                }
                            }else{
                                flag=true;
                                this.hideError(value,ele,sucCb);
                            }
                        }else{
                            flag=false;
                            error="暂无此校验方法";
                            self.showError("暂无此校验方法",ele,failCb);
                        }



                    }else{
                        flag=true;
                        this.hideError(value,ele,sucCb);
                    }

                }


                return {
                    status:flag,
                    value:value,
                    msg:error
                }

            },
            showError:function(str,ele,sucCb){
                sucCb&&sucCb(str,ele);

            },
            hideError:function(val,ele,failCb){
                failCb&&failCb(val,ele);
            }
        }

        ValidateForm.addRule=function(name,fn){
            var regs=ValidateForm.regs?ValidateForm.regs:{};
            if(!regs[name]) {
                regs[name] = fn;
            }
        }

        window.ValidateForm=ValidateForm;
        return ValidateForm;
    }



    if (typeof define === 'function' && define.amd){
        // support amd
        define( ["jquery"], factory);
    }else if (typeof define === 'function' && define.cmd){
        // support cmd
        define(function(require,exports,module) {
            var $ = require('jquery');
            return factory($);
        });

    } else if (typeof exports !== 'undefined') {
        //suport node
        module.exports = factory($);
    } else {
        this.ValidateForm = factory($);
    }

})(window);

