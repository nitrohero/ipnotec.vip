'use client'

import { motion } from 'framer-motion'
import { GlassCard, NeonText } from '@/components/ui/glass'
import {
    Zap,
    Shield,
    Infinity,
    Users,
    Palette,
    Crown,
    Globe,
    Sparkles
} from 'lucide-react'

export function FeaturesSection() {
    const features = [
        {
            icon: Shield,
            title: 'Secure Digital Identity',
            description: 'Your I-ID is cryptographically secured and uniquely yours forever.',
            color: 'text-green-400',
            bgColor: 'bg-green-400/10'
        },
        {
            icon: Crown,
            title: 'Exclusive VIP Access',
            description: 'Join the elite group of FUTURE 11 with premium benefits.',
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10'
        },
        {
            icon: Palette,
            title: 'Unlimited Avatar Creation',
            description: 'Create infinite digital personas with our advanced customization.',
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10'
        },
        {
            icon: Globe,
            title: 'Future Platform Benefits',
            description: 'Early access to upcoming platforms and exclusive features.',
            color: 'text-pink-400',
            bgColor: 'bg-pink-400/10'
        },
        {
            icon: Users,
            title: 'Elite Community',
            description: 'Network with like-minded innovators and future builders.',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10'
        },
        {
            icon: Infinity,
            title: 'Limitless Possibilities',
            description: 'Your gateway to the next generation of digital experiences.',
            color: 'text-cyan-400',
            bgColor: 'bg-cyan-400/10'
        }
    ]

    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass border-purple-400/30 mb-8"
                    >
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-medium">Exclusive Features</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Why Choose <NeonText color="purple">IPNOTEC</NeonText>?
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Join the future of digital identity with cutting-edge features and exclusive benefits.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="p-8 h-full group">
                                    <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-8 h-8 ${feature.color}`} />
                                    </div>

                                    <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors">
                                        {feature.description}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <GlassCard className="p-8 max-w-2xl mx-auto">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">
                                Ready to <NeonText>Join the Future</NeonText>?
                            </h3>
                            <p className="text-white/70">
                                Secure your spot in FUTURE 11 and become part of digital history.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient mb-1">₹1,001</div>
                                <div className="text-sm text-white/60">One-time payment</div>
                            </div>

                            <div className="w-px h-12 bg-white/20 hidden sm:block" />

                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient mb-1">11</div>
                                <div className="text-sm text-white/60">Exclusive spots</div>
                            </div>

                            <div className="w-px h-12 bg-white/20 hidden sm:block" />

                            <div className="text-center">
                                <div className="text-3xl font-bold text-gradient mb-1">∞</div>
                                <div className="text-sm text-white/60">Possibilities</div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    )
}