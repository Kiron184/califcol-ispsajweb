import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarConcepto } from "../../actions";
import { useSelector } from "react-redux/es/exports";

export default function Docente() {
  const { id } = useParams();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const concepto = useSelector((state) => state.concepto);

  let [input, setInput] = useState({
    idconcepto: "",
    descrip: "",
    monto: "",
    idnivel: "",
    oblig: "",
    habilitado: "",
    idtipo: "",
  });

  useEffect(() => {
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerdatosconcepto.php?idconcepto=" +
            id
        )
        .then((response) => {
          setInput({
            idconcepto: response.data[0][0],
            descrip: response.data[0][1],
            monto: response.data[0][2],
            idnivel: response.data[0][3],
            oblig: response.data[0][4],
            habilitado: response.data[0][5],
            idtipo: response.data[0][6],
          });
          dispatch(cargarConcepto(input));

          console.log(response.data[0][5]);
          if (response.data[0][5] === "2") {
            document.getElementById("flexRadioDefault1").checked = true;
          }
          if (response.data[0][5] === "1") {
            document.getElementById("flexRadioDefault2").checked = true;
          }
        });
    }
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCheckbox(e) {
    e.preventDefault();
    const habilitado = "habilitado";
    if (e.target.id === "flexRadioDefault2") {
      setInput((prev) => ({ ...prev, [habilitado]: "1" }));
    }
    if (e.target.id === "flexRadioDefault1") {
      setInput((prev) => ({ ...prev, [habilitado]: "2" }));
    }
  }

  function editarDocente(e) {
    e.preventDefault();
    if (id === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosconceptos.php?oper=" +
            "A" +
            "&idconcepto=" +
            0 +
            "&descripcion=" +
            input.descrip +
            "&monto=" +
            0 +
            "&rbhabil=" +
            input.habilitado +
            "&idnivel=" +
            0 +
            "&rboblig=" +
            0 +
            "&idtipo=" +
            input.idtipo
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No se puede completar la operación") {
            Swal.fire({
              title: "Error al crear Docente!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/conceptosgenerales");
              }
            });
          }
          navigation("/conceptosgenerales");
        });
    } else {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosconceptos.php?oper=" +
            "M" +
            "&idconcepto=" +
            id +
            "&descripcion=" +
            input.descrip +
            "&monto=" +
            input.monto +
            "&rbhabil=" +
            input.habilitado +
            "&idnivel=" +
            input.idnivel +
            "&rboblig=" +
            input.oblig +
            "&idtipo=" +
            input.idtipo
        )
        .then((response) => {
          console.log(response.data);
        });
      navigation("/conceptosgenerales");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">CONCEPTOS GENERALES</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de los Conceptos Generales
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion del Concepto {"  "}
              <strong className="ml-3 text-secondary font-weight-normal">
                {input.descrip}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/conceptosgenerales");
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
                Listado Conceptos Generales
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">
            Gestionar la informacion del Concepto General
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
            <div className="w-100 mt-3">
              <form
                name="f_abm_docentes"
                id="id_abm_docentes"
                className=""
                onSubmit={(e) => editarDocente(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="descrip"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Descripción
                  </label>
                  <div className="col-sm-6">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="descrip"
                      name={"descrip"}
                      value={input.descrip}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        concepto[0] ? concepto[0] : "Ingrese Descripcion"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="idtipo"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Tipo
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control"
                      id="idtipo"
                      name={"idtipo"}
                      value={input.idtipo}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar tipo</option>
                      <option value="1">MONTO</option>
                      <option value="2">RECARGO</option>
                      <option value="3">A CUENTA</option>
                      <option value="4">DESCUENTO</option>
                      <option value="5">NOVEDAD</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="habilitado"
                    className="col-sm-2 control-label text-label h6"
                  >
                    Habilitado
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={(e) => handleCheckbox(e)}
                      ></input>
                      <label class="form-check-label" for="flexRadioDefault1">
                        Si
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onChange={(e) => handleCheckbox(e)}
                      ></input>
                      <label class="form-check-label" for="flexRadioDefault2">
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
                      navigation("/conceptosgenerales");
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
