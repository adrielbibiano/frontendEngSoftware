import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/login', { email, password })
      // backend might return either { accessToken } or { token }
      const token = res.data?.accessToken ?? res.data?.token
      if (token) {
        // normalize and store under accessToken key
        localStorage.setItem('accessToken', token)
        navigate('/dashboard')
      } else {
        setError('Resposta inválida do servidor')
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 container mx-auto max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          className="px-3 py-2 rounded bg-gray-800 border border-white/10"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded bg-gray-800 border border-white/10"
          placeholder="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-400">{error}</div>}
        <button
          className="mt-2 px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}
