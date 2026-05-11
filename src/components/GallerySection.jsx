import { motion } from 'framer-motion'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80', span: 'col-span-2 row-span-2', alt: 'Modern interior' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', span: '', alt: 'Kitchen cabinet' },
  { src: 'https://images.unsplash.com/photo-1493806756757-e6ef97df45ec?w=600&q=80', span: '', alt: 'Wardrobe' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', span: '', alt: 'TV console' },
  { src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80', span: '', alt: 'Office table' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', span: 'col-span-2', alt: 'Bedroom' },
]

export default function GallerySection() {
  return (
    <section className="py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Project Gallery
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 mb-4">
            Crafted for Real Spaces
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            A glimpse of how Zenoboard plywood transforms spaces across the Philippines.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-500" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
