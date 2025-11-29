// src/pages/GerenciarEscolas.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, PlusCircle, School } from 'lucide-react';

// Definição dos Tipos
interface Municipio {
  id: number;
  nome: string;
}

interface Destino {
  id: number;
  tipo: string;
}

interface Escola {
  id: number;
  nome: string;
  tipo: string;
  municipio: Municipio;
}

export function GerenciarEscolas() {
  // Estados de Dados (Listas)
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [destinos, setDestinos] = useState<Destino[]>([]);

  // Estado de Carregamento
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('Pública');
  const [idMunicipio, setIdMunicipio] = useState('');
  const [idDestino, setIdDestino] = useState('');

  // Carregar dados ao abrir a página
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      // Busca todas as informações necessárias
      const [resEscolas, resMunicipios, resDestinos] = await Promise.all([
        api.get('/escolas'),
        api.get('/municipios'),
        api.get('/destinos'),
      ]);

      setEscolas(resEscolas.data);
      setMunicipios(resMunicipios.data);
      setDestinos(resDestinos.data);
    } catch (error) {
      console.error('Erro ao carregar dados', error);
    }
  }

  // Função de CRIAR (Create)
  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !idMunicipio || !idDestino) {
      alert('Preencha todos os campos, incluindo o destino do lixo!');
      return;
    }

    // 1. Ativa o bloqueio
    setLoading(true);

    try {
      await api.post('/escolas', {
        nome,
        tipo,
        idMunicipio: Number(idMunicipio),
        idDestino: Number(idDestino),
      });

      // Limpar formulário
      setNome('');
      setIdMunicipio('');
      setIdDestino('');

      // Recarrega a lista para mostrar a nova escola
      const res = await api.get('/escolas');
      setEscolas(res.data);

      alert('Escola cadastrada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar escola.');
    } finally {
      // 2. Libera o bloqueio (seja sucesso ou erro)
      setLoading(false);
    }
  }

  // Função de DELETAR (Delete)
  async function handleDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir esta escola?')) {
      try {
        await api.delete(`/escolas/${id}`);
        setEscolas(escolas.filter((escola) => escola.id !== id));
      } catch (_error) {
        alert('Erro ao excluir. Pode haver dados vinculados.');
      }
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <School /> Gestão de Escolas
        </h1>

        {/* --- FORMULÁRIO DE CADASTRO --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Cadastrar Nova Escola</h2>
          <form
            onSubmit={handleCadastro}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 align-bottom"
          >
            {/* Input Nome */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Nome da Escola
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Escola Técnica Estadual..."
                disabled={loading} // Bloqueia digitação enquanto salva
              />
            </div>

            {/* Select Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                disabled={loading}
              >
                <option value="Pública">Pública</option>
                <option value="Privada">Privada</option>
              </select>
            </div>

            {/* Select Município */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Município
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={idMunicipio}
                onChange={(e) => setIdMunicipio(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione...</option>
                {municipios.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Destino do Lixo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destino do Lixo
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={idDestino}
                onChange={(e) => setIdDestino(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione...</option>
                {destinos.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.tipo}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão Salvar com Loading e Bloqueio */}
            <div className="lg:col-span-5 flex justify-end mt-2">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded flex items-center gap-2 font-medium text-white transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  'Salvando...'
                ) : (
                  <>
                    <PlusCircle size={20} /> Salvar Escola
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* --- LISTAGEM --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Município
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {escolas.map((escola) => (
                <tr key={escola.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{escola.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {escola.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {escola.municipio?.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        escola.tipo === 'Pública'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {escola.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(escola.id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full transition-colors"
                      title="Excluir Escola"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {escolas.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              Nenhuma escola cadastrada ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
