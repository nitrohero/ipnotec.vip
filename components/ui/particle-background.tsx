'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1
        })
      }
      setParticles(newParticles)
    }

    createParticles()

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx
        let newY = particle.y + particle.vy
        
        // Wrap around screen edges
        if (newX > window.innerWidth) newX = 0
        if (newX < 0) newX = window.innerWidth
        if (newY > window.innerHeight) newY = 0
        if (newY < 0) newY = window.innerHeight
        
        return {
          ...particle,
          x: newX,
          y: newY
        }
      }))
    }

    const interval = setInterval(animateParticles, 50)
    const resizeHandler = () => createParticles()
    
    window.addEventListener('resize', resizeHandler)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity})`
          }}
        />
      ))}
    </div>
  )
}