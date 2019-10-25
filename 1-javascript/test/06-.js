let obj = {
    2:3,
    3:4,
    length:2,
    push: Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj);


/**
 * 上面代码的输出结果为？
 */

// 在Array中push的实现
// Array.prototype.push = function xx(val) {
//     this[this.length] = val;
//     // this.length会在原来的基础上加1
//     return this.length
// }


// 分析
/*
let obj = {
    2:3,
    3:4,
    length:2,
    push: Array.prototype.push
}
obj.push(1); =>obj[obj.length]=1 => obj[2]=1 ,obj.length=3
obj.push(2); =>obj[3]=2,obj.length=4
console.log(obj);

*/




        
