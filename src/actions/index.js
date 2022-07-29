import axios from "axios";

export function crearDocente(info) {
  return {
    type: "CREAR_DOCENTE",
    payload: info,
  };
}

export function modificarDocente(info) {
  return {
    type: "MODIFICAR_DOCENTE",
    payload: info,
  };
}

export function borrarDocente(info) {
  return {
    type: "BORRAR_DOCENTE",
    payload: info,
  };
}

// export function traerDocentes(info) {
//     return async function (dispatch){
//         let json = await axios.get("https://www.califcolegios.wnpower.host/ipsaj/admin/docentes/div_lista_todos.php",{});
//         return dispatch({
//             type:'TRAER_DOCENTES',
//             payload: json.data
//         })
//     }};
