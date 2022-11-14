import axios from "axios";
import parse from "html-react-parser";
import React, { useState, useEffect } from "react";
import "../../style/styles.css";
import JoditEditor from "jodit-react";

export default function Parametros() {
  const [idopcion, setIdOpcion] = useState(1);
  const [content, setContent] = useState("");

  function traerDatosParametros() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/parametros/traerdatosparametros.php?idopcion=" +
          idopcion
      )
      .then((response) => setContent(response.data));
  }

  function grabarDatosParametros(e) {
    e.preventDefault();
    axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/parametros/grabardatosparametros.php?idopcion=" +
          idopcion +
          "&textomail=" +
          content
      )
      .then((response) => console.log(response.data));
  }

  useEffect(() => {
    traerDatosParametros();
  }, [idopcion]);

  return (
    <div className="px-3 pt-3 pb-5 px-lg-5 mx-lg-5 pb-lg-0">
      <div className="pt-5">
        <div>
          <h4 className="">Parametros</h4>
          <p className="text-secondary">Envío de mails.</p>
        </div>
        <hr className="w-100 mx-0" />
        <div className="col col-lg-6 p-0">
          <div className="d-flex flex-md-row flex-row w-75">
            <label
              style={{ fontSize: "13px" }}
              className=" align-middle col-2 control-label text-label p-0 m-0"
            >
              Opción
            </label>
            <select
              className="form-control form-control-sm mb-2 mb-sm-0 col-5 mr-3"
              onChange={(e) => setIdOpcion(e.target.value)}
            >
              <option value="1">ENVIO DE AVISOS</option>
              <option value="2">NOTIFICACION DEUDA</option>
            </select>
          </div>
        </div>
      </div>
      <hr className="w-100 mx-0" />
      <div className="d-flex flex-row w-75">
        <label
          style={{ fontSize: "13px" }}
          className=" align-middle col-1 control-label text-label p-0 m-0"
        >
          Texto Mail
        </label>
        <JoditEditor
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </div>
      <br />
      <div className="w-75 d-flex flex-row-reverse">
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => grabarDatosParametros(e)}
        >
          Grabar
        </button>
      </div>

      <hr className="w-100 mx-0" />
    </div>
  );
}
