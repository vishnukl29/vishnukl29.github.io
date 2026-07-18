import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pageCurlVertexShader, pageCurlFragmentShader } from '../shaders/pageCurl';

gsap.registerPlugin(ScrollTrigger);

// === Individual curling page mesh ===
function CurlPage({ texture, pageWidth = 4, pageHeight = 5.5, scrollContainer, scrollStart, scrollEnd, flipDelay = 0 }) {
  const meshRef = useRef();
  const matRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(pageWidth, pageHeight, 48, 48);
    return geo;
  }, [pageWidth, pageHeight]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: pageCurlVertexShader,
      fragmentShader: pageCurlFragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: { value: texture },
        uBend:    { value: 0 },
        uWidth:   { value: pageWidth },
        uShadow:  { value: 0.5 },
      },
    });
  }, [texture, pageWidth]);

  useEffect(() => {
    matRef.current = material;
  }, [material]);

  useEffect(() => {
    if (!meshRef.current) return;
    const proxy = { bend: 0 };
    const tween = ScrollTrigger.create({
      trigger: scrollContainer || '#root',
      start:   scrollStart  || 'top top',
      end:     scrollEnd    || '+=800',
      scrub:   1.2,
      onUpdate: (self) => {
        const b = Math.max(0, Math.min(1, self.progress));
        if (matRef.current) matRef.current.uniforms.uBend.value = b;
        if (meshRef.current) meshRef.current.rotation.y = -b * 0.15;
      },
    });
    return () => tween.kill();
  }, [scrollContainer, scrollStart, scrollEnd]);

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} castShadow receiveShadow />
  );
}

// === Decorative book spine ===
function BookSpine({ height }) {
  return (
    <mesh position={[-2.05, 0, 0]}>
      <boxGeometry args={[0.12, height, 0.05]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>
  );
}

// === Page textures created on canvas ===
function makePageTexture(color, label, sublabel) {
  const canvas = document.createElement('canvas');
  canvas.width  = 512;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 720);

  // Halftone dots
  ctx.fillStyle = 'rgba(0,0,0,0.07)';
  for (let x = 8; x < 512; x += 20) {
    for (let y = 8; y < 720; y += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Border
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 500, 708);

  // Inner accent border
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 472, 684);

  // Main label
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Bangers, Arial Black, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Text shadow
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText(label, 258, 338);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, 254, 334);

  // Sublabel
  ctx.font = '28px Bangers, Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.fillText(sublabel, 256, 410);

  // Corner starburst
  ctx.fillStyle = '#fbbf24';
  ctx.save();
  ctx.translate(440, 80);
  const spokes = 16;
  ctx.beginPath();
  for (let i = 0; i < spokes * 2; i++) {
    const r = i % 2 === 0 ? 38 : 18;
    const a = (i / (spokes * 2)) * Math.PI * 2 - Math.PI / 2;
    i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r) : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// === Scene ===
function BookScene() {
  const pages = useMemo(() => [
    { color: '#e63229', label: 'HERO',    sublabel: 'COVER PAGE'       },
    { color: '#6b21a8', label: 'ABOUT',   sublabel: 'ORIGIN STORY'     },
    { color: '#ea580c', label: 'SKILLS',  sublabel: 'THE ARSENAL'      },
    { color: '#16a34a', label: 'PROJECTS',sublabel: 'EPIC MISSIONS'    },
  ], []);

  const textures = useMemo(() =>
    pages.map(p => makePageTexture(p.color, p.label, p.sublabel)),
    [pages]
  );

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, -2, 3]} intensity={0.3} />

      {textures.map((tex, i) => (
        <CurlPage
          key={i}
          texture={tex}
          scrollStart={`${i * 25}% top`}
          scrollEnd={`${(i + 1) * 25}% top`}
          pageWidth={4}
          pageHeight={5.5}
        />
      ))}

      <BookSpine height={5.5} />
    </>
  );
}

export default function PageFlipBook() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      <BookScene />
    </Canvas>
  );
}
