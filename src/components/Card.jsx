import React from "react";

const Card = ({ filteredData }) => {
    return (
        <>
            {filteredData.map((item) => (
                <div key={item.id} className="card">
                    <img src={item.img_src} alt={item.id} />
                    <p>Date: {item.earth_date}</p>
                    <p>Camera: {item.camera.full_name}</p>
                </div>
            ))}
        </>
    );
};

export default Card;
