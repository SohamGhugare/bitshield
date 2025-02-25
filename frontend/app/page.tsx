'use client';

import { useRouter } from 'next/navigation';
import { FeatureCard } from './components/FeatureCard';
import { UserTypeCard } from './components/UserTypeCard';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Decentralized Insurance on <span className="text-bitcoin">sBTC</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Secure your digital assets with our innovative insurance protocol. 
            Provide liquidity or get coverage - all powered by Bitcoin&apos;s security.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          <UserTypeCard
            title="Insurance Buyer"
            description="Protect your assets with customizable coverage options and instant quotes."
            buttonText="Get Coverage"
            onClick={() => router.push('/insurance-buyer')}
          />
          <UserTypeCard
            title="Capital Provider"
            description="Earn yields by providing liquidity to insurance pools with flexible staking options."
            buttonText="Provide Capital"
            onClick={() => router.push('/capital-provider')}
          />
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Secure Coverage"
            description="Protected by Bitcoin&apos;s security and smart contracts"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect width="18" height="20" x="3" y="2" rx="2" strokeWidth="2"/>
                <path strokeWidth="2" d="M12 11V14M8 11V14M16 11V14"/>
              </svg>
            }
          />
          <FeatureCard
            title="Competitive Yields"
            description="Earn attractive returns on your staked capital"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" d="M4 20L8 16L12 20L20 12M20 12V16M20 12H16"/>
              </svg>
            }
          />
          <FeatureCard
            title="Instant Claims"
            description="Automated verification and quick settlements"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" d="M4 6h16M4 10h16M4 14h8"/>
                <path strokeWidth="2" d="M14 18l3-3 3 3m-3-3v8"/>
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
