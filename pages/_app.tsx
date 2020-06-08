import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { blue, pink } from '../colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Noto Sans', 'sans-serif'].join(','),
  },
  palette: {
    primary: { main: blue },
    secondary: { main: pink },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
