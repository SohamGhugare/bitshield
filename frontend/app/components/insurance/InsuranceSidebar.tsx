import { Activity, Briefcase, AlertCircle } from 'lucide-react';

interface InsuranceSidebarProps {
  activeTab: 'dashboard' | 'marketplace' | 'claims';
  onTabChange: (tab: 'dashboard' | 'marketplace' | 'claims') => void;
}

export function InsuranceSidebar({ activeTab, onTabChange }: InsuranceSidebarProps) {
  return (
    <div className="w-64 bg-gray-100 text-gray-900 py-8 px-4 hidden md:block">
      <nav className="space-y-2">
        {/* Sidebar content from the original Marketplace component */}
      </nav>
    </div>
  );
} 