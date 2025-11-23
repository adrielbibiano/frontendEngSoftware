// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import api from '../services/api'; // Import com letra minúscula (importante!)
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
        // Busca os dados da rota de estatísticas do backend
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

  // Configuração Otimizada do Gráfico (ECharts)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)' // Mostra Nome: Valor (Porcentagem)
    },
    legend: {
      bottom: '0%', // Legenda no rodapé para não cobrir o gráfico
      left: 'center',
      icon: 'circle', 
      textStyle: { color: '#fff', fontSize: 12 },
      type: 'scroll', // Cria setinhas se tiver muitos itens (evita quebrar o layout)
    },
    series: [
      {
        name: 'Destino do Lixo',
        type: 'pie',
        // Ajuste de tamanho: Buraco (35%) e Tamanho Total (60%)
        radius: ['35%', '60%'], 
        center: ['50%', '45%'], // Sobe um pouco o centro para dar espaço para a legenda
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#111827', // Cor do fundo para separar as fatias
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#fff'