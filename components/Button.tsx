/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { blue } from '../colors';

const nonDisabledBehavior = (color = blue) => css`
  cursor: pointer;
  &:hover {
    color: ${color};
  }
`;

export default function Button(props) {
  return (
    <button
      css={css`
        border: none;
        background: none;
        padding: 10px 10px;
        font-size: 16px;
        display: inline-block;

        ${!props.disabled && nonDisabledBehavior(props.color)}
      `}
      {...props}
    >
      {props.children}
    </button>
  );
}
