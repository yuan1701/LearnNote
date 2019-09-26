const fs = require("../models/file")

/**
 * 首页
 */
exports.showIndex = (req,res)=>{
    // res.render('index',{
    //     albums: fs.getAllAblums()
    // })
    /**
     * 在nodejs中读取文件是异步的，所以内层函数不是return回来的东西，而是调用高层函数提供的
     * 回调函数：把数据当做回调函数的参数来使用
     */
    fs.getAllAblums((err,data)=>{
        if(err){
            res.send(err)
            return
        }

        res.render('index',{
            albums: data
        })
    })
    
}
/**
 * 相册页
 */
exports.showAlbum = (req,res)=>{
    // 遍历相册的所有文件

    const albumName = req.params.albumName

    // res.send('相册'+req.params.albumName)
    // 具体业务交给model

    fs.getAllImagesByAlbums(albumName,(err,imagesArray)=>{
        if(err) res.send(err)
        res.render('album',{
            albumName: albumName,
            images: [imagesArray]
        })
    })
    // res.render('album',{
    //     albumName: albumName,
    //     images: ['1.jpg']
    // })
    
}