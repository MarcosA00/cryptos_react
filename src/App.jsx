import { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import Form from './components/Form';
import Result from './components/Result';
import Spinner from './components/Spinner';
import ImageCrypto from './img/imagen-criptos.png'

const Container = styled.div `
  max-width: 1000px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1 `
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0  auto;
    border-radius: 3px;
  }
`

function App() {
  const [coins, setCoins] = useState({});
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(Object.keys(coins).length){
      const quoteCripto = async () => {
        setLoading(true);
        setRes({});

        const { coin, cripto } = coins;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${coin}`;

        const answer = await fetch(url);
        const result = await answer.json();

        setRes(result.DISPLAY[cripto][coin]);

        setLoading(false);
      }

      quoteCripto();
    }
  }, [coins]);

  return (
    <Container>
      <Image 
        src={ ImageCrypto }
        alt='Imagenes Cryptos'
      />

      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Form 
          setCoins = { setCoins }
        />

        { loading && <Spinner /> }

        { res && res.PRICE && <Result 
                                res = { res }
                              /> 
        }
      </div>
    </Container>
  )
}

export default App;