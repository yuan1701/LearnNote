
/**
 * 1.回调 
 * 2.promise
 * 3.awite()
 * 
 * 
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

/** 1.回调函数 但是嵌套层级变多之后就会出现回调地狱，不好维护*/
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

/** 2.链式调用,promise */
function delay(word) {
    return new Promise((resolve,reject)=>{
        setTimeout(function(){resolve(word)},200)
    })
}
delay('孙悟空').then((word)=>{
    console.log(word)
    return delay('猪八戒')
}).then((word)=>{
    console.log(word)
    return delay('沙和尚')
}).then((word)=>{
    console.log(word,'-----------------')
})

// 3.async+await
async function start(){
    const word1 = await delay("孙悟空")
    console.log(word1)
    const word2 = await delay("猪八戒")
    console.log(word2)
    const word3 = await delay("撒和尚")
    console.log(word3)
}
start()
 

 