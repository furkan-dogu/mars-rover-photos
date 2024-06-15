import React from 'react'

const Button = ({ setFilteredData, info }) => {

  const filterCamera = (camera) => {
    if(camera === "ALL") {
      setFilteredData(info)
    } else {
      setFilteredData(info.filter(photo => photo.camera.name === camera))
    }
  }

  const cameras = ["ALL", "FHAZ", "NAVCAM", "MAST", "CHEMCAM", "RHAZ"]

  return (
    <>
      {cameras.map(item => (
        <button key={item} onClick={() => filterCamera(item)}>{item}</button>
      ))}
    </>
  )
}

export default Button