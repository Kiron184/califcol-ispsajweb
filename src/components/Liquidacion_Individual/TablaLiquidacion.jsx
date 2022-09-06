import React, { useEffect, useMemo } from "react";
import axios from "axios";
import "../../style/styles.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cargarTablaLiquidaciones } from "../../actions";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import mail from "../../utils/mail.png";
import printer from "../../utils/printer.png";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";

export default function TablaLiquidacion({
  ciclo,
  idCuota,
  nombreCuota,
  idAlumno,
}) {
  const dispatch = useDispatch();
  const liquidaciones = useSelector((state) => state.liquidaciones);

  function cargarTabla() {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/traerliquidacionesalumnos.php?ciclo=" +
          ciclo +
          "&idcuota=" +
          (idCuota ? idCuota : 0) +
          "&idalumno=" +
          idAlumno
      )
      .then((response) => {
        if (response.data) {
          return dispatch(cargarTablaLiquidaciones(response.data));
        } else {
          return dispatch(cargarTablaLiquidaciones([]));
        }
      });
  }

  const Styles = styled.div`
    .tr:nth-child(even) {
      background-color: #f7f7f7;
    }
    .tr:nth-child(n):hover {
      background-color: #f2f2f2;
    }

    .table {
      border: 1px solid #ddd;
      max-height: 900px;
      font-size: 13px;

      .tr {
        :last-child {
          .td {
            border-bottom: 0;
          }
        }
      }

      .th {
        font-weight: bold;
      }

      .th,
      .td {
        padding: 5px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        overflow: hidden;

        position: relative;
        :last-child {
          border-right: 0;
        }
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: black;
        }
      }

      &.sticky {
        overflow: scroll;
        .header,
        .th {
          position: sticky;
          z-index: 1;
          top: 0;
          box-shadow: 0px 3px 3px #ccc;
          background-color: white;
          height: 50px;
        }

        .body {
          z-index: 0;
        }

        [data-sticky-td] {
          position: sticky;
        }

        [data-sticky-last-left-td] {
          box-shadow: 2px 0px 3px #ccc;
        }

        [data-sticky-first-right-td] {
          box-shadow: -2px 0px 3px #ccc;
        }
      }
      .btn {
        font-size: 12px;
      }

      .footer {
        padding: 5px 0;
        background-color: #f2dede;
        color: #e62f4d;
      }
    }
  `;

  useEffect(() => {
    cargarTabla();
    document.querySelector(".th").removeAttribute("title");
  }, [ciclo, idCuota, idAlumno]);

  const columns = useMemo(
    () => [
      {
        Header: "Alumno",
        accessor: "alumno",
        minWidth: 150,
        width: window.screen.width < 1367 ? 265 : 345,
        maxWidth: 345,
        sticky: "top",
        Cell: ({ value }) => (
          <div
            style={{
              textAlign: "left",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        Header: "Nivel",
        accessor: "nivel",
        minWidth: 100,
        width: window.screen.width < 1367 ? 150 : 229,
        maxWidth: 229,
        sticky: "top",
      },
      {
        Header: "Curso",
        accessor: "nombre",
        minWidth: 100,
        width: window.screen.width < 1367 ? 150 : 229,
        maxWidth: 229,
        sticky: "top",
      },
      {
        Header: "Fecha Liquidación",
        accessor: "fhliq",
        minWidth: 100,
        width: window.screen.width < 1367 ? 150 : 229,
        maxWidth: 229,
        sticky: "top",
      },
      {
        Header: "Acción",
        accessor: "traspaso",
        minWidth: 100,
        width: window.screen.width < 1367 ? 150 : 229,
        maxWidth: 229,
        sticky: "top",
        Cell: ({ cell }) => (
          <div>
            <button
              className={
                cell.value === "0"
                  ? "btn rounded btn-success btn-sm"
                  : "btn rounded btn-danger btn-sm"
              }
              value={cell}
              onClick={(e) => {
                handleClick(e, cell);
              }}
            >
              {cell.value === "0" ? "Liquidar" : "Revertir"}
            </button>
            <div
              id={"spinner " + cell.row.id}
              className="ml-3 mt-2 spinner-border spinner-border-sm spinner position-absolute d-none"
              role="status"
            >
              <span class="visually-hidden"></span>
            </div>
          </div>
        ),
      },
      {
        Header: "Imprimir",
        accessor: "imprimir",
        minWidth: 100,
        width: window.screen.width < 1367 ? 150 : 229,
        maxWidth: 229,
        sticky: "top",
        Cell: ({ cell }) => (
          <button
            className={
              cell.value === "0" ? "d-none" : "border-0 bg-transparent"
            }
            onClick={(e) => imprimirLiquidaciones(e, cell)}
          >
            <img width={25} src={printer} alt=""></img>
          </button>
        ),
      },
      {
        Header: "Enviar Correo",
        accessor: "enviar",
        minWidth: 100,
        width: window.screen.width < 1367 ? 150 : 229,
        maxWidth: 229,
        sticky: "top",
        Cell: ({ cell }) => (
          <button
            className={
              cell.value === "0" ? "d-none" : "border-0 bg-transparent mt-1"
            }
            onClick={(e) => {
              enviarLiquidaciones(e, cell);
            }}
          >
            <img width={25} src={mail} alt=""></img>
          </button>
        ),
      },
    ],
    [ciclo, idCuota, idAlumno]
  );

  function handleClick(e, cell) {
    e.preventDefault();
    document
      .getElementById(`spinner ${cell.row.id}`)
      .classList.remove("d-none");
    console.log(document.getElementById(`${cell.row.id}`));
    if (cell.row.original.traspaso === "1") {
      axios
        .post(
          "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/revertircuota.php?ciclo=" +
            ciclo +
            "&idcuota=" +
            idCuota +
            "&idcurso=" +
            cell.row.original.idcurso +
            "&idnivel=" +
            cell.row.original.idnivel +
            "&idalumno=" +
            cell.row.original.idalumno
        )
        .then((response) => {
          if (response.data !== "") {
            Swal.fire({
              title: "Error al Revertir Liquidación!",
              icon: "error",
              html: `${response.data}`,
              showCloseButton: true,
            });
          }
        });
    } else {
      axios.post(
        "https://www.califcolegios.wnpower.host/donboscocastelarweb/app/liquidacionindividual/liquidarcuota.php?" +
          "idcuota=" +
          idCuota +
          "&idcurso=" +
          cell.row.original.idcurso +
          "&userid=1" +
          "&idalumno=" +
          cell.row.original.idalumno
      );
      cargarTabla();
    }
    cargarTabla();
  }

  function imprimirLiquidaciones(e, cell) {
    e.preventDefault();
    window.open(
      "https://www.califcolegios.wnpower.host/donboscocastelar/aranceles/liquidacion/imprimir_boletapago.php?" +
        "idcuota=" +
        idCuota +
        "&idalum=" +
        cell.row.original.idalumno
    );
  }

  function enviarLiquidaciones(e, cell) {
    e.preventDefault();
    axios
      .post(
        "https://www.califcolegios.wnpower.host/donboscocastelar/aranceles/liquidacion/enviar_boletapagoweb.php?idcuota=" +
          idCuota +
          "&idalum=" +
          cell.row.original.idalumno +
          "&cuota=" +
          nombreCuota
      )
      .then((response) => {
        console.log(response.data);

        if (response.data.toString() === "") {
          Swal.fire({
            title: "El Correo ha sido enviado con EXITO",
            icon: "success",
            showCloseButton: true,
          });
        } else {
          Swal.fire({
            title: "Error al Enviar el Correo!",
            icon: "error",
            html: `${response.data}`,
            showCloseButton: true,
          });
        }
      });
  }

  const tableInstance = useTable(
    { columns, data: liquidaciones },
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    useSticky
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Styles>
      <div {...getTableProps()} className="table sticky text-center">
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({ title: "Cambiar Orden" })
                  )}
                  className="th pt-3"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? "isResizing" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr" id={row.id}>
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div>
          {liquidaciones.length === 0 ? (
            <div className="footer">No se registra información</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Styles>
  );
}
