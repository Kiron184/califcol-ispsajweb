export function cargarDocentes(users) {
  return {
    type: "CARGAR_DOCENTES",
    payload: users,
  };
}

export function cargarDocentes2(users) {
  return {
    type: "CARGAR_DOCENTES2",
    payload: users,
  };
}

export function cargarDocente(id) {
  return {
    type: "CARGAR_DOCENTE",
    payload: id,
  };
}

export function borrarDocente(id) {
  return {
    type: "BORRAR_DOCENTE",
    payload: id,
  };
}

export function modificarDocente(user) {
  return {
    type: "MODIFICAR_DOCENTE",
    payload: user,
  };
}

export function buscarDocente(id) {
  return {
    type: "BUSCAR_DOCENTE",
    payload: id,
  };
}

export function cargarMateriasVinculadas(materias) {
  return {
    type: "CARGAR_MATERIASVINCULADAS",
    payload: materias,
  };
}
