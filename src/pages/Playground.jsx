import { useEffect, useRef } from "react";
import PortfolioShell from "../components/PortfolioShell";
import StatusBadges from "../components/StatusBadges";
import { playground } from "../data/home";

// One cell of the endless grid. Tiles alternate across it and every other row
// is shifted half a cell, so two projects never line up into obvious columns.
const CELL_W = 560;
const CELL_H = 520;
const TILE_W = 400;
const IMAGE_H = 300;
const CAPTION_H = 110;
const FRICTION = 0.94;
const BACKGROUND = "#151515";
// How hard the rim bends. Content at the very edge of the frame is sampled from
// this far beyond it, so everything near the border is squeezed and curved.
const LENS = 0.42;
const TITLE_FONT = 'italic 500 30px "Cormorant Garamond", Georgia, serif';
const NOTE_FONT = '400 21px "Cormorant Garamond", Georgia, serif';

const mod = (n, m) => ((n % m) + m) % m;

// The same curve the shader applies, so a press can be traced back through the
// glass to the tile that is actually drawn under it. `p` runs -1..1 on each
// axis; the rounded-square radius keeps the bend even along every edge instead
// of gathering in the corners.
function warp(px, py, k = LENS) {
  const r = Math.pow(px ** 4 + py ** 4, 0.25);
  const f = 1 + k * Math.pow(r, 6);
  return [px * f, py * f];
}

