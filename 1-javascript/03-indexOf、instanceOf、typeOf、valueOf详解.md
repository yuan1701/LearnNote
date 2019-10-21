[TOC]

## indexOf、instanceOf、typeOf、valueOf详解
### 1、indexOf()

该方法用来返回某个指定的字符串值在字符串中首次出现的位置。

语法：indexOf(searchvalue,fromindex);两个参数，参数一表示查询的字符串值，参数二可选表示开始查询的起始位置，若不写默认从首字符开始查询

```javascript
var string = "abcdeADhu390u09";
console.log(string.indexOf("d"));//3  注意下标值从0开始
console.log(string.indexOf("D"));//6
```
上面代码都只有一个参数分别打印出"d"、"D"字符串值首次出现的位置，发现输出的值不同，说明indexOf()方法对大小写有区分。

下面这段代码传入两个参数，根据前面说的参数二表示查询的起始位置，所以从第五位开始查询"d"首次出现的位置，查询不到返回-1

```javascript
console.log(string.indexOf("d",4));//-1
```
indexOf()方法还常用来判断浏览器的类型，其用法如下：

```javascript
1 if(navigator.userAgent.indexOf("Firefox")>0){
2     return "Firefox";
3 }else if(navigator.userAgent.indexOf("Chrome")>0){
4     return "Chrome";
5 }else if(navigator.userAgent.indexOf("Opera")>0){
6     return "Opera";
7 }

```
以navigator.userAgent.indexOf("Opera")查询来讲，若打开的浏览器是欧朋则返回一个大于0的值，否则返回-1
### 2、instanceOf
该运算符用来检测对象的类型
语法：object instanceof constructor   参数object表示要检测的对象，参数constructor表示某个构造函数
```javascript
function Person(){}
var Dave = new Person();
//Object.prototypeOf(Dave)===Person.prototype
console.log(Dave instanceof Person);//true
```
可以这样理解：instanceof检测constructor.prototype是否存在于参数object原型链上。若存在返回true
上面说的是较常规的用法，现在来看看在继承中的用法

```javascript
function Person(){};
function Student(){};
Student.prototype = new Person();//js中的原型继承
var Dave = new Student();
console.log(Dave instanceof Student);//true
console.log(Dave instanceof Person);//true
```

上面一段代码判断Dave是否是Student的实例，并且是否是其父类型的实例

### 3、typeof
该运算符用来检测基本数据类型

```javascript
console.log(typeof("Json"));//string
console.log(typeof(2));//number
console.log(typeof(true));//boolean
console.log(typeof({a:1}));//object
console.log(typeof(function(){}));//function
console.log(typeof(undefined));//undefined
```

在ES6之前typeof返回值就是上面列出的六种：string、number、bollean、object、function、undefined;ES6出来后又增加了一种symbol

```javascript
console.log(typeof(Symbol()));//symbol
```
### 4、valueOf()

该方法返回Boolean对象的原始值

语法：booleanObject.valueOf()
```javascript
var boo = new Boolean(true);
console.log(boo.valueOf()); // true
```

### 5、知识补充"=="与"==="

```javascript
var a = undefined;
var b = null;
console.log(a==b);//true
console.log(a===b);//false
```
null与undefined在"=="情况下返回true,因为他们是类似的值，在"==="情况下返回false，因为他们不是相同类型的值。

```javascript
console.log(NaN==NaN);//false
console.log(3==NaN);//false
```
若有一个操作符是NaN，在"=="情况下返回false,即使两个操作数都是NaN，在"=="情况下也返回false

```javascript
console.log(false==0);//true
console.log(true==1);//true
console.log(true==2);//false
```
在操作符为"=="时，true与1返回true

```javascript
console.log(null==0);//false
console.log(undefined==0);//false
```
