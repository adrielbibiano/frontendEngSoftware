import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Lock, Mail, UserPlus } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPass) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await api.post('/auth/register', { email, password });
      alert("Conta criada! Faça login.");
      navigate('/login');
    } catch (err) {
      setError("Erro ao criar conta. Email já em uso?");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Criar Conta</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 p-3 rounded bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>
          <div>
            <label className="text-gray-300 text-sm">Senha</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 p-3 rounded bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>
          <div>
            <label className="text-gray-300 text-sm">Confirmar Senha</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-500 h-5 w-5" />
              <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                className="w-full pl-10 p-3 rounded bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2">
            <UserPlus size={20} /> Cadastrar
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Já tem conta? <Link to="/login" className="text-blue-400 hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}