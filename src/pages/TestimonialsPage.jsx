import { useState } from 'react'
import { motion } from 'framer-motion'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { FiMapPin, FiBriefcase } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Arch. Maria Santos',
    role: 'Interior Architect',
    company: 'Santos Design Studio',
    location: 'Quezon City',
    quote: 'Zenoboard has been our go-to supplier for all cabinet and millwork projects. The AAA grade finish is consistent every single batch — our clients always notice the difference.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    category: 'Architect',
  },
  {
    id: 2,
    name: 'Engr. Carlo Reyes',
    role: 'General Contractor',
    company: 'Reyes Construction',
    location: 'Bulacan',
    quote: 'We have tried many plywood brands over the years, but Zenoboard is the only one that holds up perfectly even in high-humidity areas. The marine-grade core makes all the difference for kitchen projects.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    category: 'Contractor',
  },
  {
    id: 3,
    name: 'Joven Dela Cruz',
    role: 'Furniture Manufacturer',
    company: 'JDC Woodworks',
    location: 'Pampanga',
    quote: 'Direct from the factory means better pricing and fresher stock. We order in bulk every month and delivery is always on time. Highly recommend to fellow fabricators.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    category: 'Manufacturer',
  },
  {
    id: 4,
    name: 'Arch. Trisha Lim',
    role: 'Principal Architect',
    company: 'TL Interiors',
    location: 'Makati City',
    quote: 'The laminate surface quality is exceptional — smooth, uniform, and takes paint and veneer incredibly well. Zenoboard is now specified in all our residential projects.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    category: 'Architect',
  },
  {
    id: 5,
    name: 'Ramon Villanueva',
    role: 'Property Developer',
    company: 'Villanueva Properties',
    location: 'Laguna',
    quote: 'We furnished over 200 condo units with Zenoboard products. Zero complaints from homeowners, and the material held up beautifully over three years. Outstanding value.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    category: 'Developer',
  },
  {
    id: 6,
    name: 'Dianne Ocampo',
    role: 'Interior Designer',
    company: 'Studio Ocampo',
    location: 'Pasig City',
    quote: 'I have specialized in interior design for over 20 years and Zenoboard in over 30 residential projects and the results are consistently stunning. Clients love the finish and contractors love how easy it is to work with.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    category: 'Architect',
  },
  {
    id: 7,
    name: 'Bong Macaraeg',
    role: 'Cabinet Maker',
    company: 'Macaraeg Woodcraft',
    location: 'Bulacan',
    quote: 'The consistency of the board thickness and the smoothness of the laminate finish saves us hours in sanding and prep. Zenoboard is simply the best for cabinetry work.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    category: 'Manufacturer',
  },
  {
    id: 8,
    name: 'Engr. Paolo Cruz',
    role: 'Project Engineer',
    company: 'Cruz & Partners',
    location: 'Cavite',
    quote: 'Used Zenoboard for a 5-storey commercial fit-out and it performed beyond expectations. Moisture resistance held up in the restroom areas without warping. Impressive material.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    category: 'Contractor',
  },
  {
    id: 9,
    name: 'Clara Mendoza',
    role: 'Real Estate Developer',
    company: 'Mendoza Realty Group',
    location: 'Cebu City',
    quote: 'Sourcing quality materials for our Cebu projects used to be a challenge until we found Zenoboard. Delivery to the province is reliable and the product quality justifies every peso.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    category: 'Developer',
  },
]

const categories = ['All', 'Architect', 'Contractor', 'Manufacturer', 'Developer']

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-stone-50 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-5"
          >
            What Our Clients Say
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6"
          >
            Trusted by Builders &<br />
            <span className="text-primary">Designers Nationwide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-stone-500 text-lg max-w-2xl mx-auto mb-10"
          >
            From architects and contractors to furniture makers and property developers — here's what professionals across the Philippines say about Zenoboard.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-10"
          >
            {[
              { value: '500+', label: 'Happy Clients' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '100%', label: 'AAA Grade' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-stone-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="break-inside-avoid bg-white border border-stone-100 rounded-3xl p-7 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                {/* Quote icon */}
                <RiDoubleQuotesL className="text-primary/15 text-5xl mb-3" />

                {/* Stars */}
                <div className="mb-4">
                  <StarRating count={t.rating} />
                </div>

                {/* Quote */}
                <blockquote className="text-stone-700 leading-relaxed mb-6 text-[15px]">
                  "{t.quote}"
                </blockquote>

                {/* Divider */}
                <div className="border-t border-stone-100 pt-5">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 group-hover:border-primary/50 transition-colors duration-300">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.style.background = '#493627'
                          e.target.parentElement.style.display = 'flex'
                          e.target.parentElement.style.alignItems = 'center'
                          e.target.parentElement.style.justifyContent = 'center'
                          e.target.parentElement.innerHTML = `<span style="color:white;font-size:12px;font-weight:700">${t.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>`
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-stone-800 text-sm truncate">{t.name}</p>
                      <div className="flex items-center gap-1 text-stone-400 text-xs mt-0.5">
                        <FiBriefcase className="shrink-0" />
                        <span className="truncate">{t.role}, {t.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-xs mt-0.5">
                        <FiMapPin className="shrink-0" />
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-stone-400">
              No testimonials found for this category.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Experience Zenoboard?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Join hundreds of satisfied builders and designers across the Philippines.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-stone-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
