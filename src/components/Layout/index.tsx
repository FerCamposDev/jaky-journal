import { auth } from 'fb/client';
import { signOut } from 'firebase/auth';
import Head from 'next/head';
import React, { FC, ReactNode } from 'react';

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
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#aaa',
        }}
      >
        <h2>{titulo}</h2>
        <button onClick={cerrarSesion}>Cerrar sesion</button>
      </nav>

      <main>
        {children}
      </main>

      <footer style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#aaa' }}>
        My footer
      </footer>
    </>
  );
};

export default Layout;
