let orden = 1;
const initialState = {
  users: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "CARGAR_DOCENTES":
      return {
        ...state,
        users: [action.payload],
      };
    case "CREAR_DOCENTE":
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: orden++ }],
      };

    case "BORRAR_DOCENTE":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case "TRAER_DOCENTES":
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: orden++ }],
      };
    case "MODIFICAR_DOCENTE":
      if (action.payload.id) {
        return {
          ...state,
          users: state.users.map((user) => {
            if (user.id === action.payload.id) {
              return {
                ...user,
                ...action.payload,
              };
            }
            return user;
          }),
        };
      }

      return state;

    default:
      return { ...state };
  }
}
