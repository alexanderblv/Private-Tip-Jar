"use client";

import { useState } from "react";
import { useTipJar } from "@/components/providers/tip-jar-provider";
import { TableSelection } from "@/components/guest/table-selection";
import { TipForm } from "@/components/guest/tip-form";
import { Coffee, Heart } from "lucide-react";

export default function HomePage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const { getWaiterByTable } = useTipJar();

  const selectedWaiter = selectedTable ? getWaiterByTable(selectedTable) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Coffee className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Оставьте чаевые вашему официанту
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Выберите столик, за которым вы сидели, и оставьте анонимные чаевые 
          официанту, который вас обслуживал
        </p>
      </div>

      {!selectedTable ? (
        <TableSelection onTableSelect={setSelectedTable} />
      ) : (
        <div className="space-y-8">
          {selectedWaiter ? (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Столик {selectedTable}
                  </h2>
                  <p className="text-gray-600">
                    Ваш официант: {selectedWaiter.firstName} {selectedWaiter.lastName}
                  </p>
                </div>
              </div>
              
              <TipForm 
                tableId={selectedTable} 
                waiterId={selectedWaiter.id}
                onBack={() => setSelectedTable(null)}
              />
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <p className="text-yellow-800 mb-4">
                К сожалению, за столиком {selectedTable} пока нет зарегистрированного официанта.
              </p>
              <button
                onClick={() => setSelectedTable(null)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Выбрать другой столик
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}