import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import api from '../services/api';
import { PieChart, BarChart3 } from 'lucide-react';

interface DadosGrafico {
  name: string;
  value: number;
}

export default function Dashboard() {
  const [dados, setDados] = useState<DadosGrafico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Chama a rota nova que criamos no backend
        const response = await api.get('/dashboard/stats');
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
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} escolas ({d}%)'
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: { color: '#fff' } // Texto branco para combinar com o tema dark
    },
    series: [
      {
        name: 'Destino do Lixo',
        type: 'pie',
        radius: ['40%', '70%'], // Faz ser um gráfico de "Rosca" (Donut)
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#111827', // Cor do fundo (dark) para separar as fatias
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        labelLine: {
          show: false
        },
        data: dados // Aqui entram os dados do backend: Queimado, Enterrado, etc.
      }
    ]
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <PieChart className="text-blue-400" /> 
          Panorama da Coleta
        </h1>
        <p className="text-gray-400 mb-8">
          Distribuição das escolas por tipo de destino final dos resíduos.
        </p>

        {loading ? (
          <div className="text-center py-20">Carregando dados...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card do Gráfico */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
            </div>

            {/* Card de Resumo (Texto) */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="text-green-400"/> 
                Resumo Numérico
              </h2>
              <div className="space-y-4">
                {dados.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="font-bold text-xl">{item.value} <span className="text-sm text-gray-500 font-normal">escolas</span></span>
                  </div>
                ))}
                {dados.length === 0 && <p>Nenhum dado registrado ainda.</p>}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
