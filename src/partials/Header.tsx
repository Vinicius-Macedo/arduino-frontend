import Link from "next/link";
import React, { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav
        className={"navbar scroll" + (isMenuOpen ? " active" : "")}
        id="navbar"
      >
        <span className="navbar-logo">TCC/UNICAMP</span>
        <ul className="navlist onscroll">
          <li className="navlist-li">
            <Link href="/" className="navlist-a">
              Home
            </Link>
          </li>
          <li className="navlist-li">
            <Link href="/sensor" className="navlist-a">
              Sobre o projeto
            </Link>
          </li>
          <li className="navlist-li">
            <Link
              target={"_blank"}
              href="https://www.ft.unicamp.br/pt-br/graduacao/cursos/et"
              className="navlist-a"
            >
              Telecomunicações
            </Link>
          </li>

          <li className="navlist-li">
            <Link href="/clima" className="navlist-a">
              Clima
            </Link>
          </li>
        </ul>
        <button
          className="toggle-btn"
          id="btn-mobile"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="toggle-bars"></div>
        </button>
      </nav>
    </header>
  );
}
