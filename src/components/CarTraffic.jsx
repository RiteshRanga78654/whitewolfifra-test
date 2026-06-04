'use client';

import React, { useEffect, useState, useRef } from 'react';
import { CarSprite, CAR_VARIANTS } from './CarSprite';

export const CarTraffic = ({ pathId = 'path-b-36', numCars = 6, speed = 1.5 }) => {
  const [cars, setCars] = useState([]);
  const requestRef = useRef();

  useEffect(() => {
    const pathEl = document.getElementById(pathId);
    if (!pathEl) {
      // Retry if SVG isn't in DOM yet
      const timer = setTimeout(() => setCars([...cars]), 500);
      return () => clearTimeout(timer);
    }

    const pathLength = pathEl.getTotalLength();
    if (pathLength === 0) return;

    // Initialize cars evenly spaced
    const initialCars = Array.from({ length: numCars }).map((_, i) => ({
      id: i,
      progress: (i / numCars) * pathLength,
      variant: CAR_VARIANTS[i % CAR_VARIANTS.length]
    }));

    const carsRef = { current: initialCars };

    const animate = () => {
      carsRef.current = carsRef.current.map(car => {
        let newProgress = car.progress + speed;
        if (newProgress >= pathLength) {
          newProgress -= pathLength;
        }
        return { ...car, progress: newProgress };
      });

      const newRenderData = carsRef.current.map(car => {
        const p1 = pathEl.getPointAtLength(car.progress);
        
        // Sample slightly ahead for rotation angle
        let sampleProgress = car.progress + 5;
        if (sampleProgress >= pathLength) sampleProgress -= pathLength;
        const p2 = pathEl.getPointAtLength(sampleProgress);

        let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        return {
          id: car.id,
          x: p1.x,
          y: p1.y,
          angle,
          variant: car.variant
        };
      });

      setCars(newRenderData);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [pathId, numCars, speed]);

  if (cars.length === 0) return null;

  return (
    <g className="pointer-events-none z-20">
      {cars.map(car => (
        <g 
          key={`car-${car.id}`} 
          transform={`translate(${car.x}, ${car.y}) rotate(${car.angle})`}
        >
          <CarSprite variant={car.variant} width={70} />
        </g>
      ))}
    </g>
  );
};
