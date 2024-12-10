import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const FloatingScene = () => {
  return (
    <div className="w-full h-screen">
      <Canvas>
        {/* Controls for rotation */}
        <OrbitControls enableZoom={false} />

        {/* Light sources */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Circle large */}
        <mesh position={[0, -1, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="#1E40AF" />
        </mesh>

        {/* Small circles */}
        <mesh position={[-2, 0, -2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#1D4ED8" />
        </mesh>
        <mesh position={[2, 0, 2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#2563EB" />
        </mesh>
        <mesh position={[0, 1, -3]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>

        {/* Floating box */}
        <mesh position={[0, 3, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#F59E0B" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default FloatingScene;