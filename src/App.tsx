import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="p-4 border-b border-white/10">
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App
