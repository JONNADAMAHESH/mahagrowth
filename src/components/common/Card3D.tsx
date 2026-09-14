import React, { useRef, useState, ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  depth?: number;
  glareOpacity?: number;
  interactive?: boolean;
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  maxTilt = 10,
  depth = 30,
  glareOpacity = 0.15,
  interactive = true,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (interactive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-2xl transition-transform ease-out ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="w-full h-full rounded-2xl relative transition-all duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg) translateZ(${depth}px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `${-rotation.y * 1.5}px ${rotation.x * 1.5 + 20}px 35px -5px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(56, 189, 248, 0.15)`
            : undefined,
        }}
      >
        {children}

        {/* Dynamic Specular 3D Glare Sheen */}
        {interactive && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden"
            style={{
              opacity: isHovered ? glareOpacity : 0,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.8) 0%, rgba(56, 189, 248, 0.2) 25%, transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
