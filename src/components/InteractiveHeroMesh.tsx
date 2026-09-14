import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface InteractiveHeroMeshProps {
  className?: string;
}

export const InteractiveHeroMesh: React.FC<InteractiveHeroMeshProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDark, currentTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    // Mouse tracking with smooth lerp
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
      radius: 180,
    };

    // Node particle system for kinetic mesh
    const nodeCount = Math.min(Math.floor((width * height) / 11000), 75);
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      phase: number;
      speed: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2 + 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.02,
      });
    }

    // Colors according to theme
    const getColors = () => {
      if (currentTheme === "emerald") {
        return {
          node: "rgba(16, 185, 129, 0.8)",
          line: "rgba(16, 185, 129, ",
          glow: "rgba(5, 150, 105, 0.35)",
          wave1: "rgba(16, 185, 129, 0.08)",
          wave2: "rgba(6, 95, 70, 0.05)",
        };
      } else if (currentTheme === "midnight") {
        return {
          node: "rgba(168, 85, 247, 0.85)",
          line: "rgba(168, 85, 247, ",
          glow: "rgba(139, 92, 246, 0.35)",
          wave1: "rgba(168, 85, 247, 0.08)",
          wave2: "rgba(88, 28, 135, 0.05)",
        };
      } else if (!isDark) {
        // Studio Light Mode
        return {
          node: "rgba(37, 99, 235, 0.65)",
          line: "rgba(59, 130, 246, ",
          glow: "rgba(191, 219, 254, 0.5)",
          wave1: "rgba(219, 234, 254, 0.4)",
          wave2: "rgba(238, 242, 255, 0.3)",
        };
      } else {
        // Default HyperScale Dark
        return {
          node: "rgba(0, 229, 255, 0.85)",
          line: "rgba(59, 130, 246, ",
          glow: "rgba(0, 229, 255, 0.3)",
          wave1: "rgba(37, 99, 235, 0.12)",
          wave2: "rgba(0, 229, 255, 0.06)",
        };
      }
    };

    let colors = getColors();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      colors = getColors();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let tick = 0;

    const render = () => {
      tick++;
      // Smooth lerp mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Kinetic Undulating Gradient Mesh Wave Background
      const grad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        20,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.75,
      );
      grad.addColorStop(0, colors.glow);
      grad.addColorStop(0.5, colors.wave1);
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Undulating Sinusoidal Energy Lines across bottom
      ctx.beginPath();
      ctx.strokeStyle = colors.wave1;
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= width; x += 15) {
        const y =
          height * 0.65 +
          Math.sin(x * 0.005 + tick * 0.02) * 25 +
          Math.cos(x * 0.008 + tick * 0.015) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = colors.wave2;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 15) {
        const y =
          height * 0.72 +
          Math.sin(x * 0.004 - tick * 0.018) * 30 +
          Math.cos(x * 0.01 + tick * 0.012) * 18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Update & Draw Particles with Mouse Reaction Physics
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += n.speed;

        // Base wandering
        n.x += n.vx;
        n.y += n.vy;

        // Bounce at boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse displacement repulsion / attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 3.5;
          const angle = Math.atan2(dy, dx);
          n.x -= Math.cos(angle) * force;
          n.y -= Math.sin(angle) * force;
        }

        // Draw node
        const nodePulse = Math.sin(n.phase) * 0.6 + 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * nodePulse, 0, Math.PI * 2);
        ctx.fillStyle = colors.node;
        ctx.fill();

        // Connect nearby nodes with dynamic alpha lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const distBetween = Math.hypot(n.x - n2.x, n.y - n2.y);
          const maxDist = 135;

          if (distBetween < maxDist) {
            const alpha = (1 - distBetween / maxDist) * (isDark ? 0.35 : 0.22);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `${colors.line}${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDark, currentTheme]);

  return (
    <div
      className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ filter: isDark ? "blur(0.4px)" : "none" }}
      />
      {/* Vignette mask overlay for seamless layout integration */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[var(--bg-canvas)] opacity-90" />
    </div>
  );
};
