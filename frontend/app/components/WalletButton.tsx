'use client';

import { useState, useRef, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { AlertCircle } from 'lucide-react';

export const WalletButton = () => {
  const { isConnected, address, connect, disconnect } = useWallet();
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowDisconnectModal(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isConnected && address) {
    return (
      <>
        <button
          onClick={() => setShowDisconnectModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-bitcoin hover:bg-orange-100 transition-all font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          {address.slice(0, 6)}...{address.slice(-4)}
        </button>

        {/* Disconnect Modal */}
        {showDisconnectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div 
              ref={modalRef}
              className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 space-y-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Disconnect Wallet</h3>
                  <p className="text-gray-600 mt-1">
                    Are you sure you want to disconnect your wallet? You will need to reconnect it to use the app.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowDisconnectModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    disconnect();
                    setShowDisconnectModal(false);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </>
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