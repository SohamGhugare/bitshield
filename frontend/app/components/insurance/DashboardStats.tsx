import { DollarSign, Shield, Activity, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  totalCoverage: number;
  activePolicies: number;
  monthlyPremium: number;
  claimsCount: number;
}

export function DashboardStats({ totalCoverage, activePolicies, monthlyPremium, claimsCount }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Stats cards implementation */}
      <div>Stats</div>
    </div>
  );
} 