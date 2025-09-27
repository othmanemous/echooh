"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  Search, 
} from "lucide-react";
import Link from "next/link";

const menu = [
  { name: "Dashboard", icon: "./Dashboard.png", href: "/dashboard" },
  { name: "Campagnes", icon: "./Campagnes.png", href: "/Campagnes" },
  { name: "Chauffeurs", icon: "./Chauffeurs.png", href: "/Chauffeurs" },
  { name: "Véhicules", icon: "./Véhicules.png", href: "/Vehicules" },
  { name: "Tarification", icon: "./Tarification.png", href: "/Tarification" },
  { name: "Paiements & Finances", icon: "./Paiements.png", href: "/Paiements" },
  { name: "Litiges & Réclamations", icon: "./Litiges.png", href: "/Litiges" },
  { name: "Notifications & Comms", icon: "./Notifications.png", href: "/Notifications" },
];

export default function Layout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
      const pathname = usePathname();
  const notifications = [
    { id: 1, message: "Nouveau véhicule ajouté", time: "il y a 2 min" },
    { id: 2, message: "Rapport hebdomadaire disponible", time: "il y a 1h" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <>
        <button
          onClick={() => setOpenSidebar(true)}
          className="lg:hidden p-3 fixed top-4 left-4 z-50 bg-white rounded-lg shadow"
        >
          <Menu size={24} />
        </button>

        {openSidebar && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4 flex flex-col justify-between z-50
            transform transition-transform duration-300
            ${openSidebar ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0`}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-bold">LOGO</span>
              <button
                onClick={() => setOpenSidebar(false)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

                  <nav className="space-y-2">
            {menu.map((item, i) => {
              const isActive = pathname === item.href; 
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive ? "bg-[#2E2E48] text-white" : "hover:bg-[#2E2E48] hover:text-white"}
                  `}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 object-contain"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link href="/login" className="text-red-500 text-sm text-center">Logout</Link>
      </aside>

      </>

      <main className="flex-1 lg:ml-64">
        <header className="flex items-center p-4 mb-6 rounded-lg ">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search (Ctrl + /)"
              className="w-full border rounded-lg pl-10 pr-4 py-2 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 ml-4">
            <span className="inline-block w-5 h-5">
              <img
                src="/flag_of_france.svg"
                alt="Drapeau France"
                className="w-full h-full object-cover rounded-full"
              />
            </span>

            {/* Notifications */}
            <div className="relative">
              <div
                onClick={() => setOpenNotif(!openNotif)}
                className="relative cursor-pointer"
              >
                <Bell className="text-gray-600 w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>

              {openNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
                  <h4 className="font-semibold text-gray-700 mb-2">Notifications</h4>
                  {notifications.length > 0 ? (
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex flex-col"
                        >
                          <span>{notif.message}</span>
                          <span className="text-xs text-gray-500">{notif.time}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune notification</p>
                  )}
                  <div className="mt-3 text-center">
                    <button className="text-sm text-blue-600 hover:underline">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow"
            />
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

