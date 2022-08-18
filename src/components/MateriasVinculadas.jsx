import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";
import arrowLeft from "../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarMateria, modificarMateria } from "../actions";
import { useSelector } from "react-redux/es/exports";
import DocentesVinc from "./DocentesVinc";

export default function MateriasVinculadas() {
  const { id } = useParams();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const materia = useSelector((state) => state.materia);

  let [input, setInput] = useState({
    nombre: "",
    abreviatura: "",
    anio: 0,
    tipo: 0,
    tipoNota: 0,
    agrupacion: 0,
    idmateria: id,
  });

  useEffect(() => {
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/app/traerdatosmaterias.php?idmateria=" +
            id
        )
        .then((response) => {
          dispatch(cargarMateria(id));
          setInput({
            nombre: response.data[0][1],
            abreviatura: response.data[0][2],
            anio: response.data[0][3],
            tipo: response.data[0][4],
            tipoNota: response.data[0][5],
            agrupacion: response.data[0][6],
            idmateria: id,
          });
        });
    }
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
  }

  function editarDocente(e) {
    e.preventDefault();
    if (id === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/app/grabardatosmaterias.php?oper=" +
            "A" +
            "&idmateria=" +
            0 +
            "&nombre=" +
            input.nombre +
            "&abrev=" +
            input.abreviatura +
            "&anio=" +
            input.anio +
            "&tipo=" +
            input.tipo +
            "&agrup=" +
            input.agrupacion +
            "&tiponota=0"
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No se puede completar la operación") {
            Swal.fire({
              title: "Error al crear Materia!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/materias");
              }
            });
          }
          navigation("/materias");
        });
    } else {
      input.idmateria = id;
      axios
        .post(
          "https://www.califcolegios.wnpower.host/app/grabardatosmaterias.php?oper=" +
            "M" +
            "&idmateria=" +
            input.idmateria +
            "&nombre=" +
            input.nombre +
            "&abrev=" +
            input.abreviatura +
            "&anio=" +
            input.anio +
            "&tipo=" +
            input.tipo +
            "&agrup=" +
            input.agrupacion +
            "&tiponota=0"
        )
        .then((response) => {
          console.log(response.data);
        });
      let input2 = [
        input.idmateria,
        input.nombre,
        input.abreviatura,
        input.anio,
        input.tipo,

        input.agrupacion,
      ];
      dispatch(modificarMateria(input2));
      navigation("/materias");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">MATERIAS</h4>
            <p className="text-secondary">Crear y gestionar las Materias</p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion de la Materia {"  "}
              <strong className="ml-3 text-secondary font-weight-normal">
                {input.nombre}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/materias");
                  document
                    .querySelector(".navbar")
                    .classList.remove("active-nav");
                  document
                    .querySelector(".contenedor")
                    .classList.remove("active-contenedor");
                }}
              >
                {" "}
                <img width="20px" src={arrowLeft} alt="arrow-left" />
                Listado de Materias
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">
            Gestionar la informacion general de la materia
          </p>
        </div>
        <nav>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="datos-tab"
                data-bs-toggle="tab"
                data-bs-target="#datos"
                type="button"
                role="tab"
                aria-controls="datos"
                aria-selected="true"
                style={{ outline: 0 }}
              >
                Datos Básicos
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="materias-tab"
                data-bs-toggle="tab"
                data-bs-target="#materias"
                type="button"
                role="tab"
                aria-controls="materias"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Docentes
              </button>
            </li>
          </ul>
        </nav>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="datos"
            role="tabpanel"
            aria-labelledby="datos-tab"
          >
            {/* DATOS BASICOS */}
            <div className="w-100 mt-3">
              <form
                name="f_abm_docentes"
                id="id_abm_docentes"
                className=""
                onSubmit={(e) => editarDocente(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombre"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Nombre
                  </label>
                  <div className="col-md-4 col-lg-6">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="nombre"
                      name={"nombre"}
                      value={input.nombre}
                      onChange={(e) => handleChange(e)}
                      placeholder={materia[1] ? materia[1] : "Ingrese Nombre"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="abreviatura"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Abreviatura
                  </label>
                  <div className="col-md-4 col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      id="abreviatura"
                      name={"abreviatura"}
                      value={input.abreviatura}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        materia.abreviatura
                          ? materia.abreviatura
                          : "Ingrese Abreviatura"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="anio"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Año
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control"
                      id="anio"
                      name={"anio"}
                      value={input.anio}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar año</option>
                      <option value="1">1°</option>
                      <option value="2">2°</option>
                      <option value="3">3°</option>
                      <option value="4">4°</option>
                      <option value="5">5°</option>
                      <option value="6">6°</option>
                      <option value="7">7°</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="tipo"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Tipo
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control"
                      id="tipo"
                      name={"tipo"}
                      value={input.tipo}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar Tipo</option>
                      <option value="1">CURRICULAR</option>
                      <option value="2">EXTRACURRICULAR</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="agrupacion"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Agrupación
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control"
                      id="agrupacion"
                      name={"agrupacion"}
                      value={input.agrupacion}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar Agrupacion</option>
                      <option value="1">DE AULA</option>
                      <option value="2">DE TALLER</option>
                    </select>
                  </div>
                </div>

                <input
                  type="hidden"
                  name={"doper"}
                  value={"A"}
                  style={{ display: "none" }}
                ></input>

                <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
                  <button
                    type="button"
                    className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                    id="id_cancelar"
                    onClick={() => {
                      navigation("/materias");
                      document
                        .querySelector(".navbar")
                        .classList.remove("active-nav");
                      document
                        .querySelector(".contenedor")
                        .classList.remove("active-contenedor");
                    }}
                  >
                    Descartar Cambios
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-3 m-3 text-light shadow-sm"
                    id="id_grabar"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="materias"
            role="tabpanel"
            aria-labelledby="materias-tab"
          >
            <DocentesVinc id={id} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
