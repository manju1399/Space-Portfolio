import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Text, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Asset } from 'expo-asset';
import { Html } from '@react-three/drei';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


// Load GLB
// We resolve the asset URI for web compatibility
const doodleModule = require('../../../assets/Doodle.glb');
const doodleUri = Asset.fromModule(doodleModule).uri;
const kannadaFontModule = require('../../../assets/fonts/NotoSansKannada-Regular.ttf');
const kannadaFontUri = Asset.fromModule(kannadaFontModule).uri;

const KannadaTextMesh = React.forwardRef((props:any, ref:any) => {

  const texture = useMemo(() => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = 1024;
    canvas.height = 256;

    ctx.fillStyle = "transparent";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.font = "120px NotoSansKannada";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Browser renders Kannada correctly here
    ctx.fillText("ಸ್ವಾಗತ", canvas.width/2, canvas.height/2);

    return new THREE.CanvasTexture(canvas);

  }, []);

  return (
    <mesh ref={ref} position={[0,0,0]}>
      <planeGeometry args={[5,1.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );

});


// Moving Stars Component for specific "Infinite Movement" feel
const MovingStars = () => {
    const points = useRef<THREE.Points>(null!);
    const [positions, setPositions] = useState<Float32Array | null>(null);

    useMemo(() => {
        const count = 2000; // Increased count
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 80; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 80; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100; // z: spread deep
        }
        setPositions(pos);
    }, []);

    useFrame((state, delta) => {
        if (points.current && positions) {
            // Move stars towards camera (positive z direction to simulate forward movement visually if camera is at 5 looking at 0? No, usually stars move past camera)
            // If camera is at 5, and we want "infinite movement forward", stars should move +Z towards camera.

            points.current.rotation.z += delta * 0.05; // Gentle rotation
            points.current.position.z += delta * 5; // Move field forward

            // Loop: if field moves too far, reset
            // A better approach for infinite loop without "pop" is using shader, but for simplicity:
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

// Robot Scene Content
const SceneContent = ({ onIntroStep, isMobile }: { onIntroStep: (step: number) => void, isMobile: boolean }) => {
    const robotRef = useRef<THREE.Group>(null!);
    const textRef = useRef<THREE.Mesh>(null!);
    const { scene } = useGLTF(doodleUri);

    // Initial Animation Sequence
    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // After robot settles, trigger next step
                onIntroStep(1); // 1 = Namasthe Fade In
            }
        });

        // Initial Robot State (Face Camera = Math.PI)
        robotRef.current.scale.set(1.3, 1.3, 1.3);
        robotRef.current.position.set(0, -0.8, 0);
        robotRef.current.rotation.set(0, Math.PI, 0); // Face camera 

        // Initial Text State
        // if (textRef.current) {
        //     textRef.current.position.z = -50;
        //     if (!Array.isArray(textRef.current.material)) {
        //         (textRef.current.material as THREE.Material).opacity = 0;
        //     }
        // }
        if (textRef.current) {
            textRef.current.position.z = -50;
        }


        // Sequence
        tl.to({}, { duration: 0.5 })
            // Robot Zoom Out & Move
            .to(robotRef.current.scale, {
                x: isMobile ? 0.9 : 1.2, // Increased desktop scale
                y: isMobile ? 0.9 : 1.2,
                z: isMobile ? 0.9 : 1.2,
                duration: 2.5,
                ease: "power2.inOut"
            }, "start")
            .to(robotRef.current.position, {
                x: isMobile ? 0 : -3.5, // Move further left to accommodate larger scale
                y: isMobile ? 1 : -1.0,
                duration: 2.5,
                ease: "power2.inOut"
            }, "start")

            // Text Zoom (Kannada)
            .to(textRef.current.material, { opacity: 1, duration: 1 }, "start+=1")
            .to(textRef.current.position, {
                z: 10, // Move past camera
                duration: 4,
                ease: "slow(0.7, 0.7, false)"
            }, "start+=1")
            .to(textRef.current.material, { opacity: 0, duration: 0.5 }, "-=0.5"); // Fade out near end

    }, [onIntroStep, isMobile]);

    // Cursor Tracking
    useFrame((state) => {
        if (!robotRef.current) return;

        // Smoothly look at cursor
        // Increased sensitivity for better "looking" effect
        // Super aggressive look at cursor
        const targetRotY = Math.PI + (state.mouse.x * 1.5);
        // const targetRotX = (state.mouse.y * 0.5);
        const targetRotX = (-state.mouse.y * 0.5);


        robotRef.current.rotation.y = THREE.MathUtils.lerp(robotRef.current.rotation.y, targetRotY, 0.1);
        robotRef.current.rotation.x = THREE.MathUtils.lerp(robotRef.current.rotation.x, targetRotX, 0.1);
    });


    return (
        <>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#6C63FF" />

            <MovingStars />

            <Float
                speed={2.5}
                rotationIntensity={0.2} // Reduced because we manually rotate
                floatIntensity={0.6}
                floatingRange={[-0.1, 0.1]}
            >
                <Center>
                    <primitive
                        ref={robotRef}
                        object={scene}
                        scale={0.7}
                        position={[0, -0.8, 0]}
                        rotation={[0, Math.PI, 0]} // Initial face forward
                    />
                </Center>
            </Float>

           <KannadaTextMesh ref={textRef} />

        </>
    );
};

const HeroScene: React.FC<{ onIntroStep: (step: number) => void }> = ({ onIntroStep }) => {
    // Mobile check
    const isMobile = SCREEN_WIDTH < 768;

    return (
        // Pointer events none so we can scroll over it later
        <View style={styles.container} pointerEvents="none">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 2]} // Quality scaling
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <SceneContent onIntroStep={onIntroStep} isMobile={isMobile} />
                </Suspense>
            </Canvas>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 0, // Behind content layer
        backgroundColor: '#0A0A1A',
    }
});

export default HeroScene;
