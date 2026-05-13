import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

const slides = [
  {
    src: '/hero-image.png',
    alt: 'Premium interior',
    headline: <>The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">#1 Manufacturer</span><br />in the Philippines.</>,
    sub: 'Zenoboard Philippines manufactures premium laminated marine plywood for residential and commercial projects.',
  },
  {
    src: '/hero2.jpg',
    alt: 'Marine plywood application',
    headline: <>Built for<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Every Project.</span></>,
    sub: 'From kitchen cabinets to commercial fit-outs — Zenoboard delivers Grade AAA quality every time.',
  },
  {
    src: '/hero-image-3.png',
    alt: 'Residential project',
    headline: <>Direct from<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Factory to Site.</span></>,
    sub: 'Skip the middleman. Get premium laminated marine plywood straight from our Bulacan manufacturing plant.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

function DotGrid({ className }) {
  return (
    <div className={`grid gap-2 ${className}`} style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-primary/20" />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]
  const hasError = imgErrors[current]

  return (
    <section className="relative min-h-screen flex flex-col bg-white overflow-hidden">

      <div className="flex-1 flex flex-col lg:flex-row">

        {/* LEFT — Content */}
        <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 lg:pt-16 pb-16 lg:w-1/2 z-10 bg-white">

          <DotGrid className="absolute top-24 left-6 opacity-60 hidden lg:grid" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-7"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                  Premium Laminated Marine Plywood
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="text-4xl sm:text-5xl xl:text-6xl font-bold text-stone-800 leading-[1.08] tracking-tight mb-5"
              >
                {slide.headline}
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-stone-500 text-base lg:text-lg leading-relaxed mb-8 max-w-md"
              >
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="flex flex-wrap gap-3 mb-14"
              >
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Explore Products
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-primary-dark font-semibold rounded-full border-2 border-stone-200 hover:border-primary/40 hover:bg-stone-50 transition-all duration-300"
                >
                  <FiPlay className="text-sm text-primary" />
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {[
              { value: 'Eucalyptus', label: 'Material Quality' },
              { value: 'AAA', label: 'Quality Grade' },
              { value: '500+', label: 'Projects Done' },
              { value: '2', label: 'Branches' },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary/30 pl-4">
                <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                <p className="text-stone-400 text-xs tracking-wider uppercase mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <DotGrid className="absolute bottom-8 left-6 opacity-40 hidden lg:grid" />
        </div>

        {/* RIGHT — Slideshow image */}
        <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-0 overflow-hidden bg-stone-100 opacity-85">

          <DotGrid className="absolute top-6 -left-4 z-10 opacity-80 hidden lg:grid" />

          <AnimatePresence mode="sync">
            {hasError ? (
              <motion.div
                key={`placeholder-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-stone-200 text-stone-400"
              >
                <svg className="w-16 h-16 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">Add your image here</p>
                <p className="text-xs mt-1 opacity-60">{slides[current].src}</p>
              </motion.div>
            ) : (
              <motion.img
                key={`img-${current}`}
                src={slides[current].src}
                alt={slides[current].alt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgErrors((prev) => ({ ...prev, [current]: true }))}
              />
            )}
          </AnimatePresence>

          {/* Long natural gradient — fades from solid white into transparent over ~40% of the image width */}
          <div
            className="absolute inset-y-0 left-0 hidden lg:block pointer-events-none"
            style={{
              width: '45%',
              background: 'linear-gradient(to right, white 0%, white 20%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Slide dots */}
          <div className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-stone-300 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
