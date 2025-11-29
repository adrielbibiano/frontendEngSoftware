import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  // 1. Busca o token na gaveta do navegador
  const token = localStorage.getItem('token');

  // Debug: Mostra no console se achou o crachá
  console.log(
    'PrivateRoute verificando token:',
    token ? 'Achou!' : 'Não tem token',
  );

  // 2. Se NÃO tiver token, chuta de volta pro login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se tiver token, deixa entrar (renderiza a página filha)
  return <>{children}</>;
}
