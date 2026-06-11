'use client';

import { useEffect, useRef } from 'react';

// Globals for easter egg communication
declare global {
  interface Window {
    __bhSpeedMultiplier?: number;
    __bhScaleMultiplier?: number;
    __bhMassMultiplier?: number;
    __bhSingularityX?: number;
    __bhSingularityY?: number;
  }
}

// --- Lightweight Simplex Noise Implementation ---
class SimplexNoise {
  private grad3: number[][];
  private p: number[];
  private perm: number[];
  private permMod12: number[];

  constructor() {
    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    this.perm = new Array(512);
    this.permMod12 = new Array(512);
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = (this.perm[i] % 12);
    }
  }

  private dot(g: number[], x: number, y: number) {
    return g[0] * x + g[1] * y;
  }

  noise2D(xin: number, yin: number) {
    let n0, n1, n2;
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; }
    else { i1 = 0; j1 = 1; }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.permMod12[ii + this.perm[jj]];
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]];
    const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]];

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) n0 = 0.0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) n1 = 0.0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) n2 = 0.0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
    }
    // Returns ~[-1, 1]
    return 70.0 * (n0 + n1 + n2);
  }
}
// --- End Simplex Noise ---

type Star = { x: number; y: number; radius: number; opacity: number; speed: number };

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); // pure black background
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    let animationFrameId: number;

    const TARGET_FPS = 60;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastTime = 0;
    
    const noiseGen = new SimplexNoise();
    let time = 0;
    let lastScrollY = window.scrollY || 0;
    let scrollVelocity = 0;

    // Pre-calculate stars
    const generateRadius = () => Math.random() > 0.9 ? Math.random() * 2.5 + 2 : Math.random() * 1.2 + 0.3;

    const stars: Star[] = Array.from({ length: 200 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 2000 + 300;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        radius: generateRadius(),
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2.0 + 0.2,
      };
    });

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);
      if (timestamp - lastTime < FRAME_INTERVAL) return;
      lastTime = timestamp;

      // Read scroll position for parallax and effects
      const scrollY = window.scrollY || 0;
      
      // Calculate scroll velocity for spin boost
      const deltaY = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      
      // Smoothly interpolate scroll velocity (decays when scrolling stops)
      scrollVelocity += (deltaY - scrollVelocity) * 0.1;

      // Base time increment + scroll speed boost + easter egg multiplier
      const eggSpeed = window.__bhSpeedMultiplier ?? 1;
      const baseSpeed = 0.006 * eggSpeed; // Increased base speed from 0.003
      const speedBoost = scrollVelocity * 0.002;
      time += baseSpeed + speedBoost;

      // Calculate the absolute maximum scroll distance of the page
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      
      // Progress from 0 to 1 exactly over the full scrollable length of the page.
      // This guarantees it hits dead center EXACTLY at the bottom, making it as slow as possible.
      const scrollProgress = Math.min(1, scrollY / maxScroll);
      
      // Interpolate X position from 0.7 to 0.5 on desktop so it smoothly moves to the middle
      const desktopXFactor = 0.7 - (0.2 * scrollProgress);
      const cx = width > 768 ? width * desktopXFactor : width / 2;
      
      // Keep it vertically centered on the screen since the canvas is fixed
      const cy = height / 2;
      
      // Export exact coordinates for easter egg
      window.__bhSingularityX = cx;
      window.__bhSingularityY = cy;
      
      // Imposing scale, but slightly reduced middle ball
      // Easter egg can zoom out by setting __bhScaleMultiplier < 1
      const eggScale = window.__bhScaleMultiplier ?? 1;
      const eggMass = window.__bhMassMultiplier ?? 1;
      const BASE_RADIUS = Math.min(width, height) * 0.24 * eggScale * eggMass;

      // 1. Clear Canvas with site background color (always fully opaque)
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Fade out slower as user scrolls over the entire page height, stopping at a subtle 0.15
      const fadeOpacity = Math.max(0.15, 1 - (scrollY / maxScroll));
      ctx.globalAlpha = fadeOpacity;

      // 2. Star Field (Particles continuously getting sucked in)
      ctx.save();
      ctx.translate(cx, cy);
      for (const star of stars) {
        const distSq = star.x * star.x + star.y * star.y;
        const dist = Math.sqrt(distSq);

        // Move star towards center, intensified by easter egg speed multiplier
        const pullSpeed = star.speed * (eggSpeed * 0.7 + 0.3);
        
        if (dist < BASE_RADIUS * 0.8) {
          // Star got completely sucked in! Respawn it far away
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 1500 + 1000;
          star.x = Math.cos(angle) * distance;
          star.y = Math.sin(angle) * distance;
          star.opacity = Math.random() * 0.5 + 0.1;
          star.radius = generateRadius(); // Re-roll size
        } else {
          // Pull inwards
          star.x -= (star.x / dist) * pullSpeed;
          star.y -= (star.y / dist) * pullSpeed;
          
          // Slight spiral rotation around the center
          const spiral = 0.0015 * eggSpeed;
          const nx = star.x * Math.cos(spiral) - star.y * Math.sin(spiral);
          const ny = star.x * Math.sin(spiral) + star.y * Math.cos(spiral);
          star.x = nx;
          star.y = ny;
        }

        // Lensing effect warps the rendering position
        const pull = Math.max(0, (BASE_RADIUS * BASE_RADIUS * 1.5) / (distSq + 1000)); 
        const renderX = star.x * (1 - pull / Math.max(dist, 1));
        const renderY = star.y * (1 - pull / Math.max(dist, 1));

        ctx.beginPath();
        ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
        
        // Fade out slightly when very far away so they don't pop in abruptly
        let renderOpacity = star.opacity;
        if (dist > 1500) renderOpacity *= Math.max(0, 2000 - dist) / 500;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${renderOpacity})`;
        ctx.fill();
      }
      ctx.restore();

      // 3. Outer Lensing Halo
      ctx.save();
      ctx.translate(cx, cy);
      const haloRadius = BASE_RADIUS * 4;
      const haloGradient = ctx.createRadialGradient(0, 0, BASE_RADIUS, 0, 0, haloRadius);
      haloGradient.addColorStop(0, 'rgba(200, 180, 255, 0.06)');
      haloGradient.addColorStop(1, 'rgba(200, 180, 255, 0)');
      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(0, 0, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Offset amber glow (simulates bright front disk bleeding)
      const amberRadius = BASE_RADIUS * 3.5;
      const amberGradient = ctx.createRadialGradient(0, 30, BASE_RADIUS, 0, 30, amberRadius);
      amberGradient.addColorStop(0, 'rgba(255, 200, 100, 0.04)');
      amberGradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
      ctx.fillStyle = amberGradient;
      ctx.beginPath();
      ctx.arc(0, 30, amberRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Calculate Event Horizon Path (Restrained Noise Displacement + Spinning)
      const numPoints = 180;
      const horizonPoints = [];
      for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        // Add a rotation factor to theta so the noise contour spins around the black hole
        const noiseTheta = theta - time * 18.0; // Sped up the horizon spin 
        const rawNoise = noiseGen.noise2D(Math.cos(noiseTheta) * 1.5 + time * 1.5, Math.sin(noiseTheta) * 1.5 + time * 1.5);
        // Clamp to ±4px for subtle heat-shimmer
        const displacement = (rawNoise / 70.0) * 4; 
        const r = BASE_RADIUS + displacement;
        horizonPoints.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) });
      }

      // Helper to draw Accretion Disk (Front and Back halves)
      const drawAccretionDisk = (isFront: boolean) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-Math.PI / 9); // ~20 degrees tilt

        const radiusX = BASE_RADIUS * 2.4;
        const radiusY = BASE_RADIUS * 0.38;
        const numRings = 45;

        ctx.lineWidth = 1.5;
        for (let i = 0; i < numRings; i++) {
          const progress = i / numRings; // 0 (inner) to 1 (outer)
          
          const rX = BASE_RADIUS * 1.05 + progress * (radiusX - BASE_RADIUS * 1.05);
          const rY = rX * (radiusY / radiusX);
          
          let rC, gC, bC, baseOpacity;
          // Colors: 
          // inner: rgba(255, 210, 120, 0.18)
          // mid: rgba(200, 160, 80, 0.08)
          // outer: rgba(150, 100, 60, 0.03)
          if (progress < 0.3) {
            rC = 255; gC = 210; bC = 120;
            baseOpacity = 0.18 - (progress / 0.3) * 0.10; // 0.18 -> 0.08
          } else if (progress < 0.7) {
            rC = 200; gC = 160; bC = 80;
            baseOpacity = 0.08 - ((progress - 0.3) / 0.4) * 0.05; // 0.08 -> 0.03
          } else {
            rC = 150; gC = 100; bC = 60;
            baseOpacity = 0.03 * (1 - (progress - 0.7) / 0.3); // 0.03 -> 0
          }

          ctx.beginPath();
          if (isFront) {
            ctx.ellipse(0, 0, rX, rY, 0, 0, Math.PI); // Front arc
            ctx.strokeStyle = `rgba(${rC}, ${gC}, ${bC}, ${baseOpacity * 1.8})`; // Doppler boosting
          } else {
            ctx.ellipse(0, 0, rX, rY, 0, Math.PI, Math.PI * 2); // Back arc
            ctx.strokeStyle = `rgba(${rC}, ${gC}, ${bC}, ${baseOpacity})`;
          }
          ctx.stroke();
        }

        // Draw broad glowing sweep bands (plasma lanes)
        const sweepRX = BASE_RADIUS * 1.6;
        const sweepRY = sweepRX * (radiusY / radiusX);
        
        ctx.beginPath();
        ctx.lineWidth = 25;
        if (isFront) {
          ctx.ellipse(0, 0, sweepRX, sweepRY, 0, 0, Math.PI);
          ctx.strokeStyle = `rgba(255, 230, 150, 0.12)`;
        } else {
          ctx.ellipse(0, 0, sweepRX, sweepRY, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 230, 150, 0.05)`;
        }
        ctx.setLineDash([sweepRX * 0.8, sweepRX * 1.2]);
        ctx.lineDashOffset = -time * 60;
        ctx.stroke();
        ctx.setLineDash([]); // Reset

        // Outer sweep band
        const sweepRX2 = BASE_RADIUS * 2.0;
        const sweepRY2 = sweepRX2 * (radiusY / radiusX);
        
        ctx.beginPath();
        ctx.lineWidth = 35;
        if (isFront) {
          ctx.ellipse(0, 0, sweepRX2, sweepRY2, 0, 0, Math.PI);
          ctx.strokeStyle = `rgba(200, 160, 80, 0.06)`;
        } else {
          ctx.ellipse(0, 0, sweepRX2, sweepRY2, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = `rgba(200, 160, 80, 0.03)`;
        }
        ctx.setLineDash([sweepRX2 * 1.5, sweepRX2 * 1.0]);
        ctx.lineDashOffset = -time * 40 + 100; // Different speed and offset
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      };

      // Create Horizon Path for clipping and drawing
      ctx.beginPath();
      ctx.moveTo(horizonPoints[0].x, horizonPoints[0].y);
      for (let i = 1; i < horizonPoints.length; i++) {
        ctx.lineTo(horizonPoints[i].x, horizonPoints[i].y);
      }
      ctx.closePath();

      // 4. Accretion Disk — Back Half 
      // (Drawn first so the Event Horizon fill naturally occludes it without complex clipping)
      drawAccretionDisk(false);

      // 5. Fill Event Horizon Polygon (This completely hides the portion of the back disk behind the black hole)
      ctx.beginPath();
      ctx.moveTo(horizonPoints[0].x, horizonPoints[0].y);
      for (let i = 1; i < horizonPoints.length; i++) {
        ctx.lineTo(horizonPoints[i].x, horizonPoints[i].y);
      }
      ctx.fillStyle = '#000000';
      ctx.fill();

      // 6. Photon Ring (Tight bright halo exactly following noise contour)
      const photonLayers = [
        { width: 8, opacity: 0.2 }, // Soft bloom
        { width: 2, opacity: 1.0 }, // Solid core
      ];
      
      for (const layer of photonLayers) {
        ctx.beginPath();
        ctx.moveTo(horizonPoints[0].x, horizonPoints[0].y);
        for (let i = 1; i < horizonPoints.length; i++) {
          ctx.lineTo(horizonPoints[i].x, horizonPoints[i].y);
        }
        ctx.closePath();
        ctx.lineWidth = layer.width;
        ctx.strokeStyle = `rgba(255, 248, 220, ${layer.opacity})`;
        ctx.stroke();
      }

      // 6.5 Faint Gravitational Lensing Arc
      // Mimics a secondary image ring physically offset downward
      ctx.save();
      ctx.translate(cx, cy + 15);
      ctx.beginPath();
      const lensR = BASE_RADIUS + 30;
      ctx.ellipse(0, 0, lensR, lensR * 0.98, 0, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 240, 200, 0.06)';
      ctx.stroke();
      ctx.restore();

      // 7. Accretion Disk — Front Half (Over the horizon, unclipped)
      drawAccretionDisk(true);

      // 8. Radial Vignette Mask
      // Fades the extreme edges of the canvas to background black so the accretion disk never hard-clips
      const vignetteRadius = Math.max(width, height) * 0.55;
      const vignette = ctx.createRadialGradient(cx, cy, BASE_RADIUS * 1.5, cx, cy, vignetteRadius);
      vignette.addColorStop(0, 'rgba(10, 10, 10, 0)');
      vignette.addColorStop(1, 'rgba(10, 10, 10, 1)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // 9. Edge Fades (Linear Gradients) to ensure ABSOLUTELY no hard lines
      const edgeFadeY = height * 0.2; // 20% vertical fade
      const edgeFadeX = width * 0.15; // 15% horizontal fade

      // Top Edge
      let g = ctx.createLinearGradient(0, 0, 0, edgeFadeY);
      g.addColorStop(0, 'rgba(10, 10, 10, 1)');
      g.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, edgeFadeY);

      // Bottom Edge
      g = ctx.createLinearGradient(0, height, 0, height - edgeFadeY);
      g.addColorStop(0, 'rgba(10, 10, 10, 1)');
      g.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, height - edgeFadeY, width, edgeFadeY);

      // Left Edge
      g = ctx.createLinearGradient(0, 0, edgeFadeX, 0);
      g.addColorStop(0, 'rgba(10, 10, 10, 1)');
      g.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, edgeFadeX, height);

      // Right Edge
      g = ctx.createLinearGradient(width, 0, width - edgeFadeX, 0);
      g.addColorStop(0, 'rgba(10, 10, 10, 1)');
      g.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(width - edgeFadeX, 0, edgeFadeX, height);

      // Restore global alpha
      ctx.globalAlpha = 1.0;

    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="blackhole-bg-container fixed inset-0 -z-50 h-screen w-screen pointer-events-none hidden md:block"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
    </div>
  );
}
