import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiPackage } from 'react-icons/fi'

export default function ProductCTA({ productName }) {
  return (
    <section className="relative overflow-hidden bg-[#1a1209] py-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=70"
          alt="Wood background"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1209]/90 to-[#1a1209]/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary/10" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-primary/10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-200 text-xs font-semibold tracking-widest uppercase mb-6">
              Bulk & Custom Orders
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Need {productName} in Bulk?
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              We cater to large-scale residential and commercial projects. Contact our sales team for competitive bulk pricing, custom dimensions, and priority fulfillment.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/contact"
              className="group w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              <FiPackage />
              Request Bulk Quote
              <FiArrowRight className="ml-auto transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+639123456789"
              className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <FiPhone />
              Speak to Sales Team
            </a>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: 'Direct', label: 'Manufacturer' },
                { value: 'Fast', label: 'Lead Times' },
                { value: 'AAA', label: 'Quality Grade' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-bold text-lg">{s.value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
