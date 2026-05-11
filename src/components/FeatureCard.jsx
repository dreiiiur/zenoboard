import { motion } from 'framer-motion'
import {
  FiShield, FiClock, FiLayers, FiCheckCircle, FiHome, FiPackage,
} from 'react-icons/fi'

const iconMap = {
  shield: FiShield,
  clock: FiClock,
  layers: FiLayers,
  'check-circle': FiCheckCircle,
  home: FiHome,
  factory: FiPackage,
}

export default function FeatureCard({ feature, index = 0 }) {
  const Icon = iconMap[feature.icon] || FiShield

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group p-7 rounded-2xl border border-stone-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 bg-white transition-all duration-400 cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/8 group-hover:bg-primary transition-colors duration-300 flex items-center justify-center mb-5">
        <Icon className="text-primary group-hover:text-white text-xl transition-colors duration-300" />
      </div>
      <h3 className="text-base font-bold text-stone-800 mb-2">{feature.title}</h3>
      <p className="text-stone-500 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}
