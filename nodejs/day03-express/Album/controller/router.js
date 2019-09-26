exports.showIndex = (req,res)=>{
    res.render('index',{
        albums:['aa','bb','cc']
    })
    
}

exports.showAlbum = (req,res)=>{
    res.send('相册'+req.params.albumName)
}