'use client';

import { useState } from 'react';
import { Shield, Briefcase, Activity, DollarSign, AlertCircle, Search, Check } from 'lucide-react';

interface CoverageOption {
  id: number;
  title: string;
  description: string;
  coverageAmount: number[];
  riskLevel: 'Low' | 'Medium' | 'Medium-High' | 'High';
  premiumRate: number;
  popularity: number;
  icon: string;
  isStablecoin?: boolean;
}

const coverageOptions: CoverageOption[] = [
  {
    id: 1,
    title: "Exchange Hack Protection",
    description: "Coverage against loss of funds due to exchange security breaches",
    coverageAmount: [1, 5, 10, 25, 50],
    riskLevel: "Medium-High",
    premiumRate: 0.003, // 0.3% monthly
    popularity: 93,
    icon: "🛡️"
  },
  {
    id: 2,
    title: "Smart Contract Failure",
    description: "Protection against losses from smart contract bugs or exploits",
    coverageAmount: [0.5, 1, 2.5, 5, 10],
    riskLevel: "High",
    premiumRate: 0.005, // 0.5% monthly
    popularity: 87,
    icon: "📝"
  },
  {
    id: 3,
    title: "Stablecoin Depeg Coverage",
    description: "Insurance against stablecoin value loss from depegging events",
    coverageAmount: [1000, 5000, 10000, 25000, 50000],
    riskLevel: "Medium",
    premiumRate: 0.002, // 0.2% monthly
    isStablecoin: true,
    popularity: 78,
    icon: "💵"
  },
  {
    id: 4,
    title: "Wallet Recovery Protection",
    description: "Coverage for lost access to your wallet or private keys",
    coverageAmount: [0.5, 1, 2, 5, 10],
    riskLevel: "Low",
    premiumRate: 0.001, // 0.1% monthly
    popularity: 65,
    icon: "🔑"
  }
];

