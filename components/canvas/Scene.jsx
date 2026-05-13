"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

function Blob() {
  const mesh = useRef();
  useFrame((state) => {
    const { clock, mouse } = state;
    mesh.current.rotation.x = mouse.y * 0.5;
    mesh.current.rotation.y = mouse.x * 0.5;
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#111"
          speed={3}
          distort={0.4}
          radius={1}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#FF0000" intensity={2} />
        <Blob />
      </Canvas>
    </div>
  );
}
