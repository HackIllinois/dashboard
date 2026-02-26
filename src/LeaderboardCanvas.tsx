import { useEffect, useMemo, useRef } from "react";
import avatar1 from "./assets/avatar1.svg";
import avatar2 from "./assets/avatar2.svg";
import avatar3 from "./assets/avatar3.svg";
import avatar4 from "./assets/avatar4.svg";
import avatar5 from "./assets/avatar5.svg";

type Player = {
  displayName: string;
  points: number;
  avatarUrl?: string;
};

type Props = {
  players: Player[];
  backgroundImage: string;
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const hashStr = (s: string) => {
  let h = 21661362632;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const rand01 = (key: string, salt: string) => {
  const h = hashStr(key + "|" + salt);
  return (h % 10000) / 10000;
};

function pickAvatarKey(p: Player) {
  const u = p.avatarUrl ?? "";
  if (u.includes("character1.png")) return 1;
  if (u.includes("character2.png")) return 2;
  if (u.includes("character3.png")) return 3;
  if (u.includes("character4.png")) return 4;
  if (u.includes("character5.png")) return 5;
  return 1;
}

function pickShadowColor(p: Player) {
  const u = p.avatarUrl ?? "";
  if (u.includes("character1.png")) return "orange";
  if (u.includes("character2.png")) return "green";
  if (u.includes("character3.png")) return "purple";
  if (u.includes("character4.png")) return "deepskyblue";
  if (u.includes("character5.png")) return "red";
  return "orange";
}

export default function LeaderboardCanvas({ players, backgroundImage }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const smoothRef = useRef<Record<string, { x: number; y: number }>>({});
  const seedRef = useRef<number>(0);

  const avatarSrcs = useMemo(
    () => ({ 1: avatar1, 2: avatar2, 3: avatar3, 4: avatar4, 5: avatar5 }),
    []
  );

  const getImage = (src: string) => {
    const cache = imgCacheRef.current;
    const existing = cache.get(src);
    if (existing) return existing;

    const img = new Image();
    img.src = src;
    cache.set(src, img);
    return img;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const resizeToCSS = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeToCSS();
    const ro = new ResizeObserver(resizeToCSS);
    ro.observe(canvas);

    const start = performance.now();
    const duration = 8000;

    const tick = (now: number) => {
      const t = ((now - start) % duration) / duration;

      seedRef.current = Math.floor(Date.now() / 200000);

      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      ctx.clearRect(0, 0, W, H);

      const topN = players.slice(0, 7);
      const n = Math.max(1, topN.length);

      for (let i = 0; i < topN.length; i++) {
        const p = topN[i];
        const key = String(p.displayName);

        const targetBaseX = 15 + rand01(key, "x|" + seedRef.current) * 65;
        const targetYJitter = (rand01(key, "y|" + seedRef.current) - 0.5) * 3;

        const targetYBase = 16 + (87 / n) * i;
        const targetY = clamp(targetYBase + targetYJitter, 16, 93);

        const cur = (smoothRef.current[key] ??= { x: targetBaseX, y: targetY });
        const a = 0.002;
        cur.x += (targetBaseX - cur.x) * a;
        cur.y += (targetY - cur.y) * a;

        const phase = rand01(key, "phase") * Math.PI * 2;
        const floatAmp = 7;
        const randSpeed = Math.floor(rand01(key, "phase12") * 3) + 2;

        const phase3 = rand01(key, "phrase3") * Math.PI * 2;
        const floatAmp3 = 3;
        const randSpeed3 = Math.floor(rand01(key, "phase32") * 1) + 4;

        const xPct =
          cur.x +
          Math.sin(randSpeed * t * Math.PI * 2 + phase) * floatAmp +
          Math.sin(randSpeed3 * t * Math.PI * 2 + phase3) * floatAmp3;

        const phase2 = rand01(key, "phase2") * Math.PI * 2;
        const floatAmp2 = 1;
        const randSpeed2 = Math.floor(rand01(key, "phrase24") * 2) + 1;

        const phase4 = rand01(key, "phase4") * Math.PI * 2;
        const floatAmp4 = 1;
        const randSpeed4 = Math.floor(rand01(key, "phase42") * 1) + 2;

        const yPct =
          cur.y +
          Math.sin(randSpeed2 * t * Math.PI * 2 + phase2) * floatAmp2 +
          Math.sin(randSpeed4 * t * Math.PI * 2 + phase4) * floatAmp4;

        const phase5 = rand01(key, "phase57");
        const floatAmp5 = 6;
        const randSpeed5 = Math.floor(rand01(key, "phrase53") * 2) + 1;
        const turn = Math.sin(randSpeed5 * t * Math.PI * 2 + phase5) * floatAmp5;

        const x = (xPct / 100) * W;
        const y = (yPct / 100) * H;

        const isFirst = i === 0;
        const vh = window.innerHeight / 100;
        const avatarSize = (isFirst ? 6 : 5) * vh;

        const avatarKey = pickAvatarKey(p);
        const avatarSrc = avatarSrcs[avatarKey];

        const img = getImage(avatarSrc);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((turn * Math.PI) / 180);
        ctx.shadowColor = pickShadowColor(p);
        ctx.shadowBlur = isFirst ? 16 : 12;

        if (img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, -avatarSize / 2, -avatarSize / 2, avatarSize, avatarSize);
        }
        ctx.restore();

        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "#EFFFF0";
        ctx.font = "700 2.2vh Tsukimi Rounded, sans-serif";
        ctx.shadowColor = "rgba(0,0,0,0.9)";
        ctx.shadowBlur = 1.2 * vh;
        ctx.fillText(String(p.points), x, y + 1 * vh);
        ctx.restore();

        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "#DDFFE4";
        ctx.font = "700 1.9vh Tsukimi Rounded, sans-serif";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 1.5 * vh;

        const name = p.displayName ?? "";
        const maxWidth = 16 * vh;
        let shown = name;
        while (shown.length > 0 && ctx.measureText(shown).width > maxWidth) shown = shown.slice(0, -1);
        if (shown !== name) shown = shown.slice(0, Math.max(0, shown.length - 1)) + "…";

        ctx.fillText(shown, x, y + avatarSize / 2 + 2.4 * vh);
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [players, avatarSrcs]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "3.5vh",
        border: "0.13vh solid #00FF2B",
        overflow: "hidden",
        backgroundImage,
        backgroundSize: "100% 100%, 100% 100%, 14% 10%, 10% 10%, 10% 10%, 10% 10%",
        backgroundRepeat: "no-repeat, no-repeat, repeat, repeat",
        backgroundPosition: "center, center, 0 0, 0 0",
      }}
    >
      <div
        style={{
          fontSize: "2.8vh",
          fontFamily: "Tsukimi Rounded",
          color: "#DDFFE4",
          textShadow: "0 0 .8vh rgba(0,0,0,0.9), 0 0.3vh 0.5vh rgba(0,0,0,0.8)",
          marginTop: "1.5vh",
          marginBottom: 0,
          position: "relative",
          zIndex: 2,
          fontWeight:700
        }}
      >
        LEADERBOARD
      </div>

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}