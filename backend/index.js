const express = require('express')
const app = express()
const port = 8080;
const cors = require('cors')

let Video = require('./models/VideoSchema')

let imageRouter = require('./routes/imageRoutes')
const multer  = require('multer')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD, 
    api_key:process.env.CLOUDINARY_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET // Click 'View Credentials' below to copy your API secret
});

// configure multer to save uload file to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname)
  }
})

let upload = multer({storage})

const connectToDB = require('./db')
connectToDB()
// console.log(connection)
app.use(express.json({limit:'50mb'}))
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/uploadVideo',upload.single('video'),async(req,res)=>{
  console.log(req.file)
  // res.json({result:req.file})
  
  try {
    await cloudinary.uploader.upload(req.file.path,{
      resource_type:'video',
      folder:"upload",
   
    }, async(err,result)=>{
      if(err){
          console.log(err)
         return res.json({err:err})
      }
      else{
          console.log(result)
          await Video.create({
            video:result.secure_url
          })
           return res.json({result:result.secure_url,msg:"video uploaded sucessfullyu"})
        //  return res.json(result.secure_url
        //  )
          // await Image.create({
          //     image:result.url
          // })
          // res.json({result:result.url,msg:result})
          
      }
  })
  } catch (error) {
      res.json({error:error})
  }  

})


app.use('/api/images',imageRouter)



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})