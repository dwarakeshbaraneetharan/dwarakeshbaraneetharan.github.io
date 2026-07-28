import { useEffect, useRef } from 'react'

/**
 * A full-viewport WebGL field: domain-warped simplex noise graded into the
 * theme's violet/citron palette. It drifts on its own, leans toward the
 * cursor, and shifts hue as the page scrolls.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uScroll;
uniform float uIntensity;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(1.52, 1.16, -1.16, 1.52);
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = rot * p;
    a *= 0.5;
  }
  return v;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // Normalising by the long edge keeps the noise at a comparable scale on a
  // wide desktop and a tall phone.
  float m0 = max(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / m0;

  vec3 VOID    = vec3(0.039, 0.035, 0.063);
  vec3 VIOLET  = vec3(0.541, 0.420, 1.000);
  vec3 VDEEP   = vec3(0.180, 0.110, 0.420);
  vec3 CITRON  = vec3(0.843, 1.000, 0.243);
  vec3 CORAL   = vec3(1.000, 0.416, 0.302);

  float t = uTime * 0.028;
  vec2 p = uv * 0.92;
  p.y += uScroll * 0.62;

  // Cursor bends the field toward itself without dragging it around.
  vec2 mp = (uMouse - 0.5) * uRes / m0;
  float md = length(uv - mp);
  p += (uv - mp) * 0.16 * exp(-md * 1.7);

  vec2 q = vec2(fbm(p + vec2(0.0, t)),
                fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 1.55 * q + vec2(1.7, 9.2) + 0.34 * t),
                fbm(p + 1.55 * q + vec2(8.3, 2.8) - 0.26 * t));
  float f = fbm(p + 1.7 * r);

  float field = clamp(f * 0.5 + 0.5, 0.0, 1.0);
  float bloom = smoothstep(0.46, 1.0, field);
  float vein  = pow(max(1.0 - abs(f * 1.7), 0.0), 9.0);

  // Build light additively on top of black, so most of the frame stays void.
  vec3 col = vec3(0.0);
  col += VDEEP  * pow(field, 2.4) * 0.90;
  col += VIOLET * pow(bloom, 2.2) * 0.26;
  col += CITRON * vein * 0.13;
  col += CORAL  * pow(bloom, 4.0) * 0.05 * smoothstep(0.35, 1.0, uScroll);

  // A slow wandering light source gives the frame some composition.
  vec2 sunPos = vec2(0.62 * sin(uTime * 0.041), 0.42 * cos(uTime * 0.033));
  col += mix(VDEEP, VIOLET, 0.55) * exp(-length(uv - sunPos) * 1.9) * 0.11;

  // A quiet bloom that follows the pointer.
  col += mix(CITRON, VIOLET, 0.45) * exp(-md * 3.8) * 0.045;

  // Hold the middle of the screen back; let the edges carry the light.
  float edge = smoothstep(0.10, 0.62, length(uv * vec2(0.9, 1.0)));
  col *= 0.20 + 0.80 * edge;

  col = VOID + col * uIntensity;

  // Ordered-ish dither: kills banding across these very dark gradients.
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 220.0;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** Everything tied to one WebGL context, thrown away if the GPU drops it. */
type Scene = {
  gl: WebGLRenderingContext
  program: WebGLProgram
  vs: WebGLShader
  fs: WebGLShader
  buffer: WebGLBuffer
  uRes: WebGLUniformLocation | null
  uTime: WebGLUniformLocation | null
  uMouse: WebGLUniformLocation | null
  uScroll: WebGLUniformLocation | null
  uIntensity: WebGLUniformLocation | null
}

function buildScene(canvas: HTMLCanvasElement): Scene | null {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs)
    if (fs) gl.deleteShader(fs)
    return null
  }

  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  )
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  // The canvas is already sized by the time we get here, and a rebuild won't
  // trigger a resize, so claim the viewport now.
  gl.viewport(0, 0, canvas.width, canvas.height)

  return {
    gl,
    program,
    vs,
    fs,
    buffer,
    uRes: gl.getUniformLocation(program, 'uRes'),
    uTime: gl.getUniformLocation(program, 'uTime'),
    uMouse: gl.getUniformLocation(program, 'uMouse'),
    uScroll: gl.getUniformLocation(program, 'uScroll'),
    uIntensity: gl.getUniformLocation(program, 'uIntensity'),
  }
}

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = { x: 0.5, y: 0.5 }
    const eased = { x: 0.5, y: 0.5 }
    let scroll = 0
    let easedScroll = 0
    let intensity = still ? 1 : 0
    let raf = 0
    let running = false
    let scene: Scene | null = null
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      const w = Math.floor(window.innerWidth * dpr)
      const h = Math.floor(window.innerHeight * dpr)
      if (canvas.width === w && canvas.height === h) return
      canvas.width = w
      canvas.height = h
      scene?.gl.viewport(0, 0, w, h)
    }

    const onPointer = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1 - e.clientY / window.innerHeight
    }

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      scroll = max > 0 ? window.scrollY / max : 0
    }

    const draw = (now: number) => {
      if (!scene) return
      const { gl } = scene
      const t = (now - start) / 1000

      eased.x += (target.x - eased.x) * 0.045
      eased.y += (target.y - eased.y) * 0.045
      easedScroll += (scroll - easedScroll) * 0.06
      intensity += (1 - intensity) * 0.012

      gl.uniform2f(scene.uRes, canvas.width, canvas.height)
      gl.uniform1f(scene.uTime, still ? 12 : t)
      gl.uniform2f(scene.uMouse, eased.x, eased.y)
      gl.uniform1f(scene.uScroll, easedScroll)
      gl.uniform1f(scene.uIntensity, intensity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      if (running && !still) raf = requestAnimationFrame(draw)
    }

    const play = () => {
      if (running || !scene || document.hidden) return
      running = true
      if (still) draw(start)
      else raf = requestAnimationFrame(draw)
    }

    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const release = () => {
      if (!scene) return
      // A lost context has already invalidated these; deleting would be a no-op.
      if (!scene.gl.isContextLost()) {
        scene.gl.deleteProgram(scene.program)
        scene.gl.deleteShader(scene.vs)
        scene.gl.deleteShader(scene.fs)
        scene.gl.deleteBuffer(scene.buffer)
      }
      scene = null
    }

    // Without preventDefault the browser never offers the context back, which
    // is how a backgrounded tab ends up with a permanently blank canvas.
    const onLost = (e: Event) => {
      e.preventDefault()
      pause()
      scene = null
    }

    const onRestored = () => {
      scene = buildScene(canvas)
      play()
    }

    const onVisibility = () => {
      if (document.hidden) pause()
      else play()
    }

    resize()
    onScroll()
    scene = buildScene(canvas)

    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    play()

    return () => {
      pause()
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      release()
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 55% at 50% 42%, rgba(10,9,16,0.86) 0%, rgba(10,9,16,0.45) 58%, rgba(10,9,16,0) 100%)',
        }}
      />
    </div>
  )
}
