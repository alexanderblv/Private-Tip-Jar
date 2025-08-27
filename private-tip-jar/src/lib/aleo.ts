import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'

export interface SendTipParams {
  toAddress: string
  amount: string
  memo?: string
}

// Aleo Testnet Beta Configuration
export const ALEO_CONFIG = {
  network: (process.env.NEXT_PUBLIC_ALEO_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Testnet,
  rpcEndpoint: process.env.NEXT_PUBLIC_ALEO_RPC_ENDPOINT || 'https://testnetbeta.aleorpc.com',
  networkId: process.env.NEXT_PUBLIC_ALEO_NETWORK_ID || 'Testnet Beta',
  programId: process.env.NEXT_PUBLIC_TIP_PROGRAM_ID || 'tip_jar.aleo',
  functionName: process.env.NEXT_PUBLIC_TIP_FUNCTION_NAME || 'send_private_tip'
}

export async function sendPrivateTip(params: SendTipParams) {
  // This is a stub. Integrate with the selected wallet's transaction API once contracts are deployed.
  // For CodeSprint demo, we simulate async delay.
  if (!params.toAddress || !params.amount) throw new Error('Missing tip params')
  
  console.log('Sending tip on Aleo Testnet Beta:', {
    ...params,
    network: ALEO_CONFIG.network,
    rpcEndpoint: ALEO_CONFIG.rpcEndpoint,
    programId: ALEO_CONFIG.programId,
    functionName: ALEO_CONFIG.functionName
  })
  
  await new Promise((r) => setTimeout(r, 900))
  return { txId: `simulated_${Date.now()}` }
}

// Helper function to get network info
export function getNetworkInfo() {
  return {
    name: 'Aleo Testnet Beta',
    rpcEndpoint: ALEO_CONFIG.rpcEndpoint,
    networkId: ALEO_CONFIG.networkId,
    status: 'Active and Supported'
  }
}