"use client";

import { useState } from "react";
import { useTipJar } from "@/components/providers/tip-jar-provider";
import { User, Table, CheckCircle } from "lucide-react";

interface WaiterRegistrationProps {
  onRegister: () => void;
}

export function WaiterRegistration({ onRegister }: WaiterRegistrationProps) {
  const { addWaiter, getAvailableTables } = useTipJar();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableTables = getAvailableTables();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !selectedTable) {
      return;
    }

    setIsSubmitting(true);

    // Добавляем официанта
    addWaiter({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      tableId: selectedTable,
    });

    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Через 2 секунды переходим к дашборду
    setTimeout(() => {
      onRegister();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Регистрация завершена!
        </h2>
        <p className="text-gray-600">
          Добро пожаловать, {firstName}! Вы зарегистрированы за столиком {selectedTable}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Регистрация официанта
        </h2>
        <p className="text-gray-600">
          Заполните форму и выберите столик для работы
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Введите ваше имя"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Фамилия
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Введите вашу фамилию"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Выберите столик
          </label>
          
          {availableTables.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">
                К сожалению, все столики уже заняты другими официантами.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-3">
              {availableTables.map((table) => (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => setSelectedTable(table.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 text-center
                    ${selectedTable === table.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Table className="w-6 h-6" />
                    <span className="font-semibold">{table.id}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!firstName.trim() || !lastName.trim() || !selectedTable || isSubmitting || availableTables.length === 0}
          className={`
            w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2
            ${firstName.trim() && lastName.trim() && selectedTable && !isSubmitting && availableTables.length > 0
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Регистрация...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Зарегистрироваться</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}