export function Marketplace() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCoverage, setSelectedCoverage] = useState<CoverageOption | null>(null);
  const [coverageAmount, setCoverageAmount] = useState(0);
  const [duration, setDuration] = useState(3);

  const handleSelectCoverage = (coverage: CoverageOption) => {
    setSelectedCoverage(coverage);
    setCoverageAmount(coverage.isStablecoin ? 1000 : coverage.coverageAmount[1]);
  };

  const calculatePremium = () => {
    if (!selectedCoverage) return 0;
    return (selectedCoverage.premiumRate * coverageAmount * duration).toFixed(6);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(e.target.value));
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Medium-High": return "bg-orange-100 text-orange-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'marketplace':
        return (
          <main className="p-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for coverage types..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin"
                />
              </div>
              
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none">
                  <option>All Risks</option>
                  <option>Exchange Risks</option>
                  <option>Smart Contract Risks</option>
                  <option>Wallet Risks</option>
                </select>
                
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none">
                  <option>Sort by Popularity</option>
                  <option>Sort by Premium (Low to High)</option>
                  <option>Sort by Premium (High to Low)</option>
                  <option>Sort by Risk Level</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coverage Cards */}
              <div className="lg:col-span-2 space-y-4">
                {coverageOptions.map(coverage => (
                  <div 
                    key={coverage.id} 
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all cursor-pointer ${selectedCoverage?.id === coverage.id ? 'border-bitcoin' : 'border-transparent hover:border-gray-200'}`}
                    onClick={() => handleSelectCoverage(coverage)}
                  >
                    <div className="p-6 flex items-start">
                      <div className="flex-shrink-0 text-4xl mr-4">
                        {coverage.icon}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{coverage.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(coverage.riskLevel)}`}>
                            {coverage.riskLevel} Risk
                          </span>
                        </div>
                        
                        <p className="text-gray-900 text-sm mb-3">{coverage.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center text-gray-900">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{coverage.isStablecoin ? "USDC" : "sBTC"} Coverage</span>
                          </div>
                          
                          <div className="flex items-center text-gray-900">
                            <Activity className="h-4 w-4 mr-1" />
                            <span>{coverage.popularity}% of users purchase</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Coverage Configurator */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm sticky top-6">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Configure Your Coverage</h3>
                    <p className="text-gray-900 text-sm mt-1">
                      {selectedCoverage ? "Customize your insurance parameters" : "Select a coverage type to configure"}
                    </p>
                  </div>
                  
                  {selectedCoverage ? (
                    <div className="p-6 space-y-6">
                      {/* Coverage Amount */}
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Coverage Amount ({selectedCoverage.isStablecoin ? "USDC" : "sBTC"})
                        </label>
                        
                        <input 
                          type="range" 
                          min={selectedCoverage.isStablecoin ? 1000 : 0.5} 
                          max={selectedCoverage.isStablecoin ? 50000 : 10} 
                          step={selectedCoverage.isStablecoin ? 1000 : 0.5}
                          value={coverageAmount}
                          onChange={(e) => setCoverageAmount(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bitcoin"
                        />
                        
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-gray-900">
                            {selectedCoverage.isStablecoin ? "1,000" : "0.5"}
                          </span>
                          <span className="text-lg font-semibold text-gray-900">
                            {selectedCoverage.isStablecoin ? coverageAmount.toLocaleString() : coverageAmount}
                          </span>
                          <span className="text-sm text-gray-900">
                            {selectedCoverage.isStablecoin ? "50,000" : "10"}
                          </span>
                        </div>
                      </div>
                      
                      {/* Coverage Duration */}
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Coverage Duration
                        </label>
                        
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 3, 6].map((months) => (
                            <label 
                              key={months}
                              className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${duration === months ? 'bg-orange-50 border-bitcoin text-bitcoin' : 'border-gray-400 text-gray-400 hover:bg-gray-50'}`}
                            >
                              <input 
                                type="radio" 
                                name="duration" 
                                value={months} 
                                checked={duration === months}
                                onChange={handleDurationChange}
                                className="sr-only"
                              />
                              <span>{months} {months === 1 ? 'Month' : 'Months'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Coverage Details */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">Monthly Premium:</span>
                          <span className="font-medium text-gray-900">
                            {(selectedCoverage.premiumRate * coverageAmount).toFixed(6)} sBTC
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">Total Premium:</span>
                          <span className="font-medium text-gray-900">
                            {calculatePremium()} sBTC
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">Coverage Period:</span>
                          <span className="font-medium text-gray-900">
                            {duration} {duration === 1 ? 'Month' : 'Months'}
                          </span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between items-center text-lg">
                            <span className="font-medium text-gray-900">Total Cost:</span>
                            <span className="font-bold text-bitcoin">
                              {calculatePremium()} sBTC
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Coverage Features */}
                      <div>
                        <h4 className="font-medium mb-3 text-gray-900">Coverage Includes:</h4>
                        
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-900">24/7 Protection against {selectedCoverage.title.toLowerCase()}</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-900">Automatic claims processing via oracles</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-900">100% payout for verified incidents</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-900">No deductibles or hidden fees</span>
                          </li>
                        </ul>
                      </div>
                      
                      <button className="w-full py-3 bg-bitcoin hover:bg-bitcoin-hover text-white font-medium rounded-lg transition-colors flex items-center justify-center">
                        Purchase Coverage
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">No Coverage Selected</h4>
                      <p className="text-gray-900 text-sm">
                        Select an insurance product from the marketplace to configure your coverage.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        );
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Total Coverage</h3>
                  <DollarSign className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">12.45 sBTC</p>
                <span className="text-green-600 text-sm flex items-center mt-2">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7l-5 5 1.4 1.4L12 9.8l3.6 3.6L17 12l-5-5z" />
                  </svg>
                  +2.5% from last month
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Active Policies</h3>
                  <Shield className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
                <span className="text-gray-600 text-sm mt-2 block">
                  All policies active
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Monthly Premium</h3>
                  <Activity className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">0.0145 sBTC</p>
                <span className="text-gray-600 text-sm mt-2 block">
                  Next payment in 12 days
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Claims History</h3>
                  <AlertCircle className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
                <span className="text-green-600 text-sm mt-2 block">
                  No active claims
                </span>
              </div>
            </div>

            {/* Active Policies */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Active Policies</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Exchange Hack Protection Policy */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🛡️</div>
                        <div>
                          <h3 className="font-medium text-gray-900">Exchange Hack Protection</h3>
                          <p className="text-sm text-gray-600">Coverage: 5.00 sBTC</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Premium: 0.005 sBTC/month</span>
                      <span className="text-gray-600">Expires in 89 days</span>
                    </div>
                  </div>

                  {/* Smart Contract Policy */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📝</div>
                        <div>
                          <h3 className="font-medium text-gray-900">Smart Contract Coverage</h3>
                          <p className="text-sm text-gray-600">Coverage: 2.45 sBTC</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Premium: 0.00735 sBTC/month</span>
                      <span className="text-gray-600">Expires in 152 days</span>
                    </div>
                  </div>

                  {/* Wallet Recovery Policy */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🔑</div>
                        <div>
                          <h3 className="font-medium text-gray-900">Wallet Recovery Protection</h3>
                          <p className="text-sm text-gray-600">Coverage: 5.00 sBTC</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Premium: 0.0025 sBTC/month</span>
                      <span className="text-gray-600">Expires in 243 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Premium Payment Processed</p>
                      <p className="text-sm text-gray-600">0.005 sBTC for Exchange Hack Protection</p>
                    </div>
                    <span className="text-sm text-gray-600">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Policy Renewed</p>
                      <p className="text-sm text-gray-600">Smart Contract Coverage extended for 6 months</p>
                    </div>
                    <span className="text-sm text-gray-600">5 days ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Coverage Increased</p>
                      <p className="text-sm text-gray-600">Wallet Recovery Protection increased to 5.00 sBTC</p>
                    </div>
                    <span className="text-sm text-gray-600">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'claims':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Claims</h2>
            {/* Add claims content */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 text-gray-900 py-8 px-4 hidden md:block">
        <nav className="space-y-2">
          <button 
            className={`flex items-center w-full px-4 py-3 rounded-lg ${
              activeTab === 'dashboard' 
                ? 'bg-white shadow-sm text-bitcoin' 
                : 'hover:bg-white hover:text-bitcoin'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`flex items-center w-full px-4 py-3 rounded-lg ${
              activeTab === 'marketplace' 
                ? 'bg-white shadow-sm text-bitcoin' 
                : 'hover:bg-white hover:text-bitcoin'
            }`}
            onClick={() => setActiveTab('marketplace')}
          >
            <Briefcase className="h-5 w-5 mr-3" />
            <span className="text-left">Coverage Marketplace</span>
          </button>
          
          <button 
            className={`flex items-center w-full px-4 py-3 rounded-lg ${
              activeTab === 'claims' 
                ? 'bg-white shadow-sm text-bitcoin' 
                : 'hover:bg-white hover:text-bitcoin'
            }`}
            onClick={() => setActiveTab('claims')}
          >
            <AlertCircle className="h-5 w-5 mr-3" />
            <span>Claims</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeTab === 'marketplace' ? 'Coverage Marketplace' : 
             activeTab === 'claims' ? 'Claims' : 'Dashboard'}
          </h2>
          <p className="text-gray-900 mt-1">
            {activeTab === 'marketplace' ? 'Protect your Bitcoin assets with our insurance products' : 
             activeTab === 'claims' ? 'Manage your insurance claims' : 'Overview of your coverage'}
          </p>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
} 