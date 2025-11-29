import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import api from "../api/client";

type Escola = { id: number; nome: string; servicosColeta?: any[] };

type ChartData = {
  labels?: string[];
  values?: number[];
  escolas?: Escola[];
};

export default function EChartExample() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/escolas")
      .then((res) => {
        if (!mounted) return;
        // backend returns an array of escolas; wrap into ChartData shape
        setData({ escolas: res.data });
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Carregando dados...</div>;
  if (!data) return <div>Erro ao carregar dados</div>;

  // If backend provides `escolas` with `servicosColeta`, build a simple
  // bar chart: labels = escola.nome and values = servicosColeta.length
  const labels = data.labels ?? data.escolas?.map((e: any) => e.nome) ?? [];
  const values =
    data.values ??
    data.escolas?.map((e: any) => e.servicosColeta?.length ?? 0) ??
    [];

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: labels },
    yAxis: { type: "value" },
    series: [
      {
        name: "Serviços de Coleta",
        type: "bar",
        data: values,
        itemStyle: { color: "#5b6cff" },
      },
    ],
  };

  return (
    <div className="bg-white/5 rounded p-4">
      <ReactECharts option={option} style={{ height: 360 }} />
    </div>
  );
}
