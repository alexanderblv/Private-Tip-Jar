"use client";

import { useTipJar } from "@/components/providers/tip-jar-provider";
import { Table } from "lucide-react";

interface TableSelectionProps {
  onTableSelect: (tableId: number) => void;
}

export function TableSelection({ onTableSelect }: TableSelectionProps) {
  const { tables, getWaiterByTable } = useTipJar();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Выберите ваш столик
        </h2>
        <p className="text-gray-600">
          Нажмите на столик, за которым вы сидели
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
        {tables.map((table) => {
          const waiter = getWaiterByTable(table.id);
          const hasWaiter = !!waiter;
          
          return (
            <button
              key={table.id}
              onClick={() => onTableSelect(table.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200
                ${hasWaiter 
                  ? 'border-green-300 bg-green-50 hover:border-green-400 hover:bg-green-100' 
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${hasWaiter 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-400 text-white'
                  }
                `}>
                  <Table size={16} />
                </div>
                <span className="font-semibold text-gray-800">
                  {table.id}
                </span>
                {hasWaiter && (
                  <div className="text-xs text-green-600 font-medium">
                    {waiter.firstName}
                  </div>
                )}
              </div>
              
              {!hasWaiter && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Есть официант</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span>Нет официанта</span>
          </div>
        </div>
      </div>
    </div>
  );
}