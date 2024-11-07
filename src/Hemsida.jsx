import Box from "./Box";
import "./Hemsida.css";

function Hemsida() {
  return (
    <div>
      <h1>Quiz</h1>
      <hr />
      <Box name="Literature" category="10"/>
      <Box name="Movies" category="11"/>
      <Box name="Tunes" category="12"/>
      <Box name="Games" category="15"/>
    </div>
  );
}

export default Hemsida;
