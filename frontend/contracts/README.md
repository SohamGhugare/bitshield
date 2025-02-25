# Insurance Platform Smart Contracts

This repository contains the Clarity smart contracts that power the decentralized insurance platform.

## Core Contracts

### 1. insurance-pool.clar
- Manages the insurance pool funds
- Handles premium payments and claim payouts
- Implements pool liquidity management
- Tracks total value locked (TVL) and pool statistics

### 2. policy-manager.clar
- Handles policy creation and management
- Stores policy terms and conditions
- Manages policy lifecycle (active, expired, claimed)
- Validates coverage amounts and durations

### 3. claims-processor.clar
- Processes insurance claims
- Validates claim evidence and requirements
- Manages claim status and payouts
- Implements oracle integration for automated claims

### 4. staking-pool.clar
- Manages capital provider staking
- Handles staking rewards distribution
- Implements unstaking cooldown periods
- Tracks staking statistics and APY

## Contract Interactions

1. Policy Purchase Flow:
   - User calls policy-manager::purchase-policy
   - Funds transferred to insurance-pool
   - Policy NFT minted to user's wallet

2. Claim Processing Flow:
   - User submits claim through claims-processor
   - Oracle validates claim evidence
   - Upon approval, insurance-pool releases funds
   - Policy status updated in policy-manager

3. Staking Flow:
   - Provider stakes through staking-pool
   - Rewards calculated based on pool performance
   - Unstaking requires 14-day cooldown
   - Rewards distributed monthly

## Security Features

- Multi-signature requirements for admin functions
- Time-locked upgrades
- Emergency pause functionality
- Oracle-based price feeds
- Automated audit checks

## Deployment

Detailed deployment instructions and contract addresses for each network... 