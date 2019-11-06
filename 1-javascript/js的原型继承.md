http://louiszhai.github.io/2015/12/15/prototypeChain/




[TOC]

```javascript
var a=new Array()  
a.__proto__ == Array.prototype //true
Array.__proto__ == Function.prototype //true
Function.__proto__.__proto__ == Object.prototype  //true
a.constructor==Array.prototype.constructor //true

```

### 1.所有的构造器的constructor都指向Function（包括自定义的构造函数）

```javascript
Object.constructor
// ƒ Function() { [native code] }
Array.constructor
//ƒ Function() { [native code] }
var a=new Array();
a.constructor
// ƒ Array() { [native code] }
```
### 2.Function的prototype指向一个特殊的匿名函数，而这个特殊的匿名函数的proto指向Object.prototype
```javascript
Function.prototype.__proto__===Object.prototype  //true
```

 根据（2）可以得到：
##### 
```javascript
//构造器的类型就是Function
构造器.prototype.__proto__（Object除外）===Object.prototype  //true
```
### 3.Object.prtotype为所有原型的顶层

```javascript
Object.prototype.__proto__===null
```
### 4. 元素.instanceof(构造函数)
判断 构造函数.prototype 是否在元素的原型链上
```javascript
Function instanceof Object // true
Object instanceof Function // true
```
> （1）当把 Function 当成元素时 Function.__proto__ = Function.construtor.prototype
由1-（1）可知 Function.construtor = Function
所以
Function.__proto__ = Function.prototype，此时他们都指向一个匿名函数
而这个匿名函数的__proto__指向 Object.prototype ，所以第一个为true

> （2）当把 Object 当成元素时,
Object.__proto__ = Object.construtor.prototype
由1-（1）可知
所有构造器的 constructor 都指向 Function ，Object.construtor = Function
所以
Object.__proto__ = Function.prototype，所以第二个为true







