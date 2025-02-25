;; Staking Pool Contract
;; Manages staking operations and rewards distribution

(use-trait ft-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u400))
(define-constant ERR_INSUFFICIENT_BALANCE (err u401))
(define-constant ERR_COOLDOWN_ACTIVE (err u402))
(define-constant ERR_NO_STAKE (err u403))
(define-constant COOLDOWN_PERIOD u2016) ;; ~14 days in blocks
(define-constant REWARD_CYCLE_LENGTH u144) ;; ~1 day in blocks
(define-constant MIN_STAKE_AMOUNT u100000000) ;; Minimum stake in µSTX

;; Data Variables
(define-data-var total-staked uint u0)
(define-data-var reward-rate uint u500) ;; 5% annual rate (basis points)
(define-data-var last-reward-block uint u0)

;; Maps
(define-map staker-info
  { staker: principal }
  {
    amount: uint,
    rewards: uint,
    last-claim: uint,
    cooldown-start: (optional uint)
  }
)

(define-map pool-metrics
  { cycle: uint }
  {
    total-staked: uint,
    rewards-distributed: uint,
    unique-stakers: uint,
    apy: uint
  }
)

;; Public Functions

;; Stake Tokens
(define-public (stake (amount uint))
  (begin
    (asserts! (>= amount MIN_STAKE_AMOUNT) ERR_INSUFFICIENT_BALANCE)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    (let (
      (current-stake (default-to 
        { amount: u0, rewards: u0, last-claim: block-height, cooldown-start: none }
        (map-get? staker-info { staker: tx-sender })
      ))
    )
      (map-set staker-info
        { staker: tx-sender }
        {
          amount: (+ (get amount current-stake) amount),
          rewards: (get rewards current-stake),
          last-claim: block-height,
          cooldown-start: none
        }
      )
    )
    
    (var-set total-staked (+ (var-get total-staked) amount))
    (ok true)
  )
)

;; Start Unstake Cooldown
(define-public (start-unstake)
  (let (
    (staker-data (unwrap! (map-get? staker-info { staker: tx-sender }) ERR_NO_STAKE))
  )
    (asserts! (> (get amount staker-data) u0) ERR_NO_STAKE)
    (asserts! (is-none (get cooldown-start staker-data)) ERR_COOLDOWN_ACTIVE)
    
    (try! (claim-rewards))
    
    (map-set staker-info
      { staker: tx-sender }
      (merge staker-data {
        cooldown-start: (some block-height)
      })
    )
    (ok true)
  )
)

;; Complete Unstake After Cooldown
(define-public (complete-unstake)
  (let (
    (staker-data (unwrap! (map-get? staker-info { staker: tx-sender }) ERR_NO_STAKE))
    (cooldown-start (unwrap! (get cooldown-start staker-data) ERR_UNAUTHORIZED))
  )
    (asserts! (>= (- block-height cooldown-start) COOLDOWN_PERIOD) ERR_COOLDOWN_ACTIVE)
    
    (try! (as-contract (stx-transfer? (get amount staker-data) (as-contract tx-sender) tx-sender)))
    
    (map-set staker-info
      { staker: tx-sender }
      {
        amount: u0,
        rewards: u0,
        last-claim: block-height,
        cooldown-start: none
      }
    )
    
    (var-set total-staked (- (var-get total-staked) (get amount staker-data)))
    (ok true)
  )
)

;; Claim Staking Rewards
(define-public (claim-rewards)
  (let (
    (staker-data (unwrap! (map-get? staker-info { staker: tx-sender }) ERR_NO_STAKE))
    (rewards-earned (calculate-rewards tx-sender))
  )
    (asserts! (> rewards-earned u0) ERR_INSUFFICIENT_BALANCE)
    
    (try! (as-contract (stx-transfer? rewards-earned (as-contract tx-sender) tx-sender)))
    
    (map-set staker-info
      { staker: tx-sender }
      (merge staker-data {
        rewards: u0,
        last-claim: block-height
      })
    )
    
    (ok rewards-earned)
  )
)

;; Private Functions

(define-private (calculate-rewards (staker principal))
  (let (
    (staker-data (unwrap! (map-get? staker-info { staker: staker }) u0))
    (blocks-elapsed (- block-height (get last-claim staker-data)))
    (stake-amount (get amount staker-data))
  )
    (/ (* (* stake-amount blocks-elapsed) (var-get reward-rate)) u10000)
  )
)

;; Read-Only Functions

(define-read-only (get-staker-info (staker principal))
  (map-get? staker-info { staker: staker })
)

(define-read-only (get-pool-metrics (cycle uint))
  (map-get? pool-metrics { cycle: cycle })
)

(define-read-only (get-current-apy)
  (let (
    (blocks-per-year u52560)
    (reward-per-block (/ (* MIN_STAKE_AMOUNT (var-get reward-rate)) u10000))
  )
    (* (/ (* reward-per-block blocks-per-year) MIN_STAKE_AMOUNT) u100)
  )
) 