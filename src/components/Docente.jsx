import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";
import arrowLeft from "../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarDocente, modificarDocente } from "../actions";
import { useSelector } from "react-redux/es/exports";
import Materias from "./Materias";

export default function Docente() {
  const { id } = useParams();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  let [input, setInput] = useState({
    apellido: "",
    nombres: "",
    docnro: "",
    email: "",
    domicilio: "",
    telefono: "",
    fechasalida: "",
    oper: "M",
  });

  useEffect(() => {
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/app/traerdatosdocentes.php?niddocente=" +
            id
        )
        .then((response) => {
          dispatch(cargarDocente(id));
          setInput({
            apellido: response.data[0][1],
            nombres: response.data[0][2],
            docnro: response.data[0][3],
            email: response.data[0][4],
            domicilio: response.data[0][5],
            telefono: response.data[0][6],
            fechasalida: response.data[0][7],
            iddocente: "",
          });
        });
    }
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function editarDocente(e) {
    e.preventDefault();
    if (id === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/app/grabardatosdocentes.php?oper=" +
            "A" +
            "&iddocente=" +
            0 +
            "&apellido=" +
            input.apellido +
            "&nombres=" +
            input.nombres +
            "&docnro=" +
            input.docnro +
            "&email=" +
            input.email +
            "&fechasalida=" +
            input.fechasalida +
            "&domicilio=" +
            input.domicilio +
            "&telefono=" +
            input.telefono
        )
        .then((response) => {
          //cargarUsers();
          console.log(response.data);
          if (response.data === "No se puede completar la operación") {
            Swal.fire({
              title: "Error al crear Docente!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/home");
              }
            });
          }
          navigation("/home");
        });
    } else {
      input.iddocente = id;
      axios
        .post(
          "https://www.califcolegios.wnpower.host/app/grabardatosdocentes.php?oper=" +
            "M" +
            "&iddocente=" +
            input.iddocente +
            "&apellido=" +
            input.apellido +
            "&nombres=" +
            input.nombres +
            "&docnro=" +
            input.docnro +
            "&email=" +
            input.email +
            "&fechasalida=" +
            input.fechasalida +
            "&domicilio=" +
            input.domicilio +
            "&telefono=" +
            input.telefono
        )
        .then((response) => {
          console.log(response.data);
        });
      let input2 = [
        input.apellido,
        input.nombres,
        input.docnro,
        input.email,
        input.iddocente,
      ];
      dispatch(modificarDocente(input2));
      navigation("/home");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">DOCENTES</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de los docentes que van a acceder a la
              plataforma
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion del Docente {"  "}
              <strong className="ml-3 text-secondary font-weight-normal">
                {input.apellido + " " + input.nombres}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/home");
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
                Listado Docentes
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">
            Gestionar la informacion general del docente
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
                Materias
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
                    htmlFor="apellido"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Apellido
                  </label>
                  <div className="col-sm-6">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="apellido"
                      name={"apellido"}
                      value={input.apellido}
                      onChange={(e) => handleChange(e)}
                      placeholder={user[1] ? user[1] : "Ingrese Apellido"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombres"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Nombres
                  </label>
                  <div className="col-sm-6">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="nombres"
                      name={"nombres"}
                      value={input.nombres}
                      onChange={(e) => handleChange(e)}
                      placeholder={user[2] ? user[2] : "Ingrese Nombres"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="docnro"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Documento
                  </label>
                  <div className="col-sm-3">
                    <input
                      required
                      type="text"
                      pattern="[0-9]+"
                      min="1"
                      step="1"
                      onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                      className="form-control"
                      id="docnro"
                      name={"docnro"}
                      value={input.docnro}
                      onChange={(e) => handleChange(e)}
                      placeholder={user[3] ? user[3] : "Ingrese Documento"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="email"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Correo Electrónico
                  </label>
                  <div className="col-sm-6">
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="email"
                      name={"email"}
                      value={input.email}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        user[4] ? user[4] : "Ingrese Correo Electrónico"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="domicilio"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Domicilio
                  </label>
                  <div className="col-sm-6">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="domicilio"
                      name={"domicilio"}
                      value={input.domicilio}
                      onChange={(e) => handleChange(e)}
                      placeholder={user[5] ? user[5] : "Ingrese el Domicilio"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="telefono"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Teléfono
                  </label>
                  <div className="col-sm-6">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="telefono"
                      name={"telefono"}
                      value={input.telefono}
                      onChange={(e) => handleChange(e)}
                      placeholder={user[6] ? user[6] : "Ingrese Teléfono"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="fechasalida"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Fecha Salida
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="date"
                      className="form-control"
                      id="fechasalida"
                      name={"fechasalida"}
                      value={input.fechasalida}
                      placeholder={user[7] ? user[7] : ""}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </div>
                </div>

                <input
                  type="hidden"
                  id="iddocente"
                  name={"iddocente"}
                  value={input.iddocente}
                  style={{ display: "none" }}
                ></input>
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
                      navigation("/home");
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
            <Materias id={id} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
