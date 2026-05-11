import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaFacebookMessenger } from "react-icons/fa";
import { FiStar, FiPhone, FiMessageSquare, FiCalendar, FiCheck, } from 'react-icons/fi'
import FinishSelector from './FinishSelector'

export default function ProductInfo({ product }) {
  const [selectedThickness, setSelectedThickness] = useState(product.selectedThickness)
  const [requested, setRequested] = useState(false)

  const handleRequest = () => {
    setRequested(true)
    setTimeout(() => setRequested(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="flex flex-col gap-7"
    >
      {/* Category */}
      <div>
        <span className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">
          {product.category}
        </span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl lg:text-5xl font-bold text-stone-800 leading-tight mb-2">
          {product.name}
        </h1>
        <p className="text-stone-400 text-lg">{product.tagline}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`text-sm ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`}
            />
          ))}
        </div>
        <span className="text-stone-800 text-sm font-semibold">{product.rating}</span>
        <span className="text-stone-400 text-sm">({product.reviewCount} reviews)</span>
      </div>

      {/* Description */}
      <p className="text-stone-500 leading-relaxed text-base">
        {product.shortDescription}
      </p>

      {/* Divider */}
      <div className="border-t border-stone-100" />

      {/* Thickness Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">Thickness</p>
          <span className="text-primary text-sm font-semibold">{selectedThickness}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.thicknesses.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedThickness(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedThickness === t
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Finish Selector */}
      <FinishSelector currentId={product.id} />

      {/* Size Info */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Width', value: product.dimensions.width },
          { label: 'Length', value: product.dimensions.length },
        ].map((d) => (
          <div key={d.label} className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{d.label}</p>
            <p className="text-stone-800 font-semibold text-sm">{d.value}</p>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleRequest}
          className={`flex-1 group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-semibold rounded-xl transition-all duration-300 ${
            requested
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5'
          }`}
        >
          {requested ? (
            <><FiCheck className="text-lg" /> Request Sent!</>
          ) : (
            <><FaFacebookMessenger />Messenger</>
          )}
        </button>

        <Link
          to="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-stone-200 hover:text-primary hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
        >
          <FiPhone className="text-sm" />
          Call Us
        </Link>

        <Link
          to="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all duration-300"
        >
          <FiCalendar className="text-sm" />
          Reserve Slot
        </Link>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {product.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-500 text-xs font-medium rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
