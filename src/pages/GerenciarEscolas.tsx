// src/pages/GerenciarEscolas.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, PlusCircle, School } from 'lucide-react';

// Definição dos Tipos (TypeScript)
interface Municipio {
  id: number;
  nome: string;
}

interface Escola {
  id: number;
  nome: string;
  tipo: string;
  municipio: Municipio; // O backend traz o objeto municipio dentro da escola
}

export function GerenciarEscolas() {
  // Estados para armazenar os dados
  const [escolas, setEscolas] = useState<Escola[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  
  // Estados do Formulário
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('Pública');
  const [idMunicipio, setIdMunicipio] = useState('');

  // Carregar dados ao abrir a página
  useEffect(() => {
    carregarEscolas();
    carregarMunicipios();
  }, []);

  async function carregarEscolas() {
    try {
      const response = await api.get('/escolas');
      setEscolas(response.data);
    } catch (error) {
      console.error("Erro ao buscar escolas", error);
    }
  }

  async function carregarMunicipios() {
    try {
      const response = await api.get('/municipios');
      setMunicipios(response.data);
    } catch (error) {
      console.error("Erro ao buscar municípios", error);
    }
  }

  // Função de CRIAR (Create)
  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault(); // Não recarregar a página

    if (!nome || !idMunicipio) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await api.post('/escolas', {
        nome,
        tipo,
        idMunicipio: Number(idMunicipio)
      });
      
      // Limpar formulário e recarregar lista
      setNome('');
      setIdMunicipio('');
      carregarEscolas();
      alert('Escola cadastrada com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar escola.');
    }
  }

  // Função de DELETAR (Delete)
  async function handleDelete(id: number) {
    if (confirm("Tem certeza que deseja excluir esta escola?")) {
      try {
        await api.delete(`/escolas/${id}`);
        // Remove da lista visualmente sem precisar ir no backend de novo
        setEscolas(escolas.filter(escola => escola.id !== id));
      } catch (error) {
        alert("Erro ao excluir. Verifique se existem dados vinculados.");
      }
    }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <School /> Gestão de Escolas
        </h1>

        {/* --- FORMULÁRIO DE CADASTRO --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Cadastrar Nova Escola</h2>
          <form onSubmit={handleCadastro} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Input Nome */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nome da Escola</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Ex: Escola Técnica Estadual..."
              />
            </div>

            {/* Select Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
              >
                <option value="Pública">Pública</option>
                <option value="Privada">Privada</option>
              </select>
            </div>

            {/* Select Município (Dinâmico) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Município</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                value={idMunicipio}
                onChange={e => setIdMunicipio(e.target.value)}
              >
                <option value="">Selecione...</option>
                {municipios.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão Salvar */}
            <div className="md:col-span-4 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
              >
                <PlusCircle size={20} /> Salvar Escola
              </button>
            </div>
          </form>
        </div>

        {/* --- LISTAGEM (TABELA) --- */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Município</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {escolas.map((escola) => (
                <tr key={escola.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{escola.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{escola.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{escola.municipio?.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${escola.tipo === 'Pública' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {escola.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleDelete(escola.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {escolas.length === 0 && (
            <div className="p-6 text-center text-gray-500">Nenhuma escola cadastrada.</div>
          )}
        </div>
      </div>
    </div>
  );
}