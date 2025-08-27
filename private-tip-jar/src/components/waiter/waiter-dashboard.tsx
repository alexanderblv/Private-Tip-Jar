"use client";

import { useTipJar } from "@/components/providers/tip-jar-provider";
import { Table, User, DollarSign, TrendingUp, Clock } from "lucide-react";

export function WaiterDashboard() {
  const { waiters, tables } = useTipJar();

  // Для демонстрации показываем первого официанта
  const currentWaiter = waiters[0];
  const waiterTable = tables.find(table => table.id === currentWaiter?.tableId);

  // Имитация данных о чаевых
  const mockTips = [
    { id: 1, amount: 200, date: "2024-01-15", time: "14:30" },
    { id: 2, amount: 500, date: "2024-01-15", time: "16:45" },
    { id: 3, amount: 100, date: "2024-01-15", time: "18:20" },
  ];

  const totalTips = mockTips.reduce((sum, tip) => sum + tip.amount, 0);
  const todayTips = mockTips.filter(tip => tip.date === "2024-01-15").reduce((sum, tip) => sum + tip.amount, 0);

  if (!currentWaiter) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
        <p className="text-gray-600">Нет зарегистрированных официантов</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Информация об официанте */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentWaiter.firstName} {currentWaiter.lastName}
            </h2>
            <p className="text-gray-600">Официант</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Table className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Столик</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{currentWaiter.tableId}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Сегодня</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{todayTips} ₽</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-800">Всего</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{totalTips} ₽</p>
          </div>
        </div>
      </div>

      {/* История чаевых */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          История чаевых
        </h3>

        {mockTips.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Пока нет чаевых</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockTips.map((tip) => (
              <div
                key={tip.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      +{tip.amount} ₽
                    </p>
                    <p className="text-sm text-gray-500">
                      {tip.date} в {tip.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Анонимный гость</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR код для гостей */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          QR код для гостей
        </h3>
        <div className="text-center">
          <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <p className="text-gray-500 text-sm">QR код</p>
          </div>
          <p className="text-gray-600 text-sm">
            Гости могут отсканировать этот код, чтобы оставить чаевые
          </p>
        </div>
      </div>
    </div>
  );
}