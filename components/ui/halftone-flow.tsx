"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * HALFTONE FLOW
 * -----------------------------------------------------------------------
 * Decorative WebGL background: animated halftone dots that form flowing
 * organic waves over a near-black field.
 *
 * Implemented per the Hero specification in `heroic.txt`:
 *   - native WebGL only (no Three.js / R3F / GSAP)
 *   - the reference fragment shader's flow + halftone maths are preserved
 *   - no demo content of any kind lives in this component
 *   - the parent controls the dimensions; this fills its container
 *   - decorative: aria-hidden, not focusable, never blocks pointer events
 *
 * The reference palette is dark red -> red -> warm orange. The Corn & Cheese
 * palette is white / near-black / brand blue, so the colour ramp is exposed as
 * a `palette` prop: "ember" is the original reference ramp, "brand" is the
 * same ramp rotated onto #1677FF. The site uses "brand"; nothing about the
 * flow, halftone grid or motion changes between them.
 */

type EffectMode = "dark" | "light";
type Palette = "brand" | "ember";

export type HalftoneFlowProps = {
  mode?: EffectMode;
  palette?: Palette;
  hue?: number;
  saturation?: number;
  brightness?: number;
  /** Multiplies the flow speed. 1 matches the reference. */
  speed?: number;
  /** Halftone cell size in CSS pixels. Larger = coarser dots. */
  dotSize?: number;
  className?: string;
  style?: CSSProperties;
};

const clamp = (v: number, min: number, max: number) =>
  Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min;

/** [dark, mid, bright] colour stops, linear 0-1 RGB. */
const PALETTES: Record<Palette, [number[], number[], number[]]> = {
  ember: [
    [0.02, 0.0, 0.0],
    [0.8, 0.1, 0.05],
    [1.0, 0.6, 0.2],
  ],
  brand: [
    [0.004, 0.014, 0.04],
    [0.055, 0.34, 0.86],
    [0.62, 0.82, 1.0],
  ],
};

