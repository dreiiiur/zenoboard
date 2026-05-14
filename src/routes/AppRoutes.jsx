import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

// Lazy load all pages — each page only loads when the user visits it
const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const Applications = lazy(() => import('../pages/Applications'))
const TestimonialsPage = lazy(() => import('../pages/TestimonialsPage'))
const Contact = lazy(() => import('../pages/Contact'))

// Simple loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-primary rounded-full animate-spin" />
        <p className="text-stone-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
