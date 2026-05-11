import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function RecommendedProducts({ currentId, products }) {
  const others = products.filter((p) => p.id !== currentId)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              Explore More
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
              Other Available Finishes
            </h2>
          </div>
          <Link
            to="/products"
            className="group hidden sm:inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
          >
            View All <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {others.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/products/${product.id}`}
                className="group block rounded-2xl overflow-hidden border border-stone-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/8 transition-all duration-400"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: product.color }}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{product.finish}</p>
                  <h3 className="font-bold text-stone-800 group-hover:text-primary transition-colors duration-300 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 text-xs line-clamp-2 mb-3">{product.shortDescription}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold">
                    View Details <FiArrowRight className="text-[10px]" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
