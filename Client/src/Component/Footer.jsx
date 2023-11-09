import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return(
        <>
  <footer className="py-1 my-4" style={{bottom: 0, zIndex: 100 }}>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3" style={{color:'whitesmoke'}}>
      <li className="nav-item" style={{color:'white'}}><Link to={"/home"} className="nav-link px-2" style={{color:'white'}}>Home</Link></li>
      <li className="nav-item" style={{color:'whitesmoke'}}><Link to={""} className="nav-link px-2">Gallery</Link></li>
      <li className="nav-item" style={{color:'whitesmoke'}}><Link to={""} className="nav-link px-2">Features</Link></li>
      <li className="nav-item" style={{color:'whitesmoke'}}><Link to={""} className="nav-link px-2">FAQs</Link></li>
      <li className="nav-item" style={{color:'whitesmoke'}}><Link to={""} className="nav-link px-2">About</Link></li>
    </ul>
    <p className="text-center " style={{color:'whitesmoke'}}>&copy; 2023 Quote's Mania, Inc</p>
  </footer>
    </>
    );
}