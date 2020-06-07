import { css, Global } from '@emotion/core';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
          />
        </Head>
        <Global
          styles={css`
            html,
            body,
            div#__next {
              height: 100%;
              width: 100%;
              margin: 0;
            }

            body {
              font-family: 'Noto Sans', sans-serif;
            }
          `}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
