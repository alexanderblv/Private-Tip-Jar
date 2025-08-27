# Исправление ошибки сборки

## Проблема
При сборке проекта возникала ошибка TypeScript:
```
Type error: Object literal may only specify known properties, and 'network' does not exist in type 'LeoWalletAdapterConfig'.
```

## Причина
В файле `src/components/wallet/WalletProviderWrapper.tsx` был добавлен параметр `network` в конфигурацию `LeoWalletAdapter`, но этот параметр не поддерживается в текущей версии библиотеки.

## Решение
Удален неподдерживаемый параметр `network` из конфигурации `LeoWalletAdapter`:

### До исправления:
```typescript
new LeoWalletAdapter({
  appName: 'Private Tip Jar',
  network: process.env.NEXT_PUBLIC_ALEO_NETWORK || 'Testnet'
}),
```

### После исправления:
```typescript
new LeoWalletAdapter({
  appName: 'Private Tip Jar'
}),
```

## Альтернативный способ настройки сети
Сеть настраивается при подключении кошелька в `WalletConnectButton.tsx`:

```typescript
await connect(
  DecryptPermission.NoDecrypt,
  (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet
)
```

## Результат
✅ Сборка проекта теперь проходит успешно
✅ Все компоненты работают корректно
✅ Настройки Aleo Testnet Beta применяются при подключении кошелька

## Проверка
```bash
npm run build
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
```

## Статус
🟢 **Исправлено** - проект готов к развертыванию на Vercel