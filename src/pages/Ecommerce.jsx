import React from 'react';
import Lottie from 'lottie-react';
import animationData from 'C:/Users/kishore/Music/project_syncfusion_dashboard-main/src/Assets/Animation - 1726683683292.json'; // Adjust the path to your Lottie file
import "./Home.css"
const Ecommerce = () => {
  return (
    <div className='home'>
      <div className='home1'>
        <h3 className='home2'>Hii,</h3>
        <div className='home4'>
          <p className='home3'>This is Node-Nexus</p>
          <Lottie animationData={animationData} loop={true} className='homeani' autoplay={true} />
        </div>
      </div>
    </div>
  );
}

export default Ecommerce;
