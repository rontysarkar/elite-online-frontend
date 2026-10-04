"use client";

import { useEffect, useRef, useState } from "react";
import { Wifi } from "lucide-react";


const ROUTER = { x: 260, y: 260 };
const INTERNET = { x: 260, y: 52 };

const NODES = [
  { icon: "📱", pos: "left-[20%] top-[28%]", x: 104, y: 146, delay: "0s" },
  { icon: "💻", pos: "left-[80%] top-[28%]", x: 416, y: 146, delay: "-1.2s" },
  { icon: "🎮", pos: "left-[20%] top-[76%]", x: 104, y: 395, delay: "-2.4s" },
  { icon: "📺", pos: "left-[80%] top-[76%]", x: 416, y: 395, delay: "-3.6s" },
];


function lane(x1: number, y1: number, x2: number, y2: number, off: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const nx = (-dy / len) * off;
  const ny = (dx / len) * off;
  return `M${x1 + nx} ${y1 + ny} L${x2 + nx} ${y2 + ny}`;
}


function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

function useLiveValue(base: number, jitter: number, active: boolean, ms = 1800) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setValue(Math.round(base + (Math.random() * 2 - 1) * jitter));
    }, ms);
    return () => clearInterval(id);
  }, [base, jitter, active, ms]);
  return value;
}


