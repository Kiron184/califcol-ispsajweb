import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import "../style/styles.css";

export default function Table() {
  //const users = useSelector((state) => state.users);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.califcolegios.wnpower.host/app/traerdocentes.php?txnombre="
      )
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      });
  }, []);

  function nextPath(path) {
    this.props.history.push(path);
  }

  return (
    <div className="tablaDocenteContainer scroll">
      <table className="table align-middle justify-content-center w-50 mx-auto table-striped table-hover table-condensed">
        <thead className="bg-transparent">
          <tr>
            <th className="col">Apellido</th>
            <th className="col">Nombre</th>
            <th className="col">Documento</th>
            <th className="col">Email</th>
            <th className="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((u) => (
              <tr key={u[4]}>
                <td>
                  <div className="d-flex align-items-center">
                    <p className="fw-bold mb-1">{u[0]}</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-start tabla1">
                    <p className="">{u[1]}</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <p className="fw-bold mb-1">{u[2]}</p>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center tabla11">
                    <p className="fw-bold mb-1">{u[3]}</p>
                  </div>
                </td>
                <td>
                  <NavLink
                    to={"/docente/" + u[4]}
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                    id={u[4]}
                    edit="true"
                    onClick={() =>
                      document
                        .querySelector(".navbar")
                        .classList.toggle("active-nav")
                    }
                  >
                    <img
                      width="20px"
                      alt="edit"
                      src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png"
                    />
                  </NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
