import React from 'react';
import logo from './logo.svg';
// import './App.css';
import PersistentDrawerLeft from './Sidebar';

function Home() {
  return (
    <>
    <div style={{display:'flex'}}>
    <div>
        {/* <h1>logo</h1> */}
    </div>
    <PersistentDrawerLeft />
    </div>
    
    
    </>
    
  );
}

export default Home
