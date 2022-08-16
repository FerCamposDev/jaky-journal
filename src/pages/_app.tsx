import React from 'react';
import type { AppProps } from 'next/app';
import ColorModeProvider from 'contexts/ColorModeContext';
import DolarProvider from 'contexts/DolarContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <DolarProvider>
        <Component {...pageProps} />
      </DolarProvider>
    </ColorModeProvider>
  );
}

export default MyApp;
