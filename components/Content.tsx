/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import quickSortHistory from '../api/quickSortHistory';
import { Frame } from '../api/typings';
import BarBox from '../components/BarBox';
import Button from '../components/Button';

function getHistory(numbers: number[]): Frame[] {
  return quickSortHistory(
    numbers.map((value, index) => ({
      value,
      index,
    }))
  );
}

export default function Content({ numbers }: { numbers: number[] }) {
  const [step, setStep] = useState<number>(0);
  const [history, setHistory] = useState<Frame[]>(() => {
    const history = getHistory(numbers);
    console.log(history);
    return history;
  });

  useEffect(() => {
    setHistory(getHistory(numbers));
    setStep(0);
    console.log(history);
  }, [numbers]);

  function prev() {
    if (step - 1 >= 0) setStep(step - 1);
  }

  function next() {
    if (step + 1 < history.length) setStep(step + 1);
  }

  return (
    <div>
      <BarBox frame={history[step]} />

      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 300px;
          margin: 30px 0;
        `}
      >
        <Button onClick={() => setStep(0)}>≪</Button>
        <Button disabled={step === 0} onClick={prev}>
          &lt;
        </Button>
        <span>
          {step + 1} / {history.length}
        </span>
        <Button disabled={step === history.length - 1} onClick={next}>
          &gt;
        </Button>
        <Button onClick={() => setStep(history.length - 1)}>≫</Button>
      </div>
    </div>
  );
}
