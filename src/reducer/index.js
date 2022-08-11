// let orden = 1;
const initialState = {
  users: [],
  users2: [],
  user: "",
  materiasVinculadas: [],
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
      console.log(docente);
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

    default:
      return { ...state };
  }
}
