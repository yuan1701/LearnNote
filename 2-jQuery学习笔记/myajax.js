
function obj2str(obj){
    var res = []
    obj.t = new Date().getTime()
    for(key in obj){
        // 使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20。
        // 而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符
        res.push(encodeURIComponent(key) +'='+encodeURIComponent(obj[key]) )
    }
    return res.join('&')

}

function ajax(method,url,data,timeout,success,error) {
    var timer

    // 1.创建对象
    var xhr;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(method.toLowerCase()==='get'){
        var url = url +'?'+obj2str(data)
        xhr.open(method, url, true)
        xhr.send() //字符串
    }else if(method.toLowerCase()==='post'){
        xhr.open(method, url, true)
        // post请求要设置
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        console.log(data)
        xhr.send(obj2str(data))
        
    }

    // 4.监听变化
    var i=0
    xhr.onreadystatechange = function (res) {
        console.log(i,xhr.readyState)
        clearInterval(timer)
        // 5.处理数据
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
               
                success(xhr.responseText)
            }

        }else{
            error('err')
        }
        

        if(timeout){
            timer = setInterval(function(){
                xhr.abort()
                clearInterval(timer)
            },timeout)
        }


        /**
         * ps:
         * readyState在生成xmlHttp时为0
         * 在 XMLHttpRequest.open时即改变，oepn会触发onreadystatechange事件的。
         * open放在onreadystatechange之前，会比放在onreadystatechange之后少执行一次onreadystatechange事件。
         * 
         * readyState 属性存有服务器响应的状态信息。
         * 每当 readyState 改变时，onreadystatechange 函数就会被执行。
         * 
         * 
         */


       
    }
   
}