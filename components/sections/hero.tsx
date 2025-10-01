'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassButton, NeonText } from '@/components/ui/glass'
import { ArrowRight, Sparkles, Zap, Shield, Users, Target, Crown, Star, Code, Globe } from 'lucide-react'
import { Boxes } from '@/components/ui/background-boxes'

export function HeroSection() {
    const [seatsClaimed, setSeatsClaimed] = useState(108)
    const [totalSeats] = useState(1001)
    const [activeUsers, setActiveUsers] = useState(23)
    const [currentTribe, setCurrentTribe] = useState(0)
    const [particles, setParticles] = useState<Array<{ left: number; top: number; x: number; y: number; duration: number; delay: number }>>([])
    const [mounted, setMounted] = useState(false)

    const futureTribeShowcase = [
        { icon: Target, name: 'Venture & Wealth', color: 'text-green-400', bg: 'bg-green-400/10' },
        { icon: Code, name: 'IT & Industrialists', color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { icon: Star, name: 'Branding & Marketing', color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { icon: Globe, name: 'Green & Environmental', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { icon: Users, name: 'Youth & Education', color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { icon: Crown, name: 'Culture & Arts', color: 'text-pink-400', bg: 'bg-pink-400/10' },
        { icon: Shield, name: 'Real Estate & Recreation', color: 'text-cyan-400', bg: 'bg-cyan-400/10' }
    ]

    const floatingTestimonials = [
        { name: "Alex Chen", role: "Tech Innovator", text: "Revolutionary digital identity system!", avatar: "AC" },
        { name: "Sarah Kim", role: "Digital Creator", text: "Secured my spot immediately!", avatar: "SK" },
        { name: "Marcus Rodriguez", role: "Entrepreneur", text: "Exactly what the digital world needs!", avatar: "MR" }
    ]

    useEffect(() => {
        // Initialize particles on mount
        setMounted(true)
        setParticles(
            Array.from({ length: 20 }).map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                duration: Math.random() * 10 + 5,
                delay: Math.random() * 5
            }))
        )

        // Simulate live seat claiming (slower increment)
        const interval = setInterval(() => {
            setSeatsClaimed(prev => {
                const newCount = prev + 1
                return newCount <= totalSeats ? newCount : prev
            })
            setActiveUsers(prev => Math.max(15, prev + Math.floor(Math.random() * 3) - 1))
        }, 30000) // Update every 30 seconds

        // Rotate tribe showcase
        const tribeInterval = setInterval(() => {
            setCurrentTribe(prev => (prev + 1) % futureTribeShowcase.length)
        }, 3000)

        return () => {
            clearInterval(interval)
            clearInterval(tribeInterval)
        }
    }, [])

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
            {/* Animated Background Boxes */}
            <div className="absolute inset-0 w-full h-full bg-black">
                <Boxes />
                <div className="absolute inset-0 w-full h-full bg-black/20 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            </div>

            {/* Original Animated Background */}
            <div className="absolute inset-0 animated-bg grid-bg opacity-50" />

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-green-400/10 blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-blue-400/10 blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        scale: [1, 0.9, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-purple-400/10 blur-2xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            {/* Floating Tribe Badges */}
            <div className="absolute top-1/4 right-8 z-30">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTribe}
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className={`glass p-6 rounded-2xl border border-white/10 ${futureTribeShowcase[currentTribe].bg}`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-xl ${futureTribeShowcase[currentTribe].bg} flex items-center justify-center`}>
                                {(() => {
                                    const IconComponent = futureTribeShowcase[currentTribe].icon
                                    return <IconComponent className={`w-6 h-6 ${futureTribeShowcase[currentTribe].color}`} />
                                })()}
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">{futureTribeShowcase[currentTribe].name}</div>
                                <div className="text-white/50 text-xs">Future Tribe</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floating Testimonials */}
            <div className="absolute bottom-1/4 left-8 z-30">
                {floatingTestimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.name}
                        className="glass p-4 rounded-xl border border-white/10 mb-4 max-w-xs"
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 1.5,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-black text-xs font-bold">
                                {testimonial.avatar}
                            </div>
                            <div>
                                <div className="text-white text-sm font-semibold">{testimonial.name}</div>
                                <div className="text-white/50 text-xs">{testimonial.role}</div>
                            </div>
                        </div>
                        <div className="text-white/80 text-sm">"{testimonial.text}"</div>
                    </motion.div>
                ))}
            </div>

            {/* Live Statistics Counter */}
            <div className="absolute top-24 right-8 z-30 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="glass p-4 rounded-xl border border-green-400/20"
                >
                    <div className="text-center">
                        <motion.div
                            key={seatsClaimed}
                            initial={{ scale: 1.2, opacity: 0.8 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-2xl font-bold text-green-400 font-heading"
                        >
                            {seatsClaimed}/{totalSeats}
                        </motion.div>
                        <div className="text-xs text-white/60">Seats Claimed</div>
                        <div className="flex items-center justify-center space-x-1 mt-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-xs text-white/50">{activeUsers} online now</span>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Main Content */}
            <div className="relative z-30 text-center max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight font-heading text-white"
                        style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6)' }}
                    >
                        Your <NeonText>Future</NeonText>
                        <br />
                        <span className="text-gradient">Starts Here</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-body"
                        style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.7)' }}
                    >
                        Secure your seat for the <NeonText>FUTURE 11</NeonText> app launch on{' '}
                        <span className="font-semibold text-white">January 10, 2026</span>.
                        Create your digital identity with multiple avatar representations.
                    </motion.p>

                    {/* Early Access Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass border-green-400/30"
                    >
                        <Sparkles className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium font-body">Early Access • Limited to 1,001 Seats</span>
                    </motion.div>

                    {/* Enhanced CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <GlassButton
                                size="lg"
                                className="group relative overflow-hidden"
                                onClick={() => {
                                    const element = document.querySelector('#iid')
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' })
                                    }
                                }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                                <span className="flex items-center space-x-2 relative z-10">
                                    <Zap className="w-5 h-5 text-green-400" />
                                    <span className="font-heading">Create Your I-ID</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </GlassButton>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <GlassButton
                                variant="secondary"
                                size="lg"
                                className="group"
                                onClick={() => {
                                    const element = document.querySelector('#features')
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' })
                                    }
                                }}
                            >
                                <span className="flex items-center space-x-2">
                                    <Sparkles className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                                    <span className="font-heading">Learn More</span>
                                </span>
                            </GlassButton>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Stats with Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="pt-16 max-w-4xl mx-auto"
                    >
                        {/* Main Stats */}
                        <div className="grid grid-cols-3 gap-8 mb-12">
                            {[
                                { number: '1,001', label: 'Total Seats', icon: Crown },
                                { number: '2026', label: 'App Launch', icon: Star },
                                { number: '∞', label: 'Avatar Options', icon: Sparkles }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                                    className="text-center glass p-6 rounded-2xl border border-white/10 hover:border-green-400/30 transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <div className="flex justify-center mb-3">
                                        <stat.icon className="w-6 h-6 text-green-400" />
                                    </div>
                                    <motion.div
                                        className="text-3xl md:text-4xl font-bold text-gradient mb-2 font-heading"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.5
                                        }}
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-sm text-white/60 font-body">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Interactive Particle Network */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {mounted && particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            x: [0, particle.x],
                            y: [0, particle.y],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}