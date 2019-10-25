[TOC]

## js中数组常用方法总结

### Array.map()

此方法是将数组中的每个元素调用一个提供的函数，结果作为一个新的数组返回，并没有改变原来的数组

```javascript
let arr = [1, 2, 3, 4, 5]
let newArr = arr.map(x => x*2)
//arr= [1, 2, 3, 4, 5]   原数组保持不变
//newArr = [2, 4, 6, 8, 10] 返回新数组
	
//对比和forEach的区别
```

### Array.forEach()
此方法是将数组中的每个元素执行传进提供的函数，没有返回值，直接改变原数组，注意和map方法区分

```javascript
let arr = [1, 2, 3, 4, 5]
num.forEach(x => x*2)
// arr = [2, 4, 6, 8, 10]  数组改变,注意和map区分
```
　　

### Array.filter()

此方法是将所有元素进行判断，将满足条件的元素作为一个新的数组返回

```javascript
let arr = [1, 2, 3, 4, 5]
const isBigEnough => value => value >= 3
let newArr = arr.filter(isBigEnough )
//newNum = [3, 4, 5] 满足条件的元素返回为一个新的数组
```
### Array.every()

此方法是将所有元素进行判断返回一个布尔值，如果所有元素都满足判断条件，则返回true，否则为false：

```javascript
let arr = [1, 2, 3, 4, 5]
const isLessThan4 => value => value < 4
const isLessThan6 => value => value < 6
arr.every(isLessThan4 ) //false
arr.every(isLessThan6 ) //true
//对比some方法
```

### Array.some()

 此方法是将所有元素进行判断返回一个布尔值，如果存在元素都满足判断条件，则返回true，若所有元素都不满足判断条件，则返回false：

```javascript
let arr= [1, 2, 3, 4, 5]
const isLessThan4 => value => value < 4
const isLessThan6 => value => value > 6
arr.some(isLessThan4 ) //true
arr.some(isLessThan6 ) //false
```

### Array.reduce()

 此方法是所有元素调用返回函数，返回值为最后结果,传入的值必须是函数类型：

```javascript
let arr = [1, 2, 3, 4, 5]
const add = (a, b) => a + b
let sum = arr.reduce(add)
//sum = 15  相当于累加的效果
//与之相对应的还有一个 Array.reduceRight() 方法，区别是这个是从右向左操作的
```

### Array.push()
 此方法是在数组的后面添加新加元素，此方法改变了数组的长度：

### Array.pop()

 此方法在数组后面删除最后一个元素，并返回数组，此方法改变了数组的长度：
 
```javascript
let arr = [1, 2, 3, 4, 5]
arr.pop()
console.log(arr) //[1, 2, 3, 4]
console.log(arr.length) //4
```

### Array.shift()

 此方法在数组后面删除第一个元素，并返回数组，此方法改变了数组的长度：

```javascript
let arr = [1, 2, 3, 4, 5]
arr.shift()
console.log(arr) //[2, 3, 4, 5]
console.log(arr.length) //4 
```

### Array.unshift()

 此方法是将一个或多个元素添加到数组的开头，并返回新数组的长度：

```javascript
let arr = [1, 2, 3, 4, 5]
arr.unshift(6, 7)
console.log(arr) //[6, 7, 2, 3, 4, 5]
console.log(arr.length) //7 
```


### Array.isArray()

 判断一个对象是不是数组，返回的是布尔值
 
### Array.concat()
 此方法是一个可以将多个数组拼接成一个数组：

```javascript
let arr1 = [1, 2, 3]
arr2 = [4, 5]
let arr = arr1.concat(arr2)
console.log(arr)//[1, 2, 3, 4, 5]
```
　　

### Array.toString()

 此方法将数组转化为字符串：

```javascript
let arr = [1, 2, 3, 4, 5];
let str = arr.toString()
console.log(str)// 1,2,3,4,5
```
### Array.join()
  此方法也是将数组转化为字符串：

```javascript
let arr = [1, 2, 3, 4, 5];
let str1 = arr.toString()
let str2 = arr.toString(',')
let str3 = arr.toString('##')
console.log(str1)// 12345
console.log(str2)// 1,2,3,4,5
console.log(str3)// 1##2##3##4##5
```

通过例子可以看出和toString的区别，可以设置元素之间的间隔~ 
### Array.splice(开始位置， 删除的个数，元素)

```javascript
 // 万能方法，可以实现增删改：
 
let arr = [1, 2, 3, 4, 5];
let arr1 = arr.splice(2, 0 'haha')
let arr2 = arr.splice(2, 3)
let arr1 = arr.splice(2, 1 'haha')
console.log(arr1) //[1, 2, 'haha', 3, 4, 5]新增一个元素
console.log(arr2) //[1, 2] 删除三个元素
console.log(arr3) //[1, 2, 'haha', 4, 5] 替换一个元素
```
### Array.slice()






　　

