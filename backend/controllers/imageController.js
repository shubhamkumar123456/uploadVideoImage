const Image = require('../models/ImageSchema')
require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD, 
    api_key:process.env.CLOUDINARY_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
});
console.log(process.env.CLOUDINARY_CLOUD)
const createImage = async(req,res)=>{
    // res.json({result:req.body.image})

    let image = req.body.image

    await cloudinary.uploader.upload(image,async(err,result)=>{
        if(err){
            console.log(err)
            res.json({err:err})
        }
        else{
            console.log(result)
            await Image.create({
                image:result.url
            })
            res.json({result:result.url,msg:result})
            
        }
    })


}
const updateImage = async(req,res)=>{
   
}
const deleteImage = async(req,res)=>{
   
}
const getSingleImage = async(req,res)=>{
   
}
const getAllImage = async(req,res)=>{
   
}

module.exports = {
    createImage,
    updateImage,
    deleteImage,
    getSingleImage,
    getAllImage
}