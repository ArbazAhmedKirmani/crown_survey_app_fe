import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const FloorPlan = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls />
        {/* Example room */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial color="lightgray" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default FloorPlan;
