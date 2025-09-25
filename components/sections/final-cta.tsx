'use client'

import { motion } from 'framer-motion'
import { GlassButton, NeonText } from '@/components/ui/glass'
import { ArrowRight, Clock, Users, Zap, AlertTriangle } from 'lucide-react'

export function FinalCTASection() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Dramatic Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Urgency Alert */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30 mb-8"
                    >
                        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                        <span className="text-sm font-medium text-red-400">
                            Limited Time • Only 11 Spots Available
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black leading-tight mb-8"
                    >
                        Don't Miss Your
                        <br />
                        <NeonText color="pink">Chance</NeonText> to Make History
                    </motion.h2>

                    {/* Supporting Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Join the exclusive FUTURE 11 event and secure your digital identity before it's too late.
                        This opportunity won't come again.
                    </motion.p>

                    {/* Scarcity Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                            <Clock className="w-6 h-6 text-yellow-400" />
                            <div>
                                <div className="font-bold text-yellow-400">Limited Time</div>
                                <div className="text-sm text-white/60">Registration closes soon</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                            <Users className="w-6 h-6 text-red-400" />
                            <div>
                                <div className="font-bold text-red-400">Only 11 Spots</div>
                                <div className="text-sm text-white/60">Extremely exclusive</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                            <Zap className="w-6 h-6 text-green-400" />
                            <div>
                                <div className="font-bold text-green-400">Act Now</div>
                                <div className="text-sm text-white/60">Don't hesitate</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <GlassButton
                                size="lg"
                                className="text-lg px-12 py-4 group shadow-2xl"
                            >
                                <span className="flex items-center space-x-3">
                                    <span>Secure My Spot for ₹1,001</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </GlassButton>

                            <p className="text-sm text-white/50">
                                💳 Secure payment • 🔒 SSL encrypted • 📱 Instant confirmation
                            </p>
                        </div>

                        {/* Money Back Guarantee */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            viewport={{ once: true }}
                            className="text-center pt-8"
                        >
                            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-green-400/10 border border-green-400/20">
                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                <span className="text-sm font-medium text-green-400">
                                    100% Money-Back Guarantee • No Questions Asked
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Social Proof Numbers */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                        className="mt-16 pt-8 border-t border-white/10"
                    >
                        <div className="flex items-center justify-center space-x-8 text-sm text-white/60">
                            <div>⭐ 4.9/5 from early testers</div>
                            <div>•</div>
                            <div>🔒 Bank-level security</div>
                            <div>•</div>
                            <div>⚡ Instant I-ID creation</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}