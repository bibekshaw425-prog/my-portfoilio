import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 100, 200]} scale={2}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>
      <OrbitControls enableZoom={false} />
    </>
  );
};

export const Showcase3D = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Interactive 3D</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            I specialize in creating interactive 3D experiences for the web. 
            From custom shaders to complex physics simulations, I bring 
            your digital products to life with depth and interactivity.
          </p>
          <div className="flex gap-4">
            <div className="glass px-6 py-4 rounded-2xl border-white/5">
              <p className="font-bold">React Three Fiber</p>
              <p className="text-sm text-muted-foreground">Modern 3D Web</p>
            </div>
            <div className="glass px-6 py-4 rounded-2xl border-white/5">
              <p className="font-bold">Three.js</p>
              <p className="text-sm text-muted-foreground">Core 3D Engine</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-[400px] md:h-[600px] w-full relative cursor-grab active:cursor-grabbing"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Scene />
          </Canvas>
          <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] opacity-30 pointer-events-none">
            Interact to Rotate
          </div>
        </motion.div>
      </div>
    </section>
  );
};
