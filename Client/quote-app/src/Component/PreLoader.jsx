import React, { useEffect } from 'react'
import './preloader.css'
import { preLoaderAnim } from '../animations/index'
const PreLoader = () => {

    useEffect(()=>{
        preLoaderAnim()   
    },[])
  return (
    <div className="preloader">
        <div className="texts-container">
            <span>Developer,</span>
            <span>Curator,</span>
            <span>Vibe</span>
        </div>
    </div>
  )
}

export default PreLoader