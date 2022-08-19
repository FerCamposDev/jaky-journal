/* import { Button } from '@mui/material';
import { useColorMode } from 'contexts/ColorModeContext'; */
import withAuth from 'components/Auth/withAuth';
import Dashboard from 'components/Dashboard';
import Layout from 'components/Layout';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Layout titulo="Inicio">
    <div>
      <Dashboard />
    </div>
  </Layout>
);

/* const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <div>
      Clean Project
      <Button variant="contained">Soy un boton de material ui</Button>
      <Button variant="contained" onClick={toggleColorMode}>Cambiar Theme</Button>
    </div>
  );
}; */

export default withAuth(Home);
