import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";

function TechOrb() {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += 0.003;
    group.current.rotation.x += 0.001;

    group.current.position.y =
      -0.5 + Math.sin(Date.now() * 0.0015) * 0.15;
  });

  return (
    <group ref={group} position={[3.8, 0, 0]}>
      {/* Core */}
      <mesh>
        <icosahedronGeometry args={[1.4, 2]} />
        <meshStandardMaterial
          color="#22ff88"
          emissive="#22ff88"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>

      {/* Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#22ff88"
          emissive="#22ff88"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.7, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

export default function Skills3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />

        <pointLight
          position={[4, 4, 5]}
          intensity={10}
          color="#22ff88"
        />

        <pointLight
          position={[-4, -3, 3]}
          intensity={5}
          color="#00d9ff"
        />

        <fog attach="fog" args={["#020617", 7, 20]} />

        <TechOrb />

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