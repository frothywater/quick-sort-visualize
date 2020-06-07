/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import generateRandomNumbers from '../api/generateRandomNumbers';
import quickSortHistory from '../api/quickSortHistory';
import { Frame } from '../api/typings';
import { pink } from '../colors';
import BarBox from '../components/BarBox';
import Button from '../components/Button';

const numberCount = 10;

function getHistory(numbers: number[]): Frame[] {
  return quickSortHistory(
    numbers.map((value, index) => ({
      value,
      index,
    }))
  );
}

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>(
    generateRandomNumbers(numberCount)
  );
  const [step, setStep] = useState<number>(0);
  const [history, setHistory] = useState<Frame[]>(getHistory(numbers));

  useEffect(() => {
    setHistory(getHistory(numbers));
    setStep(0);
  }, [numbers]);

  function generate() {
    setNumbers(generateRandomNumbers(numberCount));
  }

  function prev() {
    if (step - 1 >= 0) setStep(step - 1);
  }

  function next() {
    if (step + 1 < history.length) setStep(step + 1);
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
        <BarBox frame={history[step]} />

        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 250px;
            margin: 30px 0;
          `}
        >
          <Button disabled={step === 0} onClick={prev}>
            Prev
          </Button>
          <span>
            {step + 1} / {history.length}
          </span>
          <Button disabled={step === history.length - 1} onClick={next}>
            Next
          </Button>
        </div>

        <Button color={pink} onClick={generate}>
          Generate numbers
        </Button>
      </div>
    </div>
  );
}
