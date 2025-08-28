'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PETAL_TYPES } from '@/constants/wedding';

interface Petal {
  id: string;
  x: number;
  y: number;
  rotation: number;
  type: string;
  color: string;
  size: number;
  swayAmplitude: number;
  swayDirection: number;
}

const IndianWeddingFlowerShower = () => {
  const [isClient, setIsClient] = useState(false);
  const [showPetals, setShowPetals] = useState(true);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Stop creating new petals after 6 seconds
    const timer = setTimeout(() => {
      setShowPetals(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showPetals || !isClient) return;

    const createPetal = () => {
      // Select flower type based on weight
      const rand = Math.random() * 100;
      let selectedFlower;
      if (rand < 40) selectedFlower = PETAL_TYPES[0]; // white
      else if (rand < 70) selectedFlower = PETAL_TYPES[1]; // pink  
      else selectedFlower = PETAL_TYPES[2]; // red

      const color = selectedFlower.colors[Math.floor(Math.random() * selectedFlower.colors.length)];
      const isSmall = Math.random() > 0.7;
      
      const swayAmplitude = 15 + Math.random() * 25; // Gentler sway (15-40px)
      const swayDirection = Math.random() > 0.5 ? 1 : -1; // Random initial direction
      
      const newPetal: Petal = {
        id: `petal-${Date.now()}-${Math.random()}`,
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        type: selectedFlower.type,
        color: color,
        size: isSmall ? 0.6 : 1,
        swayAmplitude,
        swayDirection
      };

      setPetals(prev => [...prev, newPetal]);
    };

    // Extra intense shower - create petals every 12.5ms for first 2 seconds, then every 25ms
    const interval1 = setInterval(createPetal, 12.5);
    
    setTimeout(() => {
      clearInterval(interval1);
      const interval2 = setInterval(createPetal, 25);
      
      setTimeout(() => {
        clearInterval(interval2);
      }, 3000);
    }, 2000);

    return () => {
      clearInterval(interval1);
    };
  }, [showPetals, isClient]);

  const handlePetalComplete = (petalId: string) => {
    setPetals(prev => prev.filter(p => p.id !== petalId));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            x: petal.x, 
            y: petal.y, 
            rotate: petal.rotation,
            scale: petal.size,
            opacity: 0
          }}
          animate={{ 
            x: petal.x + petal.swayDirection * petal.swayAmplitude,
            y: window.innerHeight + 50,
            rotate: petal.rotation + 720, // Two full rotations
            opacity: [0, 0.9, 0.9, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 4, // 4-7 seconds for gentle fall
            ease: "linear",
            x: {
              type: "spring",
              damping: 2,
              stiffness: 20,
              mass: 2
            },
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: Math.random() * 3 + 4
            }
          }}
          onAnimationComplete={() => handlePetalComplete(petal.id)}
          className="absolute"
          style={{
            width: 10,
            height: 14,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            backgroundColor: petal.color,
            boxShadow: petal.type === 'white' 
              ? '0 2px 4px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.8)'
              : petal.type === 'pink'
              ? '0 2px 4px rgba(255, 105, 180, 0.4)'
              : '0 2px 4px rgba(220, 20, 60, 0.4)'
          }}
        />
      ))}
    </div>
  );
};

export default IndianWeddingFlowerShower;