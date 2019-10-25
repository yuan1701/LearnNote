/**
 * 下面的输出结果？怎么解决
 */

//  定时器是异步编程，每一轮设置定时器，无需等待定时器吃触发，继续下一轮循环

for (var index = 0; index < 10; index++) {
    setTimeout(()=>{
        console.log(index);
    },1000)
}


/** 方法一：let */
// let 存在块级作用域

/** 方法2：闭包 */
for (var index = 0; index < 10; index++) {
    !function name(index) {
        setTimeout(()=>{
            console.log(index);
        },1000)
    }(index)
}

for (var index = 0; index < 10; index++) {
    setTimeout((index=>()=>console.log(index))(index),1000)
}

/** 方法3：bind */

// 基于bind的预先处理机制，在循环的是酒吧每次执行函数输出的结果，预先传递给函数即可
var fn = function (i) {
    console.log(i);
}
for (var i = 0; i < 10; i++) {
    setTimeout(fn.bind(null,i),100)
}


