import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Applications from '../pages/Applications'
import Contact from '../pages/Contact'
import TestimonialsPage from '../pages/TestimonialsPage'

export default function AppRoutes() {
  return (
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
  )
}
