import { getAuth/* , signOut */ } from 'firebase/auth';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const IniciarSesionSimple = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(getAuth());

  if (error) {
    return (
      <div>
        <p>
          Error:
          {' '}
          {error.message}
        </p>
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <div>
        <p>
          Signed In User:
          {' '}
          {user.user.email}
        </p>
        DATOS:
        <br />
        {JSON.stringify(user)}
      </div>
    );
  }
  return (
    <div>
      IniciarSesionSimple
      <button type="button" onClick={() => signInWithGoogle()}>
        Sign In
      </button>
    </div>
  );
};

export default IniciarSesionSimple;
