import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import FeatureCard from '../components/FeatureCard'
import GallerySection from '../components/GallerySection'
import CTASection from '../components/CTASection'
import BranchCard from '../components/BranchCard'
import SectionHeader from '../components/SectionHeader'
import { products, applications, branches, features } from '../data/products'

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* About Teaser */}
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
                About Zenoboard
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 leading-tight mb-6">
                The Standard of
                <span className="text-primary block">Philippine Plywood</span>
              </h2>
              <p className="text-stone-500 text-lg leading-relaxed mb-6">
                Zenoboard Philippines is a trusted manufacturer of laminated marine plywood, delivering Grade Triple A quality for residential and commercial projects across the country.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8">
                With state-of-the-art production facilities in Pulilan, Bulacan, we combine advanced manufacturing technology with premium raw materials to produce plywood that's built to last.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn More About Us
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                  alt="Manufacturing facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-2xl p-5 shadow-xl">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-white/70 text-sm">Years of Excellence</p>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">AAA</p>
                  <p className="text-stone-500 text-xs">Grade</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6">
            <SectionHeader
              badge="Our Finishes"
              title={<>Premium Laminated<br />Marine Plywood</>}
              subtitle="Choose from four premium laminate finishes, all on marine-grade hardwood core."
              center={false}
            />
            <Link
              to="/products"
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            badge="Applications"
            title="Where Zenoboard Performs Best"
            subtitle="From kitchen cabinets to commercial interiors, our plywood is engineered for every application."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {applications.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer"
              >
                <img
                  src={app.image}
                  alt={app.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold text-center">{app.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            badge="Why Zenoboard"
            title="Engineered for Excellence"
            subtitle="Six reasons why contractors, designers, and homeowners choose Zenoboard for their most important projects."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      {/* Branches */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            badge="Our Locations"
            title="Visit a Branch Near You"
            subtitle="Two conveniently located branches serving clients across Luzon."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {branches.map((branch, i) => (
              <BranchCard key={branch.id} branch={branch} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
