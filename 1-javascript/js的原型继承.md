http://louiszhai.github.io/2015/12/15/prototypeChain/




[TOC]

```javascript
var a=new Array()  
a.__proto__ == Array.prototype //true
Array.__proto__ == Function.prototype //true
Function.__proto__.__proto__ == Object.prototype  //true
a.constructor==Array.prototype.constructor //true

```

