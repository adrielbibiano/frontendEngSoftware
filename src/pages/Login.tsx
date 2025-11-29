import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Lock, Mail, LogIn } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google'; // <--- Importante

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Função para salvar token e ir pro dashboard
  const handleSuccess = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/dashboard');
  };

  async function handleLocalLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      handleSuccess(res.data.accessToken);
    } catch (_err) {
      setError('Credenciais inválidas.');
    }
  }

  // Função chamada quando o Google retorna sucesso
  async function handleGoogleSuccess(credentialResponse: any) {
    try {
      // Envia o token do Google pro nosso backend validar
      const res = await api.post('/auth/google', {
        token: credentialResponse.credential,
      });
      handleSuccess(res.data.accessToken);
    } catch (_err) {
      setError('Erro ao autenticar com Google.');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Entrar
        </h1>

        {/* Formulário Normal */}
        <form onSubmit={handleLocalLogin} className="space-y-5">
          {/* ... (Campos de Email e Senha iguais ao que você já tinha) ... */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {error && <div className="text-red-400 text-center">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn size={20} /> Entrar
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400 text-sm">ou continue com</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        {/* Botão do Google */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Falha no Login Google')}
            theme="filled_black"
            shape="circle"
          />
        </div>

        <p className="mt-8 text-center text-gray-400">
          Não tem conta?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
