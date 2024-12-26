
;; title: laada-reward-token
;; version: v1.0.0
;; summary: token for reward
;; description: The token for rewarding user interaction on laada

;; traits
;;
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; token definitions
;;

(define-fungible-token laada-reward-token)

;; constants
;;
(define-constant err-insufficient-balance (err u100))
(define-constant err-zero-amount (err u101))



;; data vars
;;

;; data maps
;;
(define-map balances
  {account: principal}
  {balance: uint}
)

;; public functions
;;

(define-public (mint-lrt (amount uint) (recipient principal))
  (begin
    ;; Ensure the amount is greater than 0
    (asserts! (> amount u0) err-zero-amount)
    ;; Mint the tokens using the SIP-010 standard function
     ;; #[filter(amount, recipient)]
    (try! (ft-mint? laada-reward-token amount recipient))
    ;; Get the current balance of the recipient
    (let ((current-balance (get-balance-helper recipient)))
      ;; Update the recipient's balance in the map
      (map-set balances {account: recipient} {balance: (+ current-balance amount)})
    )
    (ok true)
  )
)

(define-public (burn-lrt (amount uint))
  (begin
    ;; Ensure the amount is greater than 0
    (asserts! (> amount u0) err-zero-amount)
    ;; Get the current balance of the sender
    (let ((current-balance (get-balance-helper tx-sender)))
      ;; Ensure the sender has enough tokens to burn
      (asserts! (>= current-balance amount) err-insufficient-balance)
      ;; Burn the tokens using the SIP-010 standard function
      (try! (ft-burn? laada-reward-token amount tx-sender))
      ;; Update the sender's balance in the map
      (map-set balances {account: tx-sender} {balance: (- current-balance amount)})
    )
    (ok true)
  )
)

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; Ensure the amount is greater than 0
    (asserts! (> amount u0) err-zero-amount)
    ;; Ensure the sender has enough tokens
    (let ((sender-balance (get-balance-helper sender)))
      (asserts! (>= sender-balance amount) err-insufficient-balance)
      ;; Reduce the sender's balance
      (map-set balances {account: sender} {balance: (- sender-balance amount)})
      ;; Increase the recipient's balance
       ;; #[filter(amount, recipient)]
      (let ((recipient-balance (get-balance-helper recipient)))
        (map-set balances {account: recipient} {balance: (+ recipient-balance amount)})
      )
      ;; Optionally handle the memo (this example just prints it)
      (match memo to-print (print to-print) 0x)
    )
    (ok true)
  )
)

;; read only functions
;;
(define-read-only (get-name)
  (ok "Laada Reward Token")
)

(define-read-only (get-symbol)
  (ok "LRT")
)

(define-read-only (get-decimals)
  (ok u6)
)

(define-read-only (get-balance (who principal))
  (ok (get-balance-helper tx-sender))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply laada-reward-token))
)

(define-read-only (get-token-uri)
  (ok none)
)

;; private functions
;;
(define-private (get-balance-helper (who principal))
  (default-to u0 (get balance (map-get? balances {account: who})))
)
