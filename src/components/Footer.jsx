import { Link } from 'react-router-dom'
import { RiLeafLine } from 'react-icons/ri'
import { FaTiktok } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/products', label: 'Products' },
  { path: '/applications', label: 'Applications' },
  { path: '/contact', label: 'Contact' },
]

const products = [
  { path: '/products/black-walnut', label: 'Black Walnut' },
  { path: '/products/straight-oak', label: 'Straight Oak' },
  { path: '/products/wenge', label: 'Wenge' },
  { path: '/products/white', label: 'White' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a1209] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div>
                <img src="/logo-negative.png" alt="ZenoBoard Logo" className="w-32" />
              </div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Premium laminated marine plywood for residential and commercial projects. Grade Triple A quality, manufacturer direct.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61576497621623" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white text-lg transition-colors">
                <FiFacebook />
              </a>
              <a href="https://www.instagram.com/zenoboardphilippines/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white text-lg transition-colors">
                <FiInstagram />
              </a>
              <a href="https://www.tiktok.com/@zenoboardph?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white text-lg transition-colors">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-stone-300 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-stone-300 mb-5">Finishes</h4>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.path}>
                  <Link
                    to={p.path}
                    className="text-stone-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-stone-300 mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-0.5 shrink-0" />
                <span className="text-stone-400 text-sm leading-relaxed">
                  Pulilan, Bulacan & Antipolo, Rizal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" />
                <a href="tel:+639123456789" className="text-stone-400 hover:text-white text-sm transition-colors">
                  +63 912 345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" />
                <a href="mailto:info@zenoboard.ph" className="text-stone-400 hover:text-white text-sm transition-colors">
                  info@zenoboard.ph
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            © {new Date().getFullYear()} Zenoboard Philippines. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-stone-500 hover:text-stone-300 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-stone-500 hover:text-stone-300 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
