import EChartExample from '../components/EChartExample'

export default function Dashboard() {
  return (
    <main className="p-8 container mx-auto max-w-5xl">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="w-full">
        <EChartExample />
      </div>
    </main>
  )
}
