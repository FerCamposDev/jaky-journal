import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'fb/client';
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

/*
  Este es HOC (Higher-Order Component)
  Es un patrón utilizado para reutilizar logica que seria necesaria en todos los componentes
  En este caso la funcionalidad es detectar si el usuario tiene una sesion iniciada o no
  Cuando querramos hacer una nueva pagina con "proteccion",
  para que solo sea accedida por usuarios con sesion. En caso de necesitarlo se usa asi:
  al final de la pagina colocamos
  export default withAuth(aca-el-nombre-de-nuestro-componente)
*/
const withAuth = (Componente: FC) => {
  const Auth = (props: any) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (!user && !loading) {
        router.push('/iniciar-sesion-simple');
      }
    }, [user, loading]);

    if (loading) {
      return <div>Cargando</div>;
    }

    if (!user) {
      return (
        <div>
          <h1>Redirigiendo a login</h1>
        </div>
      );
    }

    return <Componente {...props} />;
  };
  return Auth;
};

export default withAuth;
