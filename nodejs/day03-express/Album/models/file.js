/** 处理文件 */
const fs = require('fs')

exports.getAllAblums = (callback)=>{
    fs.readdir("./uploads",(err, files)=>{
        if(err) callback('没有uploads文件夹',null)
        const allAlbums = [];
        /**
         * 迭代器
         */
        (function iterator(i){
            if(i==files.length) {
                console.log(allAlbums,'xxxxxxxx')
                callback(null,allAlbums)
                return
            }
            fs.stat('./uploads/'+files[i],(err,stats)=>{
                console.log(stats,'sssss')

                if(err){
                    callback('没有uploads文件夹',null)
                    return
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i])
                }
            })
            iterator(i+1)
        })(0)
    })

}

// 通过文件名，得到所有图片
exports.getAllImagesByAlbums = (albumName,callback)=>{
console.log(albumName,'ss')

    fs.readdir("./uploads/"+albumName,(err, files)=>{
        if(err) callback('没有uploads文件夹',null)
        const allImages = [];
        console.log(files)
        /**
         * 迭代器
         */
        // (function iterator(i){
        //     if(i==files.length) {
        //         callback(null,allImages)
        //         return
        //     }
        //     fs.stat('./uploads/'+albumName+'/'+files[i],(err,stats)=>{

        //         console.log(stats,'xxxx')
        //         if(err){
        //             callback('找不到文件'+files[i],null)
        //             return
        //         }
        //         if(stats.isFile()){
        //             allImages.push(files[i])
        //         }
        //     })
        //     iterator(i+1)
        // })(0)
    })
}