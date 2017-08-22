> # 表单验证组件
>

表单验证组件

# 目录

[TOC]

## 基本用法

html代码

```
<form id="myform" method="post">
    <p>
        <label for="email">E-Mail：</label>
        <input id="email" name="email" />
    </p>
    <p>
        <input class="submitbtn" type="submit" value="立即注册" />
    </p>
</form>

<script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
<script src="dist/validateForm.js"></script>
<script src="dist/regs.js"></script>
```

js代码

```
$(function(){

 function validFieldSuc(value,ele){
            var $parent=$(ele).parents("p");
            var $tip=$parent.find(".tip");
            if($tip.length<1){
                $tip=$('<span class="tip"></span>');
                $parent.append($tip);
            }
            $tip.html("验证通过").css({"color":"green"});
        }
 function validFieldFail(str,ele){
            var $parent=$(ele).parents("p");
            var $tip=$parent.find(".tip");
            if($tip.length<1){
                $tip=$('<span class="tip"></span>');
                $parent.append($tip);
            }
            $tip.html(str).css({"color":"red"});
        }
        
//创建实例
var myform = new ValidateForm({
            wrap:'#myform',
            fields:{
            	email:{
                  required: true,
                  shortcutRule: "email",
                  emptyTip: '邮箱不能为空',
                  errorTip: '邮箱格式不正确',
                  onBlur:function(){
                        myform.checkField(this);
                  },
                  onSuccess:function(value,ele){
                        validFieldSuc(value,ele);
                  },
                  onFailed:function(str,ele){
                        validFieldFail(str,ele);
                  }
              	}

            }
        })

    $(".submitbtn").on("click",function(e){
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
            var result= myform.valid();
            if(result){
                alert("表单验证成功");
            }else{
                console.log("表单验证失败");
            }
        })
})
```

## 创建实例的option选项

* wrap : form表单的外部容器，值为css 选择器

* fields: 所有表单字段的配置对象，对象的属性是表单元素的name值，对象属性的值还是一个对象
  + required:该表单元素是否为必填项，值为布尔值

  + shorcutRule:组件内置的验证规则（必须引入regs.js），值为字符串

    该组件内置的验证规有chinaChar（是否是汉字）、cardId（身份证验证）、phone（固定电话）、mobile（手机）、password（用户名）、email（邮箱）、num（是否为数字）、qq（qq号）、weixin（微信号）、empty（是否为空）可以直接使用
    ```
    <p>
           <label for="email">E-Mail：</label>
           <input id="email" name="email" />
         </p>

          fields:{
            email:{
              required: true,
              shortcutRule: "email"
            }
          }
    ```

  + rule:自定义的验证规则，值可为字符串、正则、自定义函数  (如果shorcutRule属性和rule属性同时存在，以自定义验证规则为准)
    + 字符串:
      添加自定义校验规则: 调用函数的addRule方法，来扩充校验规则，addRule方法的第一参数是新的校验规则名称，第二个参数是函数，函数的参数是表单元素的值，返回值为true或者false

      ```
      <p>
        <label for="myname">用户名：</label>
        <input id="myname" name="myname" />
      </p>
      //添加新的校验规则，用户名已chr开头
       ValidateForm.addRule("chrName",function(v){
         if(!v)return false;
           var reg=/^chr/;
           if(reg.test(v)){
           return true;
         }else{
         	return false;
         }
       });
       
       fields: {
         myname: {
           required: true,
           rule:"chrName"
         }
       }
      ```

    + 正则：值可以为正则表达式

      ```
       <p>
         <label for="phone">手机号：</label>
         <input id="phone" name="phone" />
       </p>
       
       fields:{
          phone: {
           required: true,
           rule:/^1[3-9][0-9]\d{8}$/
         }
       }
      ```

    + 自定义函数:可自定义函数验证表单元素,函数的一个参数是当前表单元素的值,函数的返回值为true后者false

      ```
      <p>
        <label for="experience">工作经历：</label>
        <textarea name="experience" id="experience" cols="30" rows="10"></textarea>
      </p>

      fields:{
        experience:{
          required: true,
          rule: function(v){
            if(v.length>5){
            	return true;
            }else{
            	return false;
            }
          }
        }
      }
      ```
  + emptyTip:值为空的提示文案

  + errorTip:值不符合验证规则的提示文案

  + fieldType:表单元素的类型，默认是“text”，值可以是“radio”、“checkbox”等

  + onSuccess:表单元素校验成功回调，第一个参数为值，第二个参数为当前元素

  + onFailed:表单元素校验失败的回调，第一个参数为失败原因，第二个参数为当元素

  + onBlur:表单元素失去焦点时的回调，第一个参数为事件对象，this指向当前元素

  + onFocus:表单元素获得焦点时的回调，第一个参数为事件对象，this指向当前元素

  + onKeyup:表单元素keyup的回调，第一个参数为事件对象，this指向当前元素


## 方法

1. 实例方法

   + valid(opt)

     表单提交之前，校验所有表单元素的值是否合法，opt是个对象,返回值为布尔值，true为表单验证成功，false为表单验证失败

     + ignore:忽略校验的元素，值为忽略校验元素name的值

     ```
      var myform = new ValidateForm({...});
      var result = myform.valid({ignore:"experience"});
      if (result) {
      	alert("表单验证成功");
      } else {
     	 console.log("表单验证失败");
      }
     ```

   + checkField(ele,fieldType,notip)

     校验某个表单元素是否合法，第一个参数为表单元素(必填)，第二个参数为表单元素的类型(默认为text,非必填)，第三个参数为布尔值（默认为假，为真时，忽略onSuccess和onFailed回调函数的执行）
   ```
     var myform = new ValidateForm({...});
     myform.checkField(ele);
   ```
     返回值是一个对象
     ````
     {
      status:true,//值为true/false 校验成功或者失败
      value:"我是一名前端开发人员",//校验成功，当前输入框的值
      msg:"不能少于5个值"，//校验失败，失败的原因
     }
     ````


1. 函数方法

+ ValidateForm.addRule(name,fn)

  添加自定义校验规则,第一参数是新的校验规则名称，第二个参数是函数，函数的参数是表单元素的值，返回值为true或者false

  ```
  //添加新的校验规则，用户名已chr开头
   ValidateForm.addRule("chrName",function(v){
     if(!v)return false;
       var reg=/^chr/;
       if(reg.test(v)){
       return true;
     }else{
     	return false;
     }
   });
  ```




## demo示例

+ 普通页面:normal.html
+ cmd页面:cmd.html
+ amd页面:amd.html

