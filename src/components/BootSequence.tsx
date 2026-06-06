import { useState, useEffect, useRef } from 'react';

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 - Initializing hardware...', delay: 0 },
  { text: 'CPU: 8-core @ 3.6GHz ✓', delay: 800 },
  { text: 'RAM: 32GB DDR5 ✓', delay: 1600 },
  { text: 'Loading kernel modules...', delay: 2400 },
  { text: 'Mounting filesystems...', delay: 3200 },
  { text: '[ OK ] Started systemd-journald.service', delay: 4200, color: 'text-[#39ff14]' },
  { text: '[ OK ] Reached target Graphical Interface', delay: 5000, color: 'text-[#39ff14]' },
  { text: 'Starting portfolio.service...', delay: 6000, color: 'text-[#ffb000]' },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(timer);
    });

    // Start fade out at 7 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 7000);
    timers.push(fadeTimer);

    // Complete at 7.5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 7500);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <section
      className={`fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col justify-center px-6 py-10 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        ref={containerRef}
        className="w-full max-w-[640px] mx-auto font-mono scrollbar-hide"
        style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', lineHeight: 1.8 }}
      >
        <div className="flex flex-col">
          {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
            <div
              key={`boot-${index}`}
            >
              <span className={line.color ? line.color : 'text-[#e0e0e0]'}>
                {line.text}
              </span>
            </div>
          ))}

          {/* Blinking cursor */}
          {!fadeOut && visibleLines >= 1 && (
            <div className="mt-1">
              <span className="inline-block w-2.5 h-3.5 bg-[#00ffff] animate-blink" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
