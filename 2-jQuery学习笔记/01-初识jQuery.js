<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>认识jQuery</title>
    <script src="./jQuery1.10.2.js"></script>
</head>
<body>

    <div></div>
    <div class="one"></div>
    <div id="two"></div>
    
</body>
<script>
    // 1.原生js的固定写法
    // window.onload=function(){
    //     alert('javascript1')  //不会执行
    // }
    // window.onload=function(){
    //     alert('javascript2')
    // }

    // 2.jQuery的固定写法
    // $(document).ready(function () {
    //     alert('jQuery1')
    // })
    // $(document).ready(function () {
    //     alert('jQuery2')
    // })

    // 3.js获取dom元素
    const dom1=document.getElementsByTagName('div')[0]
    const dom2=document.getElementsByClassName('one')[0]
    const dom3=document.getElementById('two')
    dom1.style.width = 100+'px'
    dom1.style.height = 100+'px'
    dom1.style.border = '1px solid red'

    console.log(dom1,dom2,dom3);


    const dom4=$('div')
    const dom5=$('.one')[0]
    const dom6=$('#two')[0]

    console.log(dom4,dom5,dom6);
    dom4.css({    // dom4.css is not a function
        width:'100px',
        height:'100px',
        border:'1px solid #333'
    })

</script>
</html>
