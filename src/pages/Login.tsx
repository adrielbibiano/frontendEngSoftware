import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Lock, Mail, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });

      // 1. Salva o token no navegador
      localStorage.setItem('token', response.data.accessToken);
      
      // 2. Redireciona para o Dashboard
      navigate('/dashboard');
      
    } catch (err: any) {
      console.error(err);
      // Mensagem de erro amigável
      if (err.response?.status === 401) {
        setError('Email ou senha incorretos.');
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
          <p className="text-gray-400">Faça login para acessar o sistema de coleta.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : (
              <>
                <LogIn size={20} /> Entrar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}