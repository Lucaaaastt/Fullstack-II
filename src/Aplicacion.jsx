import { Routes, Route } from 'react-router-dom'
import { Header } from './components/organisms/Header'
import { Footer } from './components/organisms/Footer'
import { CartProvider } from './context/CartContext'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import SobreNosotros from './pages/SobreNosotros'
import Carro from './pages/Carro'
import '../style/Aplicacion.css'

function Aplicacion() {
  const navItems = [
    { id: 'inicio', text: 'Inicio', href: '/' },
    { id: 'catalogo', text: 'Catalogo', href: '/productos' },
    { id: 'nosotros', text: 'Sobre nosotros', href: '/sobre-nosotros' },
    { id: 'carro', text: 'Carro', href: '/carro'},
  ]
  const footerItems = [
    { id: 'inicio', text: 'Inicio', href: '/' },
    { id: 'nosotros', text: 'Sobre nosotros', href: '/sobre-nosotros' },
    {
      id: 'github', text: 'GitHub',
      href: 'https://github.com/Lucaaaastt/EvaluacionFS_1',
      target: '_blank', rel: 'noopener noreferrer',
    },
  ]

  return (
    <CartProvider>
      <Header items={navItems} />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path='/carro' element={<Carro/>}/>
        </Routes>
      </main>
      <Footer items={footerItems} />
    </CartProvider>
  )
}

export default Aplicacion