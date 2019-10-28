
/**
 * 1.call和apply的区别是什么？哪个性能更好
 */
// fn.call(obj,10,20,30)
// fn.apply(obj,[10,20,30])


// 1.都是function原型上的方法，每个函数实例都可以调用这两个方法。用来改变this执行，
// 2.参数不同，call参数不固定，apply只接受两个参数
// 三个参数以下性能差不多，参数超过三个时call的性能更好一些，火气开发的时候call使用多一点

let arr=[10,20,30],obj={}
function fn(x,y,z) {}
fn.apply(obj,arr)   // x=10,y=20,z=30
fn.call(obj,arr)   // x=[10,20,30],y=undefined,z=undefined
fn.call(obj,...arr)  //=>基于es6的展开运算符也可以实现吧数组中的每一项依次传递给函数



/**
 * 如何实现性能测试（只供参考）：任何的代码性能测试都是和测试的环境有关系的，例如cpu，内存，GPU，不同浏览器也会导致性能上的不同
 * 
 * console.profile()在火狐浏览器安装fireBug，可以更精准的获取到每一个步骤所消耗的时间
 */

console.time('a')
for (let index = 0; index < 1000000; index++) {
    
}
console.timeEnd('a')


/**
 * 2.实现(5).add(3).minus(2),使其输出结果为6
 */

~function () {
    //=>每一个方法执行完，都要返回NUMBER这个类的实例，这样才可以继续调取NUMBER上的方法
    function check(n) {
        n=Number(n)
        return isNaN(n)?0:n
    }
    function add(n) {
        return this + n
    }
    function minus(n) {
        return this - n
    }
    // Number.prototype.add = add
    // Number.prototype.minus = minus

    ['add','minus'].forEach(item=>Number.prototype[item]=eval(item))
}()
console.log((5).add(3).minus(2));




/**
 * 3.箭头函数与普通函数的区别是什么？构造函数可以使用new生成实例，那么箭头函数可以吗？为什么
 * 
 * 区别：
 * 1.语法比普通函数更简洁（es6中的每一种函数都可以使用形参默认值和剩余运算符）
 * 2.箭头函数没有自己的this，它里的this是继承函数所处的上下文中的this，（使用call，apply无法改变this的指向）
 * 3.箭头函数中没有arguments(类数组)，只能基于...arg获取参数集合
 * 4.不能被new执行，（没有自己的this，没有prototype）
 */

document.body.onclick=()=>{
    console.log(this);  // window
}

document.body.onclick=function () {
    console.log(this);  // body
    arr.sort(function (a,b) {
        // 回调函数的this一般指向window
        console.log(this);
        return a-b  
    })

    arr.sort((a,b) => {
        console.log(this);//这里指的是上下文的this，body
        return a-b  
    })
} 

/**
 * 4.如何把一个字符串的大小写取反？例如 
 * 'AbC' => 'aBc'
 */
let str='asedDXKM*100'

str = str.replace(/[a-zA-Z]/g,content=>{
    return content.toUpperCase()===content?content.toLowerCase():content.toUpperCase()
})
console.log(str);

/**
 * 5.实现一个字符串匹配算法，从字符串S中，查找是否存在字符串T，若存在番薯该值，不存在返回-1.（不使用indexOf/includes等内置方法如何处理）
 */

S = 'aavunooooaa'
~function () {
    function myIndexOf(T) {
        let reg = new RegExp(T),res =reg.exec(this)
        return res==null?-1:res.index
    }
   
    String.prototype.myIndexOf = myIndexOf
}()
S.myIndexOf('vun')


/**
 * 6.下面代码的输出结果？
 */
var a={},b='123',c=123
a[b]='b' //=> a['123']='b
a[c]='c' //=> a[123] = c   ==> a['123']===a[123]  //true
console.log(a[b]);  //c

var a={},b=Symbol('123'),c=Symbol('123')
a[b]='b' //=> a[Symbol('123')]='b'
a[c]='c' //=> a[Symbol('123')] = 'c'   ==>Symbol('123')不等于Symbol('123')
console.log(a[b]);  //b

var a={},b={key:"123"},c={key:'456'}
a[b]='b' //=>a["[object Undefined]"] = 'b'
a[c]='c' //=> a["[object Undefined]"] = 'c'
console.log(a[b]);  //c


/**
 * 7.在输入框中如何判断输入的是一个正确的网址，例如;用户输入一个字符串，验证是否符合url网址的格式
 * 1.协议：http、https、ftp
 * 2.域名：www.baidu.com
 * nodejs.cn
 * kbs.sports.qq.com
 * kbs.sports.qq.com.cn
 * 3.请求路径
 * /
 * /index.html
 * stu/index.html
 * stu/
 * 4.问号传参
 * ？xxx=xxx&xxx=xxx
 * 5.哈希值
 * #xxx
 */
let url='https://xxx.com'
let reg=/^(http|https|ftp):\/\/?(([\w-]+\.)+[a-z0-9])((\/[^/]*)+)?(\?[^#]+)?(#.+)$/i
reg.exec(url)


/**
 * 8.以下代码的输入结果为？
 */

function Foo() {
    Foo.a=function () {
        console.log(1);
    }
    this.a =function () {
        console.log(2);
    }
}
//=>把Foo当做类，在原型上设置实例私有的属性方法 =》实例.a()
Foo.prototype.a=function () {
    console.log(3);
}
//=>把Foo当做普通对象设置私有的属性方法，=>Foo.a()
Foo.a =function () {
    console.log(4);
}
Foo.a()  //4  把Foo当做普通对象执行
let obj = new Foo() //=>obj可以当做调取原型上的方法  Foo.a:function(){console.log(1)}  obj.a=>this.a
obj.a()  //2 私有属性上有a
Foo.a()  //1 

/**
 * 9.编写代码实现懒加载
 * 1.前端性能优化的重要方案，我们可以加快页面渲染的速度，让第一次打开页面的速度变快
 * 只有滑动到某个区域，我们才加载真是的图片，这样也可以节省加载的流量
 * 2.处理方案
 * 把所有需要延迟加载的图片用一个盒子包起来，设置宽高等需要的时候再加载
 */

// jQ中的事件绑定支持多事件绑定
$(window).on('load scroll',function () {
    console.log('ok')
    
})


/**
 * 10.编写正则，用来验证此规则：一个6-16位的字符串必须包含大小写字母和数字
 */


 /**
  * 11.完成下面需求
  * 实现一个$attr(name,value)遍历
  * 属性为name值为value
  * 例如下面实例：
  * let ary = $attr('class','box') //页面中所有的class为box的元素
  */



/**
 * 12,英文字母汉子组成的字符串，用正则给英文单词前后加空格
 */







