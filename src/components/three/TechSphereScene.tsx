import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";

type TechSphereSceneProps = {
  isActive: boolean;
};

type OrbConfig = {
  label: string;
  accent: string;
  scale: number;
  speed: number;
  offset: number;
  position: [number, number, number];
};

const ORB_CONFIGS: OrbConfig[] = [
  { label: "Java", accent: "#5eead4", scale: 1, speed: 0.62, offset: 0, position: [-4.2, 1.8, -1.2] },
  { label: "React", accent: "#f59e0b", scale: 0.86, speed: 0.68, offset: 0.9, position: [-1.1, -2.6, 1.8] },
  { label: "Node.js", accent: "#38bdf8", scale: 1, speed: 0.74, offset: 1.8, position: [3.8, 2.2, 0.9] },
  { label: "TypeScript", accent: "#f97316", scale: 0.84, speed: 0.78, offset: 2.7, position: [2.4, -1.9, -2.1] },
  { label: "Python", accent: "#5eead4", scale: 0.92, speed: 0.83, offset: 3.6, position: [-3.4, -0.2, 2.7] },
  { label: "AWS", accent: "#f59e0b", scale: 0.84, speed: 0.88, offset: 4.5, position: [0.5, 2.8, -2.8] },
  { label: "Flutter", accent: "#38bdf8", scale: 0.96, speed: 0.92, offset: 5.4, position: [4.5, -0.6, 2.3] },
  { label: "Grafana", accent: "#f97316", scale: 0.82, speed: 0.97, offset: 6.3, position: [-0.2, 0.8, -3.4] },
];

const orbGeometry = new THREE.SphereGeometry(1, 20, 20);

const createBadgeTexture = (label: string, accent: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, "#0f1d35");
  gradient.addColorStop(1, "#08111f");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  context.strokeStyle = accent;
  context.lineWidth = 8;
  context.strokeRect(16, 16, 224, 224);
  context.fillStyle = "#f4efe6";
  context.font = "700 34px Space Grotesk";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, 128, 128, 180);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  texture.needsUpdate = true;
  return texture;
};

const OrbField = memo(({ isActive }: TechSphereSceneProps) => {
  const orbRefs = useRef<Array<THREE.Mesh | null>>([]);
  const pointerLightRef = useRef<THREE.PointLight>(null);
  const materials = useMemo(
    () =>
      ORB_CONFIGS.map(({ label, accent }) =>
        new THREE.MeshStandardMaterial({
          map: createBadgeTexture(label, accent),
          roughness: 0.82,
          metalness: 0.18,
        })
      ),
    []
  );

  useEffect(() => {
    return () => {
      materials.forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
    };
  }, [materials]);

  useFrame(({ clock, pointer, viewport }, delta) => {
    if (!isActive) {
      return;
    }

    if (pointerLightRef.current) {
      pointerLightRef.current.position.x = (pointer.x * viewport.width) / 2.5;
      pointerLightRef.current.position.y = (pointer.y * viewport.height) / 2.5;
    }

    ORB_CONFIGS.forEach((config, index) => {
      const mesh = orbRefs.current[index];
      if (!mesh) {
        return;
      }

      const time = clock.elapsedTime * config.speed + config.offset;
      const targetX = config.position[0] + Math.sin(time) * 1.35 + pointer.x * 0.9;
      const targetY = config.position[1] + Math.cos(time * 1.15) * 0.8 + pointer.y * 0.45;
      const targetZ = config.position[2] + Math.sin(time * 0.7) * 0.85;

      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.045);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, 0.045);
      mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, targetZ, 0.04);
      mesh.rotation.x += delta * 0.14;
      mesh.rotation.y += delta * 0.18;
    });
  });

  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[12, 10, 18]} intensity={1.25} color="#dbeafe" />
      <directionalLight position={[-10, -2, 8]} intensity={0.72} color="#5eead4" />
      <pointLight ref={pointerLightRef} position={[0, 0, 8]} intensity={1.05} color="#5eead4" />
      {ORB_CONFIGS.map((config, index) => (
        <mesh
          key={config.label}
          ref={(node) => {
            orbRefs.current[index] = node;
          }}
          geometry={orbGeometry}
          material={materials[index]}
          scale={config.scale}
          position={config.position}
        />
      ))}
    </>
  );
});

const TechSphereScene = ({ isActive }: TechSphereSceneProps) => {
  return (
    <Canvas
      className="tech-stack__canvas"
      camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
      dpr={[1, 1.25]}
      frameloop={isActive ? "always" : "never"}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.6 }}
    >
      <OrbField isActive={isActive} />
    </Canvas>
  );
};

export default memo(TechSphereScene);
