"use client";

import { Center, Text3D } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function MonogramMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const { gl } = useThree();
  const reduced = useReducedMotion();

  useFrame(() => {
    if (!groupRef.current) return;

    if (!reduced) {
      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = ((window._bpMouseX ?? cx) - cx) / (rect.width / 2);
      const dy = ((window._bpMouseY ?? cy) - cy) / (rect.height / 2);

      targetRot.current.y = dx * 0.26; // ±15°
      targetRot.current.x = -dy * 0.18;
    }

    groupRef.current.rotation.y += (targetRot.current.y - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (targetRot.current.x - groupRef.current.rotation.x) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={3.5}
          height={1.4}
          bevelEnabled
          bevelThickness={0.12}
          bevelSize={0.04}
          bevelSegments={6}
        >
          BP
          <meshPhysicalMaterial
            color="#F5F5F2"
            roughness={0.3}
            metalness={0.6}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}

export function MonogramBP({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ fov: 35, position: [0, 0, 18] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 10]} intensity={1.8} />
        <directionalLight position={[-4, -2, -6]} intensity={0.3} color="#1B2A4E" />
        <MonogramMesh />
      </Canvas>
    </div>
  );
}

// Global mouse tracking (set by HeroSection)
declare global {
  interface Window {
    _bpMouseX?: number;
    _bpMouseY?: number;
  }
}
