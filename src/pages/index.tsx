import type { NextPage } from 'next';
import withAuth from 'components/Auth/withAuth';
import Dashboard from 'components/Dashboard';
import GestorDeUsuarios from 'components/GestorDeUsuarios';
import Layout from 'components/Layout';

const Home: NextPage = () => (
  <Layout titulo="Inicio">
    {/* chequear si es user admin */}
    <div>
      <Dashboard />
      <GestorDeUsuarios />
    </div>
  </Layout>
);

export default withAuth(Home);
