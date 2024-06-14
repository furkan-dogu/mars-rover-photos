import { useEffect, useState, Suspense, lazy } from 'react'
import axios from 'axios'
import Loading from "../assets/loading.gif"

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

    const Card = lazy(() => import("../components/Card"))

    return (
        <div className='screen'>
            <h1 className='title'>Mars Rover Photos</h1>
            <h3 className='cameras'>Cameras</h3>
            <div className='buttons'>
                <button onClick={() => setPhotosData(info.photos)}>ALL</button>
                {cameras.map(item => (
                    <button key={item} onClick={() => filterCamera(item)}>{item}</button>
                ))}
            </div>
            {photosData.length ? <h3 className='photos'>Photos ({photosData.length} Pieces)</h3> : null}
            <div className='cards'>
                <Suspense fallback={<img src={Loading} alt="Loading..." className='loading' />}>
                    <Card photosData={photosData} />
                </Suspense>
            </div>
        </div>
    )
}

export default Home