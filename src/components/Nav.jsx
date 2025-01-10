import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../utils/styles";


const NavLinks = () => { 

  const userRole = localStorage.getItem("role");


  return (
    <>
      {/* Links restritos para administradores */}
      {userRole === "Admin" && (
          <>
            <Link to="/users">Users</Link>
            <Link to="/addplace">Adicionar</Link>
          </>
        )}

      {/* Links visíveis para todos */}
      <Link to="/">Places</Link>

      <Link to="/about" className="">
        Us
      </Link>
      <Link to="/contact">Contact</Link>
      <div className={`hidden md:block`}>
        <Link to="/perfil">
          <img
            src="https://picsum.photos/40"
            className="rounded-[100px]"
            alt="Profile"
          />
        </Link>
      </div>
    </>
  );
}

const Nav = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleBLue = () => {
    setTimeout(() => {
      setActive(false);
    }, 100);
  };
  return (
    <nav className="text-white p-4">
      <div className={`${styles.row} justify-between`}>
        <div className="flex gap-24 items-baseline">
          <div>
            <Link to="/" className={`text-2xl font-bold`} aria-label="Home">
              DHelper
            </Link>
          </div>
          <div className={`md:flex ${active ? "hidden" : "hidden"} md:block`}>
          
          </div>
        </div>

        <div
          className={`md:flex gap-12 md:space-x-0 items-center ${
            active ? "hidden" : "hidden"
          } md:block`}
        >
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button
            id="menu-button"
            className="focus:outline-none"
            onClick={handleClick}
            aria-label="Menu"
            onBlur={handleBLue}
          >
            <img src="icons8-menu.svg" alt="Menu Icon" />
          </button>
          <div className={`group relative ${active ? "block" : "hidden"}`}>
            <div id="dropdown" className={`${styles.dropdown}`}>
              <NavLinks />
              <Link to="/perfil" className="block">
                Perfil
              </Link>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Nav;
