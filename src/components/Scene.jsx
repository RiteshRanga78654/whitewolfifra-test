'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Text, Environment, ContactShadows, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const sphere = useRef();
  const ring = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ring.current.rotation.x = Math.sin(t / 4) * Math.PI;
    ring.current.rotation.y = Math.sin(t / 4) * Math.PI;
    
    // Slight pulsating effect on the sphere
    sphere.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
  });

  return (
    <>
      <color attach="background" args={['#050505']} />
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <spotLight position={[0, -10, 10]} intensity={2} color="#ffffff" />
      
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
        </group>
      </Environment>

      {/* Main 3D Composition */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={sphere} position={[2, 0, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color="#ffffff"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={ring} position={[-2, 1, -2]}>
          <torusGeometry args={[1.2, 0.2, 32, 100]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[4, -2, -3]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#666666" wireframe />
        </mesh>
      </Float>

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={2} far={4} />
      
      {/* Background typographic elements or faint 3D text could go here */}
    </>
  );
}
