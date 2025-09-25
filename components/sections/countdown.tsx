'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, NeonText } from '@/components/ui/glass'
import { getTimeUntilEvent, eventDate } from '@/lib/utils'
import { Calendar, Clock, Users, Zap } from 'lucide-react'

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set initial client state and first countdown calculation
    setIsClient(true)
    setTimeLeft(getTimeUntilEvent(eventDate))

    // Set up interval for updates
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilEvent(eventDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', icon: Calendar },
    { value: timeLeft.hours, label: 'Hours', icon: Clock },
    { value: timeLeft.minutes, label: 'Minutes', icon: Users },
    { value: timeLeft.seconds, label: 'Seconds', icon: Zap }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The <NeonText color="purple">Future</NeonText> Awaits
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            FUTURE 11 launches in precisely...
          </p>
        </motion.div>

        {/* Countdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {timeUnits.map((unit, index) => {
            const Icon = unit.icon
            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="text-center p-6 hover:border-purple-400/30">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-400/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <motion.div
                    key={isClient ? unit.value : 0}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                  >
                    {isClient ? unit.value.toString().padStart(2, '0') : '00'}
                  </motion.div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">
                    {unit.label}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <GlassCard className="p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                <NeonText>FUTURE 11</NeonText> Event
              </h3>
              <p className="text-white/70">
                January 10, 2026 • Exclusive Digital Experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-semibold text-green-400 mb-1">Limited Access</div>
                <div className="text-white/60">Only 11 exclusive spots available</div>
              </div>
              <div>
                <div className="font-semibold text-blue-400 mb-1">Digital Identity</div>
                <div className="text-white/60">Create your unique I-ID</div>
              </div>
              <div>
                <div className="font-semibold text-purple-400 mb-1">Future Tech</div>
                <div className="text-white/60">Experience tomorrow today</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Urgency Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-red-400">
              Registration closes when countdown reaches zero
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}