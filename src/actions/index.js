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
