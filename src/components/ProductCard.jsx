import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/products/${product.id}`}
        className="group relative block rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Finish badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
              {product.finish}
            </span>
          </div>

          {/* Color dot */}
          <div
            className="absolute top-4 right-4 w-7 h-7 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: product.color }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs font-medium text-stone-400 tracking-widest uppercase mb-1">
            {product.category}
          </p>
          <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Dimensions */}
          <div className="flex flex-wrap gap-2 mb-5">
            {['4ft × 8ft', '18mm'].map((dim) => (
              <span key={dim} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full">
                {dim}
              </span>
            ))}
          </div>

          {/* Arrow CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">View Details</span>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <FiArrowRight className="text-primary group-hover:text-white text-sm transition-colors duration-300 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
