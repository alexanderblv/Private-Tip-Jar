"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, UserCheck } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const isGuestActive = pathname === "/" || pathname.startsWith("/guest");
  const isWaiterActive = pathname.startsWith("/waiter");

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TJ</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Tip Jar</span>
          </Link>

          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                isGuestActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Users size={18} />
              <span className="font-medium">Гости</span>
            </Link>
            <Link
              href="/waiter"
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                isWaiterActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <UserCheck size={18} />
              <span className="font-medium">Официанты</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}