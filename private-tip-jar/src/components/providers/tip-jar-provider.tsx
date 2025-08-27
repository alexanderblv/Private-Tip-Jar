"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Waiter {
  id: string;
  firstName: string;
  lastName: string;
  tableId: number;
  walletAddress?: string;
}

export interface Table {
  id: number;
  waiterId?: string;
  isOccupied: boolean;
}

interface TipJarContextType {
  waiters: Waiter[];
  tables: Table[];
  addWaiter: (waiter: Omit<Waiter, "id">) => void;
  updateWaiter: (id: string, updates: Partial<Waiter>) => void;
  getWaiterByTable: (tableId: number) => Waiter | undefined;
  getAvailableTables: () => Table[];
}

const TipJarContext = createContext<TipJarContextType | undefined>(undefined);

export function TipJarProvider({ children }: { children: ReactNode }) {
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  // Инициализация 10 столиков
  useEffect(() => {
    const initialTables: Table[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      isOccupied: false,
    }));
    setTables(initialTables);
  }, []);

  const addWaiter = (waiter: Omit<Waiter, "id">) => {
    const newWaiter: Waiter = {
      ...waiter,
      id: Date.now().toString(),
    };
    setWaiters(prev => [...prev, newWaiter]);
    
    // Обновляем столик
    setTables(prev => 
      prev.map(table => 
        table.id === waiter.tableId 
          ? { ...table, waiterId: newWaiter.id, isOccupied: true }
          : table
      )
    );
  };

  const updateWaiter = (id: string, updates: Partial<Waiter>) => {
    setWaiters(prev => 
      prev.map(waiter => 
        waiter.id === id ? { ...waiter, ...updates } : waiter
      )
    );
  };

  const getWaiterByTable = (tableId: number) => {
    return waiters.find(waiter => waiter.tableId === tableId);
  };

  const getAvailableTables = () => {
    return tables.filter(table => !table.isOccupied);
  };

  return (
    <TipJarContext.Provider
      value={{
        waiters,
        tables,
        addWaiter,
        updateWaiter,
        getWaiterByTable,
        getAvailableTables,
      }}
    >
      {children}
    </TipJarContext.Provider>
  );
}

export function useTipJar() {
  const context = useContext(TipJarContext);
  if (context === undefined) {
    throw new Error("useTipJar must be used within a TipJarProvider");
  }
  return context;
}