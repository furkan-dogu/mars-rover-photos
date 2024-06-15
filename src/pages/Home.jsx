import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from "../assets/loading.gif"
import Card from "../components/Card"
import Button from '../components/Button'

const Home = () => {
    const [info, setInfo] = useState(null)
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [cameraName, setCameraName] = useState("ALL")

    const API_KEY = import.meta.env.VITE_API_KEY
    
    const getData = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`)
            setInfo(data.photos)
            setFilteredData(data.photos)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (loading) {
        return <img src={Loading} alt="Loading..." className='loading' />
    } else {
        return (
            <div className='screen'>
                <h1 className='title'>Mars Rover Photos</h1>
                <h3 className='cameras'>Cameras</h3>
                <div className='buttons'>
                    <Button setFilteredData={setFilteredData} info={info} setCameraName={setCameraName} />
                </div>
                <h3 className='photos'>{cameraName} PHOTOS</h3>
                <div className='cards'>               
                    <Card filteredData={filteredData} />               
                </div>
            </div>
        )
    }
}

export default Home