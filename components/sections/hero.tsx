'use client'

import { motion } from 'framer-motion'
import { GlassButton, NeonText } from '@/components/ui/glass'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

export function HeroSection() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 animated-bg grid-bg" />

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

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Logo/Brand */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center space-x-2 mb-6"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                            <Zap className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-2xl font-bold font-heading">
                            <NeonText>IPNOTEC</NeonText>.VIP
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight font-heading"
                    >
                        Your <NeonText>Future</NeonText>
                        <br />
                        <span className="text-gradient">Starts Here</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-body"
                    >
                        Join the exclusive <NeonText>FUTURE 11</NeonText> event on{' '}
                        <span className="font-semibold text-white">January 10, 2026</span>.
                        Create your digital identity and step into tomorrow.
                    </motion.p>

                    {/* Early Access Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass border-green-400/30"
                    >
                        <Sparkles className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium font-body">Early Access • Limited Spots</span>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <GlassButton size="lg" className="group">
                            <span className="flex items-center space-x-2">
                                <span className="font-heading">Create Your I-ID</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </GlassButton>

                        <GlassButton variant="secondary" size="lg">
                            <span className="font-heading">Learn More</span>
                        </GlassButton>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
                    >
                        {[
                            { number: '11', label: 'Exclusive Spots' },
                            { number: '2026', label: 'Future Event' },
                            { number: '∞', label: 'Possibilities' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 font-heading">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-white/60 font-body">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-3 bg-white/50 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}