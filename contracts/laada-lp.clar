
;; title: laada-lp
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions
;;

;; read only functions
;;

;; private functions
;;

(define-trait sip10-token-trait
  (
    ;; Transfer function in the SIP-10 standard
    (transfer (uint principal principal) (response uint uint))
    ;; Balance-of function in the SIP-10 standard
    (get-balance-of (principal) (response uint uint))
  )
)

;; Data variables
(define-data-var lp-token-id uint u0) 
(define-map user-lp-balances principal uint) 
(define-data-var sip10-token-contract (optional principal) none) 
(define-data-var admin-contract (optional principal) none) 
(define-data-var contract-owner principal tx-sender) 

;; Set the SIP-10 token contract (Only owner can call this)
(define-public (set-sip10-token-contract (contract principal))
  (begin
    ;; Ensure that only the contract owner can set the SIP-10 token contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100))
    (var-set sip10-token-contract (some contract))
    (ok true)
  )
)

;; Set the admin contract (Only owner can call this)
(define-public (set-admin-contract (contract principal))
  (begin
    ;; Ensure that only the contract owner can set the admin contract
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100))
    (var-set admin-contract (some contract))
    (ok true)
  )
)

;; Deposit function: allows user to deposit SIP-10 tokens and get LP tokens
(define-public (deposit (amount uint))
  (let (
        (sender tx-sender) ;; User depositing the token
        (lp-id (var-get lp-token-id)) ;; Get the next LP token ID
        (current-lp-balance (default-to u0 (map-get? user-lp-balances sender)))
    )
    ;; Ensure the SIP-10 contract is set
    (match (var-get sip10-token-contract)
      none (err u101) ;; Error if the SIP-10 token contract isn't set
      some (sip10-contract)
        (let ((current-balance (unwrap-panic (contract-call? sip10-contract get-balance-of sender))))
          ;; Ensure user has enough SIP-10 tokens to deposit
          (if (< amount current-balance)
              (begin
                ;; Transfer SIP-10 tokens from the user to the contract
                (unwrap-panic (contract-call? sip10-contract transfer amount sender (as-contract tx-sender)))

                ;; Mint LP tokens for the user (unlimited supply, just increasing the balance)
                (map-set user-lp-balances sender (+ current-lp-balance amount))

                ;; Increment LP token ID for next user
                (var-set lp-token-id (+ lp-id u1))

                ;; Return success
                (ok lp-id)
              )
              (err u1) ;; Error code for insufficient SIP-10 token balance
          )
        )
    )
  )
)

;; Query LP balance
(define-public (get-lp-balance (user principal))
  (ok (default-to u0 (map-get? user-lp-balances user)))
)

;; Only admin contract can perform withdrawal
(define-public (withdraw (user principal) (amount uint))
  (let (
        (current-admin (var-get admin-contract))
        (current-lp-balance (default-to u0 (map-get? user-lp-balances user)))
    )
    ;; Ensure admin contract is set
    (match current-admin
      none (err u102) ;; Error if the admin contract isn't set
      some (admin)
        ;; Ensure only the admin contract can call this function
        (asserts! (is-eq tx-sender admin) (err u103)) ;; Error code u103 for unauthorized access

        ;; Ensure user has enough LP tokens for withdrawal
        (if (>= current-lp-balance amount)
            (begin
              ;; Reduce user's LP balance
              (map-set user-lp-balances user (- current-lp-balance amount))

              ;; Return success
              (ok true)
            )
            (err u2) ;; Error code u2 for insufficient LP tokens
        )
    )
  )
)

;; Increase SIP-10 token balance by deposit
(define-public (increase-token (user principal) (amount uint))
  (let (
        (current-lp-balance (default-to u0 (map-get? user-lp-balances user)))
    )
    ;; Ensure caller is the user
    (if (is-eq tx-sender user)
        (begin
          ;; Increase user's LP balance
          (map-set user-lp-balances user (+ current-lp-balance amount))
          (ok true)
        )
        (err u3) ;; Error code u3 for unauthorized
    )
  )
)

;; Transfer ownership of the contract
(define-public (transfer-ownership (new-owner principal))
  (begin
    ;; Only the current owner can transfer ownership
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u104))
    (var-set contract-owner new-owner)
    (ok true)
  )
)


