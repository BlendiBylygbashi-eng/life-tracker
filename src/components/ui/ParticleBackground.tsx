'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: number;
  opacity: number;
  color: string;
}

export const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Array of soft, modern colors
  const particleColors = [
    '#3B82F6', // blue
    '#6366F1', // indigo
    '#8B5CF6', // violet
    '#EC4899', // pink
    '#14B8A6', // teal
  ];

  useEffect(() => {
    // Create initial particles with evenly distributed positions
    const initialParticles: Particle[] = Array.from({ length: 8 }, (_, i) => {
      // Divide the screen into 8 vertical sections
      const sectionHeight = 100 / 8;
      const yPos = i * sectionHeight + (Math.random() * sectionHeight * 0.8 + sectionHeight * 0.1);
      // Alternate between left and right half of the screen
      const xPos = (i % 2 === 0 ? 
        Math.random() * 40 + 10 : // Left side: 10-50%
        Math.random() * 40 + 50   // Right side: 50-90%
      );

      return {
        id: i,
        x: xPos,
        y: yPos,
        size: Math.random() * 40 + 30,
        velocity: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.15 + 0.05,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      };
    });

    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y - particle.velocity,
          // Reset particle position when it goes off screen
          ...(particle.y < -10
            ? {
                y: 110,
                x: Math.random() * 80 + 10, // Keep within 10-90% of screen width
                opacity: Math.random() * 0.15 + 0.05,
                size: Math.random() * 40 + 30,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
              }
            : {}),
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={false}
          animate={{
            y: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          transition={{
            duration: 0.05,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
