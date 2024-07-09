import pm_img from "../assets/pm.png";
import pm_cr_img from "../assets/pm-cr.png";
import eyes from "../assets/eyes.png";
import lefteyebrow from "../assets/left-eyebrow.png";
import righteyebrow from "../assets/right-eyebrow.png";
import React, { useState, useEffect } from "react";

const ParkingMeter = ({ buttonPressed, cardInserted }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [animateCard, setAnimateCard] = useState(false);

    useEffect(() => {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    const calcTranslation = (pos) => {
      const maxTranslation = 10; 
      const elementCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const deltaX = ((pos.x - elementCenter.x) / elementCenter.x) * maxTranslation;
      const deltaY = ((pos.y - elementCenter.y) / elementCenter.y) * maxTranslation;
      return { x: deltaX, y: deltaY };
    };

    const getLeftEyebrowClass = () => {
      switch (buttonPressed) {
        case 'okay':
          return 'left-eyebrow-okay-animate';
        case 'cancel':
          return 'left-eyebrow-cancel-animate';
        case 'increaseTime':
          return 'left-eyebrow-increase-time-animate';
          case 'decreaseTime':
            return 'left-eyebrow-decrease-time-animate';
        default:
          return '';
      }
    };
  
    const getRightEyebrowClass = () => {
      switch (buttonPressed) {
        case 'okay':
          return 'right-eyebrow-okay-animate';
        case 'cancel':
          return 'right-eyebrow-cancel-animate';
        case 'increaseTime':
          return 'right-eyebrow-increase-time-animate';
          case 'decreaseTime':
            return 'right-eyebrow-decrease-time-animate';
        default:
          return '';
      }
    };
  
    const leftEyebrowClass = getLeftEyebrowClass();
    const rightEyebrowClass = getRightEyebrowClass();
    const translation = calcTranslation(mousePosition);

    return (
      <div className='pm-wrapper'>
        <div className="eyebrows-wrapper">
          <img 
            src={lefteyebrow} 
            alt="Left Eyebrow"
            className={leftEyebrowClass}
          />
          <img 
            src={righteyebrow} 
            alt="Right Eyebrow" 
            className={rightEyebrowClass}
          />
        </div>
        <img
          className="eyes-wrapper"
          src={eyes}
          alt="Eyes"
          style={{
            transform: `translate(${translation.x}px, ${translation.y}px)`,
          }}
        />
        {!cardInserted ? (
          <img className="pm-img" src={pm_img} alt="Parking Meter" />
        ) : (
          <img className="pm-img" src={pm_cr_img} alt="Parking Meter With Credit Card Inserted" />
        )}
      </div>
    );
  }
  
  export default ParkingMeter;