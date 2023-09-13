import { useEffect, useState } from "react";
import styled from "@emotion/styled"
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

function Form() {
  const [criptos, setCriptos] = useState([]);

  const [ coin, SelectCoins ] = useSelectCoins('Elige tu Moneda', coins);

  useEffect(() => {
    const consultAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

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

  return (
    <div>
      <form>
        <SelectCoins />

        <InputSubmit 
          type="submit" 
          value="Cotizar" 
        />
      </form>
    </div>
  )
}

export default Form