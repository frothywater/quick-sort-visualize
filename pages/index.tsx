/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import Head from 'next/head';
import { useState } from 'react';
import generateRandomNumbers from '../api/generateRandomNumbers';
import { pink } from '../colors';
import Button from '../components/Button';
import Content from '../components/Content';

const numberCount = 10;

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>(() => {
    const numbers = generateRandomNumbers(numberCount);
    console.log(numbers);
    return numbers;
  });

  function generate() {
    setNumbers(generateRandomNumbers(numberCount));
  }

  return (
    <div>
      <Head>
        <title>Quick Sort Visualization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1
        css={css`
          margin-top: 100px;
          text-align: center;
        `}
      >
        Quick Sort Visualization
      </h1>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Content numbers={numbers} />

        <Button color={pink} onClick={generate}>
          Generate numbers
        </Button>
      </div>
    </div>
  );
}
