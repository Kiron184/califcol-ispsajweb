// let orden = 1;
const initialState = {
  conceptosGenerales: [],
  concepto: [],
  becas: [],
  beca: [],
  conceptosVinculados: [],
  liquidaciones: [],
  liquidacionesCurso: [],
  listaAlumnos: [],
  listaAlumnosMarcados: [],
  listaCursosMarcados: [],
  aranceles: [],
  arancel: [],
  idCurso: 0,
  idConcepto: 0,
  nivelSeleccionado: [],
  idConceptoAlumnos: 0,
  codificadores: [],
  codificador: [],
  usuarios: [],
  usuario: [],
  informes: [],
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
    case "CARGAR_LISTA_ALUMNOS":
      return {
        ...state,
        listaAlumnos: action.payload,
      };

    case "CARGAR_ALUMNOS_MARCADOS":
      return {
        ...state,
        listaAlumnosMarcados: action.payload,
      };

    case "CARGAR_CURSOS_MARCADOS":
      return {
        ...state,
        listaCursosMarcados: action.payload,
      };

    case "AGREGAR_ALUMNO_MARCADO":
      let estaAlumno = false;

      state.listaAlumnosMarcados.map((a) => {
        if (a.id === action.payload.id) {
          estaAlumno = true;
        }
      });

      if (!estaAlumno) {
        return {
          ...state,
          listaAlumnosMarcados: [...state.listaAlumnosMarcados, action.payload],
        };
      } else {
        return;
      }

    case "AGREGAR_CURSO_MARCADO":
      let estaCurso = false;

      state.listaCursosMarcados.map((a) => {
        if (a.idcurso === action.payload.idcurso) {
          estaCurso = true;
        }
      });

      if (!estaCurso) {
        return {
          ...state,
          listaCursosMarcados: [...state.listaCursosMarcados, action.payload],
        };
      } else {
        return;
      }
    case "CARGAR_ARANCELES":
      return {
        ...state,
        aranceles: action.payload,
      };
    case "CARGAR_ARANCEL":
      return {
        ...state,
        arancel: action.payload,
      };

    case "CARGAR_ID_CURSO":
      return {
        ...state,
        idCurso: action.payload,
      };

    case "CARGAR_ID_CONCEPTO":
      return {
        ...state,
        idConcepto: action.payload,
      };

    case "CARGAR_NIVEL_SELECCIONADO":
      let nivel = action.payload;
      if (nivel[1]) {
        return {
          ...state,
          nivelSeleccionado: [...state.nivelSeleccionado, nivel[0]],
        };
      } else {
        return {
          ...state,
          nivelSeleccionado: state.nivelSeleccionado.filter(
            (n) => n !== nivel[0]
          ),
        };
      }

    case "CARGAR_ID_CONCEPTO_ALUMNOS":
      return {
        ...state,
        idConceptoAlumnos: action.payload,
      };

    case "CARGAR_CODIFICADORES":
      return {
        ...state,
        codificadores: action.payload,
      };
    case "BORRAR_CODIFICADOR":
      return {
        ...state,
        codificadores: state.codificadores.filter(
          (u) => u.id !== action.payload
        ),
      };

    case "CARGAR_CODIFICADOR":
      return {
        ...state,
        codificador: action.payload,
      };

    case "CARGAR_USUARIOS":
      return {
        ...state,
        usuarios: action.payload,
      };
    case "BORRAR_USUARIO":
      return {
        ...state,
        usuario: state.codificadores.filter((u) => u.id !== action.payload),
      };

    case "CARGAR_USUARIO":
      return {
        ...state,
        usuario: action.payload,
      };
    case "CARGAR_INFORMES":
      return {
        ...state,
        informes: action.payload,
      };

    default:
      return { ...state };
  }
}
