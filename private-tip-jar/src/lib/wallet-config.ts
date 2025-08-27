import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

export const WALLET_CONFIG = {
  appName: 'Private Tip Jar',
  network: (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet,
  autoConnect: false,
} as const

export const NETWORK_CONFIG = {
  [WalletAdapterNetwork.Testnet]: {
    name: 'Testnet',
    rpcUrl: 'https://api.explorer.aleo.org/v1',
  },
  [WalletAdapterNetwork.TestnetBeta]: {
    name: 'Testnet Beta',
    rpcUrl: 'https://api.explorer.aleo.org/v1',
  },
  [WalletAdapterNetwork.MainnetBeta]: {
    name: 'Mainnet Beta',
    rpcUrl: 'https://api.explorer.aleo.org/v1',
  },
} as const

export function getNetworkConfig(network: WalletAdapterNetwork) {
  return NETWORK_CONFIG[network] || NETWORK_CONFIG[WalletAdapterNetwork.Testnet]
}

export function isNetworkSupported(network: string): network is WalletAdapterNetwork {
  return Object.values(WalletAdapterNetwork).includes(network as WalletAdapterNetwork)
}