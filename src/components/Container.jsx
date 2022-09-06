import React from "react";

export default function Container(props) {
  return (
    <div id="contenedor" className="contenedor">
      {props.children}
    </div>
  );
}
