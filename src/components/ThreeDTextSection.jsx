'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Float, Environment, PresentationControls, ContactShadows } from '@react-three/drei';

function FloatingText({ text, position, fontSize = 0.5, color = "#1a1a1a" }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        position={position}
        fontSize={fontSize}
        color={color}
        anchorX="left"
        anchorY="middle"
        maxWidth={20}
      >
        {text}
        <meshStandardMaterial metalness={0.8} roughness={0.1} color={color} />
      </Text>
    </Float>
  );
}

export default function ThreeDTextSection() {
  return (
    <div className="w-full h-[350px] md:h-[450px] cursor-grab active:cursor-grabbing relative z-10 -ml-4 md:-ml-8">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <group position={[-2, 0, 0]}>
            <FloatingText 
              text="CRAFTING" 
              position={[0, 1.2, 0]} 
              fontSize={0.5} 
              color="#1a1a1a"
            />
            <FloatingText 
              text="ARCHITECTURAL" 
              position={[0, 0.1, 0.5]} 
              fontSize={0.7} 
              color="#293659"
            />
            <FloatingText 
              text="MASTERPIECES." 
              position={[0, -1, 0]} 
              fontSize={0.5} 
              color="#1a1a1a"
            />
          </group>
        </PresentationControls>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
