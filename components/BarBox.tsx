/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import FlipMove from 'react-flip-move';
import { Frame } from '../api/typings';
import Bar, { barMargin, barWidth } from './Bar';

const singleWidth = barWidth + 2 * barMargin;

const container = css`
  margin: auto;
  display: flex;
  width: fit-content;
  flex-direction: row;
  margin-top: 75px;
`;

const intervalBackground = css`
  background: #ddd;
  position: absolute;
  top: 0;
  height: 100%;
  z-index: -1;
`;

export default function BarBox({ frame }: { frame: Frame }) {
  let left: number;
  let right: number;
  if (frame.interval) [left, right] = frame.interval;
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <FlipMove
        easing={'cubic-bezier(.62,.09,.39,.93)'}
        duration={350}
        css={container}
      >
        {frame.entries.map((entry) => (
          <div key={entry.index}>
            <Bar value={entry.value} highlight={entry.index === frame.pivot} />
          </div>
        ))}
        <div
          css={css`
          ${intervalBackground}
          left: ${singleWidth * left}px;
          width: ${singleWidth * (right - left + 1)}px;
        `}
        />
      </FlipMove>
    </div>
  );
}
