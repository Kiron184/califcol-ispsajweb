import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";

export default function AsignacionBeca() {
  const { id, anulado } = useParams();
  const navigation = useNavigate();
  const [comboAlumnos, setComboAlumnos] = useState([]);
  const [comboBecas, setComboBecas] = useState([]);
  const [beca, setBeca] = useState([]);

  var currentTime = new Date();
  var year = currentTime.getFullYear();

  let [input, setInput] = useState({
    alumno: "",
    curso: "",
    docnro: "",
    idasigbeca: "",
    idbeca: "",
    nivel: "",
    idalumno: "",
    beca: "",
    valor: "",
    fdesde: "",
    fhasta: "",
  });

  async function CargarComboAlumnos() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/comboalumnos.php"
      )
      .then((response) => {
        setComboAlumnos(response?.data);
      });
  }

  async function CargarComboBecas() {
    await axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/combobecas.php"
      )
      .then((response) => {
        setComboBecas(response?.data);
      });
  }

  useEffect(() => {
    CargarComboBecas();
    CargarComboAlumnos();
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/traerdatosasigbecas.php?idasigbeca=" +
            id
        )
        .then((response) => {
          console.log(response.data);
          setInput({
            alumno: response.data[0].alumno,
            curso: response.data[0].curso,
            docnro: response.data[0].docnro,
            idasigbeca: response.data[0].idasigbeca,
            idbeca: response.data[0].idbeca,
            nivel: response.data[0].nivel,
            idalumno: response.data[0].idalumno,
            beca: response.data[0].beca,
            valor: response.data[0].txvalor,
            fdesde: response.data[0].fdesde,
            fhasta: response.data[0].fhasta,
          });
          setBeca(input);
        });
    }
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function editarBeca(e) {
    e.preventDefault();
    if (id === "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/grabardatosasigbecas.php?oper=" +
            "A" +
            "&idbeca=" +
            input.idbeca +
            "&idasigbeca=" +
            0 +
            "&idalumno=" +
            input.idalumno +
            "&fdesde=" +
            input.fdesde +
            "&fhasta=" +
            input.fhasta +
            "&idusuario=83"
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No se puede completar la operación") {
            Swal.fire({
              title: "Error al asignar Beca!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/asignacionbecas");
              }
            });
          }
          navigation("/asignacionbecas");
        });
    } else {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/asignacionbecas/grabardatosasigbecas.php?oper=" +
            "M" +
            "&idbeca=" +
            input.idbeca +
            "&idasigbeca=" +
            input.idasigbeca +
            "&idalumno=" +
            input.idalumno +
            "&fdesde=" +
            input.fdesde +
            "&fhasta=" +
            input.fhasta +
            "&idusuario=83"
        )
        .then((response) => {
          console.log(response.data);
        });
      navigation("/asignacionbecas");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">Asignación de Becas</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de las Becas Asignadas.
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion de la Beca de{" "}
              <strong style={{ fontWeight: "500" }} className="text-secondary">
                {input.alumno}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/asignacionbecas");
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
                Listado Becas
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">
            Gestionar la informacion de la Asignación de la Beca
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
            <div style={{ fontSize: "13px" }} className="w-100 mt-3 ml-2">
              <form
                name="f_abm_docentes"
                id="id_abm_docentes"
                className=""
                onSubmit={(e) => editarBeca(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="idalumno"
                    className="col-sm-2 control-label text-label"
                  >
                    Alumno
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      name="idalumno"
                      className="form-control col-12 "
                      onChange={(e) => handleChange(e)}
                    >
                      <option selected value="">
                        Seleccional un Alumno
                      </option>
                      {comboAlumnos &&
                        comboAlumnos?.map((alumno) => {
                          return (
                            <option
                              key={alumno[0]}
                              value={alumno[0]}
                              name="idalumno"
                              selected={input.idalumno === alumno[0]}
                            >
                              {alumno[1]}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombre"
                    className="col-sm-2 control-label text-label"
                  >
                    Beca
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      name="idbeca"
                      className="form-control col-12 "
                      onChange={(e) => {
                        document.getElementById("valor").value = document
                          .getElementById(`${e.target.value}`)
                          .innerHTML.split(" ")[2]
                          ? document
                              .getElementById(`${e.target.value}`)
                              .innerHTML.split(" ")[2]
                          : "$1000";
                        handleChange(e);
                      }}
                    >
                      <option selected value="">
                        Seleccional Beca
                      </option>
                      {comboBecas &&
                        comboBecas?.map((beca) => {
                          return (
                            <option
                              key={beca[1]}
                              value={beca[1]}
                              id={beca[1]}
                              selected={input.idbeca === beca[1]}
                            >
                              {beca[1] === "12" ? "BECA AL 100%" : beca[0]}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label"
                  >
                    Valor
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      disabled
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="valor"
                      name={"valor"}
                      Value={input.valor === "1000%" ? "$1000" : input.valor}
                      onChange={(e) => handleChange(e)}
                      placeholder={beca.valor ? beca.valor : ""}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label"
                  >
                    Fecha Desde
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="date"
                      className="form-control form-control-sm"
                      id="fdesde"
                      name={"fdesde"}
                      Value={
                        input.fdesde !== "" ? input.fdesde : `${year}-01-01`
                      }
                      onChange={(e) => handleChange(e)}
                      //placeholder={beca.fdesde ? beca.fdesde : "2022-01-31"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label"
                  >
                    Fecha Hasta
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="date"
                      className="form-control form-control-sm"
                      id="fhasta"
                      name={"fhasta"}
                      Value={
                        input.fhasta !== "" ? input.fhasta : `${year}-12-31`
                      }
                      onChange={(e) => handleChange(e)}
                      //placeholder={beca.fhasta ? beca.fhasta : "Ingrese Valor"}
                    ></input>
                  </div>
                </div>
                {anulado !== "S" ? (
                  <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
                    <button
                      type="button"
                      className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                      id="id_cancelar"
                      onClick={() => {
                        navigation("/asignacionbecas");
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
                ) : (
                  <div className="w-100 fixed-bottom d-flex justify-content-between border-top bg-light pr-5">
                    <p className="text-danger h5 mx-5 my-3">ASIG. ANULADA</p>
                    <button
                      type="button"
                      className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                      id="id_cancelar"
                      onClick={() => {
                        navigation("/asignacionbecas");
                        document
                          .querySelector(".navbar")
                          .classList.remove("active-nav");
                        document
                          .querySelector(".contenedor")
                          .classList.remove("active-contenedor");
                      }}
                    >
                      Salir
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
