import { motion } from 'framer-motion'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import { applications } from '../data/products'

const details = [
  {
    id: 'kitchen-cabinets',
    title: 'Kitchen Cabinets',
    description: 'Kitchens demand materials that withstand heat, moisture, and daily wear. Zenoboard\'s marine plywood core with WBP adhesive ensures your cabinets stay structurally sound for decades, even in the most demanding kitchen environments.',
    benefits: ['Moisture resistant', 'Load-bearing capacity', 'Smooth laminate surface', 'Easy to clean'],
    image: '/applications/kitchen-cabinet.webp',
  },
  {
    id: 'wardrobes',
    title: 'Wardrobes & Storage',
    description: 'Heavy loads, constant movement, and long-term structural demands make wardrobes one of the most critical furniture applications. Our Grade Triple A plywood delivers the stiffness and dimensional stability needed for long-lasting wardrobe solutions.',
    benefits: ['High load capacity', 'Anti-sag performance', 'Premium finish', 'Versatile thickness options'],
    image: '/applications/wardrobe.webp',
  },
  {
    id: 'office-tables',
    title: 'Office Tables',
    description: 'Professional environments require materials that project quality and endure years of use. Zenoboard\'s clean laminate finishes create polished, professional workstations that reflect the standards of modern corporate design.',
    benefits: ['Professional aesthetic', 'Scratch resistant', 'Consistent finish', 'Multiple finish options'],
    image: '/applications/office.webp',
  },
  {
    id: 'tv-consoles',
    title: 'TV Consoles',
    description: 'TV consoles are a focal point of living spaces. Zenoboard\'s premium laminate finishes and precise manufacturing tolerances ensure your TV console becomes a design statement in any interior.',
    benefits: ['Showcase piece', 'Weight capacity', 'Premium aesthetics', 'Custom sizes available'],
    image: '/applications/tv-console.webp',
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    description: 'Retail stores, hotel lobbies, restaurants, and corporate offices require materials that combine beauty with durability. Zenoboard delivers the performance and visual consistency needed for high-traffic commercial environments.',
    benefits: ['High traffic rated', 'Commercial grade', 'Bulk order ready', 'Consistent batch quality'],
    image: '/applications/interior.webp',
  },
  {
    id: 'bedroom',
    title: 'Bedroom Furniture',
    description: 'Bedroom furniture is personal. It needs to look beautiful, feel premium, and last a lifetime. Zenoboard\'s fine laminate finishes create bedroom sets that are as elegant as they are enduring.',
    benefits: ['Elegant aesthetics', 'Lightweight options', 'Easy assembly', 'Long-term durability'],
    image: '/applications/bedroom.webp',
  },
]

export default function Applications() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#1a1209] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80"
            alt="Interior"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1209]/60 to-[#1a1209]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
              Applications
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              One Material.
              <span className="block text-primary-300">Infinite Possibilities.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Discover where Zenoboard performs best — from intimate bedrooms to expansive commercial interiors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Applications Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-28">
            {details.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
                    Application {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-4xl font-bold text-stone-800 mb-5">{app.title}</h2>
                  <p className="text-stone-500 leading-relaxed mb-7">{app.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {app.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                          <span className="w-2 h-2 rounded-full bg-primary block" />
                        </span>
                        <span className="text-stone-700 text-sm font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`relative rounded-3xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
