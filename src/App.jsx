import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <>
      <div className="app">
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} /> 
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
      </div>
      </>
  )
}

export default App
{/*Botar Id */}