import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [info, setInfo] = useState(null)
    const [photosData, setPhotosData] = useState([])

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
        setPhotosData(filterphoto)
    }

    const cameras = ["FHAZ", "NAVCAM", "MAST", "CHEMCAM", "RHAZ"]

    return (
        <div className='screen'>
            <h1>Mars Rover Photos</h1>
            <h3>Cameras</h3>
            <div className='buttons'>
                <button onClick={() => setPhotosData(info.photos)}>ALL</button>
                {cameras.map(item => (
                    <button key={item} onClick={() => filterCamera(item)}>{item}</button>
                ))}
            </div>
            {photosData.length && <h3>Photos</h3>}
            <div className='cards'>
                {photosData.map(item => (
                    <div key={item.id} className='card'>
                        <img src={item.img_src} alt={item.id} />
                        <p>Date: {item.earth_date}</p>
                        <p>Camera: {item.camera.full_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home