const VERT = `
attribute vec2 aVertexPosition;
void main() {
  gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_dotSize;
uniform float u_light;      // 0 = dark field, 1 = light field
uniform vec3  u_colDark;
uniform vec3  u_colMid;
uniform vec3  u_colBright;

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  // Organic flow field: rotate and fold the domain over time.
  vec2 flow_uv = p;
  float time = u_time * 0.4;

  for (float i = 1.0; i < 4.0; i++) {
    flow_uv *= rot(time * 0.1);
    flow_uv.x += sin(flow_uv.y * 2.0 * i + time) * 0.5;
    flow_uv.y += cos(flow_uv.x * 1.5 * i - time * 0.8) * 0.5;
  }

  float intensity = sin(flow_uv.x * 2.0 + flow_uv.y * 3.0) * 0.5 + 0.5;

  vec3 fluid = mix(u_colDark, u_colMid, smoothstep(0.2, 0.6, intensity));
  fluid = mix(fluid, u_colBright, smoothstep(0.7, 1.0, intensity));

  // Halftone: one dot per cell, radius driven by the flow intensity.
  vec2 cell_uv = fract(gl_FragCoord.xy / u_dotSize) - 0.5;
  float dist = length(cell_uv);
  float radius = intensity * 0.45;
  float dot_mask = smoothstep(radius, radius - 0.1, dist);

  vec3 field = mix(vec3(0.0), fluid, dot_mask) + fluid * 0.15;

  // Light field: same dots, inked onto white instead of glowing out of black.
  vec3 lightField = mix(vec3(1.0), u_colMid, dot_mask * intensity * 0.9);

  gl_FragColor = vec4(mix(field, lightField, u_light), 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error("HalftoneFlow shader:", gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HalftoneFlow({
  mode = "dark",
  palette = "brand",
  hue = 0,
  saturation = 1,
  brightness = 1,
  speed = 1,
  dotSize = 6,
  className,
  style,
}: HalftoneFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live-updating uniform values, read inside the render loop. Kept in a ref so
  // prop changes never restart the loop and never trigger a React re-render.
  const optionsRef = useRef({ palette, mode, speed, dotSize });
  optionsRef.current = { palette, mode, speed, dotSize };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      }) ||
        canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    // No WebGL: the CSS fallback background on the canvas element stands in.
    if (!gl) return;

    const context = gl;
    const vs = compile(context, context.VERTEX_SHADER, VERT);
    const fs = compile(context, context.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = context.createProgram();
    if (!program) return;
    context.attachShader(program, vs);
    context.attachShader(program, fs);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) return;
    context.useProgram(program);

    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]),
      context.STATIC_DRAW,
    );
    const aPos = context.getAttribLocation(program, "aVertexPosition");
    context.enableVertexAttribArray(aPos);
    context.vertexAttribPointer(aPos, 2, context.FLOAT, false, 0, 0);

    const uResolution = context.getUniformLocation(program, "u_resolution");
    const uTime = context.getUniformLocation(program, "u_time");
    const uDotSize = context.getUniformLocation(program, "u_dotSize");
    const uLight = context.getUniformLocation(program, "u_light");
    const uColDark = context.getUniformLocation(program, "u_colDark");
    const uColMid = context.getUniformLocation(program, "u_colMid");
    const uColBright = context.getUniformLocation(program, "u_colBright");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let width = 0;
    let height = 0;
    let contextLost = false;

    const resize = () => {
      // Cap DPR: the shader is fill-rate bound and 3x retina buys nothing here.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      context.viewport(0, 0, w, h);
    };

    const draw = (timeSeconds: number) => {
      const { palette: pal, mode: m, dotSize: ds } = optionsRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const [dark, mid, bright] = PALETTES[pal] ?? PALETTES.brand;

      context.uniform2f(uResolution, width, height);
      context.uniform1f(uTime, timeSeconds);
      context.uniform1f(uDotSize, clamp(ds, 3, 40) * dpr);
      context.uniform1f(uLight, m === "light" ? 1 : 0);
      context.uniform3f(uColDark, dark[0], dark[1], dark[2]);
      context.uniform3f(uColMid, mid[0], mid[1], mid[2]);
      context.uniform3f(uColBright, bright[0], bright[1], bright[2]);
      context.drawArrays(context.TRIANGLE_STRIP, 0, 4);
    };

    const start = performance.now();

    const loop = () => {
      if (contextLost) return;
      resize();
      draw(((performance.now() - start) / 1000) * clamp(optionsRef.current.speed, 0, 4));
      frame = requestAnimationFrame(loop);
    };

    // Reduced motion: paint one representative frame, then hold it.
    const renderStatic = () => {
      resize();
      draw(12);
    };

    const applyMotionPreference = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches) renderStatic();
      else frame = requestAnimationFrame(loop);
    };

    const onResize = () => {
      if (reduceMotion.matches) renderStatic();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
    };

    const onContextRestored = () => {
      contextLost = false;
      applyMotionPreference();
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onResize)
        : null;
    observer?.observe(canvas);
    window.addEventListener("resize", onResize);

    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", applyMotionPreference);
    } else {
      reduceMotion.addListener(applyMotionPreference);
    }

    applyMotionPreference();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      if (typeof reduceMotion.removeEventListener === "function") {
        reduceMotion.removeEventListener("change", applyMotionPreference);
      } else {
        reduceMotion.removeListener(applyMotionPreference);
      }
      // Release our GPU resources, but do NOT force-lose the context:
      // getContext() hands back the same context object for a given canvas, so
      // losing it here would leave a remount (React StrictMode, fast refresh)
      // holding a dead context on which every shader compile fails.
      context.deleteProgram(program);
      context.deleteShader(vs);
      context.deleteShader(fs);
      context.deleteBuffer(buffer);
    };
  }, []);

  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);
  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      tabIndex={-1}
      className={className}
      data-mode={mode === "light" ? "light" : "dark"}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        // Also the no-WebGL fallback colour.
        background: mode === "light" ? "#FFFFFF" : "#000000",
        pointerEvents: "none",
        filter,
        ...style,
      }}
    />
  );
}

export default HalftoneFlow;
