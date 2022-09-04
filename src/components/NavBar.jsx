import React from "react";
import logo from "../utils/logo_menu.png";
import menu from "../utils/menu.png";
import profile from "../utils/user.png";
import help from "../utils/help.png";
import "../style/styles.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  if (window.location.href !== "/" && document.querySelector(".navbar")) {
    document.querySelector(".navbar").classList.remove("active-nav");
  }

  function handleClick(e) {
    e.preventDefault();
    document.querySelector(".navbar").classList.toggle("active-nav");
    if (document.querySelector(".contenedor")) {
      document
        .querySelector(".contenedor")
        .classList.toggle("active-contenedor");
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
          <li className="collapse-list-item">
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
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Cursos
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Codificadores
                </a>
              </li>
              <li
                style={{ listStyle: "none" }}
                onClick={(e) => {
                  document
                    .getElementById("adminDatos")
                    .classList.remove("show");
                  handleClick(e);
                }}
              >
                <NavLink to="/conceptosgenerales" className="collapse-item">
                  Conceptos Generales
                </NavLink>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Aranceles
                </a>
              </li>
              <li
                style={{ listStyle: "none" }}
                onClick={(e) => {
                  document
                    .getElementById("adminDatos")
                    .classList.remove("show");
                  handleClick(e);
                }}
              >
                <NavLink to="/becas" className="collapse-item">
                  Becas
                </NavLink>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Inscripción Alumnos
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Usuarios
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Parámetros
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Seguimiento
                </a>
              </li>
            </ul>
          </li>

          <li className="collapse-list-item">
            <a
              href="#calificaciones"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle nav-link"
            >
              Acciones
            </a>
            <ul class="collapse collapse-menu" id="calificaciones">
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Asignación de Becas
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Asignación de Convenios
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Liquidación por Curso
                </a>
              </li>
              <li
                style={{ listStyle: "none" }}
                onClick={(e) => {
                  document
                    .getElementById("calificaciones")
                    .classList.remove("show");

                  handleClick(e);
                }}
              >
                <NavLink to="/liquidacionindividual" className="collapse-item">
                  Liquidación Individual
                </NavLink>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Cobranzas
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Asignación de Convenios
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Procesar Archivo Cobranzas
                </a>
              </li>
            </ul>
          </li>

          <li className="collapse-list-item">
            <a
              href="#inasistencias"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle nav-link"
            >
              Caja
            </a>
            <ul class="collapse collapse-menu" id="inasistencias">
              <li style={{ listStyle: "none" }}>
                <a href="-" className="collapse-item">
                  Movimientos
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
