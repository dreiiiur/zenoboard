import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiZoomIn } from 'react-icons/fi'

export default function ProductGallery({ images, productName }) {
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div
          className="relative rounded-3xl overflow-hidden bg-stone-100 aspect-[4/3] cursor-zoom-in group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setLightbox(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selected}
              src={images[selected]}
              alt={`${productName} - view ${selected + 1}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: hovered ? 1.05 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Zoom hint */}
          <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <FiZoomIn className="text-stone-600 text-sm" />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            {selected + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-200 ${
                selected === i
                  ? 'ring-2 ring-primary ring-offset-2 shadow-md'
                  : 'ring-1 ring-stone-200 hover:ring-stone-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[selected]}
              alt={productName}
              className="max-w-4xl max-h-[85vh] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white text-xl"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
