import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [info, setInfo] = useState(null)
    const [photos, setPhotos] = useState([])

    const API_KEY = import.meta.env.VITE_API_KEY
    
    const getData = async () => {
        try {
            const { data } = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
            setInfo(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const filterCamera = (camera) => {
        const filterphoto = info.photos.filter(photo => photo.camera.name === camera)
        setPhotos(filterphoto)
    }

    const cameras = ["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "RHAZ"]
    
  return (
    <div>
        {cameras.map(item => (
            <button key={item} onClick={() => filterCamera(item)}>{item}</button>
        ))}
        <button onClick={() => setPhotos(info.photos)}>ALL</button>
        {photos.map(item => (
            <div key={item.id} >
                <img src={item.img_src} alt={item.id} width={150} height={100} />
            </div>
        ))}
    </div>
  )
}

export default Home