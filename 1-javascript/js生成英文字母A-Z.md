
# js生成英文字母A-Z
### String.fromCharCode 这个往往被我们遗忘的方法！

 

定义和用法
fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。

语法
String.fromCharCode(numX,numX,...,numX)
　

例子（生成A-Z）：

```javascript
function getEN(){
    var arr = [];

    for(var i = 65; i < 91; i++){
        arr.push(String.fromCharCode(i));
    }

    return arr.join(',');
}
getEN();
```
