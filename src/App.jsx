import { useEffect, useState } from "react";
import styled from "styled-components";
import ImagenCrypt from "../public/img/cryptoimg.png";
import "./App.css";
import Form from "./components/Form";
import Resultado from "./components/Resultado";

const Container = styled.div`
  //border: solid 80px white;
  box-sizing: border-box;
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 50px 0px 10px 0;
  &::after {
    content: "";
    width: 100px;
    height: 2px;
    margin-top: 25px;
    background-color: #f1ef61;
    display: block;
  }
`;

const Heading4 = styled.h4`
  font-weight: 400;
  margin-bottom: 50px;
`;

const Imagen = styled.img`
  max-width: 500px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCrypto = async () => {
        const { moneda, cryptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
        const resp = await fetch(url);
        const res = await resp.json();
        setResultado(res.DISPLAY[cryptomoneda][moneda]);
      };
      cotizarCrypto();
    }
  }, [monedas]);
  return (
    <>
      <Container>
        <Imagen
          src={ImagenCrypt}
          alt="Icono de criptomonedas
        "
        />
        <div>
          <Heading>Consultá la cotización de Cryptomonedas</Heading>
          <Heading4>Fuente: https://min-api.cryptocompare.com/</Heading4>
          <Form setMonedas={setMonedas} />
          {resultado.PRICE && <Resultado resultado={resultado} />}
        </div>
      </Container>
    </>
  );
}

export default App;
