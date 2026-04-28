/* eslint-disable react-hooks/immutability */
"use client";

import {
  Center,
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import { BlendFunction, KernelSize } from "postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ─── Monogram "bp" lowercase ──────────────────────────────────────────────────

function Monogram({ reduced }: { reduced: boolean | null }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || reduced) return;
    // Subtle breathing rotation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <Float
      speed={reduced ? 0 : 1.0}
      rotationIntensity={reduced ? 0 : 0.06}
      floatIntensity={reduced ? 0 : 0.25}
    >
      <Center>
        <Text3D
          ref={meshRef}
          castShadow
          font="/fonts/helvetiker_bold.typeface.json"
          size={2.8}
          height={0.6}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.025}
          bevelOffset={0}
          bevelSegments={10}
          letterSpacing={-0.04}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          bp
          <meshPhysicalMaterial
            color={hovered ? "#FFFFFF" : "#F0EFE8"}
            metalness={0.75}
            roughness={0.08}
            clearcoat={0.8}
            clearcoatRoughness={0.05}
            envMapIntensity={2.5}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

// ─── Scene lights ─────────────────────────────────────────────────────────────

function Lights() {
  const rimRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (!rimRef.current) return;
    rimRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 0.7) * 0.4;
  });

  return (
    <>
      <ambientLight color="#0D1728" intensity={0.6} />
      {/* Key — cool white upper-left */}
      <directionalLight position={[-5, 7, 5]} color="#E8EFF8" intensity={4.0} castShadow />
      {/* Fill — warm right */}
      <directionalLight position={[5, 2, 3]} color="#D0DCF0" intensity={1.4} />
      {/* Rim — navy from behind, pulsing */}
      <pointLight ref={rimRef} position={[0, 1, -6]} color="#1B2A4E" intensity={2.0} />
      {/* Ground fill */}
      <pointLight position={[0, -5, 2]} color="#060A10" intensity={0.8} />
    </>
  );
}

// ─── Mouse parallax controller ────────────────────────────────────────────────

function MouseParallax({ reduced }: { reduced: boolean | null }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced]);

  useFrame(() => {
    if (reduced) return;
    target.current.x += (mouse.current.x * 0.8 - target.current.x) * 0.05;
    target.current.y += (mouse.current.y * 0.4 - target.current.y) * 0.05;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── FPS limiter ──────────────────────────────────────────────────────────────

function FpsLimiter({ fps }: { fps: number }) {
  const last = useRef(0);
  const interval = 1000 / fps;

  useFrame((_, delta) => {
    last.current += delta * 1000;
    if (last.current < interval) return;
    last.current = last.current % interval;
  });

  return null;
}

// ─── Reflective floor plane ───────────────────────────────────────────────────

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={15}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050508"
        metalness={0.6}
      />
    </mesh>
  );
}

// ─── Cinematic camera intro ───────────────────────────────────────────────────

function CameraIntro({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  const progress = useRef(0);
  const done = useRef(false);

  useEffect(() => {
    camera.position.set(0, 0, 18);
  }, [camera]);

  useFrame((_, delta) => {
    if (done.current) return;
    progress.current = Math.min(progress.current + delta * 0.38, 1);
    // ease-out-quart: 1 - (1-t)^4
    const t = 1 - Math.pow(1 - progress.current, 4);
    camera.position.z = 18 - (18 - 9) * t;
    if (progress.current >= 1) {
      done.current = true;
      onComplete();
    }
  });

  return null;
}

// ─── Atmospheric particles (80 tiny metallic spheres orbiting the monogram) ───

// Pre-generate random orbit data at module level so it is stable and pure.
const PARTICLE_COUNT = 80;
const PARTICLE_ORBITS = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  theta0: (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
  phi: Math.acos(2 * Math.random() - 1),
  speed: (0.06 + Math.random() * 0.12) * (Math.random() > 0.5 ? 1 : -1),
  radius: 3.2 + Math.random() * 2.0,
  yBias: (Math.random() - 0.5) * 0.6,
}));

function Particles({
  count = PARTICLE_COUNT,
  reduced,
}: {
  count?: number;
  reduced: boolean | null;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const orbits = useMemo(() => PARTICLE_ORBITS.slice(0, Math.min(count, PARTICLE_COUNT)), [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const o = orbits[i]!;
      const theta = o.theta0 + (reduced ? 0 : t * o.speed);
      const x = o.radius * Math.sin(o.phi) * Math.cos(theta);
      const y =
        o.radius * Math.cos(o.phi) * 0.45 + o.yBias + (reduced ? 0 : Math.sin(t * 0.3 + i) * 0.08);
      const z = o.radius * Math.sin(o.phi) * Math.sin(theta);
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = !reduced;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.022, 5, 5]} />
      <meshStandardMaterial
        color="#3A5280"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={3.0}
      />
    </instancedMesh>
  );
}

// ─── Canvas wrapper ───────────────────────────────────────────────────────────

export default function BpScene({ onIntroComplete }: { onIntroComplete?: () => void }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const reduced = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);

  function handleIntroComplete() {
    setIntroComplete(true);
    onIntroComplete?.();
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 42 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        alpha: false,
      }}
      shadows
      style={{ background: "#0A0A0B" }}
    >
      <FpsLimiter fps={isMobile ? 30 : 60} />
      <Environment preset="city" />
      <Lights />
      <Floor />
      <Monogram reduced={reduced} />
      <Particles reduced={reduced} />
      {!reduced && <CameraIntro onComplete={handleIntroComplete} />}
      <MouseParallax reduced={reduced} />
      <OrbitControls
        enabled={introComplete || !!reduced}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        dampingFactor={0.06}
        enableDamping
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.45}
          luminanceSmoothing={0.025}
          intensity={0.5}
          kernelSize={KernelSize.LARGE}
          blendFunction={BlendFunction.ADD}
        />
        <Vignette eskil={false} offset={0.15} darkness={0.65} />
      </EffectComposer>
    </Canvas>
  );
}
