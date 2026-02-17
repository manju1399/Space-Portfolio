import React, { useRef, useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MovingStars = () => {
  const points = useRef<THREE.Points>(null!);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    setPositions(pos);
  }, []);

  useFrame((state, delta) => {
    if (points.current && positions) {
      points.current.rotation.z += delta * 0.05;
      points.current.position.z += delta * 5;

      if (points.current.position.z > 20) {
        points.current.position.z = -50;
      }
    }
  });

  if (!positions) return null;

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="white"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const StarryBackground = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <MovingStars />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0A0A1A', // Provide base color
    zIndex: 0,
  },
});

export default StarryBackground;
