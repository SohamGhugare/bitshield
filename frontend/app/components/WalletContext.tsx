'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Mock wallet connection - replace with actual wallet integration
  const connect = async () => {
    try {
      // Add your wallet connection logic here
      const mockAddress = '0x1234...5678'; // Replace with actual wallet address
      setAddress(mockAddress);
      setIsConnected(true);
      localStorage.setItem('walletConnected', 'true');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletConnected');
  };

  useEffect(() => {
    // Check if wallet was previously connected
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    if (wasConnected) {
      connect();
    }
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 