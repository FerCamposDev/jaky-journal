import { auth, signOut } from 'fb/client';

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const IniciarSesionSimple = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log('logout err', err);
    }
  };

  if (error) {
    return (
      <div>
        <p>
          Error iniciando sesion:&nbsp;
          {error.message}
        </p>
      </div>
    );
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (user) {
    return (
      <div>
        <p>
          Sesion iniciada:&nbsp;
          {user.email}
        </p>
        <br />
        DATOS:
        <br />
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <br />
        <button type="button" onClick={cerrarSesion}>
          cerrar sesion
        </button>
      </div>
    );
  }

  return (
    <div>
      Iniciar Sesion
      <button type="button" onClick={() => signInWithGoogle()}>
        Iniciar sesion
      </button>
    </div>
  );
};

export default IniciarSesionSimple;
