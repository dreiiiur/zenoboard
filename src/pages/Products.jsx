import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import { products } from '../data/products'

const specs = [
  { label: 'Size', value: '4ft × 8ft (1220 × 2440 mm)' },
  { label: 'Thickness', value: '9mm / 12mm / 16mm / 18mm / 25mm' },
  { label: 'Core', value: 'Marine Grade Hardwood' },
  { label: 'Finish', value: 'High-Pressure Laminate (HPL)' },
  { label: 'Glue', value: 'WBP (Weather & Boil Proof)' },
  { label: 'Grade', value: 'Triple A' },
]

export default function Products() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-stone-50 overflow-hidden">
        <div className="absolute inset-0 bg-wood-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              Our Products
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-800 leading-tight mb-6">
              Premium Finishes.
              <span className="text-primary block">One Core Standard.</span>
            </h1>
            <p className="text-stone-500 text-xl max-w-2xl mx-auto">
              All Zenoboard products share the same Grade Triple A marine plywood core. The finish is where your vision comes to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specs Bar */}
      <section className="py-10 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {specs.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-white text-sm font-semibold">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            badge="All Finishes"
            title="Choose Your Finish"
            subtitle="Four premium laminate finishes, all available across multiple thickness options."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Material Info */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
                Material Science
              </span>
              <h2 className="text-4xl font-bold text-stone-800 mb-6">
                Marine-grade core. Laminate perfection.
              </h2>
              <p className="text-stone-500 leading-relaxed mb-5">
                Our marine plywood core uses WBP (Weather & Boil Proof) adhesive, making it resistant to moisture, humidity, and delamination — even in demanding environments like kitchens and bathrooms.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8">
                Each sheet is finished with high-pressure laminate (HPL) on both sides, ensuring a smooth, consistent surface ready for immediate installation without additional finishing.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['WBP Glue Standard', 'HPL Double-sided', 'Anti-warp Design', 'Ready-to-use Surface'].map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-primary block" />
                    </span>
                    <span className="text-stone-700 text-sm font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden aspect-square"
            >
              <img
                src="/products.png"
                alt="Material detail"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
