import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
export const InteractiveEarth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const earthBumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
    const earthSpecularMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
    const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 0.05,
      specularMap: earthSpecularMap,
      specular: new THREE.Color(0x333333),
      shininess: 25
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;
    // Create clouds
    const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    cloudsRef.current = clouds;
    // Create atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 6.0);
          gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;
    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 100;
      starPositions[i + 1] = (Math.random() - 0.5) * 100;
      starPositions[i + 2] = (Math.random() - 0.5) * 100;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    // Handle mouse movement for interactive rotation
    const mouse = {
      x: 0,
      y: 0
    };
    const targetRotation = {
      x: 0,
      y: 0
    };
    const currentRotation = {
      x: 0,
      y: 0
    };
    const rotationSpeed = 0.05;
    const autoRotationSpeed = 0.001;
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotation.x = mouse.y * 0.5;
      targetRotation.y = mouse.x * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (earthRef.current && cloudsRef.current) {
        // Smooth rotation towards target
        currentRotation.x += (targetRotation.x - currentRotation.x) * rotationSpeed;
        currentRotation.y += (targetRotation.y - currentRotation.y) * rotationSpeed;
        // Apply rotation
        earthRef.current.rotation.x = currentRotation.x;
        earthRef.current.rotation.y += autoRotationSpeed;
        earthRef.current.rotation.y = earthRef.current.rotation.y % (2 * Math.PI);
        cloudsRef.current.rotation.x = currentRotation.x;
        cloudsRef.current.rotation.y += autoRotationSpeed * 1.1;
        cloudsRef.current.rotation.y = cloudsRef.current.rotation.y % (2 * Math.PI);
      }
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0001;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      // Dispose resources properly
      if (earthRef.current) {
        earthRef.current.geometry.dispose();
        (earthRef.current.material as THREE.Material).dispose();
      }
      if (cloudsRef.current) {
        cloudsRef.current.geometry.dispose();
        (cloudsRef.current.material as THREE.Material).dispose();
      }
      if (atmosphereRef.current) {
        atmosphereRef.current.geometry.dispose();
        (atmosphereRef.current.material as THREE.Material).dispose();
      }
      if (starsRef.current) {
        starsRef.current.geometry.dispose();
        (starsRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);
  return <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-background-dark/70 z-10"></div>
      <div ref={containerRef} className="absolute inset-0" />
    </div>;
};