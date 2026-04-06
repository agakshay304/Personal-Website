import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const techLabels = [
  "Java",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "AWS",
  "Flutter",
  "Grafana",
];

const sphereGeometry = new THREE.SphereGeometry(1, 36, 36);

const createBadgeTexture = (label: string, accent: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, "#0f1d35");
  gradient.addColorStop(1, "#08111f");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);
  context.strokeStyle = accent;
  context.lineWidth = 12;
  context.strokeRect(24, 24, 464, 464);
  context.fillStyle = "#f4efe6";
  context.font = "700 72px Space Grotesk";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, 256, 256, 380);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const Orb = ({
  label,
  accent,
  scale,
  position,
  speed,
  offset,
}: {
  label: string;
  accent: string;
  scale: number;
  position: [number, number, number];
  speed: number;
  offset: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: createBadgeTexture(label, accent),
        roughness: 0.9,
        metalness: 0.2,
        clearcoat: 0.2,
      }),
    [accent, label]
  );

  useFrame(({ clock, pointer }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const time = clock.elapsedTime * speed + offset;
    const baseX = position[0] + Math.sin(time) * 1.8 + pointer.x * 1.4;
    const baseY = position[1] + Math.cos(time * 1.2) * 1.1 + pointer.y * 0.8;
    const baseZ = position[2] + Math.sin(time * 0.7) * 1.2;

    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, baseX, 0.06);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, baseY, 0.06);
    mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, baseZ, 0.05);
    mesh.rotation.x += delta * 0.2;
    mesh.rotation.y += delta * 0.28;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={sphereGeometry}
      material={material}
      scale={scale}
      castShadow
      receiveShadow
      position={position}
    />
  );
};

const PointerLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ pointer, viewport }) => {
    if (!lightRef.current) {
      return;
    }

    lightRef.current.position.x = (pointer.x * viewport.width) / 2;
    lightRef.current.position.y = (pointer.y * viewport.height) / 2;
  });

  return <pointLight ref={lightRef} position={[0, 0, 8]} intensity={1.6} color="#5eead4" />;
};

const palette = ["#5eead4", "#f59e0b", "#38bdf8", "#f97316"];

const TechSphereScene = () => {
  return (
    <Canvas
      className="tech-stack__canvas"
      camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      shadows
    >
      <ambientLight intensity={1.3} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.24}
        intensity={1.8}
        color="#dbeafe"
        castShadow
      />
      <directionalLight position={[0, 5, -4]} intensity={1.6} color="#5eead4" />
      <PointerLight />
      {techLabels.map((label, index) => (
        <Orb
          key={label}
          label={label}
          accent={palette[index % palette.length]}
          scale={index % 2 === 0 ? 1 : 0.84}
          speed={0.6 + index * 0.06}
          offset={index * 0.9}
          position={[
            THREE.MathUtils.randFloatSpread(10),
            THREE.MathUtils.randFloatSpread(7),
            THREE.MathUtils.randFloatSpread(8),
          ]}
        />
      ))}
    </Canvas>
  );
};

export default TechSphereScene;