const VERTEX = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// The flat scene is drawn once into a 2D canvas, then looked at through this
// lens. Toward the rim each colour channel is bent by a slightly different
// amount and smeared along the radius, which is what gives the reference its
// rainbow-streaked, folded-over edges. The middle stays untouched.
const FRAGMENT = `
precision mediump float;
uniform sampler2D u_scene;
uniform float u_k;
varying vec2 v_uv;
const vec3 BG = vec3(0.0824);

vec3 look(vec2 p, float k) {
  vec2 a = abs(p);
  float r = pow(pow(a.x, 4.0) + pow(a.y, 4.0), 0.25);
  vec2 q = p * (1.0 + k * pow(r, 6.0));
  vec2 uv = q * 0.5 + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return BG;
  return texture2D(u_scene, uv).rgb;
}

void main() {
  vec2 p = v_uv * 2.0 - 1.0;
  vec2 a = abs(p);
  float r = pow(pow(a.x, 4.0) + pow(a.y, 4.0), 0.25);
  float edge = smoothstep(0.55, 1.0, r);
  vec3 col = vec3(0.0);
  for (int i = 0; i < 6; i++) {
    float t = float(i) / 5.0 - 0.5;
    float k = u_k * (1.0 + t * 0.35 * edge);
    col.r += look(p, k * (1.0 + 0.10 * edge)).r;
    col.g += look(p, k).g;
    col.b += look(p, k * (1.0 - 0.10 * edge)).b;
  }
  gl_FragColor = vec4(col / 6.0, 1.0);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function setupLens(canvas) {
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1f(gl.getUniformLocation(program, "u_k"), LENS);

  return (scene) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, scene);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}

function wrapLines(ctx, text, width) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

// Every tile in view, in flat (pre-lens) frame coordinates.
function layout(s, w, h) {
  const tiles = [];
  const startX = Math.floor(-s.x / CELL_W) - 2;
  const startY = Math.floor(-s.y / CELL_H) - 1;
  const cols = Math.ceil(w / CELL_W) + 4;
  const rows = Math.ceil(h / CELL_H) + 3;
  for (let iy = startY; iy < startY + rows; iy++) {
    for (let ix = startX; ix < startX + cols; ix++) {
      tiles.push({
        item: playground[mod(ix + iy, playground.length)],
        x: ix * CELL_W + s.x + (mod(iy, 2) ? CELL_W / 2 : 0) + (CELL_W - TILE_W) / 2,
        y: iy * CELL_H + s.y,
      });
    }
  }
  return tiles;
}

export default function Playground() {
  const frame = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const el = frame.current;
    const canvas = canvasRef.current;
    const scene = document.createElement("canvas");
    const ctx = scene.getContext("2d");
    const lens = setupLens(canvas);
    // Without WebGL the flat scene is shown as it is: no bend, still usable.
    const out = lens ? null : canvas.getContext("2d");

    const s = { x: 0, y: 0, vx: 0, vy: 0, down: null, moved: 0, w: 0, h: 0, dirty: true, placed: false };
    const images = new Map();
    for (const item of playground) {
      const img = new Image();
      img.onload = () => (s.dirty = true);
      img.src = item.image;
      images.set(item.image, img);
    }
    document.fonts?.load(TITLE_FONT).then(() => (s.dirty = true));
    document.fonts?.load(NOTE_FONT).then(() => (s.dirty = true));

    const measure = () => {
      const box = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // On a phone the whole grid is drawn smaller, so a tile still fits
      // inside the clear middle of the lens. s.w and s.h are in grid units.
      s.zoom = Math.min(1, box.width / 620);
      s.w = box.width / s.zoom;
      s.h = box.height / s.zoom;
      s.dpr = dpr;
      for (const c of [scene, canvas]) {
        c.width = Math.round(box.width * dpr);
        c.height = Math.round(box.height * dpr);
      }
      // Open on a whole tile sitting in the clear middle of the lens.
      if (!s.placed && box.width) {
        s.x = s.w / 2 - CELL_W / 2;
        s.y = s.h / 2 - (IMAGE_H + CAPTION_H) / 2;
        s.placed = true;
      }
      s.dirty = true;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const draw = () => {
      ctx.setTransform(s.dpr * s.zoom, 0, 0, s.dpr * s.zoom, 0, 0);
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, s.w, s.h);
      for (const t of layout(s, s.w, s.h)) {
        const img = images.get(t.item.image);
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(t.x, t.y, TILE_W, IMAGE_H, 10);
        ctx.clip();
        ctx.fillStyle = "#222";
        ctx.fillRect(t.x, t.y, TILE_W, IMAGE_H);
        if (img.complete && img.naturalWidth) {
          // Cover-fit: crop the picture to the tile rather than letterbox it.
          const scale = Math.max(TILE_W / img.naturalWidth, IMAGE_H / img.naturalHeight);
          const dw = img.naturalWidth * scale;
          const dh = img.naturalHeight * scale;
          ctx.drawImage(img, t.x + (TILE_W - dw) / 2, t.y + (IMAGE_H - dh) / 2, dw, dh);
        }
        ctx.restore();

        ctx.fillStyle = "#fff";
        ctx.font = TITLE_FONT;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(t.item.title, t.x, t.y + IMAGE_H + 36);
        ctx.fillStyle = "#8a8a8a";
        ctx.font = NOTE_FONT;
        wrapLines(ctx, t.item.note, TILE_W).forEach((line, i) =>
          ctx.fillText(line, t.x, t.y + IMAGE_H + 64 + i * 24),
        );
      }
      if (lens) lens(scene);
      else {
        out.drawImage(scene, 0, 0);
      }
    };

    // Coasting after a drag: velocity decays, position keeps moving, and the
    // scene is only redrawn while something has changed.
    let raf;
    const tick = () => {
      if (!s.down && (Math.abs(s.vx) > 0.05 || Math.abs(s.vy) > 0.05)) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= FRICTION;
        s.vy *= FRICTION;
        s.dirty = true;
      }
      if (s.dirty && s.w) {
        s.dirty = false;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Traces a screen point back through the lens to the tile drawn there.
    const tileAt = (clientX, clientY) => {
      const box = el.getBoundingClientRect();
      const px = ((clientX - box.left) / box.width) * 2 - 1;
      const py = ((clientY - box.top) / box.height) * 2 - 1;
      const [qx, qy] = lens ? warp(px, py) : [px, py];
      if (Math.abs(qx) > 1 || Math.abs(qy) > 1) return null;
      const x = ((qx + 1) / 2) * s.w;
      const y = ((qy + 1) / 2) * s.h;
      return (
        layout(s, s.w, s.h).find(
          (t) => x >= t.x && x <= t.x + TILE_W && y >= t.y && y <= t.y + IMAGE_H + CAPTION_H,
        ) ?? null
      );
    };

    // The press is judged at pointerup rather than through a click event:
    // the frame holds pointer capture for the drag, so the browser's click
    // would land on the frame, never on a tile.
    const onDown = (e) => {
      s.down = { x: e.clientX, y: e.clientY };
      s.moved = 0;
      s.vx = s.vy = 0;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (!s.down) {
        el.style.cursor = tileAt(e.clientX, e.clientY) ? "pointer" : "grab";
        return;
      }
      const dx = e.clientX - s.down.x;
      const dy = e.clientY - s.down.y;
      s.down = { x: e.clientX, y: e.clientY };
      s.moved += Math.abs(dx) + Math.abs(dy);
      s.x += dx / s.zoom;
      s.y += dy / s.zoom;
      s.vx = dx / s.zoom;
      s.vy = dy / s.zoom;
      s.dirty = true;
      if (s.moved > 6) el.style.cursor = "grabbing";
    };
    const onUp = (e) => {
      if (!s.down) return;
      s.down = null;
      if (s.moved <= 6) {
        const hit = tileAt(e.clientX, e.clientY);
        if (hit) window.open(hit.item.href, "_blank", "noopener,noreferrer");
      }
      el.style.cursor = tileAt(e.clientX, e.clientY) ? "pointer" : "grab";
    };
    const onCancel = () => (s.down = null);
    const onWheel = (e) => {
      e.preventDefault();
      s.x -= e.deltaX;
      s.y -= e.deltaY;
      s.dirty = true;
    };
    const onKey = (e) => {
      if (e.target.closest?.("a, button, input, textarea")) return;
      const step = 14;
      if (e.key === "ArrowLeft") s.vx += step;
      else if (e.key === "ArrowRight") s.vx -= step;
      else if (e.key === "ArrowUp") s.vy += step;
      else if (e.key === "ArrowDown") s.vy -= step;
      else return;
      e.preventDefault();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <PortfolioShell activeTab="Playground" badges={<StatusBadges />}>
      {/* The negative margins undo the column's gutter, so the canvas runs
          right to the rail, the window's edge and the bottom of the screen —
          the lens bends against the real border, not an inset box. */}
      <div
        ref={frame}
        className="relative -mx-4 -mb-12 -mt-4 h-[80svh] cursor-grab touch-none select-none overflow-hidden sm:-mx-10 sm:-my-8 lg:-mb-9 lg:-mt-8 lg:h-auto lg:flex-1"
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />

        {/* The tiles are pixels, so the links live here too for keyboard and
            screen-reader users. They stay out of sight until focused. */}
        <nav aria-label="Playground projects" className="absolute left-4 top-4 flex flex-col gap-2">
          {playground.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="sr-only rounded-full bg-[#141414] px-4 py-2 text-[13px] text-white focus:not-sr-only focus:outline-2 focus:outline-[var(--accent)]"
            >
              {item.title} — {item.note}
            </a>
          ))}
        </nav>

        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#141414]/85 px-4 py-2 text-[13px] text-[#aaa] backdrop-blur-md">
          Drag, scroll or use the arrow keys
        </div>
      </div>
    </PortfolioShell>
  );
}
