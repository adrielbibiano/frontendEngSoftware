import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Home</h2>
      <p className="mb-4">Bem-vindo ao dashboard de exemplo.</p>
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Ir para o Dashboard
      </Link>
    </main>
  );
}
