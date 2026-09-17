import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

function AboutModel() {
  const group = useRef();
  const { scene } = useGLTF("/src/assets/about-3d.glb");

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += 0.08;
    group.current.rotation.z += 0.008;
    group.current.position.y = -2.2 + Math.sin(Date.now() * 0.0015) * 0.3;
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.2}
      position={[-3.8, 0, 0]}
      rotation={[0.5, 0, 0]}
    />
  );
}

export default function About3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.9} />

        <pointLight position={[4, 4, 5]} intensity={10} color="#22ff88" />
        <pointLight position={[-4, -3, 3]} intensity={5} color="#00d9ff" />
        <pointLight position={[-1.8, 0, 2]} intensity={14} color="#22ff88" />

        <spotLight
          position={[0, 6, 5]}
          angle={0.45}
          penumbra={1}
          intensity={7}
          color="#22ff88"
        />

        <fog attach="fog" args={["#020617", 7, 20]} />

        <Suspense fallback={null}>
          <AboutModel />
        </Suspense>

        <Stars
          radius={120}
          depth={60}
          count={1800}
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

useGLTF.preload("/src/assets/about-3d.glb");