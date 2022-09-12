// let orden = 1;
const initialState = {
  conceptosGenerales: [],
  concepto: [],
  becas: [],
  beca: [],
  conceptosVinculados: [],
  liquidaciones: [],
  liquidacionesCurso: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "CARGAR_CONCEPTOS_GENERALES":
      return {
        ...state,
        conceptosGenerales: action.payload,
      };
    case "BORRAR_CONCEPTO_GENERAL":
      return {
        ...state,
        conceptosGenerales: state.conceptosGenerales.filter(
          (u) => u[2] !== action.payload
        ),
      };
    case "CARGAR_CONCEPTO":
      return {
        ...state,
        concepto: action.payload,
      };
    case "CARGAR_BECAS":
      return {
        ...state,
        becas: action.payload,
      };
    case "BORRAR_BECA":
      return {
        ...state,
        becas: state.becas.filter((u) => u[2] !== action.payload),
      };
    case "CARGAR_BECA":
      return {
        ...state,
        beca: action.payload,
      };
    case "CARGAR_CONCEPTOS_VINCULADOS":
      return {
        ...state,
        conceptosVinculados: action.payload,
      };
    case "CARGAR_LIQUIDACIONES":
      return {
        ...state,
        liquidaciones: action.payload,
      };
    case "CARGAR_LIQUIDACIONES_CURSO":
      return {
        ...state,
        liquidacionesCurso: action.payload,
      };

    default:
      return { ...state };
  }
}
