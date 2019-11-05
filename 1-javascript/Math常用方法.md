[TOC]

### Math常用函数

```javascript
console.log(Math.PI) // π

console.log(Math.E)  //e

console.log(Math.ceil(4.01)) // 5  向上求整

 console.log(Math.floor(4.999999999)) // 4  向下求整

 console.log(Math.sqrt(9))     //求方根

 console.log(Math.pow(3,3))    //3^3

 console.log(Math.abs(-5))     //求绝对值

 console.log(Math.round(4.4))  //4    四舍五入

  console.log(Math.round(4.5))  //5

  console.log(Math.random())   //0，1的随机数
```
### 给定一个整数，看是否为4的幂（不用递归和for）

```javascript
/**
 * @param {number} num
 * @return {boolean}
 */
function isPowerOfFour(num) {
    if(!num) return false
    var a=Math.log(num);

    return Math.pow(4,Math.floor(a))===num||Math.pow(4,Math.ceil(a))===num
}
console.log(isPowerOfFour(16));
```




