import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'

function getDirectionsUrl(mapUrl) {
  const cidMatch = mapUrl.match(/!1s0x[0-9a-f]+%3A0x([0-9a-f]+)!2s/)
  if (cidMatch) {
    const cid = BigInt(`0x${cidMatch[1]}`).toString()
    if (cid !== '0') {
      return `https://www.google.com/maps?cid=${cid}`
    }
  }

  const coordMatch = mapUrl.match(/!2d(-?\d+\.?\d*)!3d(-?\d+\.?\d*)/)
  if (coordMatch) {
    const [, lng, lat] = coordMatch
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  }

  return '#'
}

export default function BranchCard({ branch, index = 0 }) {
  const directionsUrl = getDirectionsUrl(branch.mapUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-400"
    >
      {/* Map placeholder */}
      <div className="relative h-52 bg-stone-100 overflow-hidden">
        <iframe
          title={`Map - ${branch.city}`}
          className="w-full h-full border-0 grayscale"
          src={branch.mapUrl}
          allowFullScreen
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full shadow-md">
            {branch.city}, {branch.province}
          </span>
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-xl font-bold text-stone-800 mb-5">
          {branch.city} Branch
        </h3>

        <ul className="space-y-3.5 mb-6">
          <li className="flex items-start gap-3">
            <FiMapPin className="text-primary mt-0.5 shrink-0" />
            <span className="text-stone-600 text-sm leading-relaxed">{branch.address}</span>
          </li>
          <li className="flex items-center gap-3">
            <FiPhone className="text-primary shrink-0" />
            <a href={`tel:${branch.phone}`} className="text-stone-600 text-sm hover:text-primary transition-colors">
              {branch.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiMail className="text-primary shrink-0" />
            <a href={`mailto:${branch.email}`} className="text-stone-600 text-sm hover:text-primary transition-colors">
              {branch.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiClock className="text-primary shrink-0" />
            <span className="text-stone-600 text-sm">{branch.hours}</span>
          </li>
        </ul>

        <a
          
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-stone-700 hover:bg-stone-900 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors"
        >
          <FiMapPin />
          <span>{branch.city} Branch</span>
        </a>
      </div>
    </motion.div>
  )
}