'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassButton } from '@/components/ui/glass'
import { Menu, X, Zap, User, CreditCard, Info } from 'lucide-react'

export function FloatingNav() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { label: 'Home', href: '#home', icon: Zap },
        { label: 'Features', href: '#features', icon: Info },
        { label: 'I-ID', href: '#iid', icon: User }
    ]

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${isScrolled ? 'scale-95 top-4' : 'scale-100 top-6'
                    }`}
            >
                <div className="bg-black/90 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-2xl shadow-2xl">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-between gap-8">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                                <Zap className="w-4 h-4 text-black" />
                            </div>
                            <span className="font-bold text-white font-heading">IPNOTEC.VIP</span>
                        </div>

                        {/* Nav Items */}
                        <div className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavClick(item.href)}
                                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium font-body"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <GlassButton
                            size="sm"
                            onClick={() => {
                                const element = document.querySelector('#iid')
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' })
                                }
                            }}
                        >
                            Get Started
                        </GlassButton>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                                <Zap className="w-4 h-4 text-black" />
                            </div>
                            <span className="font-bold text-white font-heading">IPNOTEC</span>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-sm"
                    >
                        <div className="glass p-6 rounded-2xl border-white/20">
                            <div className="space-y-4">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <motion.button
                                            key={item.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            onClick={() => handleNavClick(item.href)}
                                            className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
                                        >
                                            <Icon className="w-5 h-5 text-white/70" />
                                            <span className="text-white font-medium font-body">{item.label}</span>
                                        </motion.button>
                                    )
                                })}

                                <div className="pt-4 border-t border-white/10">
                                    <GlassButton size="sm" className="w-full">
                                        Get Started
                                    </GlassButton>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997] md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}