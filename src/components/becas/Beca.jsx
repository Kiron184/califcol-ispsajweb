import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarBeca } from "../../actions";
import { useSelector } from "react-redux/es/exports";
import Conceptos from "./Conceptos";

export default function Beca() {
  const { id } = useParams();
  const navigation = useNavigate();

  const dispatch = useDispatch();

  const beca = useSelector((state) => state.beca);

  let [input, setInput] = useState({
    idbeca: "",
    nombre: "",
    tipo: "",
    valor: "",
  });

  useEffect(() => {
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/traerdatosbeca.php?idbeca=" +
            id
        )
        .then((response) => {
          setInput({
            idbeca: response.data[0][0],
            nombre: response.data[0][1],
            tipo: response.data[0][2],
            valor: response.data[0][3],
          });
          dispatch(cargarBeca(input));
        });
    }
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function editarBeca(e) {
    e.preventDefault();
    if (id === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosbecas.php?oper=" +
            "A" +
            "&idbeca=" +
            0 +
            "&nombre=" +
            input.nombre +
            "&tipo=" +
            input.tipo +
            "&valor=" +
            input.valor
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "No se puede completar la operación") {
            Swal.fire({
              title: "Error al crear Beca!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/becas");
              }
            });
          }
          navigation("/becas");
        });
    } else {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/grabardatosbecas.php?oper=" +
            "M" +
            "&idbeca=" +
            id +
            "&nombre=" +
            input.nombre +
            "&tipo=" +
            input.tipo +
            "&valor=" +
            input.valor
        )
        .then((response) => {
          console.log(response.data);
        });
      navigation("/becas");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">Becas</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de las Becas.
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion de la Beca{" "}
              <strong style={{ fontWeight: "500" }} className="text-secondary">
                {input.nombre}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/becas");
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
          <p className="text-secondary">Gestionar la informacion de la Beca</p>
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
                id="conceptos-tab"
                data-bs-toggle="tab"
                data-bs-target="#conceptos"
                type="button"
                role="tab"
                aria-controls="conceptos"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Conceptos
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
                onSubmit={(e) => editarBeca(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombre"
                    className="col-sm-2 control-label text-label"
                  >
                    Nombre
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="nombre"
                      name={"nombre"}
                      value={input.nombre}
                      onChange={(e) => handleChange(e)}
                      placeholder={beca[0] ? beca[0] : "Ingrese Nombre"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="tipo"
                    className="col-sm-2 control-label text-label"
                  >
                    Tipo
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control form-control-sm"
                      id="tipo"
                      name={"tipo"}
                      value={input.tipo}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar tipo</option>
                      <option value="1">POR PORCENTAJE</option>
                      <option value="2">POR MONTO</option>
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
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="valor"
                      name={"valor"}
                      value={input.valor}
                      onChange={(e) => handleChange(e)}
                      placeholder={beca[3] ? beca[3] : "Ingrese Valor"}
                    ></input>
                  </div>
                </div>

                <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
                  <button
                    type="button"
                    className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                    id="id_cancelar"
                    onClick={() => {
                      navigation("/becas");
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
            id="conceptos"
            role="tabpanel"
            aria-labelledby="conceptos-tab"
          >
            <Conceptos id={id} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
