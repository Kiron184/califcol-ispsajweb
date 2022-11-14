import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cargarUsuario } from "../../actions";

export default function Usuario() {
  const { id } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  let [input, setInput] = useState({
    nombres: "",
    apellido: "",
    id: "",
    email: "",
    password: "",
    docnro: "",
    nivel: "",
  });

  useEffect(() => {
    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/usuarios/traerdatosusuario.php?idusuario=" +
            id
        )
        .then((response) => {
          setInput({
            nombres: response.data[0].nombres,
            apellido: response.data[0].apellido,
            id: response.data[0].id,
            email: response.data[0].email,
            password: response.data[0].password,
            docnro: response.data[0].docnro,
            nivel: response.data[0].nivel,
          });
          dispatch(cargarUsuario(input));
        });
    }
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function editarUsuario(e) {
    e.preventDefault();

    if (id === "0") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/usuarios/grabardatosusuarios.php?oper=" +
            "A" +
            "&idusuario=0" +
            "&nivel=" +
            input.nivel +
            "&nombres=" +
            input.nombres +
            "&apellido=" +
            input.apellido +
            "&documento=" +
            input.docnro +
            "&email=" +
            input.email +
            "&password=test"
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 2) {
            Swal.fire({
              title: "Error al crear Usuario!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/usuarios");
              }
            });
          }
          navigation("/usuarios");
        });
    } else {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/usuarios/grabardatosusuarios.php?oper=" +
            "M" +
            "&idusuario=" +
            input.id +
            "&nivel=" +
            input.nivel +
            "&nombres=" +
            input.nombres +
            "&apellido=" +
            input.apellido +
            "&documento=" +
            input.docnro +
            "&email=" +
            input.email +
            "&password=" +
            input.password
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 5) {
            Swal.fire({
              title: "Error al crear Usuario!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigation("/usuarios");
              }
            });
          }
        });
      navigation("/usuarios");
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <h4 className="">Usuarios</h4>
            <p className="text-secondary">
              Crear y gestionar los datos de los Usuarios.
            </p>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion del Usuario{" "}
              <span style={{ fontWeight: "500" }} className="text-secondary">
                {input.nombres + " " + input.apellido}
              </span>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/usuarios");
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
                Listado Usuarios
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">Gestionar la informacion del Usuario</p>
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
                onSubmit={(e) => editarUsuario(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="apellido"
                    className="col-sm-2 control-label text-label"
                  >
                    Apellido
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="apellido"
                      name={"apellido"}
                      defaultValue={input.apellido}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Apellido"}
                    />
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombres"
                    className="col-sm-2 control-label text-label "
                  >
                    Nombre
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="nombres"
                      name={"nombres"}
                      defaultValue={input.nombres}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Nombre"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="docnro"
                    className="col-sm-2 control-label text-label "
                  >
                    Documento
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="docnro"
                      name={"docnro"}
                      defaultValue={input.docnro}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Documento"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="email"
                    className="col-sm-2 control-label text-label "
                  >
                    Email
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="email"
                      name={"email"}
                      defaultValue={input.email}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Email"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nivel"
                    className="col-sm-2 control-label text-label "
                  >
                    Perfil
                  </label>
                  <div class="input-group col-sm-4 col-lg-3">
                    <select
                      className="form-control form-control-sm"
                      name={"nivel"}
                      id={"nivel"}
                      defaultValue={input.nivel}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="12">ADMIN. ARANCELES</option>
                      <option value="15">ADMIN. SECRETARIA</option>
                      <option value="13">COBRANZAS</option>
                    </select>
                  </div>
                </div>

                <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
                  <button
                    type="button"
                    className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                    id="id_cancelar"
                    onClick={() => {
                      navigation("/usuarios");
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
