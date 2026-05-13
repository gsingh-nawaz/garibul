import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a lattice of nodes and edges
  const { positions, lines } = useMemo(() => {
    const numNodes = 100;
    const positions = new Float32Array(numNodes * 3);
    const nodes: THREE.Vector3[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      nodes.push(pos);
      pos.toArray(positions, i * 3);
    }
    
    const lines: number[] = [];
    // Connect close nodes
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 4) {
          lines.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    
    return { positions, lines: new Float32Array(lines) };
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(lines, 3));
    return geo;
  }, [lines]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.rotation.x = time * 0.025;
    
    // React to mouse
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, (state.mouse.x * 2), 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, (state.mouse.y * 2), 0.05);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#0066FF" transparent opacity={0.8} />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00FF41" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}
