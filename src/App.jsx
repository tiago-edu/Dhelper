import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Us from './pages/Us'
import Perfil from './pages/Perfil'
import Contact from './pages/Contact'
import Home from './pages/Home';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} /> 
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<Us />} />
            <Route exact path="/perfil" element={<Perfil />} />
            <Route exact path="/contact" element={<Contact />} />

          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App;
