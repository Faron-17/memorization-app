'use client'

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Confetti from 'react-confetti'

const ConfettiComponent = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showConfetti && 
        <Confetti
          gravity={0.9}
          numberOfPieces={100}
          style={{ width: '100%', height: 'auto', zIndex: '10' }}
        />
      }
    </>
  )
}

export default ConfettiComponent