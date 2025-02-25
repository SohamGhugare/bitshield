import { useState } from 'react';
import { DashboardStats } from './DashboardStats';
import { PolicyCard } from './PolicyCard';
import { ActivityFeed } from './ActivityFeed';
import { InsuranceConfigurator } from './InsuranceConfigurator';
import { InsuranceSidebar } from './InsuranceSidebar';
import { INSURANCE_POLICIES, MOCK_ACTIVE_POLICIES, MOCK_ACTIVITY_LOGS } from '../../constants/insurance';
import type { InsurancePolicy } from '../../types/insurance';

export function InsurancePortal() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketplace' | 'claims'>('dashboard');
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);

  const handlePurchaseInsurance = (amount: number, duration: number) => {
    // Implementation
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <DashboardStats
              totalCoverage={12.45}
              activePolicies={3}
              monthlyPremium={0.0145}
              claimsCount={0}
            />
            <div className="space-y-4">
              {MOCK_ACTIVE_POLICIES.map(policy => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
            </div>
            <ActivityFeed activities={MOCK_ACTIVITY_LOGS} />
          </div>
        );
      case 'marketplace':
        return (
          <div className="p-6">
            {/* Marketplace implementation */}
          </div>
        );
      // ... other cases
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <InsuranceSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        {/* Header and content */}
        {renderContent()}
      </div>
    </div>
  );
} 