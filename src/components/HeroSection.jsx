import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-image.png"
          alt="Premium interior"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
      </div>

      {/* Decorative grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 align-middle text-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-black/60 text-xs font-medium tracking-widest uppercase">
              Zenoboard Philippines - Premium Laminated Marine Plywood
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-3xl sm:text-5xl lg:text-3xl xl:text-7xl font-bold text-primary-dark leading-[1.05] tracking-tight mb-6"
          >
            The
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
               <span> </span>#1 Manufacturer
            </span>
            <br />
            in the Philippines.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-black/50 text-lg lg:text-xl leading-relaxed max-w-auto mb-10"
          >
            Zenoboard Philippines manufactures premium laminated marine plywood for residential and commercial projects — direct from factory to site.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-wrap gap-4 align-middle justify-center"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Explore Products
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-black/5 backdrop-blur-sm text-primary-dark font-semibold rounded-full border border-black/15 hover:bg-black/10 transition-all duration-300"
            >
              <FiPlay className="text-sm" />
              Get a Quote
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10"
        >
          {[
            { value: '15+', label: 'Years Experience' },
            { value: 'AAA', label: 'Quality Grade' },
            { value: '500+', label: 'Projects Completed' },
            { value: '2', label: 'Branch Locations' },
          ].map((stat) => (
            <div key={stat.label} className="border-l-2 border-primary/40 pl-4">
              <p className="text-3xl font-bold text-primary-dark mb-1">{stat.value}</p>
              <p className="text-black/40 text-xs tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-black/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-black/30 to-transparent" />
      </motion.div>
    </section>
  )
}
