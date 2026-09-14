import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Cpu, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

interface Interactive3DCoreProps {
  onSelectNode?: (label: string) => void;
}

export const Interactive3DCore: React.FC<Interactive3DCoreProps> = ({
  onSelectNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<string | null>(
    "Neural Core Engine",
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -18,
      y: (x / (rect.width / 2)) * 18,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const nodes = [
    {
      id: "neural",
      label: "Neural Core Engine",
      role: "LLM & Cognitive Router",
      icon: Cpu,
      pos: "top-4 left-4",
    },
    {
      id: "automation",
      label: "Autonomous Mesh",
      role: "Zero-Latency Execution",
      icon: Zap,
      pos: "top-4 right-4",
    },
    {
      id: "analytics",
      label: "Predictive Horizon",
      role: "99.8% Precision Forecasting",
      icon: Activity,
      pos: "bottom-4 left-4",
    },
    {
      id: "security",
      label: "Enterprise Perimeter",
      role: "SOC2 & 256-Bit Guardrails",
      icon: ShieldCheck,
      pos: "bottom-4 right-4",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Dynamic 3D Scene Root */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer 3D Orbital Ring 1 */}
        <div
          className="absolute w-[360px] h-[360px] rounded-full border border-neutral-900 dark:border-white pointer-events-none animate-[spin_24s_linear_infinite]"
          style={{
            transform: "rotateX(65deg) rotateY(15deg) translateZ(-20px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-900 dark:bg-white rounded-full shadow-xs" />
          <div className="absolute bottom-4 right-1/4 w-2 h-2 bg-neutral-600 rounded-full" />
        </div>

        {/* Outer 3D Orbital Ring 2 (Counter-rotation & reverse tilt) */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-neutral-900 dark:border-white pointer-events-none animate-[spin_18s_linear_infinite_reverse]"
          style={{
            transform: "rotateX(-55deg) rotateY(35deg) translateZ(10px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-neutral-900 dark:bg-white rounded-full" />
        </div>

        {/* Outer 3D Orbital Ring 3 (High angle) */}
        <div
          className="absolute w-[240px] h-[240px] rounded-full border border-neutral-900 dark:border-white pointer-events-none animate-[spin_12s_linear_infinite]"
          style={{
            transform: "rotateX(40deg) rotateY(-45deg) translateZ(25px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-800 rounded-full" />
        </div>

        {/* Central Monochromatic Core with 3D Depth */}
        <div
          className="relative w-36 h-36 rounded-full flex items-center justify-center cursor-pointer group"
          style={{
            transform: "translateZ(45px)",
            transformStyle: "preserve-3d",
          }}
          onClick={() => {
            setActiveNode("Neural Core Engine");
            if (onSelectNode) onSelectNode("Neural Core Engine");
          }}
        >
          <div className="relative w-28 h-28 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-900 dark:border-white p-4 shadow-xl flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:scale-105">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white border border-neutral-800 flex items-center justify-center mb-2">
              <Cpu className="w-5 h-5 text-white dark:text-neutral-900 animate-spin [animation-duration:8s]" />
            </div>
            <span className="text-[10px] font-mono tracking-wider font-bold text-white dark:text-neutral-900 uppercase">
              MAHA
            </span>
            <span className="text-[9px] text-neutral-400 font-mono">
              CORE v3.0
            </span>
          </div>

          {/* Scanning bar */}
          <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px] animate-[bounce_3s_ease-in-out_infinite]" />
        </div>

        {/* 4 Interactive Corner Nodes Floating in 3D Space */}
        {nodes.map((n) => {
          const Icon = n.icon;
          const isCurrent = activeNode === n.label;
          return (
            <div
              key={n.id}
              onClick={() => {
                setActiveNode(n.label);
                if (onSelectNode) onSelectNode(n.label);
              }}
              className={`absolute ${n.pos} p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer ${
                isCurrent
                  ? "bg-white dark:bg-neutral-900 dark:bg-white border-2 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-lg scale-105"
                  : "bg-white dark:bg-neutral-900 dark:bg-white/95 border-neutral-300 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 hover:scale-102 shadow-xs"
              }`}
              style={{
                transform: "translateZ(30px)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 shadow-xs">
                  <Icon className="w-3.5 h-3.5 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                    {n.label}
                  </div>
                  <div className="text-[9px] text-neutral-500 dark:text-neutral-400 font-mono">
                    {n.role}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Real-time telemetry label */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-900 dark:bg-white border border-neutral-800 text-[10px] font-mono text-white dark:text-neutral-900 backdrop-blur-sm flex items-center gap-1.5 shadow-md"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900 animate-ping" />
          <span>Interactive 3D Core • Tilt &amp; Explore</span>
        </div>
      </div>
    </div>
  );
};
