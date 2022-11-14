import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/styles.css";
import arrowLeft from "../../utils/left-arrow.png";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarIdConcepto,
  cargarIdConceptoAlumnos,
  cargarIdCurso,
  cargarNivelSeleccionado,
} from "../../actions";
import edit from "../../utils/edit.png";
import trash from "../../utils/delete.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Cuota() {
  const { id, descripcion, ciclo } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [comboCiclos, setComboCiclos] = useState([]);
  const [nivel, setNivel] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [conceptosVinculados, setConceptosVinculados] = useState([]);
  const [comboConcepto, setComboConcepto] = useState([]);
  const [comboConceptoCursos, setComboConceptoCursos] = useState([]);
  const [comboCursosVinculados, setComboCursosVinculados] = useState([]);
  const [cursosAlumnos, setCursosAlumnos] = useState([]);
  const [importe, setImporte] = useState("");
  const [checked, setChecked] = useState(true);

  const idCurso = useSelector((state) => state.idCurso);
  const idConcepto = useSelector((state) => state.idConcepto);
  const idConceptoAlumnos = useSelector((state) => state.idConceptoAlumnos);
  const nivelSeleccionado = useSelector((state) => state.nivelSeleccionado);

  let [input, setInput] = useState({
    idcuota: id,
    descripcion: "",
    idtipo: "",
    fecha1: "",
    fecha2: "",
    importe1: "",
    importe2: "",
    idmes: "",
    recargo: "",
    ciclo: ciclo,
  });

  function cargarComboCiclos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/combociclos.php"
      )
      .then((response) => {
        setComboCiclos(response?.data);
      });
  }

  function cargarComboConceptos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/comboconcepto.php"
      )
      .then((response) => {
        setComboConcepto(response.data);
      });
  }

  function cargarComboConceptoCursos() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/comboconceptocursos.php?idcuota=" +
          input.idcuota
      )
      .then((response) => {
        setComboConceptoCursos(response?.data);
      });
  }

  function cargarComboCursosVinculados() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/combocursosvinc.php?idcuota=" +
          input.idcuota
      )
      .then((response) => {
        setComboCursosVinculados(response?.data);
      });
  }

  function cargarCursosAlumnos() {
    //document.querySelector(".tr-loader").classList.remove("d-none");
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/cursosalumnos.php?idcuota=" +
          input.idcuota +
          "&idcurso=" +
          idCurso +
          "&idconcepto=" +
          idConceptoAlumnos
      )
      .then((response) => {
        setCursosAlumnos([]);
        if (idConceptoAlumnos.toString() === "0") {
          //document.querySelector(".tr-loader").classList.add("d-none");
          setCursosAlumnos([]);
        } else {
          setTimeout(() => {
            //document.querySelector(".tr-loader").classList.add("d-none");
            setCursosAlumnos(response?.data);
          });
        }
      });
  }

  function traerNivelCuotas(ciclo) {
    if (nivel.length === 0) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traernivelcuotas.php?idcuota=" +
            id +
            "&ciclo=" +
            ciclo
        )
        .then((response) => {
          setNivel(response.data);
          response.data.map((n) => {
            if (n.marca === "1") {
              dispatch(cargarNivelSeleccionado([n.idnivel, true]));
            }
          });
        });
    }
  }

  function marcarDesmarcarCursos(nivel) {
    if (!document.getElementById(`check${nivel}`).checked) {
      dispatch(cargarNivelSeleccionado([nivel, false]));
    } else {
      dispatch(cargarNivelSeleccionado([nivel, true]));
    }
  }

  function traerCursosCuotas(ciclo) {
    setCursos([]);
    let querycreate = "CREATE TEMPORARY TABLE t_datos (idnivel INT) ";
    let querylista = "INSERT INTO t_datos (idnivel)VALUES";

    let true1 = false;
    let true2 = false;
    let true3 = false;

    nivelSeleccionado.map((n) => {
      if (n === "1") {
        true1 = true;
      }
      if (n === "2") {
        true2 = true;
      }
      if (n === "3") {
        true3 = true;
      }
    });

    if (!true1 && !true2 && !true3) {
      querylista = querylista + " (0)";
    }

    if (true1) {
      querylista = querylista + "(1),";
    }
    if (true2) {
      querylista = querylista + "(2),";
    }
    if (true3) {
      querylista = querylista + "(3),";
    }

    if (querylista[querylista.length - 1] === ",") {
      querylista = querylista.substring(0, querylista.length - 1);
    }

    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traercursocuotas.php?idcuota=" +
          input.idcuota +
          "&ciclo=" +
          ciclo +
          "&querycreate=" +
          querycreate +
          "&querylista=" +
          querylista
      )
      .then((response) => {
        setCursos(response.data);
      });
  }

  function traerConceptosVinculados() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traerconceptosvinc.php?idcuota=" +
          input.idcuota
      )
      .then((response) => {
        if (input.idcuota !== "0" && response.data) {
          setConceptosVinculados(response.data);
        }
      });
  }

  function handleChange(e) {
    e.preventDefault();

    if (
      e.target.name === "importe1" ||
      e.target.name === "importe2" ||
      e.target.name === "recargo"
    ) {
      let result = permite(e);
      if (result) {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      } else document.getElementById(`${e.target.name}`).value = "";
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  function permite(e) {
    let caracteres =
      " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()=+-*/{}[]-_;,:<>áéíóú@&";

    let result = true;
    for (let i = 0; i < caracteres.length; i++) {
      if (e.target.value.includes(caracteres[i])) {
        result = false;
      }
    }

    return result;
  }

  function editarArancel(e) {
    e.preventDefault();

    if (nivelSeleccionado.length === 0 && input.idcuota !== "0") {
      Swal.fire({
        title: "Error al guardar Arancel!",
        icon: "error",
        html: `Se debe seleccionar un nivel`,
        showCloseButton: true,
      });
      return;
    }

    if (input.idtipo === "") {
      Swal.fire({
        title: "Error al guardar Arancel!",
        icon: "error",
        html: `Se debe seleccionar un tipo`,
        showCloseButton: true,
      });
      return;
    }

    if (input.idmes === "") {
      Swal.fire({
        title: "Error al guardar Arancel!",
        icon: "error",
        html: `Se debe seleccionar un mes`,
        showCloseButton: true,
      });
      return;
    }

    let querycreatenivel = "CREATE TEMPORARY TABLE t_nivel (idnivel INT) ";
    let querylistanivel = "INSERT INTO t_nivel (idnivel)VALUES";

    if (document.getElementById("check1").checked) {
      querylistanivel = querylistanivel + "(1),";
    }
    if (document.getElementById("check2").checked) {
      querylistanivel = querylistanivel + "(2),";
    }
    if (document.getElementById("check3").checked) {
      querylistanivel = querylistanivel + "(3),";
    }

    querylistanivel = querylistanivel.substring(0, querylistanivel.length - 1);

    let querycreatecurso = "CREATE TEMPORARY TABLE t_cursos (idcurso INT) ";
    let querylistacurso = "INSERT INTO t_cursos (idcurso)VALUES";

    cursos?.map((c) => {
      if (document.getElementById(`checkboxCurso${c.idcurso}`).checked) {
        querylistacurso = querylistacurso + `(${c.idcurso}),`;
      }
    });

    querylistacurso = querylistacurso.substring(0, querylistacurso.length - 1);

    if (querylistacurso.length === 35 && input.idcuota !== "0") {
      Swal.fire({
        title: "Error al guardar Arancel!",
        icon: "error",
        html: `Se debe seleccionar un curso`,
        showCloseButton: true,
      });
      return;
    }

    if (input.idcuota === "0") {
      const c = input.ciclo === "" ? ciclo : input.ciclo;

      querylistanivel = "";

      querylistacurso = "";

      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabardatoscuotas.php?oper=" +
            "A" +
            "&idcuota=" +
            input.idcuota +
            "&ciclo=" +
            c +
            "&descripcion=" +
            input.descripcion +
            "&sel_tipo=" +
            input.idtipo +
            "&fecha1=" +
            input.fecha1 +
            "&fecha2=" +
            input.fecha2 +
            "&importe1=" +
            input.importe1 +
            "&importe2=" +
            input.importe2 +
            "&sel_mes=" +
            input.idmes +
            "&recargo=" +
            input.recargo +
            "&querycreatenivel=" +
            querycreatenivel +
            "&querylistanivel=" +
            querylistanivel +
            "&querycreatecurso=" +
            querycreatecurso +
            "&querylistacurso=" +
            querylistacurso +
            "&userid=83"
        )
        .then((response) => {
          console.log(response.data);
          if (response.data[0].msg_error !== "") {
            Swal.fire({
              title: "Error al crear Arancel!",
              icon: "error",
              html: `${response.data[0].msg_error}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          } else {
            Swal.fire({
              title: "Arancel creado con exito!",
              icon: "success",
              html: `${response.data[0].msg_error}`,
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                input.idcuota = response.data[0].idcuota;
                document
                  .getElementById("conceptos-tab-li")
                  .classList.remove("d-none");
                document
                  .getElementById("cursosAlumnos-tab-li")
                  .classList.remove("d-none");
                document
                  .getElementById("tablas-tab-li")
                  .classList.remove("d-none");
              }
            });
          }
        });
    } else {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabardatoscuotas.php?oper=" +
            "M" +
            "&idcuota=" +
            input.idcuota +
            "&ciclo=" +
            input.ciclo +
            "&descripcion=" +
            input.descripcion +
            "&sel_tipo=" +
            input.idtipo +
            "&fecha1=" +
            input.fecha1 +
            "&fecha2=" +
            input.fecha2 +
            "&importe1=" +
            input.importe1 +
            "&importe2=" +
            input.importe2 +
            "&sel_mes=" +
            input.idmes +
            "&recargo=" +
            input.recargo +
            "&querycreatenivel=" +
            querycreatenivel +
            "&querylistanivel=" +
            querylistanivel +
            "&querycreatecurso=" +
            querycreatecurso +
            "&querylistacurso=" +
            querylistacurso +
            "&userid=83"
        )
        .then((response) => {
          if (response.data[0].msg_error === "") {
            Swal.fire({
              title: `Arancel ${input.descripcion} ha sido modificado con exito`,
              icon: "success",
              showCloseButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          } else {
            Swal.fire({
              title: "Error al modificar Arancel",
              icon: "warning",
              html: `${response.data[0].msg_error}`,
              showCloseButton: true,
            });
          }
        });
    }
    document.querySelector(".navbar").classList.remove("active-nav");
    document.querySelector(".contenedor").classList.remove("active-contenedor");
  }

  function agregarEditarEliminarConceptoVinculado(oper, idconceptoB) {
    if (oper === "B") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabarconceptosvinculados.php?oper=" +
            oper +
            "&idconcepto=" +
            idconceptoB +
            "&idcuota=" +
            input.idcuota +
            "&importe=0"
        )
        .then((response) => {
          console.log(response.data);
        });
    } else if (
      importe !== "" &&
      importe !== "0" &&
      idConcepto !== "0" &&
      idConcepto !== 0 &&
      oper === "A"
    ) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabarconceptosvinculados.php?oper=" +
            oper +
            "&idconcepto=" +
            idConcepto +
            "&idcuota=" +
            input.idcuota +
            "&importe=" +
            importe
        )
        .then((response) => {
          document.getElementById("importe").value = 0;
          document.getElementById("selectConceptosVinculados").value = 0;
          setImporte(0);
        });
    } else if (importe !== "" && idConcepto !== "0") {
      console.log("importe y concepto vacio");
    } else if (idConcepto === "0") {
      console.log("concepto vacio");
    } else if (importe === "") {
      console.log("importe vacio");
    }

    if (
      document.getElementById("agregar/modificar").innerHTML === "Modificar"
    ) {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabarconceptosvinculados.php?oper=" +
            oper +
            "&idconcepto=" +
            idConcepto +
            "&idcuota=" +
            input.idcuota +
            "&importe=" +
            importe
        )
        .then((response) => {
          console.log(response.data);
          document.getElementById("agregar/modificar").innerHTML = "Agregar";
          document.getElementById("importe").value = "0.00";
          document.getElementById("selectConceptosVinculados").value = 0;
        });
    }

    traerConceptosVinculados();
    traerConceptosVinculados();
    cargarComboConceptoCursos();
    cargarComboConceptoCursos();
  }

  function editarConceptoVinculado(importe, idconcepto) {
    console.log(idconcepto);

    const select = document.getElementById("selectConceptosVinculados");
    select.value = idconcepto;
    dispatch(cargarIdConcepto(idconcepto));

    const valor = document.getElementById("importe");
    valor.value = importe;

    const button = document.getElementById("agregar/modificar");
    button.innerHTML = "Modificar";
  }

  function grabarImporte(idAlumno, importe, idc) {
    let idcurso;
    comboCursosVinculados.map((c) => {
      if (c[1] === idc) {
        idcurso = c[0];
      }
    });

    let imp = importe === "" ? 0 : importe;

    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabarimporte.php?idalumno=" +
          idAlumno +
          "&idcurso=" +
          idcurso +
          "&idconcepto=" +
          idConceptoAlumnos +
          "&idcuota=" +
          input.idcuota +
          "&importe=" +
          imp
      )
      .then((response) => {
        if (!importe.includes(".")) {
          document.getElementById(`input${idAlumno}cursos`).value = imp + ".00";
        } else {
          document.getElementById(`input${idAlumno}cursos`).value = imp;
        }
      });
  }

  function changeCheckboxAlumnos(e, idAlumno, idcurso) {
    if (document.getElementById(`check${idAlumno}cursos`).checked) {
      document.getElementById(`input${idAlumno}cursos`).disabled = false;
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabar_alumnocurso.php?idalumno=" +
            idAlumno +
            "&idcurso=" +
            idcurso +
            "&idconcepto=" +
            idConceptoAlumnos +
            "&idcuota=" +
            input.idcuota +
            "&oper=A"
        )
        .then((response) => {
          console.log(response.data);
        });
    } else {
      let inputF = document.getElementById(`input${idAlumno}cursos`);
      inputF.value = "0.00";
      inputF.setAttribute("disabled", "");
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabar_alumnocurso.php?idalumno=" +
            idAlumno +
            "&idcurso=" +
            idcurso +
            "&idconcepto=" +
            idConceptoAlumnos +
            "&idcuota=" +
            input.idcuota +
            "&oper=B"
        )
        .then((response) => {
          console.log(response.data);
        });
    }
  }

  function marcarDesmarcarAlumnosCursos() {
    if (checked) {
      cursosAlumnos.map((c) => {
        document.getElementById(`check${c.idalumno}cursos`).checked = false;
        let input = document.getElementById(`input${c.idalumno}cursos`);
        input.setAttribute("Value", "0.00");
        input.setAttribute("disabled", "");
      });
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabar_alumnoscursos.php?idcurso=" +
            idCurso +
            "&idconcepto=" +
            idConceptoAlumnos +
            "&idcuota=" +
            input.idcuota +
            "&oper=B" +
            "&create= " +
            "&query= "
        )
        .then((response) => {
          console.log(response.data);
        });
    } else {
      let query = "INSERT INTO temp_datos (idalumno) VALUE ";
      cursosAlumnos.map((c) => {
        document.getElementById(`input${c.idalumno}cursos`).disabled = false;
        document.getElementById(`check${c.idalumno}cursos`).checked = true;
        query = query + ` (${c.idalumno}),`;
      });

      query = query.substring(0, query.length - 1) + ";";

      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabar_alumnoscursos.php?idcurso=" +
            idCurso +
            "&idconcepto=" +
            idConceptoAlumnos +
            "&idcuota=" +
            input.idcuota +
            "&oper=A" +
            "&create=CREATE TEMPORARY TABLE temp_datos (idalumno INT);" +
            "&query=" +
            query
        )
        .then((response) => {
          console.log(response.data);
        });
    }
    setChecked(!checked);
  }

  function dragDrop(results) {
    setConceptosVinculados([]);
    var create =
      "CREATE TEMPORARY TABLE temp_datos (idconcepto INT, orden SMALLINT); ";

    var query = "INSERT INTO temp_datos (idconcepto, orden) VALUE ";

    let sup = [results.draggableId, results.destination.index];

    let posDestino = results.destination.index;
    let posOriginal = results.source.index;

    if (posDestino - posOriginal <= 1 && posDestino - posOriginal >= -1) {
      conceptosVinculados.map((c, index) => {
        if (index === posDestino) {
          query = query + " (" + c.idconcepto + "," + posOriginal + "),";
        } else if (index === posOriginal) {
          query = query + " (" + c.idconcepto + "," + posDestino + "),";
        } else {
          query = query + " (" + c.idconcepto + "," + index + "),";
        }
      });

      query = query.substring(0, query.length - 1);
    } else {
      let arr = [];

      conceptosVinculados.map((c, index) => {
        arr.push([c.idconcepto, index]);
      });

      arr.map((a, index) => {
        if (results.draggableId === a[0]) {
          arr.splice(index, 1);
          arr.push([results.draggableId, results.destination.index]);
        }
      });

      if (posDestino - posOriginal > 0) {
        arr.map((a) => {
          a[1] = --a[1];
        });
      }

      if (posDestino - posOriginal < 0) {
        arr.map((a) => {
          a[1] = ++a[1];
        });
      }

      arr.pop();
      arr.push(sup);
      let arr2 = [];
      arr.map((a) => {
        arr2.push(` (${a[0]},${a[1]})`);
      });
      arr2 = arr2.join();
      query = query + arr2;
    }

    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/grabaridconceptoorden.php?idcuota=" +
          id +
          "&create=" +
          create +
          "&query=" +
          query
      )
      .then((response) => {
        traerConceptosVinculados();
      });
  }

  function handleImporte(e) {
    if (permite(e)) {
      setImporte(e.target.value);
    } else document.getElementById(`${e.target.name}`).value = "";
  }

  useEffect(() => {
    cargarComboCiclos();
    cargarComboConceptos();
    traerConceptosVinculados();
    cargarComboConceptoCursos();
    cargarComboCursosVinculados();
    cargarCursosAlumnos();
    traerNivelCuotas(ciclo);
    traerCursosCuotas(ciclo);

    if (id !== "0") {
      axios
        .get(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/aranceles/traerdatoscuotas.php?idcuota=" +
            id
        )
        .then((response) => {
          setInput({
            idcuota: response.data[0].idcuota,
            descripcion: response.data[0].descripcion,
            idtipo: response.data[0].idtipo,
            fecha1: response.data[0].fecha1,
            fecha2: response.data[0].fecha2,
            importe1: response.data[0].importe1,
            importe2: response.data[0].importe2,
            idmes: response.data[0].idmes,
            recargo: response.data[0].recargo,
            ciclo: response.data[0].ciclo,
          });
        });
    }
  }, [dispatch, idConcepto, idCurso, nivelSeleccionado, idConceptoAlumnos]);

  return (
    <React.Fragment>
      <div className="pr-5 pt-3 pl-3 pl-lg-5 ml-lg-5 contenedor">
        <div className="pt-5">
          <div>
            <div>
              <h4 className="">Aranceles</h4>
              <p className="text-secondary">Crear y gestionar los Aranceles.</p>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <div className="d-flex justify-content-between w-100">
            <h4>
              Informacion del Arancel{" "}
              <span className="text-secondary">
                {descripcion !== "0" ? descripcion : ""}
              </span>
              <strong className="ml-3 text-primary font-weight-normal">
                {input.nombre}
              </strong>
            </h4>
            <div>
              <button
                type="button"
                className="btn"
                id="id_cancelar"
                onClick={() => {
                  navigation("/aranceles");
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
                Listado de aranceles
              </button>
            </div>
          </div>
          <hr className="w-100 mx-0" />
          <p className="text-secondary">Gestionar la informacion del Arancel</p>
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
            <li
              id="tablas-tab-li"
              class={descripcion === "0" ? "nav-item d-none" : "nav-item"}
              role="presentation"
            >
              <button
                class="nav-link"
                id="tablas-tab"
                data-bs-toggle="tab"
                data-bs-target="#tablas"
                type="button"
                role="tab"
                aria-controls="tablas"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Niveles
              </button>
            </li>
            <li
              id="conceptos-tab-li"
              class={descripcion === "0" ? "nav-item d-none" : "nav-item"}
              role="presentation"
            >
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
            <li
              id="cursosAlumnos-tab-li"
              class={descripcion === "0" ? "nav-item d-none" : "nav-item"}
              role="presentation"
            >
              <button
                class="nav-link"
                id="cursosAlumnos-tab"
                data-bs-toggle="tab"
                data-bs-target="#cursosAlumnos"
                type="button"
                role="tab"
                aria-controls="cursosAlumnos"
                aria-selected="false"
                style={{ outline: 0 }}
              >
                Cursos y Alumnos
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ fontSize: "13px" }} class="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="datos"
            role="tabpanel"
            aria-labelledby="datos-tab"
          >
            {/* DATOS BASICOS */}
            <div className="w-75 mt-3 ml-2">
              <form
                name="f_abm_cuotas"
                id="id_abm_cuotas"
                className=""
                onSubmit={(e) => editarArancel(e)}
              >
                <div className="form-group row align-items-center">
                  <label
                    htmlFor="nombre"
                    className="col-sm-2 control-label text-label"
                  >
                    Descripción
                  </label>
                  <div className="col-sm-7 col-lg-5">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm"
                      id="descripcion"
                      name={"descripcion"}
                      defaultValue={input.descripcion}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.descripcion ? input.descripcion : "Ingrese Nombre"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="idtipo"
                    className="col-sm-2 control-label text-label "
                  >
                    Tipo
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control form-control-sm"
                      id="idtipo"
                      name={"idtipo"}
                      value={input.idtipo}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar tipo</option>
                      <option value="1">CUOTA</option>
                      <option value="5">CUOTA2</option>
                      <option value="2">MATRICULA</option>
                      <option value="3">DEUDA</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Fecha 1er Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="date"
                      className="form-control form-control-sm"
                      id="fecha1"
                      name={"fecha1"}
                      defaultValue={input.fecha1}
                      onChange={(e) => handleChange(e)}
                      placeholder={
                        input.fecha1 ? input.fecha1 : "Ingrese Fecha"
                      }
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Importe 1er Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="importe1"
                      name={"importe1"}
                      onChange={(e) => handleChange(e)}
                      defaultValue={input.importe1}
                      placeholder={"Ingrese Importe"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Fecha 2do Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="date"
                      className="form-control form-control-sm"
                      id="fecha2"
                      name={"fecha2"}
                      defaultValue={input.fecha2}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Fecha"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Importe 2do Vto.
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <input
                      required
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="importe2"
                      name={"importe2"}
                      defaultValue={input.importe2}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Importe"}
                    ></input>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="mes"
                    className="col-sm-2 control-label text-label "
                  >
                    Mes
                  </label>
                  <div className="col-sm-4 col-lg-3">
                    <select
                      required
                      className="form-control form-control-sm"
                      id="idmes"
                      name={"idmes"}
                      value={input.idmes}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Seleccionar Mes</option>
                      <option value="1">ENERO</option>
                      <option value="2">FEBRERO</option>
                      <option value="3">MARZO</option>
                      <option value="4">ABRIL</option>
                      <option value="5">MAYO</option>
                      <option value="6">JUNIO</option>
                      <option value="7">JULIO</option>
                      <option value="8">AGOSTO</option>
                      <option value="9">SEPTIEMBRE</option>
                      <option value="10">OCTUBRE</option>
                      <option value="11">NOVIEMBRE</option>
                      <option value="12">DICIEMBRE</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="valor"
                    className="col-sm-2 control-label text-label "
                  >
                    Recargo Diario
                  </label>
                  <div class="input-group input-group-sm col-sm-4 col-lg-3">
                    <input
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      required
                      type="text"
                      className="form-control form-control-sm text-right"
                      id="recargo"
                      name={"recargo"}
                      defaultValue={input.recargo}
                      onChange={(e) => handleChange(e)}
                      placeholder={"Ingrese Recargo"}
                    />

                    <span
                      style={{ height: "31px" }}
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      %
                    </span>
                  </div>
                </div>

                <div className="form-group row align-items-center">
                  <label
                    htmlFor="tipo"
                    className="col-sm-2 control-label text-label "
                  >
                    Ciclo
                  </label>
                  <div class="input-group col-sm-4 col-lg-3">
                    <select
                      className="form-control form-control-sm"
                      name={"ciclo"}
                      onChange={(e) => handleChange(e)}
                    >
                      {comboCiclos &&
                        comboCiclos?.map((ciclo) => {
                          if (ciclo[0] === `${new Date().getFullYear()}`) {
                            return (
                              <option selected key={ciclo[0]}>
                                {ciclo[0]}
                              </option>
                            );
                          }
                          return <option key={ciclo[0]}>{ciclo[0]}</option>;
                        })}
                    </select>
                  </div>
                </div>

                <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
                  <button
                    type="button"
                    className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                    id="id_cancelar"
                    onClick={() => {
                      navigation("/aranceles");
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
            id="tablas"
            role="tabpanel"
            aria-labelledby="tablas-tab"
          >
            <div className="my-2 w-75">
              {nivel &&
                nivel.map((n) => (
                  <div className="d-flex flex-row">
                    <input
                      onChange={(e) => {
                        marcarDesmarcarCursos(n.idnivel);
                      }}
                      defaultChecked={n.marca === "1" ? true : false}
                      className="mr-1"
                      id={`check${n.idnivel}`}
                      type="checkbox"
                    />
                    <div className="text-left">{n.descripcion}</div>
                  </div>
                ))}
            </div>

            <div className="table-responsive">
              <table
                className={
                  window.innerWidth < 900
                    ? "w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary"
                    : "w-50 table-condensed table-hover table-bordered text-center table border-top border-secondary"
                }
              >
                <thead className="">
                  <tr>
                    <th className="col-1"></th>
                    <th className="col-4 text-nowrap">Cursos</th>
                    <th className="col-4 text-nowrap">Nivel</th>
                    <th className="col-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cursos &&
                    cursos.map((c) => (
                      <tr>
                        <td>{c.pos}</td>
                        <td className="text-left">{c.nombre}</td>
                        <td className="text-left">{c.nivel}</td>
                        <td>
                          <input
                            defaultChecked={c.marca === "1" ? true : false}
                            id={`checkboxCurso${c.idcurso}`}
                            className="mr-1"
                            type="checkbox"
                          />
                        </td>
                      </tr>
                    ))}
                  <td colSpan="4">
                    <div>
                      {cursos === [] || !cursos || cursos.length === 0 ? (
                        <div className="footer text-center">
                          No se registra información
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tbody>
              </table>
            </div>
            <div className="w-100 fixed-bottom d-flex justify-content-end border-top bg-light pr-5">
              <button
                type="button"
                className="btn btn-secondary px-3 m-3 text-light shadow-sm"
                id="id_cancelar"
                onClick={() => {
                  navigation("/aranceles");
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
                onClick={(e) => editarArancel(e)}
                type="submit"
                className="btn btn-primary px-3 m-3 text-light shadow-sm"
                id="id_grabar"
              >
                Guardar
              </button>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="conceptos"
            role="tabpanel"
            aria-labelledby="conceptos-tab"
          >
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="conepto"
                className=" align-middle col-sm-2 control-label text-label p-0 m-0"
              >
                Concepto
              </label>
              <div className="col-8 col-sm-6 col-lg-4 p-0 m-0">
                <select
                  className="form-control form-control-sm"
                  id="selectConceptosVinculados"
                  onChange={(e) => {
                    dispatch(cargarIdConcepto(e.target.value));
                  }}
                >
                  <option value="0">Seleccionar </option>
                  {comboConcepto &&
                    comboConcepto?.map((concepto) => {
                      return (
                        <option value={concepto[0]} key={concepto[0]}>
                          {concepto[1]}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="importe"
                className="col-sm-2 control-label text-label p-0"
              >
                Importe
              </label>
              <input
                Value="0.00"
                placeholder="Ingrese importe"
                required
                type="text"
                id="importe"
                name={"importe"}
                className="form-control form-control-sm col-sm-4 col-lg-3 p-0 pr-2 m-0 text-right"
                onChange={(e) => handleImporte(e)}
              />
              <button
                onClick={() => agregarEditarEliminarConceptoVinculado("A", 0)}
                id="agregar/modificar"
                className="align-self-start btn btn-primary rounded ml-3 btn-sm"
              >
                Agregar
              </button>
            </div>

            <div className="table-responsive mt-4">
              <DragDropContext onDragEnd={(results) => dragDrop(results)}>
                <table
                  id="tab-lista_conceptos"
                  className={
                    window.innerWidth < 900
                      ? "w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary"
                      : "w-50 table-condensed table-hover table-bordered text-center table border-top border-secondary"
                  }
                >
                  <thead className="py-5 header">
                    <tr className="bg-light" style={{ cursor: "pointer" }}>
                      <th className="col-4 text-nowrap">Concepto</th>
                      <th className="col-1 text-nowrap">Importe</th>
                      <th className="col-1 text-nowrap">Editar</th>
                      <th className="col-1 text-nowrap">Eliminar</th>
                    </tr>
                  </thead>
                  <Droppable droppableId="tbody">
                    {(provided) => (
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {conceptosVinculados &&
                          conceptosVinculados.map((c, index) => (
                            <Draggable
                              draggableId={c.idconcepto}
                              index={index}
                              key={c.idconcepto}
                            >
                              {(provided) => (
                                <tr
                                  className={
                                    c.importe < 0
                                      ? "text-right yellow"
                                      : "text-right"
                                  }
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <td className="text-left">{c.descripcion}</td>
                                  <td className="text-right">{c.importe}</td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        editarConceptoVinculado(
                                          c.importe,
                                          c.idconcepto
                                        )
                                      }
                                      className="p-0 btn"
                                    >
                                      <img width={18} alt="" src={edit} />
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        agregarEditarEliminarConceptoVinculado(
                                          "B",
                                          c.idconcepto
                                        )
                                      }
                                      className="p-0 btn"
                                    >
                                      <img width={18} alt="" src={trash} />
                                    </button>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                  <tfoot>
                    <tr>
                      <td className="text-right">Total</td>
                      <td className="bg-info text-right">
                        {conceptosVinculados.length !== 0
                          ? conceptosVinculados[conceptosVinculados.length - 1]
                              .deuda
                          : ""}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </DragDropContext>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="cursosAlumnos"
            role="tabpanel"
            aria-labelledby="cursosAlumnos-tab"
          >
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="conepto"
                className=" align-middle col-sm-2 control-label text-label p-0  m-0"
              >
                Concepto
              </label>
              <div className="col-8 col-sm-5 col-lg-4 p-0 m-0">
                <select
                  className="form-control form-control-sm"
                  onChange={(e) => {
                    dispatch(cargarIdConceptoAlumnos(e.target.value));
                  }}
                >
                  <option value="0">Seleccionar </option>
                  {comboConceptoCursos &&
                    comboConceptoCursos?.map((concepto) => {
                      return (
                        <option value={concepto[0]} key={concepto[0]}>
                          {concepto[1]}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="mt-3 d-flex flex-row">
              <label
                htmlFor="conepto"
                className=" align-middle col-sm-2 control-label text-label p-0 m-0"
              >
                Curso
              </label>
              <div className="col-8 col-sm-4 col-lg-3 p-0 m-0">
                <select
                  className="form-control form-control-sm"
                  onChange={(e) => {
                    dispatch(cargarIdCurso(e.target.value));
                  }}
                >
                  <option value="0">Todos </option>
                  {comboCursosVinculados &&
                    comboCursosVinculados?.map((curso) => {
                      return (
                        <option value={curso[0]} key={curso[0]}>
                          {curso[1]}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div style={{ height: "700px" }} className="table-responsive mt-4">
              <table className="w-100 table-condensed table-hover table-bordered text-center table border-top border-secondary overflow-auto">
                <thead className="py-5 header">
                  <tr className="bg-light" style={{ cursor: "pointer" }}>
                    <th className="col-1 text-nowrap">Orden</th>
                    <th className="col-1 text-nowrap">Curso</th>
                    <th className="col-2 text-nowrap">Alumno</th>
                    <th className="col-1 text-nowrap">Importe</th>
                    <th className="col-1 text-nowrap">
                      <input
                        id="desmarcarTodos"
                        onChange={() => marcarDesmarcarAlumnosCursos()}
                        type="checkbox"
                        defaultChecked={true}
                      ></input>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cursosAlumnos &&
                    cursosAlumnos?.map((c) => (
                      <tr>
                        <td className="text-center">{c.orden}</td>
                        <td className="text-center">{c.curso}</td>
                        <td className="text-left">{c.nombre}</td>
                        <td className="text-right">
                          <input
                            onBlur={(e) =>
                              grabarImporte(c.idalumno, e.target.value, c.curso)
                            }
                            onChange={(e) =>
                              permite(e)
                                ? ""
                                : (document.getElementById(
                                    `input${c.idalumno}cursos`
                                  ).value = "")
                            }
                            id={`input${c.idalumno}cursos`}
                            className="text-right border-0 w-100 pr-2"
                            type="text"
                            name={`input${c.idalumno}cursos`}
                            Value={c.importe}
                            disabled={c.marca === "0" ? true : false}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            id={`check${c.idalumno}cursos`}
                            marca={c.marca}
                            defaultChecked={c.marca === "0" ? false : true}
                            onChange={(e) =>
                              changeCheckboxAlumnos(e, c.idalumno, c.idcurso)
                            }
                          ></input>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td colSpan="5">
                      <div>
                        {cursosAlumnos === [] ||
                        !cursosAlumnos ||
                        cursosAlumnos.length === 0 ? (
                          <div className="footer text-center">
                            No se registra información
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="tr-loader" className="d-none tr-loader">
        <div colSpan="7">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
}
