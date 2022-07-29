import React, { useState, useEffect } from "react";
import { crearDocente } from "../actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";

export default function Docente() {
  const { id } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/app/traerdatosdocentes.php?niddocente=" +
          id
      )
      .then((response) => {
        setUser(response.data[0]);
      });
  }, []);

  let [input, setInput] = useState({
    apellido: "",
    nombres: "",
    docnro: "",
    email: "",
    domicilio: "",
    telefono: "",
    fechasalida: "",
    iddocente: "",
    doper: "",
  });

  let dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(crearDocente(input));
    setInput({
      apellido: "",
      nombres: "",
      docnro: "",
      email: "",
      domicilio: "",
      telefono: "",
      fechasalida: "",
      iddocente: "",
      doper: "",
    });
  }

  console.log(user);
  return (
    <React.Fragment>
      <div className="w-50 Docente m-auto all-toggle all-content">
        <form
          name="f_abm_docentes"
          id="id_abm_docentes"
          className="form-horizontal"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group row align-items-center">
            <label
              htmlFor="apellido"
              className="col-sm-3 control-label text-label"
            >
              Apellido
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control text-uppercase text-campo"
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
              className="col-sm-3 control-label text-label"
            >
              Nombres
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control text-uppercase text-campo"
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
              className="col-sm-3 control-label text-label"
            >
              Documento
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control text-uppercase text-campo"
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
              className="col-sm-3 control-label text-label"
            >
              Correo Electrónico
            </label>
            <div className="col-sm-6">
              <input
                type="email"
                className="form-control text-campo"
                id="email"
                name={"email"}
                value={input.email}
                onChange={(e) => handleChange(e)}
                placeholder={user[4] ? user[4] : "Ingrese Correo Electrónico"}
              ></input>
            </div>
          </div>

          <div className="form-group row align-items-center">
            <label
              htmlFor="domicilio"
              className="col-sm-3 control-label text-label"
            >
              Domicilio
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control text-uppercase text-campo"
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
              className="col-sm-3 control-label text-label"
            >
              Teléfono
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control text-uppercase text-campo"
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
              className="col-sm-3 control-label text-label"
            >
              Fecha Salida
            </label>
            <div className="col-sm-3">
              <input
                type="date"
                className="form-control"
                id="fechasalida"
                name={"fechasalida"}
                value={user[7] ? user[7] : ""}
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

          <hr />
          <div className="">
            <button type="button" className="btn" id="id_cancelar">
              Cancelar
            </button>
            {/* VUELVE A CARGAR LA LISTA DE DOCENTES */}
            <button type="submit" className="btn Boton22" id="id_grabar">
              Grabar
            </button>
            {/* GUARDA LOS CAMBIOS EN EL DOCENTE SELECCIONADO */}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
