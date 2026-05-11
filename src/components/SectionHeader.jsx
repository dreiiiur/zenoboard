import { motion } from 'framer-motion'

export default function SectionHeader({ badge, title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={center ? 'text-center mb-14' : 'mb-14'}
    >
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${
          light ? 'bg-white/15 text-white/70' : 'bg-primary/10 text-primary'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-4xl lg:text-5xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-stone-800'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-stone-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
