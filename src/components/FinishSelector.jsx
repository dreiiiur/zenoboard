import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'

export default function FinishSelector({ currentId }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">
        Available Finishes
      </p>
      <div className="grid grid-cols-4 gap-2.5">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className={`group relative rounded-xl overflow-hidden aspect-square transition-all duration-200 ${
              p.id === currentId
                ? 'ring-2 ring-primary ring-offset-2 shadow-md'
                : 'ring-1 ring-stone-200 hover:ring-primary/40 hover:shadow-md opacity-80 hover:opacity-100'
            }`}
            title={p.name}
          >
            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-1.5 left-0 right-0 text-center text-white text-[9px] font-semibold px-1">
              {p.name}
            </p>
            {p.id === currentId && (
              <motion.div
                layoutId="selected-finish"
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="w-2 h-2 rounded-full bg-white block" />
              </motion.div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
