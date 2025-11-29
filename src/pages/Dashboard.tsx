import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import api from "../services/api";
import { PieChart, BarChart3, LogOut } from "lucide-react"; // LogOut importado aqui
import { useNavigate } from "react-router-dom";

// Interface para tipagem dos dados
interface DadosGrafico {
  name: string;
  value: number;
}

export default function Dashboard() {
  const [dados, setDados] = useState<DadosGrafico[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função de Logout
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Busca os dados assim que a tela carrega
  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get("/dashboard/stats");
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao carregar dashboard", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  // Configuração do Gráfico (ECharts)
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      bottom: "0%",
      left: "center",
      icon: "circle",
      textStyle: { color: "#fff", fontSize: 12 },
      type: "scroll",
    },
    series: [
      {
        name: "Destino do Lixo",
        type: "pie",
        radius: ["35%", "60%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: "#111827",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
            color: "#fff",
          },
        },
        labelLine: {
          show: false,
        },
        data: dados,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho com Flexbox para separar Título e Botão */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <PieChart className="text-blue-400" />
              Panorama da Coleta
            </h1>
            <p className="text-gray-400">
              Distribuição das escolas por tipo de destino final dos resíduos.
            </p>
          </div>

          {/* O BOTÃO FICOU AQUI AGORA */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>

        {/* Loading ou Conteúdo */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Carregando dados...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Esquerda: Gráfico */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-center">
              <ReactECharts
                option={option}
                style={{ height: "400px", width: "100%" }}
              />
            </div>

            {/* Direita: Lista de Números */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-gray-700 pb-4">
                <BarChart3 className="text-green-400" />
                Resumo Numérico
              </h2>

              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {dados.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-gray-300 text-sm font-medium">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-lg">
                        {item.value}
                      </span>
                      <span className="text-xs text-gray-500">escolas</span>
                    </div>
                  </div>
                ))}

                {dados.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum dado registrado ainda.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
