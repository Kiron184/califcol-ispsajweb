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

export function cargarMateriasVinculadas(materiasv) {
  return {
    type: "CARGAR_MATERIASVINCULADAS",
    payload: materiasv,
  };
}

export function cargarMaterias(materias) {
  return {
    type: "CARGAR_MATERIAS",
    payload: materias,
  };
}

export function borrarMateria(id) {
  return {
    type: "BORRAR_MATERIA",
    payload: id,
  };
}

export function cargarMateria(id) {
  return {
    type: "CARGAR_MATERIA",
    payload: id,
  };
}

export function modificarMateria(materia) {
  return {
    type: "MODIFICAR_MATERIA",
    payload: materia,
  };
}

export function cargarDocentesVinculados(docentesv) {
  return {
    type: "CARGAR_DOCENTESVINCULADOS",
    payload: docentesv,
  };
}
