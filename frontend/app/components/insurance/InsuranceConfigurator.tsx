import type { InsurancePolicy } from '../../types/insurance';

interface InsuranceConfiguratorProps {
  selectedPolicy: InsurancePolicy | null;
  onPurchase: (amount: number, duration: number) => void;
}

export function InsuranceConfigurator({ selectedPolicy, onPurchase }: InsuranceConfiguratorProps) {
  // Configurator implementation
} 