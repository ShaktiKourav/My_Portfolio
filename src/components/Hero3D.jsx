import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

function HeroModel() {
  const group = useRef();
  const { scene } = useGLTF("/src/assets/hero-3d.glb");

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += 0.04;
    group.current.rotation.z += 0.04;
    group.current.position.y = Math.sin(Date.now() * 0.0012) * 0.5;
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.9}
      position={[4.0,-0.1, 0]}
      rotation={[0.12, 0, 0]}
    />
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.9} />

        <pointLight position={[4, 4, 5]} intensity={12} color="#22ff88" />
        <pointLight position={[-4, -3, 3]} intensity={5} color="#00d9ff" />
        <pointLight position={[1.7, 0, 2]} intensity={15} color="#22ff88" />

        <spotLight
          position={[0, 6, 5]}
          angle={0.45}
          penumbra={1}
          intensity={8}
          color="#22ff88"
        />

        <fog attach="fog" args={["#020617", 7, 20]} />

        <Suspense fallback={null}>
          <HeroModel />
        </Suspense>

        <Stars
          radius={120}
          depth={60}
          count={2200}
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

useGLTF.preload("/src/assets/hero-3d.glb");