import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader, Canvas } from "react-three-fiber"
import * as THREE from 'three';
import { Html } from 'drei';
import './App.css'
import AmericanFlag from './assets/americanflag.png'

function Decorator() {
  
    const [leftBar, updateLeftBar] = useState(-20);
    const [rightBar, updateRightBar] = useState(20);
    const [displayWidth, updateDisplayWidth] = useState(50);
    const openDisplay = useRef(false);
    const displayOpen = useRef(false);
    const isDisplayShowing = useRef(false);
    const isClosing = useRef(false);
    const disappear = useRef(false);
    const finalWidth = 400
    const [barStatus, updateBarStatus] = useState(300);
    const isAnimationOver = useRef(false);

  
    useFrame(() => {
      if (disappear.current == true) {
        isAnimationOver.current = true;
      }
      if (displayOpen.current == false) {
        updateBarStatus(barStatus-20);
        if (barStatus <= 0 && isClosing.current == false) {
          isDisplayShowing.current = true;
          displayOpen.current = true;
        }
        if (barStatus <= 0 && isClosing.current == true) {
          disappear.current = true;
        }
      }
      if (displayOpen.current == true && barStatus < 300) {
        updateBarStatus(barStatus+20)
      }

      if (displayOpen.current == true && barStatus == 300) {

        setTimeout(() => {displayOpen.current = false; isClosing.current = true}, 5000)
      }
      if (openDisplay.current == false) {
        if (leftBar +.1 <= 0 && rightBar -.1 >= 0) {
          updateLeftBar(leftBar + .3);
          updateRightBar(rightBar - .3);
        }
        else {
          openDisplay.current = true;
        }
      }

      else {
        if (leftBar - .1 >= -20 && rightBar + .1 <= 20) {
          updateLeftBar(leftBar - 1);
          updateRightBar(rightBar + 1);
        }
      }
    })


    function getDisplay() {
      if (isDisplayShowing.current == true && isAnimationOver.current == false) {
        return 'block'
      }
      return 'none'
    }

    function getBars() {
      if (isAnimationOver.current == false) {
        return 'block'
      }
      else {
        return 'none'
      }
    }

    return (
        <Suspense fallback={null}>
          <Html style={{marginTop:'300px'}}>
          <div className="displayBackground" id="display" style={{width:`${barStatus * 2 -15}px`, marginLeft:`-${barStatus -15}px`, position:'relative', display:`${getDisplay()}`}}>
            <div style={{position:'absolute', overflow:'hidden', width:`${barStatus * 2 -15}px`}}>
              <span><img src={AmericanFlag} className="flag" style={{width:'40px'}}></img></span>
              <hr style={{marginTop:'30px'}}></hr>
              <span><h1 className="name">ORSON WELLES</h1></span>
              <p className="credentials">Voted the greatest film director of all-time by the British Film Institute</p>
            </div>
            <div style={{position:'absolute', overflow:'hidden', width:`${barStatus * 2 -15}px`}}>
              <hr style={{width:'500px'}}></hr>
            </div>
          </div>
        </Html>
        <Html class="rightBar" style={{display:`${getBars()}`, marginTop:'300px'}}>
          <div className="bar leftBar" id="leftBar" style={{ width: '15px', marginLeft:`-${barStatus}px`, zIndex:2 }}></div>
        </Html>
        <Html style={{display:`${getBars()}`, marginTop:'300px'}}>
          <div className="bar rightBar" id="rightBar" style={{ width: '15px', marginLeft:`${barStatus}px`, zIndex:2 }}></div>
        </Html>
      </Suspense>
    );
  }
  
export default Decorator;