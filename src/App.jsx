import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Products from "./Pages/Products"
import AuthPage from "./Pages/Auth/Login"
import ShoppingCart from "./Pages/Cart"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:category' element={<Products />} />
          <Route path='/product' element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
