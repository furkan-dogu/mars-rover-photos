import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [info, setInfo] = useState(null)

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

    console.log(info);
    
  return (
    <div>Home</div>
  )
}

export default Home