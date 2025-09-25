'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard, GlassButton, GlassInput, NeonText } from '@/components/ui/glass'
import { generateIID, validateIID } from '@/lib/utils'
import { Check, RefreshCw, User, Shield, Zap, Sparkles } from 'lucide-react'

export function IIDCreationSection() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        preferredIID: '',
        email: '',
        name: '',
        generatedIID: ''
    })
    const [isChecking, setIsChecking] = useState(false)
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

    const steps = [
        {
            title: 'Choose Your I-ID',
            description: 'Create your unique digital identity',
            icon: User
        },
        {
            title: 'Verify Details',
            description: 'Confirm your information',
            icon: Shield
        },
        {
            title: 'Secure Your Spot',
            description: 'Complete your registration',
            icon: Zap
        }
    ]

    const handleIIDCheck = async (iid: string) => {
        if (!iid || !validateIID(iid)) {
            setIsAvailable(null)
            return
        }

        setIsChecking(true)

        // Simulate API call
        setTimeout(() => {
            // For demo, randomly determine availability
            const available = Math.random() > 0.3
            setIsAvailable(available)
            setIsChecking(false)
        }, 1000)
    }

    const generateRandomIID = () => {
        const newIID = generateIID()
        setFormData({ ...formData, preferredIID: newIID, generatedIID: newIID })
        handleIIDCheck(newIID)
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <section id="iid" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Create Your <NeonText>I-ID</NeonText>
                    </h2>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Your digital identity for the future. Secure, unique, and exclusively yours.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Progress Steps */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-heading font-bold mb-8">Registration Process</h3>

                            {steps.map((step, index) => {
                                const Icon = step.icon
                                const isActive = index === currentStep
                                const isCompleted = index < currentStep

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 border border-green-400/30' :
                                                isCompleted ? 'bg-green-400/5' : 'bg-white/5'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-green-400 text-black' :
                                                isCompleted ? 'bg-green-400/20 text-green-400' :
                                                    'bg-white/10 text-white/50'
                                            }`}>
                                            {isCompleted ? (
                                                <Check className="w-6 h-6" />
                                            ) : (
                                                <Icon className="w-6 h-6" />
                                            )}
                                        </div>

                                        <div>
                                            <h4 className={`font-semibold mb-1 ${isActive ? 'text-white' :
                                                    isCompleted ? 'text-green-400' : 'text-white/70'
                                                }`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-white/60">{step.description}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}

                            {/* Features */}
                            <div className="mt-12 space-y-4">
                                <h4 className="font-semibold text-white/80">What you get:</h4>
                                {[
                                    'Unique digital identity',
                                    'Exclusive event access',
                                    'Unlimited avatar creation',
                                    'Future platform benefits'
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center space-x-3"
                                    >
                                        <Sparkles className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-white/70">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="p-8">
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-heading font-bold mb-4">Choose Your I-ID</h4>
                                            <p className="text-white/60 text-sm mb-6">
                                                Format: XXXX-XXXX (8 characters, letters and numbers only)
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <GlassInput
                                                label="Preferred I-ID"
                                                placeholder="ABCD-1234"
                                                value={formData.preferredIID}
                                                onChange={(value) => {
                                                    const formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                                                    if (formatted.length <= 8) {
                                                        const withDash = formatted.length > 4
                                                            ? `${formatted.substring(0, 4)}-${formatted.substring(4)}`
                                                            : formatted
                                                        setFormData({ ...formData, preferredIID: withDash })
                                                        handleIIDCheck(withDash)
                                                    }
                                                }}
                                                error={isAvailable === false ? 'This I-ID is already taken' : ''}
                                            />

                                            {formData.preferredIID && (
                                                <div className="flex items-center space-x-2 text-sm">
                                                    {isChecking ? (
                                                        <>
                                                            <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                                                            <span className="text-white/60">Checking availability...</span>
                                                        </>
                                                    ) : isAvailable === true ? (
                                                        <>
                                                            <Check className="w-4 h-4 text-green-400" />
                                                            <span className="text-green-400">Available!</span>
                                                        </>
                                                    ) : isAvailable === false ? (
                                                        <span className="text-red-400">Not available</span>
                                                    ) : null}
                                                </div>
                                            )}

                                            <div className="text-center">
                                                <span className="text-white/60 text-sm">or</span>
                                            </div>

                                            <GlassButton
                                                variant="secondary"
                                                onClick={generateRandomIID}
                                                className="w-full"
                                            >
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                Generate Random I-ID
                                            </GlassButton>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-heading font-bold mb-4">Verify Your Details</h4>

                                        <div className="space-y-4">
                                            <GlassInput
                                                label="Full Name"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={(value) => setFormData({ ...formData, name: value })}
                                            />

                                            <GlassInput
                                                label="Email Address"
                                                type="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(value) => setFormData({ ...formData, email: value })}
                                            />

                                            <div className="p-4 rounded-xl bg-green-400/5 border border-green-400/20">
                                                <div className="text-sm text-white/80 mb-2">Your I-ID:</div>
                                                <div className="text-xl font-bold text-green-400">
                                                    {formData.preferredIID}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6 text-center">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-6">
                                            <Zap className="w-10 h-10 text-black" />
                                        </div>

                                        <h4 className="text-2xl font-heading font-bold">Secure Your Spot</h4>
                                        <p className="text-white/60">
                                            Complete your registration with a one-time payment of <span className="font-bold text-white">₹1,001</span>
                                        </p>

                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                                            <div className="text-sm text-white/60 mb-3">Registration Summary:</div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span>I-ID:</span>
                                                    <span className="font-bold text-green-400">{formData.preferredIID}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Name:</span>
                                                    <span>{formData.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Email:</span>
                                                    <span>{formData.email}</span>
                                                </div>
                                                <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
                                                    <span>Total:</span>
                                                    <span>₹1,001</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-8">
                                    {currentStep > 0 && (
                                        <GlassButton variant="ghost" onClick={handleBack}>
                                            Back
                                        </GlassButton>
                                    )}

                                    <div className="ml-auto">
                                        {currentStep < steps.length - 1 ? (
                                            <GlassButton
                                                onClick={handleNext}
                                                disabled={
                                                    (currentStep === 0 && !isAvailable) ||
                                                    (currentStep === 1 && (!formData.name || !formData.email))
                                                }
                                            >
                                                Next
                                            </GlassButton>
                                        ) : (
                                            <GlassButton size="lg" className="px-8">
                                                Pay ₹1,001 & Secure Spot
                                            </GlassButton>
                                        )}
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}