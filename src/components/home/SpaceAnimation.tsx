"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SpaceAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // A. Star field
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 400 : 800;
    
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(particleCount * 3);
    const starsColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Scatter in a sphere
      const r = 4 + Math.random() * 6;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      starsPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starsPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starsPositions[i * 3 + 2] = r * Math.cos(phi);

      // Varying opacity simulated via color brightness (since bg is dark)
      const brightness = 0.3 + Math.random() * 0.7;
      starsColors[i * 3] = brightness;
      starsColors[i * 3 + 1] = brightness;
      starsColors[i * 3 + 2] = brightness;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starsColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // B. Central black hole
    const bhGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const bhMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(bhGeometry, bhMaterial);
    scene.add(blackHole);

    // Accretion disk
    const diskGroup = new THREE.Group();
    // Tilt the disk ~20 degrees
    diskGroup.rotation.x = Math.PI / 2 - 0.35; 
    scene.add(diskGroup);

    // Inner glowing ring
    const diskGeometry = new THREE.RingGeometry(0.45, 0.8, 64);
    const diskMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xededed, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    diskGroup.add(disk);

    // Faint outer ring
    const outerDiskGeometry = new THREE.RingGeometry(0.85, 1.3, 64);
    const outerDiskMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xededed, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.15 
    });
    const outerDisk = new THREE.Mesh(outerDiskGeometry, outerDiskMaterial);
    diskGroup.add(outerDisk);

    // C. Orbiting particle
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0], 3));
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.06, 
      transparent: true, 
      opacity: 1.0 
    });
    const particle = new THREE.Points(particleGeometry, particleMaterial);
    diskGroup.add(particle);

    // Handlers
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Supernova effect state
    let isSupernova = false;
    let supernovaStartTime = 0;
    const startTime = performance.now();

    const handleSupernova = () => {
      if (isSupernova) return;
      isSupernova = true;
      supernovaStartTime = (performance.now() - startTime) * 0.001;
      
      // Cleanup after 3s
      setTimeout(() => {
        isSupernova = false;
        diskGroup.scale.set(1, 1, 1);
        starsMaterial.color.setHex(0xffffff);
      }, 3000);
    };
    window.addEventListener("trigger-supernova", handleSupernova);

    // Animation Loop
    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      const t = (performance.now() - startTime) * 0.001;

      // Supernova effect
      if (isSupernova) {
        const elapsed = t - supernovaStartTime;
        // Expand rapidly
        const scale = 1 + Math.sin(elapsed * Math.PI) * 4 * Math.exp(-elapsed * 1.5);
        diskGroup.scale.set(scale, scale, scale);
        
        // Stars scatter/shake briefly
        stars.rotation.x += (Math.random() - 0.5) * 0.05 * Math.exp(-elapsed);
        stars.rotation.z += (Math.random() - 0.5) * 0.05 * Math.exp(-elapsed);
      }

      // Slow drift for stars
      stars.rotation.y += 0.0015;

      // Disk rotation
      diskGroup.rotation.z = -t * 0.15;

      // Particle orbit (elliptical within the disk plane)
      const a = 1.0;
      const b = 0.8;
      const orbitSpeed = t * 1.5;
      particle.position.set(Math.cos(orbitSpeed) * a, Math.sin(orbitSpeed) * b, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("trigger-supernova", handleSupernova);
      cancelAnimationFrame(animationFrameId);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      starsGeometry.dispose();
      starsMaterial.dispose();
      bhGeometry.dispose();
      bhMaterial.dispose();
      diskGeometry.dispose();
      diskMaterial.dispose();
      outerDiskGeometry.dispose();
      outerDiskMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
