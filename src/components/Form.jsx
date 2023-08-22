import { useEffect, useState } from "react";
import styled from "styled-components";
import Error from "./Error";
import useSelects from "../hooks/useSelects";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #f1ef61;
  border: none;
  width: 100%;
  padding: 10px;
  color: #0a2033;
  font-weight: 700;
  font-size: 15px;
  text-transform: uppercase;
  border-radius: 5px;
  transition: all 0.2s ease-in-out 0.15s;
  margin-top: 30px;
  &:hover {
    background-color: #ccc052;
    cursor: pointer;
  }
`;
const Form = ({ setMonedas }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelects("Elige tu moneda", monedas);
  const [cryptomoneda, SelectCrypto] = useSelects(
    "Elegí tu Crytpo Preferida",
    cryptos
  );
  useEffect(() => {
    const consultaApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=20&tsym=USD";
      const resp = await fetch(url);
      const res = await resp.json();
      const arrayCrypto = res.Data.map((crypto, i) => {
        const cryptoOject = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName,
        };
        return cryptoOject;
      });
      setCryptos(arrayCrypto);
    };
    consultaApi();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, cryptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({ moneda, cryptomoneda });
  };
  return (
    <>
      {error ? <Error> Selecciona las dos opciones</Error> : null}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCrypto />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
