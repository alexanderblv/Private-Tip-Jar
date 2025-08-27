"use client";

import { useState } from "react";
import { Wallet, ArrowLeft, Send, CheckCircle } from "lucide-react";

interface TipFormProps {
  tableId: number;
  waiterId: string;
  onBack: () => void;
}

const tipAmounts = [50, 100, 200, 500, 1000];

export function TipForm({ tableId, waiterId, onBack }: TipFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleConnectWallet = () => {
    // Здесь будет логика подключения кошелька
    setIsWalletConnected(true);
  };

  const handleSendTip = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    
    // Имитация отправки чаевых
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const getFinalAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Чаевые отправлены!
        </h3>
        <p className="text-gray-600 mb-6">
          Спасибо за вашу щедрость. Официант получит {getFinalAmount()} рублей.
        </p>
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Вернуться к выбору столика
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Назад к выбору столика</span>
      </button>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Выберите сумму чаевых
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {tipAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${selectedAmount === amount
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <div className="font-semibold">{amount} ₽</div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Или введите свою сумму
          </label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            placeholder="Введите сумму в рублях"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {!isWalletConnected ? (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              Для отправки чаевых необходимо подключить кошелек
            </p>
          </div>
          <button
            onClick={handleConnectWallet}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Wallet size={20} />
            <span>Подключить кошелек</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm flex items-center space-x-2">
              <CheckCircle size={16} />
              <span>Кошелек подключен</span>
            </p>
          </div>
          
          {getFinalAmount() > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Сумма чаевых:</span>
                <span className="font-semibold text-lg">{getFinalAmount()} ₽</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSendTip}
            disabled={getFinalAmount() <= 0 || isProcessing}
            className={`
              w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2
              ${getFinalAmount() > 0 && !isProcessing
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Отправка...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Отправить чаевые</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}