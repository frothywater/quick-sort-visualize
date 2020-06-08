/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Button, Slider, Typography } from '@material-ui/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import generateRandomNumbers from '../api/generateRandomNumbers';
import Content from '../components/Content';

export default function Home() {
  const [count, setCount] = useState<number>(10);
  const [numbers, setNumbers] = useState<number[]>(
    generateRandomNumbers(count)
  );

  function generate() {
    setNumbers(generateRandomNumbers(count));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    setCount(value);
  };

  useEffect(() => {
    setNumbers(generateRandomNumbers(count));
  }, [count]);

  return (
    <div>
      <Head>
        <title>Quick Sort Visualization</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography
        variant="h4"
        css={css`
          padding-top: 100px;
          text-align: center;
        `}
      >
        Quick Sort Visualization
      </Typography>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Content numbers={numbers} />

        <Slider
          defaultValue={10}
          valueLabelDisplay="auto"
          step={1}
          min={10}
          max={20}
          onChange={handleChange}
          css={css`
            max-width: 240px;
          `}
        />

        <Button color="secondary" onClick={generate}>
          Generate numbers
        </Button>
      </div>
    </div>
  );
}
