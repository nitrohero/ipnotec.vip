'use client'

import { motion } from 'framer-motion'
import { GlassCard, NeonText } from '@/components/ui/glass'
import { Quote, Star, User, CheckCircle, TrendingUp } from 'lucide-react'

export function SocialProofSection() {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Tech Innovator',
      avatar: 'AC',
      content: "IPNOTEC.VIP is the future of digital identity. The I-ID system is revolutionary!",
      rating: 5
    },
    {
      name: 'Sarah Kim',
      role: 'Digital Creator',
      avatar: 'SK',
      content: "Secured my spot immediately. The avatar customization is mind-blowing.",
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Entrepreneur',
      avatar: 'MR',
      content: "This is exactly what the digital world needs. Can't wait for FUTURE 11!",
      rating: 5
    }
  ]

  const stats = [
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
    { number: '2.3s', label: 'Avg Load Time', icon: TrendingUp },
    { number: '100%', label: 'Secure Identity', icon: CheckCircle },
    { number: '24/7', label: 'Support Available', icon: User }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            What <NeonText color="pink">Early Adopters</NeonText> Say
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join thousands who are already experiencing the future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-black font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-6 h-6 text-white/30 mb-2" />
                <p className="text-white/80 italic">"{testimonial.content}"</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-2xl font-heading font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/60">
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Money-back Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}