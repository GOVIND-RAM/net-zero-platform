import React, { useCallback, useRef, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';

interface EmeraldNebulaProps {
  onParticleInteraction?: (isActive: boolean) => void;
  className?: string;
}

const EmeraldNebula: React.FC<EmeraldNebulaProps> = ({ 
  onParticleInteraction,
  className = "" 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [init, setInit] = useState(false);
  const containerRef = useRef<Container | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      containerRef.current = container;
    }
  }, []);

  const handleInteraction = useCallback((isActive: boolean) => {
    if (onParticleInteraction) {
      onParticleInteraction(isActive);
    }
  }, [onParticleInteraction]);

  // Particle configuration optimized for nebula effect
  const particleOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse" as const,
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#10B981", // primary-emerald
      },
      links: {
        color: "#10B981",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: isMobile ? 40 : 80, // Reduced particles on mobile
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <div className={`nebula-container absolute inset-0 ${className}`}>
        <Particles
          id="emerald-nebula"
          particlesLoaded={particlesLoaded}
          options={particleOptions}
          className="w-full h-full"
        />
        
        {/* Additional nebula glow effect */}
        <div className="nebula-glow-1 absolute top-1/4 left-1/4 w-96 h-96 bg-primary-emerald/20 rounded-full blur-3xl animate-pulse" />
        <div className="nebula-glow-2 absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-emerald/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="nebula-glow-3 absolute top-1/2 left-1/2 w-64 h-64 bg-primary-emerald/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    );
  }

  return <></>;
};

export default EmeraldNebula;
