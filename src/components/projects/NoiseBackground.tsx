"use client";

import { useEffect, useRef } from "react";

export function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false });
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Simple pseudo-random noise and fractional Brownian motion
    const fragmentShaderSource = `
      precision lowp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;

      // Hash without Sine
      vec2 hash22(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
        p3 += dot(p3, p3.yzx+33.33);
        return fract((p3.xx+p3.yz)*p3.zy);
      }

      float noise(vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = mix(mix(dot(hash22(p + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                          dot(hash22(p + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), f.x),
                      mix(dot(hash22(p + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                          dot(hash22(p + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), f.x), f.y);
        return 0.5 + 0.5 * n;
      }

      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;
        
        // Slow shifting
        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * uTime);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.05 * uTime);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.02 * uTime);

        float f = fbm(st + r);

        // Monochrome mapping
        float color = mix(0.0, 1.0, f * f * f + 0.6 * f * f + 0.5 * f);
        gl_FragColor = vec4(vec3(color), 0.04 * color); // Output directly with low opacity
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "uTime");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");

    let animationId: number;
    let isVisible = true;
    const startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let isInteracting = false;
    let interactionTimeout: ReturnType<typeof setTimeout>;

    const handleInteraction = () => {
      isInteracting = true;
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
      }, 1000); // pause 1 second after last interaction
    };

    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });

    // Initial burst to get it on screen
    handleInteraction();

    const render = () => {
      animationId = requestAnimationFrame(render);
      if (!isVisible) return;
      if (!isInteracting) return; // Spec: "Pauses when user is not scrolling/interacting"

      const time = (performance.now() - startTime) * 0.001;
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(interactionTimeout);
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}
