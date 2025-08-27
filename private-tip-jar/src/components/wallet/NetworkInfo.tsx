'use client'

import { getNetworkInfo } from '@/lib/aleo'

export function NetworkInfo() {
  const networkInfo = getNetworkInfo()
  
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <h3 className="text-lg font-semibold mb-3">Network Information</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-white/70">Network Name:</span>
          <span className="font-medium">{networkInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">RPC Endpoint:</span>
          <span className="font-mono text-xs">{networkInfo.rpcEndpoint}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Network ID:</span>
          <span className="font-medium">{networkInfo.networkId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Status:</span>
          <span className="text-green-400 font-medium">{networkInfo.status}</span>
        </div>
      </div>
    </div>
  )
}