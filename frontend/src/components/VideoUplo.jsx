import React, { useState } from 'react'

const VideoUplo = () => {

    const [videoUrl, setvideoUrl] = useState("");
    console.log(videoUrl)

    const handleInputChange = (e)=>{
        let videoValue = e.target.files[0]
        console.log(videoValue)
        setvideoUrl(videoValue)
    }

    const handleSubmit = async()=>{

        console.log('submit')
        let formData = new FormData()
        formData.append('video',videoUrl);

        let res = await fetch('http://localhost:8080/uploadVideo',{
            method:"POST",
            body:formData
        })
        let data = await res.json();
        console.log(data)

        // console.log(formData.get('video'))

       
    }
  return (
    <div>
      <label htmlFor="video">Upload video</label>
      <input onChange={handleInputChange} type="file" id='video' hidden/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default VideoUplo
