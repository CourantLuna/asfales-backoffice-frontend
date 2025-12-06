// components/DashboardDemo.tsx
"use client";

import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(...registerables);

const DashboardDemo = () => {
  const [bookingData, setBookingData] = useState<number[]>([]);
  const [usersData, setUsersData] = useState<number[]>([]);
  const [sharedTripsData, setSharedTripsData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const dummyDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString();
    });

    setDates(dummyDates);
    setBookingData(dummyDates.map(() => Math.floor(Math.random() * 20) + 5));
    setUsersData(dummyDates.map(() => Math.floor(Math.random() * 50) + 10));
    setSharedTripsData(dummyDates.map(() => Math.floor(Math.random() * 10) + 1));
  }, []);

  const bookingChart = {
    labels: dates,
    datasets: [
      {
        label: "Reservas diarias",
        data: bookingData,
        fill: false,
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.5)",
        tension: 0.4,
      },
    ],
  };

  const usersChart = {
    labels: dates,
    datasets: [
      {
        label: "Usuarios activos",
        data: usersData,
        backgroundColor: "rgba(59,130,246,0.7)",
      },
    ],
  };

  const sharedTripsChart = {
    labels: ["Itinerario A", "Itinerario B", "Itinerario C", "Itinerario D"],
    datasets: [
      {
        label: "Viajes compartidos",
        data: sharedTripsData.slice(0, 4),
        backgroundColor: ["#f87171", "#fbbf24", "#34d399", "#60a5fa"],
      },
    ],
  };

   // Gráfico de tiempo general 
  const timeChartData = {
    labels: dates,
    datasets: [
      {
        label: "Actividad total diaria",
        data: bookingData.map((b, i) => b + usersData[i] + sharedTripsData[i]),
        borderColor: "rgba(245,158,11,1)",
        backgroundColor: "rgba(245,158,11,0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };
  // Datos de tabla demo
  const kpiData = [
    { kpi: "Total Usuarios", value: 152 },
    { kpi: "Total Reservas", value: 87 },
    { kpi: "Viajes Compartidos", value: 34 },
    { kpi: "Promedio Reservas/Día", value: 12.4 },
    { kpi: "Usuarios Activos Hoy", value: 48 },
  ];


  return (
    <div className="flex flex-wrap w-full p-5 gap-10 overflow-y-auto">
      {[{title:"Reservas Diarias", chart: bookingChart, type:"line"},
        {title:"Usuarios Activos", chart: usersChart, type:"bar"},
        {title:"Viajes Compartidos", chart: sharedTripsChart, type:"pie"}].map((card, idx) => (
        <div key={idx} className="p-6  bg-white/70 backdrop-blur-sm rounded-xl shadow-md flex flex-col ">
          <h2 className="text-xl font-bold mb-4 items-start flex flex-1">{card.title} </h2>
          <div className="flex-1 flex w-full items-center justify-center">
            {card.type === "line" && <Line data={card.chart} />}
            {card.type === "bar" && <Bar data={card.chart} />}
            {card.type === "pie" && <Pie data={card.chart} />}
          </div>
        </div>
      ))}

      {/* Segunda fila: gráfico de tiempo general full width */}
      <div className="w-full p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Actividad Total Diaria</h2>
        <div className="h-auto">
          <Line data={timeChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

       {/* Tercera fila: tabla de KPIs */}
      <div className="w-full p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">KPIs Administrativos</h2>
        <table className="min-w-full table-auto border-collapse rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">KPI</th>
              <th className="border px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            {kpiData.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-primary/30 " : "bg-secondary/30"}>
                <td className="border px-4 py-2">{row.kpi}</td>
                <td className="border px-4 py-2">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardDemo;