function Dot({
  path,
  className,
  dur,
  begin,
}: {
  path: string;
  className: string;
  dur: number;
  begin: number;
}) {
  return (
    <circle r="3.5" fill="currentColor" opacity="0" className={className}>
      <animateMotion
        path={path}
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.15;0.85;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function LiveStat({
  label,
  base,
  jitter,
  unit,
  active,
  variant = "card",
}: {
  label: string;
  base: number;
  jitter: number;
  unit: string;
  active: boolean;
  variant?: "card" | "primary";
}) {
  const value = useLiveValue(base, jitter, active);
  const primary = variant === "primary";
  return (
    <div
      className={
        primary
          ? "rounded-xl bg-primary px-3 py-2 text-white shadow-lg"
          : "rounded-xl border bg-card px-3 py-2 shadow-sm"
      }
    >
      <p className={`text-[10px] ${primary ? "text-white/70" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className="text-sm font-bold tabular-nums">
        {value} {unit}
      </p>
    </div>
  );
}


export function NetworkVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const visible = useInView(rootRef);

  
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (visible) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [visible]);

  return (
    <div
      ref={rootRef}
      data-paused={!visible}
      className="nv-root relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[520px] [perspective:1100px]"
    >
      <style>{`
        @keyframes nv-sway {
          0%,100% { transform: rotateX(14deg) rotateY(-8deg); }
          50%     { transform: rotateX(9deg)  rotateY(8deg); }
        }
        @keyframes nv-float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
        @keyframes nv-ring {
          0%   { transform: scale(1);   opacity: .45; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .nv-sway { animation: nv-sway 14s ease-in-out infinite; will-change: transform; }
        .nv-float { animation: nv-float 4.8s ease-in-out infinite; }
        .nv-ring { animation: nv-ring 2.8s ease-out infinite; }
        .nv-root[data-paused="true"] .nv-sway,
        .nv-root[data-paused="true"] .nv-float,
        .nv-root[data-paused="true"] .nv-ring { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .nv-sway, .nv-float, .nv-ring { animation: none !important; }
          .nv-dots { display: none; }
        }
      `}</style>


      <div className="absolute inset-16 rounded-full bg-primary/10 blur-3xl" />


      <div className="nv-sway absolute inset-0 [transform-style:preserve-3d]">

        <div className="absolute left-1/2 top-1/2 h-24 w-48 -translate-x-1/2 translate-y-10 rounded-full bg-primary/20 blur-2xl" />

    
        <svg
          ref={svgRef}
          viewBox="0 0 520 520"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >

          {[INTERNET, ...NODES].map((n, i) => (
            <path
              key={i}
              d={`M${ROUTER.x} ${ROUTER.y} L${n.x} ${n.y}`}
              className="stroke-primary/25"
              strokeWidth="1.5"
              strokeDasharray="3 6"
              fill="none"
            />
          ))}

          <g className="nv-dots">
    
            <Dot
              path={lane(INTERNET.x, INTERNET.y, ROUTER.x, ROUTER.y, 6)}
              className="text-primary"
              dur={1.8}
              begin={0}
            />
            <Dot
              path={lane(INTERNET.x, INTERNET.y, ROUTER.x, ROUTER.y, 6)}
              className="text-primary"
              dur={1.8}
              begin={0.9}
            />
            <Dot
              path={lane(ROUTER.x, ROUTER.y, INTERNET.x, INTERNET.y, 6)}
              className="text-emerald-500"
              dur={2.4}
              begin={0.4}
            />

           
            {NODES.map((n, i) => {
              const down = lane(ROUTER.x, ROUTER.y, n.x, n.y, 6);
              const up = lane(n.x, n.y, ROUTER.x, ROUTER.y, 6);
              const dur = 2 + i * 0.3;
              return (
                <g key={i}>
                  <Dot path={down} className="text-primary" dur={dur} begin={i * 0.25} />
                  <Dot path={down} className="text-primary" dur={dur} begin={i * 0.25 + dur / 2} />
                  <Dot path={up} className="text-emerald-500" dur={dur + 0.6} begin={i * 0.4 + 0.3} />
                </g>
              );
            })}
          </g>
        </svg>


        <div
          className="absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%,-50%) translateZ(50px)" }}
        >
          <div className="nv-float rounded-full border bg-card px-5 py-2 text-sm font-semibold shadow-md">
            ☁️ Internet
          </div>
        </div>


        <div
          className="absolute left-1/2 top-1/2"
          style={{ transform: "translate(-50%,-50%) translateZ(80px)" }}
        >
          <div className="relative h-28 w-28">
            <div className="nv-ring absolute inset-0 rounded-3xl border-2 border-primary/40" />
            <div
              className="nv-ring absolute inset-0 rounded-3xl border-2 border-primary/40"
              style={{ animationDelay: "-1.4s" }}
            />
            <div className="relative flex h-full w-full items-center justify-center rounded-3xl border bg-gradient-to-br from-card to-muted shadow-[0_8px_0_0_rgba(41,171,226,0.28),0_24px_50px_rgba(41,171,226,0.3)]">
              <Wifi className="h-14 w-14 text-primary" />
            </div>
          </div>
        </div>


        {NODES.map((n, i) => (
          <div
            key={i}
            className={`absolute ${n.pos}`}
            style={{ transform: "translate(-50%,-50%) translateZ(45px)" }}
          >
            <div
              className="nv-float flex h-14 w-14 items-center justify-center rounded-2xl border bg-card text-2xl shadow-[0_6px_0_0_rgba(0,0,0,0.06),0_14px_24px_rgba(0,0,0,0.12)]"
              style={{ animationDelay: n.delay }}
            >
              {n.icon}
            </div>
          </div>
        ))}


        <div
          className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-2"
          style={{ transform: "translateY(0%) translateZ(95px)" }}
        >
          <LiveStat label="↓ Download" base={96} jitter={4} unit="Mbps" active={visible} variant="primary" />
          <LiveStat label="↑ Upload" base={46} jitter={4} unit="Mbps" active={visible} />
        </div>

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ transform: "translateY(-50%) translateZ(95px)" }}
        >
          <LiveStat label="Ping" base={4} jitter={1} unit="ms" active={visible} />
        </div>

  
        <div
          className="absolute bottom-[4%] left-1/2"
          style={{ transform: "translateX(-50%) translateZ(60px)" }}
        >
          <div className="rounded-full border bg-card px-5 py-2 text-xs font-semibold text-primary shadow-sm">
            ▂▃▅▇ Unlimited
          </div>
        </div>
      </div>
    </div>
  );
}