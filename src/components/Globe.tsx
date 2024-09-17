import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Mesh, SphereGeometry, MeshStandardMaterial, TextureLoader} from "three";
import { useRef, useState } from "react";
import { OBJLoader } from "three-stdlib";

function Earth() {
  const earthRef = useRef<Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  const earthTexture = new TextureLoader().load(
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Earth_from_Space.jpg"
  );

  const loader = new OBJLoader();
  const [earthModel] = useState(() =>
    loader.loadAsync("/components/models/earth.obj")
);

  return (
    <mesh ref={earthRef} rotation={[0, 0, 0]}>
      <primitive object={earthModel} />
      <meshStandardMaterial
        roughness={0.5}
        metalness={0.5}
        transparent
        side={Mesh.DoubleSide}
        map={earthTexture}
      />
    </mesh>
  );
}

function Globe() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Stars radius={100} depth={50} count={5000} factor={4} />

      <Earth />

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

export default Globe;

