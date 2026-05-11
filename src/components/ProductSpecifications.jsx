import { motion } from 'framer-motion'
import { FiBox, FiMaximize, FiLayers, FiDroplet, FiStar, FiGrid } from 'react-icons/fi'

const specIcons = {
  width: FiMaximize,
  length: FiMaximize,
  thickness: FiLayers,
  core: FiBox,
  finish: FiGrid,
  glueStandard: FiDroplet,
  grade: FiStar,
  surface: FiLayers,
}

const specLabels = {
  width: 'Width',
  length: 'Length',
  thickness: 'Thickness Options',
  core: 'Core Material',
  finish: 'Finish Type',
  glueStandard: 'Glue Standard',
  grade: 'Quality Grade',
  surface: 'Surface',
}

export default function ProductSpecifications({ specs, productName }) {
  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Technical Specs
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
            {productName} Specifications
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(specs).map(([key, value], i) => {
            const Icon = specIcons[key] || FiBox
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 group-hover:bg-primary transition-colors duration-300 flex items-center justify-center mb-4">
                  <Icon className="text-primary group-hover:text-white text-base transition-colors duration-300" />
                </div>
                <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                  {specLabels[key] || key}
                </p>
                <p className="text-stone-800 font-semibold text-sm leading-relaxed">{value}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
