import React from "react";
import logo from "../utils/logo_menu.png";
import menu from "../utils/menu.png";
import profile from "../utils/user.png";
import help from "../utils/help.png";
import "../style/styles.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  function handleClick(e) {
    e.preventDefault();
    document.querySelector(".navbar").classList.toggle("active-nav");
    if (document.querySelector(".home")) {
      document.querySelector(".home").classList.toggle("active-home");
    }
  }

  return (
    <>
      <nav
        className="navbar navbar-expand d-flex flex-column align-item-start h-100"
        id="sidebar"
      >
        <div className="d-flex flex-row justify-content-start">
          <a href="/" className="navbar-brand text-light mt-1 mr-5">
            <img alt="logo" src={logo} className="" />
          </a>
          <img
            onClick={(e) => handleClick(e)}
            className="btn-nav"
            alt="logo"
            src={menu}
            width="30px"
            height="30px"
          />
        </div>

        <ul className="navbar-nav d-flex flex-column mt-5 w-100">
          <li>
            <a
              href="#adminDatos"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle nav-link"
            >
              Admin. Datos
            </a>
            <ul class="collapse collapse-menu" id="adminDatos">
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Alumnos
                </a>
              </li>
              <li style={{ listStyle: "none" }} onClick={(e) => handleClick(e)}>
                <NavLink to="/home" className="collapse-item">
                  Docentes
                </NavLink>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Materias
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#calificaciones"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle nav-link"
            >
              Calificaciones
            </a>
            <ul class="collapse collapse-menu" id="calificaciones">
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Ingresar
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Mesas de Examen
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Boletines
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#inasistencias"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle nav-link"
            >
              Inasistencias
            </a>
            <ul class="collapse collapse-menu" id="inasistencias">
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Ingresar
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Reincorporaciones
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* <div className="">
        <div className="">
          <img src={help} alt="help" />
          <img src={profile} alt="profile" />
        </div>
      </div> */}
    </>
  );
}
