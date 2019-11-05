https://juejin.im/post/5b498d245188251b193d4059


练习题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>事件循环机制</title>
</head>
<style>
.outer{
    display: flex;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
    border:1px solid red
}
.inner{
    width: 50px;
    height: 50px;
    border:1px solid red
}
</style>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
    
</body>
<script>
    var inner = document.querySelector('.inner')
    var outer = document.querySelector('.outer')


    // 给outer添加一个观察者

    new MutationObserver(function () {
        console.log('mutate');
    }).observe(outer,{
        attributes:true
    })

    function onClick(){
        console.log('click');

        setTimeout(function(){
            console.log('timeout');
        })
        
        Promise.resolve().then(function(){
            console.log('promise');
            
        })

        outer.setAttribute('data-random',Math.random())

    }

    inner.addEventListener('click',onClick)
    outer.addEventListener('click',onClick)



// 点击outer的结果
// click 
// promise
//  mutate
//  timeout

// 点击inner的结果
// click
//  promise
//  mutate
//  click
//  promise
//  mutate
// timeout
// timeout


</script>
</html>
```
