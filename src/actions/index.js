export function cargarConceptosGenerales(conceptos) {
  return {
    type: "CARGAR_CONCEPTOS_GENERALES",
    payload: conceptos,
  };
}

export function borrarConcepto(id) {
  return {
    type: "BORRAR_CONCEPTO_GENERAL",
    payload: id,
  };
}

export function cargarConcepto(concepto) {
  return {
    type: "CARGAR_CONCEPTO",
    payload: concepto,
  };
}

export function cargarBecas(becas) {
  return {
    type: "CARGAR_BECAS",
    payload: becas,
  };
}

export function borrarBeca(id) {
  return {
    type: "BORRAR_BECA",
    payload: id,
  };
}

export function cargarBeca(beca) {
  return {
    type: "CARGAR_BECA",
    payload: beca,
  };
}

export function cargarConceptosVinculados(conceptosv) {
  return {
    type: "CARGAR_CONCEPTOS_VINCULADOS",
    payload: conceptosv,
  };
}

export function cargarTablaLiquidaciones(liquidaciones) {
  return {
    type: "CARGAR_LIQUIDACIONES",
    payload: liquidaciones,
  };
}

export function cargarTablaLiquidacionesCurso(liquidaciones) {
  return {
    type: "CARGAR_LIQUIDACIONES_CURSO",
    payload: liquidaciones,
  };
}

export function cargarTablaListaAlumnos(listaAlumnos) {
  return {
    type: "CARGAR_LISTA_ALUMNOS",
    payload: listaAlumnos,
  };
}

export function cargarAlumnosMarcados(listaAlumnos) {
  return {
    type: "CARGAR_ALUMNOS_MARCADOS",
    payload: listaAlumnos,
  };
}

export function cargarCursosMarcados(listaCursos) {
  return {
    type: "CARGAR_CURSOS_MARCADOS",
    payload: listaCursos,
  };
}

export function agregarAlumnoMarcado(alumno) {
  return {
    type: "AGREGAR_ALUMNO_MARCADO",
    payload: alumno,
  };
}

export function agregarCursoMarcado(curso) {
  return {
    type: "AGREGAR_CURSO_MARCADO",
    payload: curso,
  };
}

export function cargarAranceles(aranceles) {
  return {
    type: "CARGAR_ARANCELES",
    payload: aranceles,
  };
}

export function cargarArancel(arancel) {
  return {
    type: "CARGAR_ARANCEL",
    payload: arancel,
  };
}

export function cargarIdConcepto(idConcepto) {
  return {
    type: "CARGAR_ID_CONCEPTO",
    payload: idConcepto,
  };
}

export function cargarIdCurso(idCurso) {
  return {
    type: "CARGAR_ID_CURSO",
    payload: idCurso,
  };
}

export function cargarNivelSeleccionado(nivel) {
  return {
    type: "CARGAR_NIVEL_SELECCIONADO",
    payload: nivel,
  };
}

export function cargarIdConceptoAlumnos(idConcepto) {
  return {
    type: "CARGAR_ID_CONCEPTO_ALUMNOS",
    payload: idConcepto,
  };
}

export function cargarCodificadores(codificadores) {
  return {
    type: "CARGAR_CODIFICADORES",
    payload: codificadores,
  };
}

export function borrarCodificador(id) {
  return {
    type: "BORRAR_CODIFICADOR",
    payload: id,
  };
}

export function cargarCodificador(codificador) {
  return {
    type: "CARGAR_CODIFICADOR",
    payload: codificador,
  };
}

export function cargarUsuarios(usuarios) {
  return {
    type: "CARGAR_USUARIOS",
    payload: usuarios,
  };
}

export function borrarUsuario(id) {
  return {
    type: "BORRAR_USUARIO",
    payload: id,
  };
}

export function cargarUsuario(usuario) {
  return {
    type: "CARGAR_USUARIO",
    payload: usuario,
  };
}

export function cargarInformes(informes) {
  return {
    type: "CARGAR_INFORMES",
    payload: informes,
  };
}
