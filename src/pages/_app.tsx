import React from 'react';
import type { AppProps } from 'next/app';
import ColorModeProvider from 'contexts/ColorModeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <Component {...pageProps} />
    </ColorModeProvider>
  );
}

export default MyApp;
