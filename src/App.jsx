import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Checkout from './pages/Checkout.jsx';
import AuthProvider from './context/AuthContext.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import CartProvider from './context/CartContext.jsx';



function App() {
  
  return (
    <div className='app'>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/auth' element={<Auth />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/products/:productId' element={<ProductDetails />}/>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
  
}

export default App
