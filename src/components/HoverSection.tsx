import { useState, useEffect, useRef } from 'react';

export default function HoverSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  const textContent = (
    <div className="flex flex-col justify-center h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="font-mono text-[#00FFFF] text-xs sm:text-sm mb-12 sm:mb-16">
        $ whoami — DevOps Engineer | System Thinker
      </div>
      
      <div className="font-sans font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.85] uppercase">
        <div>I QUESTION</div>
        <div>FRAGILE</div>
        <div>SYSTEMS</div>
      </div>

      <div className="font-mono text-xs sm:text-sm mt-16 sm:mt-24">
        Infrastructure is not magic — it is decisions with trade-offs.
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef}
      id="thinking"
      className="relative w-full min-h-[80vh] cursor-none overflow-hidden"
    >
      {/* Base Layer: Black background, White text */}
      <div className="absolute inset-0 bg-[#0a0a0a] text-[#f0f0f0]">
        {textContent}
      </div>

      {/* Reveal Layer: Cyan background, Black text, clipped to mouse position */}
      <div 
        className="absolute inset-0 bg-[#00FFFF] text-[#0a0a0a] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          clipPath: `circle(150px at ${mousePosition.x}px ${mousePosition.y}px)`,
        }}
      >
        {textContent}
      </div>
    </section>
  );
}
