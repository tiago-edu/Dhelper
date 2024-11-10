// router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Us from '../pages/Us';
import Perfil from '../pages/Perfil';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import AddPlace from '../pages/AddPlace';

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/addplace" element={<AddPlace />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<Us />} />
      <Route exact path="/perfil" element={<Perfil />} />
      <Route exact path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRouter;
