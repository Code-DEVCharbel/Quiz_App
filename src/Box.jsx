import React, { useRef } from "react";
import "./Box.css";
import Frågor from "./Frågor";

function Box(props) {
  const frågorRef = useRef();

  function Expand() {
    frågorRef.current.toggle();
  }

  return (
    <div className="box">
      <h1 onClick={Expand}>{props.name}</h1>
      <Frågor ref={frågorRef} category={props.category}/>
    </div>
  );
}

export default Box;