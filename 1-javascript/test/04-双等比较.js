/**
 * == 进行比较，如果左右两边数据类型不一致，则先转换为相同的数据类型，然后在进行比较
 * 1.{}=={}两个对象进行比较，比较的是堆内存的地址
 * 2.null == undefined // true null === undefined // false
 * 3. NaN == NaN 不相等，NaN和谁都不相等
 * 4.[12]=='12'  对象和字符串比较，是把对象toString()转换为字符串后再进行比较
 * 5.剩余所有的情况下载进行比较的时候都是转换为数字（前提数据类型不一样）
 * 对象=>数字 先转换为字符串，然后在转换为数字
 * 字符串=>数字，只要出现一个非数字字符就是NaN
 * 布尔=>数字：true-》1，false=>0
 * null=>数字 0
 * undefined=>数字NaN
 * 
 * [12]==true =>Number([12])==1 //false
 * []==false  =>Number([])==Number(false) //true
 * []==1      =>0==1   //false
 * '1'==1     =>1==1   //true
 * true== 2   =>1==2   //false
 * 
 */



/**
    var a=?
    if(a==1&&a==2&&a==3){
        console.log(1);   
    }补充代码
 */


 //对象和数字比较，先把对象.toSting变为字符串，然后再转化数字
var a= {
    n:0,
    // =>私有的属性方法
    toString:function() {
        return ++this.n
    }
}
if(a==1&&a==2&&a==3){
    console.log(1);   
}

// 方法二
var a=[1,2,3]
a.toString=a.shift
if(a==1&&a==2&&a==3){
    console.log(1);   
}


// 方法三
/**
 * es6的方法
 * String.fromCharCode(121)  <=>'y'.charCodeAt()
 * Array.form()装为数组
 * Array.isArray()检测是否为一个数组
 * Object.creata([fn])
 */

var obj = {}
Object.defineProperty(obj,'name',{
    get:function () {
        return 'hello'
    },
    set:function (val) {
        this.value = val
    }
})


Object.defineProperty(window,'b',{
    get:function () {
        this.value?this.value++:this.value=1
        return this.value
    }
})
if(b==1&&b==2&&b==3){
    console.log(8);   
}

