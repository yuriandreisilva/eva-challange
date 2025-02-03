import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white text-gray-800 p-4 flex justify-between items-center">
      <div>
        <img
          src="https://evapeople.com.br/wp-content/themes/loadstrap/assets/img/logo-eva-1.svg"
          alt="Eva Logo"
          className="h-10"
        />
      </div>
      <div className="relative">
        <button className="flex items-center focus:outline-none" onClick={toggleMenu}>
          <img
            src="https://evapeople.com.br/wp-content/themes/loadstrap/assets/img/eva-head.svg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2">Conta</span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Perfil</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Configurações</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-200">Sair</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
