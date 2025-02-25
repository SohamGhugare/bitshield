'use client';

import { useWallet } from './WalletContext';

export const WalletButton = () => {
  const { isConnected, address, connect, disconnect } = useWallet();

  if (isConnected && address) {
    return (
      <button
        onClick={disconnect}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-bitcoin hover:bg-orange-100 transition-all font-bold"
      >
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 rounded-xl bg-orange-50 text-bitcoin hover:bg-orange-100 transition-all font-bold"
    >
      Connect Wallet
    </button>
  );
}; 