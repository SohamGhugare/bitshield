import type { InsurancePolicy } from '../../types/insurance';

interface InsuranceConfiguratorProps {
  selectedPolicy: InsurancePolicy | null;
  onPurchase: (amount: number, duration: number) => void;
}

export function InsuranceConfigurator({ selectedPolicy, onPurchase }: InsuranceConfiguratorProps) {
  if (!selectedPolicy) return null;
  
  return (
    <div>
      <h3>{selectedPolicy.title}</h3>
      <button onClick={() => onPurchase(1, 3)}>Purchase</button>
    </div>
  );
} 