'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

type BlackholeEasterEggProps = {
  active: boolean;
  onComplete: () => void;
};

type ParticleData = {
  vx: number;
  vy: number;
  alive: boolean;
  size: number;
};

function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  return new THREE.CanvasTexture(canvas);
}

function createShardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.moveTo(16, 4);
    ctx.lineTo(24, 28);
    ctx.lineTo(8, 24);
    ctx.closePath();
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createDiamondTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.moveTo(16, 4);
    ctx.lineTo(28, 16);
    ctx.lineTo(16, 28);
    ctx.lineTo(4, 16);
    ctx.closePath();
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

export function BlackholeEasterEgg({ active, onComplete }: BlackholeEasterEggProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const storedStylesRef = useRef<Map<HTMLElement, string>>(new Map());
  const phaseRef = useRef<number>(0);
  const cleanedUpRef = useRef(false);

  const cleanup = useCallback(() => {
    if (cleanedUpRef.current) return;
    cleanedUpRef.current = true;

    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    gsap.killTweensOf('*');

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    storedStylesRef.current.forEach((originalStyle, el) => {
      el.style.cssText = originalStyle;
    });
    storedStylesRef.current.clear();

    window.__bhSpeedMultiplier = 1;
    window.__bhScaleMultiplier = 1;
    window.__bhMassMultiplier = 1;

    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    if (overlayRef.current && overlayRef.current.parentNode) {
      overlayRef.current.parentNode.removeChild(overlayRef.current);
      overlayRef.current = null;
    }

    document.body.classList.remove('easter-egg-active');
    document.body.style.paddingRight = '';
  }, []);

  useEffect(() => {
    if (!active) return;
    cleanedUpRef.current = false;
    phaseRef.current = 0; 
    
    // Initialize globals to 1 before GSAP takes over so it doesn't animate from undefined/0
    window.__bhSpeedMultiplier = 1;
    window.__bhScaleMultiplier = 1;
    window.__bhMassMultiplier = 1;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Create Overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;';
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    // Three.js Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    overlay.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    rendererRef.current = renderer;

    const camera = new THREE.OrthographicCamera(0, W, 0, H, -100, 100);
    camera.position.z = 10;
    const scene = new THREE.Scene();

    const circleTexture = createCircleTexture();
    const shardTexture = createShardTexture();
    const diamondTexture = createDiamondTexture();

    // ─── Suck-In Particles (Phase 1) ───
    const SUCK_COUNT = 500;
    const suckPos = new Float32Array(SUCK_COUNT * 3);
    const suckSizes = new Float32Array(SUCK_COUNT);
    // Shape index: 0=circle, 1=shard, 2=diamond
    const suckShapes = new Int8Array(SUCK_COUNT);
    const suckData: ParticleData[] = [];

    for (let i = 0; i < SUCK_COUNT; i++) {
      suckPos[i * 3] = Math.random() * W;
      suckPos[i * 3 + 1] = Math.random() * H;
      suckPos[i * 3 + 2] = 0;
      
      // Extremely varied sizes: from tiny specs (1px) to large chunks (12px)
      const isHuge = Math.random() > 0.95;
      const size = isHuge ? 8 + Math.random() * 6 : 1 + Math.random() * 4; 
      suckSizes[i] = size;
      suckShapes[i] = Math.floor(Math.random() * 3);

      suckData.push({
        vx: 0,
        vy: 0,
        alive: true,
        size,
      });
    }

    // We split particles by shape to assign different textures
    const suckGeos = [new THREE.BufferGeometry(), new THREE.BufferGeometry(), new THREE.BufferGeometry()];
    const suckMats = [
      new THREE.PointsMaterial({ size: 3, transparent: true, opacity: 0, color: 0xffffff, map: circleTexture, blending: THREE.AdditiveBlending, depthWrite: false }),
      new THREE.PointsMaterial({ size: 3, transparent: true, opacity: 0, color: 0xffffff, map: shardTexture, blending: THREE.AdditiveBlending, depthWrite: false }),
      new THREE.PointsMaterial({ size: 3, transparent: true, opacity: 0, color: 0xffffff, map: diamondTexture, blending: THREE.AdditiveBlending, depthWrite: false }),
    ];
    const suckPointsArray: THREE.Points[] = [];

    for (let shapeIdx = 0; shapeIdx < 3; shapeIdx++) {
      const pCount = Array.from(suckShapes).filter(s => s === shapeIdx).length;
      const pos = new Float32Array(pCount * 3);
      const sizes = new Float32Array(pCount);
      let idx = 0;
      for (let i = 0; i < SUCK_COUNT; i++) {
        if (suckShapes[i] === shapeIdx) {
          pos[idx * 3] = suckPos[i * 3];
          pos[idx * 3 + 1] = suckPos[i * 3 + 1];
          pos[idx * 3 + 2] = 0;
          sizes[idx] = suckSizes[i];
          // Overwrite suckData array mapping so we can update them linearly?
          // Actually, we need to map original i to the buffer index.
          // It's easier to just keep suckData as a 1:1 map to the geometry arrays.
          idx++;
        }
      }
      suckGeos[shapeIdx].setAttribute('position', new THREE.BufferAttribute(pos, 3));
      suckGeos[shapeIdx].setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      const pts = new THREE.Points(suckGeos[shapeIdx], suckMats[shapeIdx]);
      scene.add(pts);
      suckPointsArray.push(pts);
    }
    
    // To keep physics easy, we rebuild suckData to align with the 3 geometries
    suckData.length = 0;
    for (let shapeIdx = 0; shapeIdx < 3; shapeIdx++) {
      const sizesAttr = suckGeos[shapeIdx].attributes.size as THREE.BufferAttribute;
      for (let i = 0; i < sizesAttr.count; i++) {
        suckData.push({ vx: 0, vy: 0, alive: true, size: sizesAttr.array[i] });
      }
    }

    // ─── Big Bang Explosion Particles (Phase 2) ───
    const EXP_COUNT = 4000;
    const expPos = new Float32Array(EXP_COUNT * 3);
    const expData: ParticleData[] = [];

    for (let i = 0; i < EXP_COUNT; i++) {
      // Init offscreen
      expPos[i * 3] = -9999;
      expPos[i * 3 + 1] = -9999;
      expPos[i * 3 + 2] = 0;
      
      expData.push({ vx: 0, vy: 0, alive: false, size: 3 });
    }

    const expGeo = new THREE.BufferGeometry();
    expGeo.setAttribute('position', new THREE.BufferAttribute(expPos, 3));

    const expMat = new THREE.PointsMaterial({
      size: 3,
      transparent: true,
      opacity: 1,
      color: 0xffffff, // Pure white explosion
      map: circleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const expPoints = new THREE.Points(expGeo, expMat);
    scene.add(expPoints);

    // ─── Gather DOM Elements ───
    const domElements: HTMLElement[] = [];
    
    const header = document.querySelector('header');
    if (header) domElements.push(header as HTMLElement);

    const contentSelectors = 'main h1, main h2, main h3, main p, main a, main button, main img, main article, main .group';
    const allContentBlocks = Array.from(document.querySelectorAll(contentSelectors)) as HTMLElement[];

    const rootBlocks = allContentBlocks.filter((el) => {
      if (el.closest('.blackhole-bg-container')) return false;
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        if (allContentBlocks.includes(parent)) return false;
        parent = parent.parentElement;
      }
      return true;
    });

    rootBlocks.forEach((el) => domElements.push(el));

    const footer = document.querySelector('footer');
    if (footer) domElements.push(footer as HTMLElement);

    // Save styles BEFORE applying any padding or modifications
    domElements.forEach((el) => {
      storedStylesRef.current.set(el, el.style.cssText);
      // Disable CSS transitions during GSAP control
      el.style.transition = 'none';
      el.style.willChange = 'transform, opacity';
      el.style.transformOrigin = 'center center';
    });

    // Prevent layout shift when scrollbar disappears
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (header) {
        header.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    document.body.classList.add('easter-egg-active');

    // ─── GSAP Master Timeline ───
    const tl = gsap.timeline({
      onComplete: () => {
        cleanup();
        onComplete();
      },
    });
    timelineRef.current = tl;

    // PHASE 0→1: Blackhole spin-up & subtle zoom (0s → 2.5s)
    tl.to(window, {
      __bhSpeedMultiplier: 20, // Frantic speed
      duration: 7,
      ease: 'power2.in',
    }, 0);

    tl.to(window, {
      __bhScaleMultiplier: 0.85, // Just a bit of zoom out for space feel
      duration: 7,
      ease: 'power1.inOut',
    }, 0);

    // Fade in particles at 1.5s
    suckMats.forEach(mat => {
      tl.to(mat, {
        opacity: 0.8,
        duration: 2.5,
        ease: 'power1.out',
      }, 1.5);
    });

    tl.call(() => { phaseRef.current = 1; }, [], 1.5);

    // PHASE 1: DOM Suck-In (2s → 8s)
    const getSingularity = () => {
      return {
        x: window.__bhSingularityX ?? (W > 768 ? W * 0.7 : W * 0.5),
        y: window.__bhSingularityY ?? (H / 2 - 30),
      };
    };

    const sStart = getSingularity();

    const elementDistances = domElements.map((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return { el, cx, cy, dist: Math.sqrt((sStart.x - cx)**2 + (sStart.y - cy)**2) };
    });

    const maxDist = Math.max(...elementDistances.map((d) => d.dist), 1);

    elementDistances.forEach(({ el, dist }) => {
      const normalizedDist = dist / maxDist;
      const startTime = 2 + (1 - normalizedDist) * 3;
      const rotation = dist > 500 ? 15 : -15;

      // Calculate dynamic trajectory to the real-time singularity inside onUpdate
      tl.to(el, {
        scale: 0,
        rotation,
        opacity: 0,
        duration: 3.5,
        ease: 'power3.in',
      }, startTime);

      // Using standard static dx/dy since GSAP x/y are fixed endpoints
      const dx = sStart.x - el.getBoundingClientRect().left - el.getBoundingClientRect().width/2;
      const dy = sStart.y - el.getBoundingClientRect().top - el.getBoundingClientRect().height/2;
      
      tl.to(el, {
        x: dx,
        y: dy,
        duration: 3.5,
        ease: 'power3.in',
      }, startTime);
    });

    // PHASE 2: BIG BANG Explosion (9.5s)
    tl.call(() => {
      phaseRef.current = 2;
      
      const center = getSingularity();

      // Big Bang Particles shoot out radially
      const pPos = expGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < EXP_COUNT; i++) {
        pPos.array[i * 3] = center.x;
        pPos.array[i * 3 + 1] = center.y;
        pPos.array[i * 3 + 2] = 0;
        
        const angle = Math.random() * Math.PI * 2;
        // High velocity explosion
        const speed = 10 + Math.random() * 60 + (Math.random() > 0.95 ? 150 : 0) + (Math.random() > 0.99 ? 400 : 0);
        
        expData[i].vx = Math.cos(angle) * speed;
        expData[i].vy = Math.sin(angle) * speed;
        expData[i].alive = true;
      }
      pPos.needsUpdate = true;
      expMat.opacity = 1;

      // Particles fade out VERY slowly
      gsap.to(expMat, { opacity: 0, duration: 10, ease: 'power1.out' });

      // Ensure Phase 1 particles are hidden
      suckMats.forEach(mat => {
        gsap.to(mat, { opacity: 0, duration: 0.5 });
      });

      // Massive Screen shake
      gsap.to(overlay, { x: 15, duration: 0.05, yoyo: true, repeat: 15, ease: 'rough', onComplete: () => gsap.set(overlay, {x:0}) });
      gsap.to(overlay, { y: -10, duration: 0.07, yoyo: true, repeat: 11, ease: 'rough', delay: 0.05 });

    }, [], 9.5);

    // Blackhole tears up, shrinks, and dissipates over 1.5s
    tl.to(window, {
      __bhScaleMultiplier: 0,
      __bhMassMultiplier: 0,
      duration: 1.5,
      ease: 'power2.in',
    }, 9.5);
    
    tl.to(window, {
      __bhSpeedMultiplier: 100, // Spins insanely fast as it dies
      duration: 1.5,
      ease: 'power2.in',
    }, 9.5);

    // Fade the whole screen to pure black to show "blankness" after the blackhole disappears
    tl.to(overlay, { backgroundColor: 'rgba(0,0,0,1)', duration: 0.5 }, 10.8);

    // The screen is purely blank from 11.3s to 12.5s.

    // PHASE 3: Reform (12.5s → 20s)
    tl.call(() => {
      phaseRef.current = 3;
    }, [], 12.5);

    // Fade the black blankness away
    tl.to(overlay, { backgroundColor: 'rgba(0,0,0,0)', duration: 2 }, 12.5);
    
    // Blackhole slowly forms back to normal
    tl.to(window, { __bhScaleMultiplier: 1, duration: 3, ease: 'power2.out' }, 12.5);
    tl.to(window, { __bhMassMultiplier: 1, duration: 3, ease: 'power2.out' }, 12.5);
    tl.to(window, { __bhSpeedMultiplier: 1, duration: 3, ease: 'power2.out' }, 12.5);

    // SMOOTH DOM restoration
    const restoreOrder = [...elementDistances];
    restoreOrder.sort((a, b) => {
      const aHead = a.el.tagName === 'HEADER';
      const bHead = b.el.tagName === 'HEADER';
      if (aHead && !bHead) return -1; // Nav comes first
      if (!aHead && bHead) return 1;
      return a.cy - b.cy;
    });

    restoreOrder.forEach(({ el }, i) => {
      const startTime = 13.5 + i * 0.1; // Delay forming till 13.5s
      tl.to(
        el,
        {
          x: 0, y: 0, scale: 1, rotation: 0, opacity: 1,
          duration: 3,
          ease: 'elastic.out(1.2, 0.8)', // Very fluid, slight bounce
          clearProps: 'transform,opacity', // Won't snap because we keep inline styles matched to css
        },
        startTime
      );
    });

    tl.to({}, { duration: 0.1 }, 25); // Finish at 25s to allow full slow fade

    // ─── Animation Loop ───
    const animate = () => {
      if (cleanedUpRef.current) return;
      rafRef.current = requestAnimationFrame(animate);

      const phase = phaseRef.current;
      const center = getSingularity();

      // Phase 1: Suck-in Particles
      if (phase === 1) {
        let globalDataIdx = 0;
        
        for (let shapeIdx = 0; shapeIdx < 3; shapeIdx++) {
          const pPos = suckGeos[shapeIdx].attributes.position as THREE.BufferAttribute;
          const count = pPos.count;
          
          for (let i = 0; i < count; i++) {
            const dataIdx = globalDataIdx++;
            if (!suckData[dataIdx].alive) continue;
            
            const px = pPos.array[i * 3] as number;
            const py = pPos.array[i * 3 + 1] as number;
            
            const dx = center.x - px;
            const dy = center.y - py;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Direct radial dive
            const force = 3000 / (distSq + 20); 
            const angle = Math.atan2(dy, dx);

            suckData[dataIdx].vx += force * Math.cos(angle);
            suckData[dataIdx].vy += force * Math.sin(angle);
            
            // Damping to avoid orbit
            suckData[dataIdx].vx *= 0.94;
            suckData[dataIdx].vy *= 0.94;

            pPos.array[i * 3] = px + suckData[dataIdx].vx;
            pPos.array[i * 3 + 1] = py + suckData[dataIdx].vy;

            if (dist < 20) {
              suckData[dataIdx].alive = false;
              pPos.array[i * 3] = -9999;
              // Feed the blackhole!
              window.__bhMassMultiplier = (window.__bhMassMultiplier || 1) + 0.002;
            }
          }
          pPos.needsUpdate = true;
        }
      }

      // Phase 2/3: Explosion Particles
      if (phase >= 2) {
        const ePos = expGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < EXP_COUNT; i++) {
          if (!expData[i].alive) continue;
          
          ePos.array[i * 3] += expData[i].vx;
          ePos.array[i * 3 + 1] += expData[i].vy;
          
          // Smooth friction (drag) but retain a tiny drift
          expData[i].vx *= 0.975;
          expData[i].vy *= 0.975;
          
          // Add a tiny random drift so they don't freeze completely
          expData[i].vx += (Math.random() - 0.5) * 0.05;
          expData[i].vy += (Math.random() - 0.5) * 0.05;
        }
        ePos.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    rafRef.current = requestAnimationFrame(animate);

    return cleanup;
  }, [active, onComplete, cleanup]);

  return null;
}
