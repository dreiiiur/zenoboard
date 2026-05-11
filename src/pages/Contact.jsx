import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { branches } from '../data/products'

// ─── Replace these three values with your EmailJS credentials ───────────────
const EMAILJS_PUBLIC_KEY  = '4-piGiNNKx3WX1b26'
const EMAILJS_SERVICE_ID  = 'service_5rjooxj'
const EMAILJS_TEMPLATE_ID = 'template_urg7r7l'
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', branch: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '', branch: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-stone-50 overflow-hidden">
        <div className="absolute inset-0 bg-wood-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              Contact Us
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-stone-800 mb-6">
              Let's Talk About
              <span className="text-primary block">Your Next Project</span>
            </h1>
            <p className="text-stone-500 text-xl max-w-2xl mx-auto">
              Get in touch for bulk pricing, custom orders, or expert consultation. Our team responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Branch Info */}
            <div className="lg:col-span-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl font-bold text-stone-800 mb-3">Our Branches</h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-8">
                  Visit us at either branch or reach out via phone or email. We'd love to discuss your project requirements.
                </p>
              </motion.div>

              {branches.map((branch, i) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-stone-50 border border-stone-100"
                >
                  <h3 className="font-bold text-stone-800 mb-4">{branch.city}, {branch.province}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-stone-500">
                      <FiMapPin className="text-primary mt-0.5 shrink-0" /> {branch.address}
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <FiPhone className="text-primary shrink-0" />
                      <a href={`tel:${branch.phone}`} className="text-stone-500 hover:text-primary transition-colors">{branch.phone}</a>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <FiMail className="text-primary shrink-0" />
                      <a href={`mailto:${branch.email}`} className="text-stone-500 hover:text-primary transition-colors">{branch.email}</a>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-stone-500">
                      <FiClock className="text-primary shrink-0" /> {branch.hours}
                    </li>
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <FiCheckCircle className="text-green-500 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-3">Message Sent!</h3>
                  <p className="text-stone-500 max-w-sm mb-8">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 border border-stone-200 text-stone-600 text-sm font-medium rounded-full hover:bg-stone-50 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                  {status === 'error' && (
                    <div className="flex items-center gap-3 px-4 py-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                      <FiAlertCircle className="shrink-0" />
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-2">Full Name <span className="text-red-400">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Juan dela Cruz"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-stone-800 text-sm placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Email Address <span className="text-red-400">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="juan@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-stone-800 text-sm placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+63 912 345 6789"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-stone-800 text-sm placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Preferred Branch</label>
                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-stone-800 text-sm bg-white"
                      >
                        <option value="">Select branch</option>
                        <option value="Pulilan, Bulacan">Pulilan, Bulacan</option>
                        <option value="Antipolo, Rizal">Antipolo, Rizal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Bulk order inquiry, Quote request"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-stone-800 text-sm placeholder-stone-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Message <span className="text-red-400">*</span></label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      placeholder="Tell us about your project — dimensions, quantity, finish preferences, and any special requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-stone-800 text-sm placeholder-stone-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'sending' ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <FiSend className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
