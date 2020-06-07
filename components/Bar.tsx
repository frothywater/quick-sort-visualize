/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { blue, grey } from '../colors';

export const maxHeight = 200;
export const littleHeight = 12;
export const barMargin = 5;
export const barWidth = 18;
const radius = 5;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: ${maxHeight + littleHeight}px;
  width: ${barWidth}px;
  padding: 0 ${barMargin}px;
`;

export default function Bar({ highlight = false, value }) {
  return (
    <div
      css={css`
        ${container};
      `}
    >
      <div
        css={css`
          background: ${highlight ? blue : grey};
          height: ${littleHeight}px;
          width: 100%;
          border-radius: ${radius}px ${radius}px 0px 0px;
        `}
      />
      <div
        css={css`
          background: ${highlight ? blue : grey};
          height: ${value * maxHeight}px;
          width: 100%;
        `}
      />
    </div>
  );
}
