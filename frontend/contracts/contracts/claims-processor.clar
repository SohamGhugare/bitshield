;; Claims Processor Contract
;; Handles insurance claim processing and validation

(use-trait ft-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u300))
(define-constant ERR_INVALID_CLAIM (err u301))
(define-constant ERR_CLAIM_EXISTS (err u302))
(define-constant ERR_INVALID_STATUS (err u303))

;; Data Variables
(define-data-var claim-counter uint u0)
(define-data-var oracle-address principal CONTRACT_OWNER)

;; Claim Status Types: "pending", "reviewing", "approved", "rejected", "paid"

;; Maps
(define-map claims
  { claim-id: uint }
  {
    policy-id: uint,
    claimant: principal,
    amount: uint,
    evidence-hash: (buff 32),
    incident-block: uint,
    status: (string-ascii 20),
    verdict: (optional (string-ascii 500)),
    processed-at: (optional uint)
  }
)

(define-map claim-evidence
  { claim-id: uint }
  {
    evidence-urls: (list 10 (string-utf8 256)),
    description: (string-utf8 1000),
    additional-notes: (optional (string-utf8 1000))
  }
)

;; Public Functions

;; Submit New Claim
(define-public (submit-claim 
    (policy-id uint)
    (amount uint)
    (evidence-hash (buff 32))
    (evidence-urls (list 10 (string-utf8 256)))
    (description (string-utf8 1000)))
  (let (
    (claim-id (+ (var-get claim-counter) u1))
    (policy (unwrap! (contract-call? .policy-manager get-policy policy-id) ERR_INVALID_CLAIM))
  )
    ;; Verify policy is active
    (asserts! (contract-call? .policy-manager is-policy-active policy-id) ERR_INVALID_CLAIM)
    ;; Verify claimant owns policy
    (asserts! (is-eq tx-sender (get owner policy)) ERR_UNAUTHORIZED)
    
    (map-set claims
      { claim-id: claim-id }
      {
        policy-id: policy-id,
        claimant: tx-sender,
        amount: amount,
        evidence-hash: evidence-hash,
        incident-block: block-height,
        status: "pending",
        verdict: none,
        processed-at: none
      }
    )
    
    (map-set claim-evidence
      { claim-id: claim-id }
      {
        evidence-urls: evidence-urls,
        description: description,
        additional-notes: none
      }
    )
    
    (var-set claim-counter claim-id)
    (ok claim-id)
  )
)

;; Process Claim (Oracle Only)
(define-public (process-claim 
    (claim-id uint)
    (approved bool)
    (verdict (string-ascii 500)))
  (let (
    (claim (unwrap! (map-get? claims { claim-id: claim-id }) ERR_INVALID_CLAIM))
  )
    (asserts! (is-eq tx-sender (var-get oracle-address)) ERR_UNAUTHORIZED)
    (asserts! (is-eq (get status claim) "pending") ERR_INVALID_STATUS)
    
    (if approved
      (begin
        (try! (update-claim-status claim-id "approved" (some verdict)))
        (try! (contract-call? .insurance-pool process-claim-payout 
          claim-id
          (get amount claim)
          (get claimant claim)
        ))
        (ok true)
      )
      (begin
        (try! (update-claim-status claim-id "rejected" (some verdict)))
        (ok true)
      )
    )
  )
)

;; Private Functions

(define-private (update-claim-status (claim-id uint) (new-status (string-ascii 20)) (verdict (optional (string-ascii 500))))
  (let (
    (claim (unwrap! (map-get? claims { claim-id: claim-id }) ERR_INVALID_CLAIM))
  )
    (map-set claims
      { claim-id: claim-id }
      (merge claim {
        status: new-status,
        verdict: verdict,
        processed-at: (some block-height)
      })
    )
    (ok true)
  )
)

;; Read-Only Functions

(define-read-only (get-claim (claim-id uint))
  (map-get? claims { claim-id: claim-id })
)

(define-read-only (get-claim-evidence (claim-id uint))
  (map-get? claim-evidence { claim-id: claim-id })
)

(define-read-only (get-oracle)
  (var-get oracle-address)
) 