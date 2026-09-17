import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { useRef } from "react";

function ProjectHologram() {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += 0.0025;
    group.current.position.y =
      -0.4 + Math.sin(Date.now() * 0.0015) * 0.18;
  });

  return (
    <group ref={group} position={[-3.8, 0, 0]}>
      <mesh>
        <boxGeometry args={[2.2, 1.4, 0.12]} />
        <meshStandardMaterial
          color="#22ff88"
          emissive="#22ff88"
          emissiveIntensity={1.8}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>

      <mesh position={[0, -1.05, 0]}>
        <torusGeometry args={[1.5, 0.025, 16, 120]} />
        <meshStandardMaterial
          color="#22ff88"
          emissive="#22ff88"
          emissiveIntensity={2}
        />
      </mesh>

      <Float speed={2} floatIntensity={1}>
        <mesh position={[1.7, 1.2, 0]}>
          <boxGeometry args={[0.45, 0.45, 0.45]} />
          <meshStandardMaterial
            color="#00d9ff"
            emissive="#00d9ff"
            emissiveIntensity={2}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={2.5} floatIntensity={1.5}>
        <mesh position={[-1.8, -1.1, 0]}>
          <icosahedronGeometry args={[0.35, 1]} />
          <meshStandardMaterial
            color="#22ff88"
            emissive="#22ff88"
            emissiveIntensity={2}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Projects3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 4, 5]} intensity={10} color="#22ff88" />
        <pointLight position={[-4, -3, 3]} intensity={5} color="#00d9ff" />

        <fog attach="fog" args={["#020617", 7, 20]} />

        <ProjectHologram />

        <Stars
          radius={120}
          depth={60}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={0.7}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}