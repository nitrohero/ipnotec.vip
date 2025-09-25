import { FloatingNav } from '@/components/ui/floating-nav'
import { HeroSection } from '@/components/sections/hero'
import { CountdownSection } from '@/components/sections/countdown'
import { FeaturesSection } from '@/components/sections/features'
import { SocialProofSection } from '@/components/sections/social-proof'
import { IIDCreationSection } from '@/components/sections/iid-creation'
import { FinalCTASection } from '@/components/sections/final-cta'

export default function Home() {
  return (
    <main className="relative">
      <FloatingNav />

      <section id="home">
        <HeroSection />
      </section>

      <CountdownSection />

      <FeaturesSection />

      <SocialProofSection />

      <IIDCreationSection />

      <FinalCTASection />

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-black font-bold text-sm">IP</span>
            </div>
            <span className="text-xl font-heading font-bold">IPNOTEC.VIP</span>
          </div>

          <p className="text-white/60 mb-4">
            The future of digital identity awaits.
          </p>

          <div className="text-sm text-white/40">
            © 2025 IPNOTEC.VIP. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
