import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks';

/** Central brand orb */
function BrandOrb({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  useFrame((_, delta) => {
    if (!meshRef.current || reduced) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += Math.sin(Date.now() * 0.0004) * delta * 0.06;
    meshRef.current.position.x +=
      (mouse.current.x * 0.4 - meshRef.current.position.x) * 0.04;
    meshRef.current.position.y +=
      (mouse.current.y * 0.3 - meshRef.current.position.y) * 0.04;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <icosahedronGeometry args={[1.4, 4]} />
      <MeshDistortMaterial
        color="#1a3a7a"
        envMapIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
        distort={0.25}
        speed={reduced ? 0 : 1.5}
        wireframe={false}
      />
    </mesh>
  );
}

/** Orbiting ring */
function OrbitRing({ radius, speed, axis, reduced }: {
  radius: number;
  speed: number;
  axis: [number, number, number];
  reduced: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.x += delta * speed * axis[0];
    ref.current.rotation.y += delta * speed * axis[1];
    ref.current.rotation.z += delta * speed * axis[2];
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0.3, 0]}>
      <torusGeometry args={[radius, 0.025, 16, 120]} />
      <meshStandardMaterial
        color="#2563eb"
        emissive="#2563eb"
        emissiveIntensity={0.4}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

/** Floating accent particles */
function Particles({ count = 60, reduced }: { count?: number; reduced: boolean }) {
  const mesh = useRef<THREE.Points>(null);
  const particleCount = reduced ? 20 : count;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 0.03 + 0.01;
    }
    return [pos, sz];
  }, [particleCount]);

  useFrame((state) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.06;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Floating wireframe cubes */
function FloatingCubes({ reduced }: { reduced: boolean }) {
  const cubes = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      scale: 0.08 + Math.random() * 0.12,
      speed: 0.2 + Math.random() * 0.4,
      phase: i * 1.2,
    })), []
  );

  return (
    <>
      {cubes.map((c, i) => (
        <FloatingCube key={i} {...c} reduced={reduced} />
      ))}
    </>
  );
}

function FloatingCube({ position, scale, speed, phase, reduced }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.25;
    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.006;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial
        color="#2563eb"
        emissive="#1d4ed8"
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.7}
        transparent
        opacity={0.55}
        wireframe
      />
    </mesh>
  );
}

/** Camera responds to mouse and scroll */
function CameraRig({ reduced }: { reduced: boolean }) {
  const mouse = useMousePosition();
  const { camera } = useThree();

  useFrame(() => {
    if (reduced) return;
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** The full hero 3D scene */
export default function HeroScene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <CameraRig reduced={reduced} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, 3, -2]} intensity={1.8} color="#2563eb" />
      <pointLight position={[4, -3, 2]} intensity={0.8} color="#7c3aed" />
      <spotLight
        position={[0, 6, 4]}
        intensity={2}
        angle={0.4}
        penumbra={0.8}
        color="#3b82f6"
        castShadow
      />

      {/* Main brand orb */}
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.5}
      >
        <BrandOrb reduced={reduced} />
      </Float>

      {/* Orbit rings */}
      <OrbitRing radius={2.1} speed={0.3} axis={[0.2, 1, 0.1]} reduced={reduced} />
      <OrbitRing radius={2.6} speed={-0.2} axis={[0.5, 0.3, 1]} reduced={reduced} />

      {/* Particles */}
      <Particles count={80} reduced={reduced} />

      {/* Floating cubes */}
      {!reduced && <FloatingCubes reduced={reduced} />}

      {/* Background stars */}
      <Stars
        radius={20}
        depth={50}
        count={reduced ? 500 : 2000}
        factor={3}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.5}
      />
    </>
  );
}
