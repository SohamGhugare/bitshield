;; Insurance Pool Contract
;; Manages the core insurance pool functionality including funds, premiums, and payouts

(use-trait ft-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_INSUFFICIENT_FUNDS (err u101))
(define-constant ERR_INVALID_AMOUNT (err u102))
(define-constant MINIMUM_LIQUIDITY u1000000) ;; Minimum pool liquidity in µSTX

;; Data Variables
(define-data-var total-liquidity uint u0)
(define-data-var total-premiums uint u0)
(define-data-var total-claims uint u0)
(define-data-var paused bool false)

;; Maps
(define-map pool-stats
  { pool-id: uint }
  {
    tvl: uint,
    premium-rate: uint,
    total-policies: uint,
    active-claims: uint,
    capital-efficiency: uint
  }
)

(define-map liquidity-providers
  { address: principal }
  { amount: uint, rewards: uint, last-deposit: uint }
)

;; Public Functions

;; Add Liquidity
(define-public (add-liquidity (amount uint))
  (begin
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    (map-set liquidity-providers
      { address: tx-sender }
      {
        amount: (+ (default-to u0 (get amount (map-get? liquidity-providers { address: tx-sender }))) amount),
        rewards: u0,
        last-deposit: block-height
      }
    )
    
    (var-set total-liquidity (+ (var-get total-liquidity) amount))
    (ok true)
  )
)

;; Process Premium Payment
(define-public (process-premium (policy-id uint) (amount uint))
  (begin
    (asserts! (not (var-get paused)) ERR_UNAUTHORIZED)
    (asserts! (> amount u0) ERR_INVALID_AMOUNT)
    
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (var-set total-premiums (+ (var-get total-premiums) amount))
    
    ;; Update pool statistics
    (update-pool-stats policy-id amount)
    (ok true)
  )
)

;; Process Claim Payout
(define-public (process-claim-payout (claim-id uint) (amount uint) (recipient principal))
  (begin
    (asserts! (not (var-get paused)) ERR_UNAUTHORIZED)
    (asserts! (is-authorized) ERR_UNAUTHORIZED)
    (asserts! (<= amount (var-get total-liquidity)) ERR_INSUFFICIENT_FUNDS)
    
    (try! (as-contract (stx-transfer? amount (as-contract tx-sender) recipient)))
    (var-set total-claims (+ (var-get total-claims) amount))
    (var-set total-liquidity (- (var-get total-liquidity) amount))
    
    (ok true)
  )
)

;; Private Functions

(define-private (is-authorized)
  (or 
    (is-eq tx-sender CONTRACT_OWNER)
    (is-eq tx-sender (contract-call? .policy-manager get-admin))
  )
)

(define-private (update-pool-stats (pool-id uint) (premium-amount uint))
  (let (
    (current-stats (unwrap-panic (map-get? pool-stats { pool-id: pool-id })))
  )
    (map-set pool-stats
      { pool-id: pool-id }
      (merge current-stats {
        tvl: (+ (get tvl current-stats) premium-amount),
        total-policies: (+ (get total-policies current-stats) u1)
      })
    )
  )
)

;; Read-Only Functions

(define-read-only (get-pool-stats (pool-id uint))
  (map-get? pool-stats { pool-id: pool-id })
)

(define-read-only (get-provider-info (address principal))
  (map-get? liquidity-providers { address: address })
)

(define-read-only (get-total-liquidity)
  (var-get total-liquidity)
) 