import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { RiDoubleQuotesL } from 'react-icons/ri'

const testimonials = [
  {
    id: 1,
    name: 'Arch. Maria Santos',
    role: 'Interior Architect, Santos Design Studio',
    location: 'Quezon City',
    quote: 'Zenoboard has been our go-to supplier for all cabinet and millwork projects. The AAA grade finish is consistent every single batch — our clients always notice the difference.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Engr. Carlo Reyes',
    role: 'General Contractor',
    location: 'Bulacan',
    quote: 'We have tried many plywood brands over the years, but Zenoboard is the only one that holds up perfectly even in high-humidity areas. The marine-grade core makes all the difference for kitchen projects.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Joven Dela Cruz',
    role: 'Furniture Manufacturer',
    location: 'Pampanga',
    quote: 'Direct from the factory means better pricing and fresher stock. We order in bulk every month and delivery is always on time. Highly recommend to fellow fabricators.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Arch. Trisha Lim',
    role: 'Principal Architect, TL Interiors',
    location: 'Makati City',
    quote: 'The laminate surface quality is exceptional — smooth, uniform, and takes paint and veneer incredibly well. Zenoboard is now specified in all our residential projects.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Ramon Villanueva',
    role: 'Property Developer',
    location: 'Laguna',
    quote: 'We furnished over 200 condo units with Zenoboard products. Zero complaints from homeowners, and the material held up beautifully over three years. Outstanding value.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonial() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  const t = testimonials[current]

  return (
    <section className="py-28 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 leading-tight">
            Trusted by Builders &<br />
            <span className="text-primary">Designers Nationwide</span>
          </h2>
        </div>

        {/* Card */}
        <div className="relative max-w-3xl mx-auto">

          {/* Large quote mark */}
          <RiDoubleQuotesL className="absolute -top-4 -left-2 text-primary/10 text-[120px] pointer-events-none select-none" />

          <div className="relative bg-white rounded-3xl shadow-xl shadow-stone-200/60 px-8 sm:px-14 py-12 overflow-hidden">

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-3xl" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Stars */}
                <div className="mb-6">
                  <StarRating count={t.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-stone-700 text-lg sm:text-xl leading-relaxed mb-8 font-medium">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('bg-primary', 'flex', 'items-center', 'justify-center')
                        e.target.parentElement.innerHTML = `<span class="text-white text-sm font-bold">${t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>`
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-stone-800">{t.name}</p>
                    <p className="text-stone-500 text-sm">{t.role}</p>
                    <p className="text-primary text-xs font-medium mt-0.5">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-6 h-2 bg-primary'
                      : 'w-2 h-2 bg-stone-300 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Avatar strip — all testimonials */}
        <div className="mt-12 flex justify-center items-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full overflow-hidden border-2 ${
                i === current
                  ? 'border-primary w-12 h-12 scale-110'
                  : 'border-transparent w-10 h-10 opacity-50 hover:opacity-80'
              }`}
              aria-label={`View ${t.name}'s testimonial`}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '15+', label: 'Years Trusted' },
          ].map((badge) => (
            <div key={badge.label} className="flex flex-col items-center">
              <p className="text-2xl font-bold text-primary">{badge.value}</p>
              <p className="text-stone-500 text-sm">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
