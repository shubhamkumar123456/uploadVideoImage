import React, { useState } from 'react'

const ImageUpload = () => {
    const [image, setimage] = useState("");

    const handleInputChange = (e)=>{
        let originalImage = e.target.files[0];
        console.log(originalImage)

        let reader = new FileReader();
        reader.readAsDataURL(originalImage);
        reader.onload = ()=>{
            // console.log(reader.result)
            setimage(reader.result)
        }
        reader.onerror=()=>{
            console.log(reader.error)
        }
        
    }
    const handleSubmit =async()=>{
  if(image){
    let res =  await fetch('http://localhost:8080/api/images/create',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        image:image
      })
    })
    let data = await res.json();
    console.log(data)
  }
        
    }
  return (
    <div>
        <label htmlFor="img">Upload Image</label>
      <input onChange={handleInputChange} type="file" id='img' hidden/>

        <img src="" alt="" />
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default ImageUpload
