import { motion } from 'framer-motion'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import FeatureCard from '../components/FeatureCard'
import { features } from '../data/products'

const milestones = [
  { year: '2008', title: 'Founded', desc: 'Zenoboard Philippines established its first manufacturing facility in Pulilan, Bulacan.' },
  { year: '2012', title: 'Expansion', desc: 'Opened second branch in Antipolo, Rizal to serve clients in Metro Manila and the south.' },
  { year: '2016', title: 'AAA Certification', desc: 'Received Grade Triple A certification from the Philippine Plywood Standard Authority.' },
  { year: '2020', title: 'Modernization', desc: 'Invested in advanced lamination technology, upgrading production capacity by 60%.' },
  { year: '2024', title: 'Today', desc: 'Serving 500+ residential and commercial projects annually with four premium laminate finishes.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#1a1209] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/applications/interior.webp"
            alt="Manufacturing"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1209]/60 to-[#1a1209]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Built on Quality.
              <span className="block text-primary-300">Driven by Purpose.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              For over 15 years, Zenoboard Philippines has been the trusted name in premium laminated marine plywood manufacturing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold text-stone-800 mb-6">
                Delivering quality you can trust in every sheet
              </h2>
              <p className="text-stone-500 leading-relaxed mb-5">
                At Zenoboard, we believe that the foundation of every great space starts with the materials used to build it. That's why we hold our laminated marine plywood to the highest standards — Grade Triple A quality that's consistent, durable, and beautifully finished.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8">
                As a direct manufacturer, we cut out the middlemen and deliver better value to our clients without compromising on quality. From contractors and architects to homeowners and furniture makers — we're the partner you can count on.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-100">
                {[["500+", "Clients"], ["2", "Branches"], ["★ 5.0", "Average Rating"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-3xl font-bold text-primary mb-1">{val}</p>
                    <p className="text-stone-500 text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5-image bento grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 grid-rows-[1fr_1fr_0.7fr] gap-3 h-[520px]"
            >
              {/* Left: tall hero spanning rows 1-2 */}
              <img
                src="/products/walnut/walnut-sample1.png"
                alt="Walnut finish"
                className="rounded-2xl object-cover w-full h-full row-span-2"
              />
              {/* Right top */}
              <img
                src="/products/white/white-sample1.png"
                alt="White finish"
                className="rounded-2xl object-cover w-full h-full"
              />
              {/* Right middle */}
              <img
                src="/products/wenge/wenge-sample1.png"
                alt="Wenge finish"
                className="rounded-2xl object-cover w-full h-full"
              />
              {/* Bottom row: two equal images */}
              <img
                src="/products/straight-oak/so-sample2.png"
                alt="Straight Oak finish"
                className="rounded-2xl object-cover w-full h-full"
              />
              <img
                src="/hero5.webp"
                alt="Gray finish"
                className="rounded-2xl object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline
      <section className="py-28 bg-stone-50">
        ...
      </section> */}

      {/* Why Choose Us */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            badge="Why Zenoboard"
            title="What Sets Us Apart"
            subtitle="Six pillars that define our commitment to quality and service."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
