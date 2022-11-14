import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarCodificador } from "../../actions";

export default function Codificador() {
  const { id, idcodificador } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  let [input, setInput] = useState({
    id: "",
    descripcion: "",
    codigo: "",
    codigo1: "",
    habilitada: "",
  });

  useEffect(() => {
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/codificadores/traerdatoscodificadores.php?id=" +
            id +
            "&idcodificador=" +
            idcodificador
        )
        .then((response) => {
          console.log(response.data);
          setInput({
            id: response.data[0].id,
            descripcion: response.data[0].descripcion,
            codigo: response.data[0].codigonum,
            codigo1: response.data[0].codigo1,
            habilitada: response.data[0].habilitado,
          });
          if (response.data[0].habilitado === "1") {
            document.getElementById("radio1").checked = true;
          } else document.getElementById("radio2").checked = true;
          dispatch(cargarCodificador(input));
        });
    } else {
      document.getElementById("codigo").disabled = true;
      document.getElementById("radio1").checked = true;
    }
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function editarCodificador(e) {
    e.preventDefault();

    if (document.getElementById("radio1").checked) {
      input.habilitada = 1;
    } else input.habilitada = 0;

    if (id === "0" && idcodificador === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/codificadores/grabardatoscodificadores.php?oper=" +
            "A" +
            "&id=" +
            1 +
            "&idcodificador=" +
            0 +
            "&descripcion=" +
            input.descripcion +
            "&codigo1=" +
            input.codigo1 +
            "&habilitado=" +
            input.habilitada
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 5) {
            Swal.fire({
              title: "Error al crear Codificador!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/codificadores");
              }
            });
          }
          navigation("/codificadores");
        });
    } else {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/codificadores/grabardatoscodificadores.php?oper=" +
            "M" +
            "&id=" +
            input.id +
            "&idcodificador=" +
            input.codigo +
            "&descripcion=" +
            input.descripcion +
            "&codigo1=" +
            input.codigo1 +
            "&habilitado=" +
            input.habilitada
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 5) {
            Swal.fire({
              title: "Error al crear Codificador!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/codificadores");
              }
            });
          }
        });
      navigation("/codificadores");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">Codificadores</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de los Codificadores.
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion del Codificador{" "}
              <strong style={{ fontWeight: "500" }} className="text-secondary">
                {input.descripcion.toUpperCase()}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/codificadores");
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
                Listado Codificadores
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">
            Gestionar la informacion del Codificador
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
            <div style={{ fontSize: "13px" }} className="w-75 mt-3 ml-2">
              <form
                name="f_abm_docentes"
                id="id_abm_docentes"
                className=""
                onSubmit={(e) => editarCodificador(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="descripcion"
                    className="col-sm-2 control-label text-label"
                  >
                    Descripción
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="descripcion"
                      name={"descripcion"}
                      value={input.descripcion}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Descripción"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="codigo"
                    className="col-sm-2 control-label text-label "
                  >
                    Código
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      disabled
                      type="text"
                      className="form-control form-control-sm"
                      id="codigo"
                      name={"codigo"}
                      value={input.codigo}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Código"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="codigo1"
                    className="col-sm-2 control-label text-label "
                  >
                    Código 1
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="codigo1"
                      name={"codigo1"}
                      value={input.codigo1}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Valor"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="habilitada"
                    className="col-sm-2 control-label text-label "
                  >
                    Habilitada
                  </label>
                  <div className="col-sm-4 col-lg-3 d-flex flex-column justify-content-around">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio1"
                      ></input>
                      <label class="form-check-label" for="radio1">
                        Si
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio2"
                      ></input>
                      <label class="form-check-label" for="radio2">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
                  <button
                    type="button"
                    className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                    id="id_cancelar"
                    onClick={() => {
                      navigation("/codificadores");
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
        </div>
      </div>
    </React.Fragment>
  );
}
