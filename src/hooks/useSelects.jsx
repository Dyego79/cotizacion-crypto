import { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  color: white;
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 10px;
  border-radius: 8px;
`;
const useSelects = (label, opciones) => {
  const [state, setstate] = useState("");
  const SelectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setstate(e.target.value)}>
        <option value="">Seleccioná</option>
        {opciones.map((opcion, i) => (
          <option key={i} value={opcion.id}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </>
  );
  return [state, SelectMonedas];
};

export default useSelects;
