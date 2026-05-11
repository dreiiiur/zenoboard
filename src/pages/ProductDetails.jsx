import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiChevronRight, FiHome } from 'react-icons/fi'

import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductSpecifications from '../components/ProductSpecifications'
import RecommendedProducts from '../components/RecommendedProducts'
import ProductCTA from '../components/ProductCTA'

import { products, applications } from '../data/products'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)

  if (!product) return <Navigate to="/products" replace />

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-stone-50 border-b border-stone-100 pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-stone-400">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <FiHome className="text-xs" /> Home
            </Link>
            <FiChevronRight className="text-xs" />
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <FiChevronRight className="text-xs" />
            <span className="text-stone-600 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero: Gallery + Info */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* Gallery - sticky on desktop */}
            <div className="lg:sticky lg:top-28">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="py-16 bg-stone-50 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
                  Product Overview
                </span>
                <h2 className="text-3xl font-bold text-stone-800 mb-5">
                  About {product.name}
                </h2>
                <p className="text-stone-500 leading-relaxed text-lg">
                  {product.fullDescription}
                </p>
              </motion.div>
            </div>

            {/* Material Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-stone-100 self-start"
            >
              <h3 className="font-bold text-stone-800 mb-5">Material Highlights</h3>
              <div className="space-y-4">
                {[
                  { label: 'Grade', value: 'Triple A' },
                  { label: 'Core', value: 'Marine Hardwood' },
                  { label: 'Finish', value: 'HPL (High-Pressure Laminate)' },
                  { label: 'Glue', value: 'WBP Standard' },
                  { label: 'Surface', value: 'Double-sided' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                    <span className="text-stone-400 text-sm">{item.label}</span>
                    <span className="text-stone-800 text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <ProductSpecifications specs={product.specs} productName={product.name} />

     {/* Applications */}
    {/*}  <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
              Ideal For
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
              Where {product.name} Excels
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {applications.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`relative rounded-2xl overflow-hidden aspect-square group cursor-pointer ${
                  product.applications.includes(app.name) ? '' : 'opacity-50 grayscale'
                }`}
              >
                <img
                  src={app.image}
                  alt={app.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold text-center leading-tight">{app.name}</p>
                </div>
                {product.applications.includes(app.name) && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">✓</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-stone-400 text-sm mt-5 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-primary inline-flex items-center justify-center text-white text-[8px]">✓</span>
            Recommended applications highlighted
          </p>
        </div>
      </section>
      */}

      {/* Recommended Products */}
      <RecommendedProducts currentId={product.id} products={products} />

      {/* Product CTA */}
      <ProductCTA productName={product.name} />
    </>
  )
}
