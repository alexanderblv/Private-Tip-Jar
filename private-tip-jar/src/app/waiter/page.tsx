"use client";

import { useState } from "react";
import { useTipJar } from "@/components/providers/tip-jar-provider";
import { WaiterRegistration } from "@/components/waiter/waiter-registration";
import { WaiterDashboard } from "@/components/waiter/waiter-dashboard";
import { UserCheck, Coffee } from "lucide-react";

export default function WaiterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const { waiters } = useTipJar();

  // Проверяем, есть ли уже зарегистрированные официанты
  const hasRegisteredWaiters = waiters.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Панель официанта
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Зарегистрируйтесь, чтобы получать чаевые от гостей
        </p>
      </div>

      {!isRegistered && !hasRegisteredWaiters ? (
        <WaiterRegistration onRegister={() => setIsRegistered(true)} />
      ) : (
        <WaiterDashboard />
      )}
    </div>
  );
}