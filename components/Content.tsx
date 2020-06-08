/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import quickSortHistory from '../api/quickSortHistory';
import { Frame } from '../api/typings';
import BarBox from '../components/BarBox';

function getHistory(numbers: number[], random: boolean): Frame[] {
  return quickSortHistory(
    numbers.map((value, index) => ({
      value,
      index,
    })),
    random
  );
}

export default function Content({ numbers }: { numbers: number[] }) {
  const [step, setStep] = useState<number>(0);
  const [random, setRandom] = useState<boolean>(false);
  const [history, setHistory] = useState<Frame[]>(getHistory(numbers, random));

  useEffect(() => {
    setHistory(getHistory(numbers, random));
    setStep(0);
    console.log(history);
  }, [numbers, random]);

  function prev() {
    if (step - 1 >= 0) setStep(step - 1);
  }

  function next() {
    if (step + 1 < history.length) setStep(step + 1);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRandom(event.target.checked);
  };

  return (
    <div>
      <BarBox frame={history[step]} />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 280px;
            margin-top: 18px;
          `}
        >
          <IconButton color="primary" onClick={() => setStep(0)}>
            <Icon>first_page</Icon>
          </IconButton>
          <IconButton color="primary" disabled={step === 0} onClick={prev}>
            <Icon>navigate_before</Icon>
          </IconButton>
          <span>
            {step + 1} / {history.length}
          </span>
          <IconButton
            color="primary"
            disabled={step === history.length - 1}
            onClick={next}
          >
            <Icon>navigate_next</Icon>
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setStep(history.length - 1)}
          >
            <Icon>last_page</Icon>
          </IconButton>
        </div>
        <FormControlLabel
          control={
            <Checkbox checked={random} onChange={handleChange} name="random" />
          }
          label="Random optimization"
        />
      </div>
    </div>
  );
}
