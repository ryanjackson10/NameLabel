import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader, Canvas } from "react-three-fiber"
import * as THREE from 'three';
import Decorator from './Decorator'
import './App.css'


function App() {

  return (
      <Canvas id="canvas" style={{height:'100vh'}}>
        <Suspense fallback={null}>
          <Decorator />
        </Suspense>
      </Canvas>
  );
}

export default App;
