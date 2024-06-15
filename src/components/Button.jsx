import React from 'react'

const Button = ({ setFilteredData, info, setCameraName }) => {

  const filterCamera = (camera) => {
    if(camera === "ALL") {
      setFilteredData(info)
    } else {
      setFilteredData(info.filter(photo => photo.camera.name === camera))
    }
  }

  const cameras = ["ALL", "FHAZ", "NAVCAM", "MAST", "CHEMCAM", "RHAZ"]

  const handleClick = (item) => {
    filterCamera(item)
    setCameraName(item)
  }

  return (
    <>
      {cameras.map(item => (
        <button key={item} onClick={() => handleClick(item)}>{item}</button>
      ))}
    </>
  )
}

export default Button