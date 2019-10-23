[TOC]

### swiper插件从后台获取数据没问题，css也没问题，但是图片不动，应该怎么解决？
本质考察vue的生命周期。
原因是：swiper提前初始化，而这个时候数据还没有拿到。
 
```javascript
mounted：{
	// ajaxData()
	this.$nextTick(function(){ // 第一种方法
		var myswiper= new Siper('swiper-contanier',{
			autoplay:true,
			loop:true,
			observer:true,  // 第二种方法
			observeParents:true // 第二种方法
		})
	})
}
```



