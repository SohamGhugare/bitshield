;; Policy Manager Contract
;; Handles insurance policy lifecycle and management

(use-trait ft-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u200))
(define-constant ERR_INVALID_POLICY (err u201))
(define-constant ERR_POLICY_EXPIRED (err u202))
(define-constant ERR_POLICY_INACTIVE (err u203))

;; Policy Status Enum
(define-data-var policy-counter uint u0)

;; Data Maps
(define-map policies
  { policy-id: uint }
  {
    owner: principal,
    coverage-amount: uint,
    premium-amount: uint,
    start-height: uint,
    end-height: uint,
    status: (string-ascii 20),
    policy-type: (string-ascii 50),
    claims-filed: uint
  }
)

(define-map policy-types
  { type-id: (string-ascii 50) }
  {
    name: (string-ascii 50),
    min-coverage: uint,
    max-coverage: uint,
    premium-rate: uint,
    duration-min: uint,
    duration-max: uint
  }
)

;; Public Functions

;; Create New Policy
(define-public (create-policy 
    (coverage-amount uint)
    (duration uint)
    (policy-type (string-ascii 50)))
  (let (
    (policy-id (+ (var-get policy-counter) u1))
    (policy-type-data (unwrap! (map-get? policy-types { type-id: policy-type }) ERR_INVALID_POLICY))
  )
    (asserts! (and 
      (>= coverage-amount (get min-coverage policy-type-data))
      (<= coverage-amount (get max-coverage policy-type-data))
    ) ERR_INVALID_POLICY)
    
    (try! (contract-call? .insurance-pool process-premium 
      policy-id
      (calculate-premium coverage-amount duration (get premium-rate policy-type-data))
    ))
    
    (map-set policies
      { policy-id: policy-id }
      {
        owner: tx-sender,
        coverage-amount: coverage-amount,
        premium-amount: (calculate-premium coverage-amount duration (get premium-rate policy-type-data)),
        start-height: block-height,
        end-height: (+ block-height duration),
        status: "active",
        policy-type: policy-type,
        claims-filed: u0
      }
    )
    
    (var-set policy-counter policy-id)
    (ok policy-id)
  )
)

;; Update Policy Status
(define-public (update-policy-status (policy-id uint) (new-status (string-ascii 20)))
  (let (
    (policy (unwrap! (map-get? policies { policy-id: policy-id }) ERR_INVALID_POLICY))
  )
    (asserts! (is-authorized) ERR_UNAUTHORIZED)
    
    (map-set policies
      { policy-id: policy-id }
      (merge policy { status: new-status })
    )
    (ok true)
  )
)

;; Private Functions

(define-private (calculate-premium (coverage uint) (duration uint) (rate uint))
  (* (* coverage rate) (/ duration u365))
)

(define-private (is-authorized)
  (or 
    (is-eq tx-sender CONTRACT_OWNER)
    (is-eq tx-sender (contract-call? .claims-processor get-admin))
  )
)

;; Read-Only Functions

(define-read-only (get-policy (policy-id uint))
  (map-get? policies { policy-id: policy-id })
)

(define-read-only (get-policy-type (type-id (string-ascii 50)))
  (map-get? policy-types { type-id: type-id })
)

(define-read-only (is-policy-active (policy-id uint))
  (let (
    (policy (unwrap! (map-get? policies { policy-id: policy-id }) false))
  )
    (and 
      (is-eq (get status policy) "active")
      (< block-height (get end-height policy))
    )
  )
) 