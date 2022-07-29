import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../utils/logo_menu.png";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container">
        <a className="align-self-center" href="/">
          <img alt="logo" src={logo}></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin. Datos
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Alumnos
                </a>
                <div className="dropdown-divider"></div>
                <NavLink to="/home" className="dropdown-item">
                  Docentes
                </NavLink>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Materias
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Calificaciones
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Ingresar
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Mesas de Examen
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Boletines
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Inasistencias
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Ingresar
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Reincorporaciones
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
