import { auth } from 'fb/client';
import { signOut } from 'firebase/auth';
import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import Button from '@mui/lab/LoadingButton';

type Props = {
  titulo: string;
  children: ReactNode;
}

const Layout: FC<Props> = ({ titulo, children }) => {
  const cerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log('logout err', err);
    }
  };

  return (
    <>
      <Head>
        <title>{titulo}</title>
      </Head>

      <nav
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#58465a', margin: '10px', padding: '10px', fontFamily: 'cursive', textTransform: 'uppercase', fontSize: '30px',
        }}
      >
        <h2>{titulo}</h2>
        <Button
          color="secondary"
          variant="contained"
          onClick={cerrarSesion}
        >
          Cerrar sesion
        </Button>
      </nav>

      <main>
        {children}
      </main>

      <footer style={{ display: 'flex', justifyContent: 'center' }}>
        ©Jackie Journal
      </footer>
    </>
  );
};

export default Layout;
