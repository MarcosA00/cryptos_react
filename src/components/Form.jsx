import { useEffect, useState } from "react";
import styled from "@emotion/styled"
import Error from "./Error";
import useSelectCoins from "../hooks/useSelectCoins"
import { coins } from "../data/coins"; 

const InputSubmit = styled.input `
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color .3s ease;

  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

function Form({ setCoins }) {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [ coin, SelectCoins ] = useSelectCoins('Elige tu Moneda', coins);
  const [ cripto, SelectCripto ] = useSelectCoins('Elige tu Criptomoneda', criptos);

  useEffect(() => {
    const consultAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

      const answer = await fetch(url);
      const result = await answer.json();
    
      const arrayCriptos = result.Data.map(cripto => {
        const obj = {
          id: cripto.CoinInfo.Name,
          name: cripto.CoinInfo.FullName
        }

        return obj;
      });

      setCriptos(arrayCriptos);
    }

    consultAPI();
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if([ coin, cripto ].includes('')) {
      setError(true);

      return;
    }

    setError(false);

    setCoins({
      coin,
      cripto
    })
  }

  return (
    <div>
      { error && <Error>Todos los campos son obligatorios</Error> }

      <form
        onSubmit={ handleSubmit }
      >
        <SelectCoins />

        <SelectCripto />

        <InputSubmit 
          type="submit" 
          value="Cotizar" 
        />
      </form>
    </div>
  )
}

export default Form