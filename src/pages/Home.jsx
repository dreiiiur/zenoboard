import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'
import HeroSection from '../components/HeroSection'
import Testimonial from '../components/Testimonial'
import ProductCard from '../components/ProductCard'
import FeatureCard from '../components/FeatureCard'
import GallerySection from '../components/GallerySection'
import CTASection from '../components/CTASection'
import BranchCard from '../components/BranchCard'
import SectionHeader from '../components/SectionHeader'
import { products, applications, branches, features } from '../data/products'
import { th } from 'framer-motion/client'

{/*
const reels = [
{
  id: 1,
  videoId: '2069748277269677',
  title: 'The #1 Manufacturer',
  label: 'Zenoboard PH',
  //thumbnail: '/thumbnails/Commercial4.webp',
 },
 {
  id: 2,
  videoId: '3875512342754721',
  title: 'Cleaning with Ease',
  label: 'Product Showcase',
  //thumbnail: '/thumbnails/Commercial3.webp',
  },
  {
  id: 3,
  videoId: '3126484644190282',
  title: 'Premium Laminated Plywood',
  label: 'Product Showcase',
  //thumbnail: '/thumbnails/Commercial2.webp',
 },
  {
   id: 4,
   videoId: '1500293705037236',
   title: 'AAA Grade Quality',
   label: 'Quality Check',
   //thumbnail: '/thumbnails/commercial1.webp',
  },
  {
  id: 5,
  videoId: '2808638626181424',
  title: 'Bakit nga ba palaging Zenoboard?',
  label: 'Product specifications and benefits',
  //thumbnail: '/thumbnails/Ads4.webp',
},
]


function ReelCard({ reel, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex-shrink-0 w-44 sm:w-52 cursor-pointer"
      onClick={() => onOpen(reel)}
    >
      <div
        className="relative rounded-2xl overflow-hidden bg-stone-800 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300"
        style={{ aspectRatio: '9/16' }}
      >
        {/* Static thumbnail instead of iframe */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-700 to-stone-900" />
       {/* <img
          src={reel.thumbnail}
          alt={reel.title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
        /> */}
        {/* Play button 
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
            <FaFacebook className="text-white text-2xl" />
          </div>
        </div>

        {/* Bottom label 
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
          <p className="text-white/60 text-xs mb-0.5">{reel.label}</p>
          <p className="text-white text-sm font-semibold leading-tight">{reel.title}</p>
        </div>
      </div>
    </motion.div>
  )
}*/}

function ReelModal({ reel, onClose }) {
  if (!reel) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative bg-black rounded-3xl overflow-hidden shadow-2xl"
          style={{ width: '100%', maxWidth: '400px', aspectRatio: '9/16' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-primary transition-colors"
          >
            <FiX />
          </button>

          {/* Facebook video embed */}
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/${reel.videoId}&show_text=false&autoplay=1`}
            className="w-full h-full"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={reel.title}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Home() {
  const [activeReel, setActiveReel] = useState(null)
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 240, behavior: 'smooth' })
    }
  }

  return (
    <>
      <HeroSection />

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

      {/* Reels Section */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <FaFacebook className="text-blue-600 text-sm" />
                <span className="text-blue-600 text-xs font-semibold tracking-widest uppercase">Advetisements</span>
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 leading-tight">
                Watch Our<br />
                <span className="text-primary">Ads & Commercials</span>
              </h2>
              <p className="text-stone-500 mt-3 max-w-md">
                See Zenoboard in action — from our factory floor to stunning finished interiors.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll(-1)}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <FiChevronRight />
              </button>
              <a
                href="https://www.facebook.com/profile.php?id=61576497621623"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all duration-300"
              >
                <FaFacebook />
                Follow Us
              </a>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel, i) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={i}
                onOpen={setActiveReel}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reel Modal */}
      {activeReel && (
        <ReelModal reel={activeReel} onClose={() => setActiveReel(null)} />
      )}  

      {/* Testimonial */}
      <Testimonial />

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
