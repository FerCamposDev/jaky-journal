/* import { Button } from '@mui/material';
import { useColorMode } from 'contexts/ColorModeContext'; */
import Dashboard from 'components/Dashboard';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <div>
    <Dashboard />
  </div>
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

export default Home;
