
/**
 * 回调  
 * 1.awite()
 *  2.next 
 * 3.递归
 */

// function fn1(){
//     setTimeout(()=>{
//         console.log('fn1')
//     })
// }
// function fn2(){
//     console.log('fn2')
// }
// fn1()
// fn2()

/** 在上面代码会先打印fn2,怎么样才能先打印fn1呢？？ */ 

/** 1.回调函数 */
function f1(callback){
    setTimeout(()=>{
        console.log('fn1')
        callback()
    })
}
function f2(){
    console.log('fn2')
}
f1(f2)

/** 2.链式调用,需要依赖jquery */
function f1() {
    var dfd = $.Deferred();
    setTimeout(function () {
        console.log('f1')
        // f1的任务代码
        dfd.resolve();
    }, 500);
    return dfd;
}
function f2(){
    console.log('f2')
}
f1().then(f2)

 