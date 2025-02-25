# StackShield Insurance Platform

StackShield is a decentralized insurance platform for Bitcoin, providing coverage against various risks through staking pools.

## Overview

StackShield allows users to:
- Stake sBTC (Stacked Bitcoin) in various insurance pools
- Earn APY rewards for providing coverage
- Get protection against different types of risks
- Track staking positions and earnings

## Technical Architecture

### Frontend Stack
- **Next.js 15** - React framework for the application
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling and UI components
- **Lucide Icons** - For consistent iconography

### Core Components

#### Capital Provider Portal (`/app/capital-provider`)
- Main dashboard for staking operations
- Shows pool statistics and staking opportunities
- Manages user's staking positions

#### Insurance Pools
1. **PoolList Component**
   - Displays available insurance pools
   - Shows key metrics: Total Staked, APY, Lock Period, Utilization
   - Risk level indicators
   - Interactive selection for staking

2. **StakingForm Component**
   - Handles staking operations
   - Amount and duration inputs
   - Real-time returns calculator
   - Validation and submission handling

3. **MyStakingsModal Component**
   - Shows user's active and completed stakes
   - Displays earnings and position details
   - Status tracking for each position

4. **PoolStats Component**
   - Platform-wide statistics
   - Total value locked
   - Active stakes count
   - Average APY metrics

### Data Models

```typescript
// Insurance Pool Structure
interface InsurancePool {
  id: number;
  name: string;
  description: string;
  coverageType: string;
  totalStaked: number;
  minStake: number;
  maxStake: number;
  currentAPY: number;
  utilizationRate: number;
  lockupPeriod: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  stakersCount: number;
  totalClaims: number;
  successfulClaims: number;
}

// Staking Position Structure
interface StakingPosition {
  id: number;
  poolId: number;
  poolName: string;
  amount: number;
  apy: number;
  startDate: string;
  endDate: string;
  earned: number;
  status: 'active' | 'locked' | 'completed';
}
```

### Wallet Integration
- Integrated with Stacks wallet for authentication
- Handles wallet connection/disconnection
- Manages user session state
- Secure transaction handling

### UI/UX Features
- Responsive design for all screen sizes
- Interactive feedback with success dialogs
- Confetti animations for successful actions
- Clean, modern interface with consistent styling
- Real-time calculations and updates

### State Management
- React's useState for component-level state
- Context API for wallet state
- Props for component communication
- TypeScript for type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Development Guidelines

- Follow TypeScript strict mode
- Use functional components with hooks
- Maintain consistent error handling
- Follow Tailwind CSS class ordering
- Keep components modular and reusable

## Future Enhancements

- Integration with real blockchain data
- Additional insurance pool types
- Advanced analytics dashboard
- Claims processing system
- Multi-wallet support
- Enhanced risk assessment tools

## Security Considerations

- Wallet connection validation
- Input sanitization and validation
- Secure transaction handling
- Rate limiting on interactions
- Error boundary implementation
