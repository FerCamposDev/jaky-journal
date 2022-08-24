import React from 'react';
import type { AppProps } from 'next/app';
import ColorModeProvider from 'contexts/ColorModeContext';
import DolarProvider from 'contexts/DolarContext';
import DBProvider from 'contexts/DBContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <DBProvider>
        <DolarProvider>
          <Component {...pageProps} />
        </DolarProvider>
      </DBProvider>
    </ColorModeProvider>
  );
}

export default MyApp;
