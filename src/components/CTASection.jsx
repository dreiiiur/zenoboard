import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone } from 'react-icons/fi'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-28">
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-black/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-medium tracking-widest uppercase mb-6">
            Ready to Build?
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Transform Your Space with
            <span className="block text-primary-200">Premium Plywood</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Get Grade Triple A laminated marine plywood directly from the manufacturer. Contact us today for bulk pricing, custom orders, and expert consultation.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Request a Quote
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+639123456789"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              <FiPhone />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
