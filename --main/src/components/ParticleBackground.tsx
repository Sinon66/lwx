import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Use Device Pixel Ratio to keep the particles razor-sharp and clear
    const setupCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    // Mouse events tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    const handleResize = () => {
      setupCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Generate responsive particle density
    const particleCount = Math.min(120, Math.max(30, Math.floor((width * height) / 12000)));

    interface Particle {
      x: number;
      y: number;
      homeX: number;
      homeY: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      angle: number; // for natural sine-wave vertical swimming
      sinSpeed: number; // speed of vertical oscillation
      amplitude: number; // scale of vertical oscillation
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        homeX: rx,
        homeY: ry,
        vx: (Math.random() - 0.5) * 0.3, // slow base drifting
        vy: (Math.random() - 0.5) * 0.3,
        size: 1.0, // Radius 1.0px = exactly 2.0px diameter
        opacity: 0.75, // High clarity, uniform sharp opacity
        angle: Math.random() * Math.PI * 2,
        sinSpeed: 0.01 + Math.random() * 0.02,
        amplitude: 0.15 + Math.random() * 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      particles.forEach((p) => {
        let isInfluencedByMouse = false;

        // 1. Mouse interaction dynamics
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Within 100px diameter (50px radius) mouse pointer range
          if (distance < 50) {
            isInfluencedByMouse = true;

            // Target hover distance is around 10-20px
            const targetDist = 15; // sweet spot between 10px and 20px
            const forceDirectionX = dx / (distance || 1);
            const forceDirectionY = dy / (distance || 1);

            if (distance > targetDist) {
              // Pull toward target zone slowly
              p.vx += forceDirectionX * 0.08;
              p.vy += forceDirectionY * 0.08;
            } else if (distance < targetDist - 3) {
              // Maintain distance naturally
              p.vx -= forceDirectionX * 0.06;
              p.vy -= forceDirectionY * 0.06;
            }

            // Gentle orbit rotation around the target distance range
            const tx = -forceDirectionY;
            const ty = forceDirectionX;
            p.vx += tx * 0.05;
            p.vy += ty * 0.05;
          }
        }

        // 2. Base movement and damping
        if (isInfluencedByMouse) {
          p.vx *= 0.90;
          p.vy *= 0.90;
        } else {
          // Slow harmonic return to their home coords to avoid moving permanently
          p.angle += p.sinSpeed;
          const targetX = p.homeX + Math.cos(p.angle) * p.amplitude * 12;
          const targetY = p.homeY + Math.sin(p.angle) * p.amplitude * 20;

          const dxHome = targetX - p.x;
          const dyHome = targetY - p.y;

          // Set a direct return velocity (first-order approach, completely preventing spring oscillation/overshoot)
          let targetVx = dxHome * 0.0175;
          let targetVy = dyHome * 0.0175;

          // Clip maximum speed so the return is incredibly gentle and slow
          const speedLimit = 0.25;
          const targetSpeed = Math.sqrt(targetVx * targetVx + targetVy * targetVy);
          if (targetSpeed > speedLimit) {
            targetVx = (targetVx / targetSpeed) * speedLimit;
            targetVy = (targetVy / targetSpeed) * speedLimit;
          }

          // Smoothly blend from the previous velocity (e.g. following mouse release) to the return velocity
          p.vx = p.vx * 0.90 + targetVx * 0.10;
          p.vy = p.vy * 0.90 + targetVy * 0.10;

          // Micro fluctuation movement for natural look
          p.vx += (Math.random() - 0.5) * 0.01;
          p.vy += (Math.random() - 0.5) * 0.01;
        }

        // Apply calculated speed
        p.x += p.vx;
        p.y += p.vy;

        // Screen wrap-around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Render crisp particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 no-print"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
