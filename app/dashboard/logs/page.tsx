// app/(dashboard)/logs/page.tsx
"use client";

import DashboardDemo from "@/components/shared/DashboardDemo";
import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type LogEntry = {
  timestamp: string;
  level: string;
  message: string;
  user?: string;
};

const dummyLogs: LogEntry[] = [
  { timestamp: "2025-12-06 10:00", level: "INFO", message: "Usuario inició sesión", user: "Heydi" },
  { timestamp: "2025-12-06 10:05", level: "ERROR", message: "Error al crear reserva", user: "Pedro" },
  { timestamp: "2025-12-06 10:10", level: "WARN", message: "Intento de acceso no autorizado", user: "Anon" },
  { timestamp: "2025-12-06 10:15", level: "INFO", message: "Viaje compartido creado", user: "Maria" },
];

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Simula obtener logs de Firestore o backend
    setLogs(dummyLogs);
  }, []);

  // Charts demo
  const kpisChartData = {
    labels: ["Reservas", "Usuarios", "Compartidos"],
    datasets: [
      {
        label: "Cantidad eventos",
        data: [8, 15, 5],
        backgroundColor: ["#34d399", "#3b82f6", "#fbbf24"],
      },
    ],
  };

  const logsChartData = {
    labels: logs.map(l => l.timestamp),
    datasets: [
      {
        label: "Eventos por hora",
        data: logs.map(() => Math.floor(Math.random() * 5) + 1),
        borderColor: "#f87171",
        backgroundColor: "rgba(248,113,113,0.3)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col p-5 gap-6">
      {/* Primera fila: 3 KPIs */}
      <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[280px] max-w-[400px] p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md flex flex-col h-72">
          <h2 className="text-xl font-bold mb-4">Reservas (Demo)</h2>
          <Bar data={kpisChartData} options={{ maintainAspectRatio: false }} className="flex-1" />
        </div>
        <div className="flex-1 min-w-[280px] max-w-[400px] p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md flex flex-col h-72">
          <h2 className="text-xl font-bold mb-4">Usuarios (Demo)</h2>
          <Pie data={kpisChartData} options={{ maintainAspectRatio: false }} className="flex-1" />
        </div>
        <div className="flex-1 min-w-[280px] max-w-[400px] p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md flex flex-col h-72">
          <h2 className="text-xl font-bold mb-4">Viajes Compartidos (Demo)</h2>
          <Line data={kpisChartData} options={{ maintainAspectRatio: false }} className="flex-1" />
        </div>
      </div>

      {/* Segunda fila: gráfico full width */}
      <div className="w-full p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md h-80">
        <h2 className="text-xl font-bold mb-4">Eventos por hora</h2>
        <Line data={logsChartData} options={{ maintainAspectRatio: false }} />
      </div>

      {/* Tercera fila: tabla de logs */}
      <div className="w-full p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md overflow-x-auto max-h-[400px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Logs del Sistema</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Fecha / Hora</th>
              <th className="border px-4 py-2 text-left">Nivel</th>
              <th className="border px-4 py-2 text-left">Mensaje</th>
              <th className="border px-4 py-2 text-left">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white/60" : "bg-gray-50/60"}>
                <td className="border px-4 py-2">{log.timestamp}</td>
                <td className="border px-4 py-2">{log.level}</td>
                <td className="border px-4 py-2">{log.message}</td>
                <td className="border px-4 py-2">{log.user || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
