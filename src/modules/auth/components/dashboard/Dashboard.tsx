"use client";

import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const actions = [
  {
    Id: 1,
    img: "/car.png",
    title: "Gérer les véhicules",
    description: "Consultez l’état de chaque véhicule et planifiez la maintenance.",
    primary: "Review all",
    secondary: "Ajouter un véhicule",
  },
  {
    Id: 2,
    img: "/chauffeur.png",
    title: "Ajouter un chauffeur",
    description: "Intégrez un nouveau chauffeur dans la flotte et assignez-le facilement.",
    primary: "Review all",
    secondary: "Ajouter un chauffeur",
  },
];

const stats = [
  {
    id: 1,
    title: "Nombre de campagnes en cours",
    value: "40,689",
    sub: "8.5%",
    subtext: "Up from yesterday",
    color: "text-green-500",
    img: "/Vector.png",
    image: "up.png",
  },
  {
    id: 2,
    title: "Revenus générés",
    value: "$89,000",
    sub: "4.3%",
    subtext: "Down from yesterday",
    color: "text-red-500",
    img: "/Icon.png",
    image: "down.png",
  },
  {
    id: 3,
    title: "Litiges ouverts / incidents signalés",
    value: "2040",
    sub: "1.8%",
    subtext: "Up from yesterday",
    color: "text-green-500",
    img: "/Group.png",
    image: "up.png",
  },
];

const zones = [
  { id: "01", name: "Zone 1", percent: 29, color: "bg-indigo-500" },
  { id: "02", name: "Zone 2", percent: 29, color: "bg-green-500" },
  { id: "03", name: "Zone 3", percent: 75, color: "bg-yellow-500" },
];

const alerts = [
  { id: 1, title: "Flotte disponible insuffisante", detail: "Zone Sud : 68% dispo", img: "/Icon3.png" },
  { id: 2, title: "Chauffeurs non validés", detail: "5 chauffeurs en attente", img: "/Icon3.png" },
  { id: 3, title: "Flotte disponible insuffisante", detail: "Zone West : 50% dispo", img: "/Icon3.png" },
  { id: 4, title: "Litiges non traités", detail: "12 incidents ouverts", img: "/Icon3.png" },
  { id: 5, title: "Litiges non traités", detail: "12 incidents ouverts", img: "/Icon3.png" },
];

export default function Dashboard() {
  const chartRef = useRef(null);

  const data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Conversions",
        data: [100, 200, 456, 250, 300, 200, 350],
        borderColor: "#3B82F6",
        borderWidth: 3,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.45,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(59,130,246,0.4)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111827",
        bodyColor: "#374151",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.formattedValue} Conversions`,
          title: (items) => items[0].label,
        },
      },
    },
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        grid: { display: false, drawTicks: false, drawBorder: false },
        ticks: { color: "#6B7280", font: { size: 13 } },
      },
      y: { display: false, grid: { drawBorder: false } },
    },
  };

  const handleSaveReport = () => {
    const chart = chartRef.current;
    if (!chart) return;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.png";
    link.click();
  };

  return ( 
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-9 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((item) => (
          <div key={item.Id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex">
              <img src={item.img} alt="icons" className="mr-4 p-1" style={{width:"60px",height:"60px"}} />
              <div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-500 mb-4">{item.description}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1  py-2">
                {item.primary}
              </button>
              <button className="flex-1  py-2  text-white rounded-full bg-[#2E2E48]">
                {item.secondary}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((item) => {
        const specialStyle =
          item.id === 1
            ? {
                width: "53.5810546875px",
                height: "53.5810546875px",
                backgroundColor: " rgba(130, 128, 255, 0.21)",
                transform: "rotate(0deg)",
                borderRadius: "8px",
              }
            : item.id === 3
            ? {
                width: "53.5810546875px",
                height: "53.5810546875px",
                backgroundColor: "rgba(255, 144, 102, 0.3)",
                transform: "rotate(0deg)",
                borderRadius: "8px",
              }
            : {};

        return (
          <div className="bg-white p-4 rounded-xl shadow-md flex-1" key={item.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm w-35">{item.title}</p>
              </div>
              <div style={specialStyle} className="flex items-center justify-center">
              <img src={item.img} alt=""  />
              </div>
            </div>
            <h2 className="text-2xl font-bold">{item.value}</h2>
            <div className="flex items-center gap-2">
              <img src={item.image} alt="" />
              <span className={`text-sm ${item.color}`}>{item.sub}</span>
            <p className="text-sm text-gray-500">{item.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>


<div className="bg-white p-4 rounded-xl shadow-md md:h-[400px]">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h3 className="font-bold">Nombre de conversion</h3>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </p>
    </div>
    <button
      onClick={handleSaveReport}
      className="flex items-center px-4 py-2 border border-sky-500 text-sky-500 rounded-lg cursor-pointer hover:bg-sky-500 hover:text-white transition"
    >
<img
  src="/telecharger.png"
  alt="Télécharger"
  className="mr-2 hover:opacity-80 hover:scale-105 transition cursor-pointer"
/>      Save Report
    </button>
  </div>

    <div className="w-full h-[250px] md:h-[300px]">
          <Line ref={chartRef} data={data} options={options} />
        </div>
</div>


      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h3 className="font-bold mb-4">Flotte disponible par zone</h3>
        <table className="w-full text-left border-collapse min-w-[400px]">
  <thead>
    <tr className="text-gray-400 text-sm border-b">
      <th className="py-3 px-2 font-medium">#</th>
      <th className="py-3 px-2 font-medium">Zone</th>
      <th className="py-3 px-2 font-medium">Disponibilité</th>
      <th className="py-3 px-2 font-medium text-right">Disponibilité</th>
    </tr>
  </thead>
  <tbody> 
  {zones.map((zone, idx) => (
    <tr key={zone.id}>
      <td className="py-3 px-2 text-gray-700 text-sm border-b border-gray-300">{zone.id}</td>
      <td className="py-3 px-2 text-gray-800 font-medium border-b border-gray-300">{zone.name}</td>
      <td className="py-3 px-2 border-b border-gray-300">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${zone.color} h-2 rounded-full`}
            style={{ width: `${zone.percent}%` }}
          ></div>
        </div>
      </td>
      <td className="py-3 px-2 text-gray-700 text-sm text-right border-b border-gray-300">
        {zone.percent}%
      </td>
    </tr>
  ))}
</tbody>

</table>

      </div>
    </div>

    {/* Sidebar */}
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-bold text-indigo-900 mb-4">Couverture</h3>
        <div className="h-40 flex items-center justify-center text-gray-400">
          <img src="/world.png" alt="" />
        </div>
      </div>

      <div className="pt-6">
      <h3 className="font-bold text-indigo-900 mb-4">Alertes critiques</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center gap-3 p-4 rounded-lg bg-white"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg ">
              <img src={alert.img} alt="icon" className="w-10 h-10" />
            </div>

            <div>
              <p className="text-sm text-gray-700">{alert.title}</p>
              <p className="font-medium text-gray-800">{alert.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  </div>



  );
}
