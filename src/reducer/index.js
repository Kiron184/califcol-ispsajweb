// let orden = 1;
const initialState = {
  users: [],
  users2: [],
  user: "",
  materiasVinculadas: [],
  materias: [],
  materias2: [],
  materia: "",
  docentesVinculados: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "CARGAR_DOCENTES":
      return {
        ...state,
        users: action.payload,
      };
    case "CARGAR_DOCENTES2":
      return {
        ...state,
        users2: action.payload,
      };
    case "CARGAR_DOCENTE":
      return {
        ...state,
        user: state.users.filter((u) => u[4] === action.payload),
      };

    case "BORRAR_DOCENTE":
      return {
        ...state,
        users: state.users.filter((u) => u[4] !== action.payload),
      };

    case "MODIFICAR_DOCENTE":
      const docente = action.payload;
      return {
        ...state,
        users: state.users.map((u) => (u[4] === docente[4] ? docente : u)),
        users2: state.users.map((u) => (u[4] === docente[4] ? docente : u)),
      };

    case "BUSCAR_DOCENTE":
      return {
        ...state,
        user: state.users.filter((u) => u[4] === action.payload),
      };

    case "CARGAR_MATERIASVINCULADAS":
      return {
        ...state,
        materiasVinculadas: action.payload,
      };

    case "CARGAR_MATERIAS":
      return {
        ...state,
        materias: action.payload,
      };
    case "BORRAR_MATERIA":
      return {
        ...state,
        materias: state.materias.filter((m) => m[0] !== action.payload),
      };

    case "CARGAR_MATERIA":
      return {
        ...state,
        materia: state.materias.filter((m) => m[0] === action.payload),
      };

    case "MODIFICAR_MATERIA":
      const materia = action.payload;
      return {
        ...state,
        materias: state.materias.map((m) =>
          m[0] === materia[0] ? materia : m
        ),
      };

    case "CARGAR_DOCENTESVINCULADOS":
      return {
        ...state,
        docentesVinculados: action.payload,
      };
    default:
      return { ...state };
  }
}
