
;; title: laada-coin
;; version:
;; summary:
;; description:

;; traits
;;
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; token definitions
;;

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))

;; No maximum supply!

(define-fungible-token laada-coin u1000000000)

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions
;;

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
              ;; #[filter(amount, recipient)]
        (try! (ft-transfer? laada-coin amount sender recipient))
        (match memo to-print (print to-print) 0x)
        (ok true)
    )
)

;; read only functions
;;
(define-read-only (get-name)
    (ok "laada coin")
)

(define-read-only (get-symbol)
    (ok "LDA")
)

(define-read-only (get-decimals)
    (ok u6)
)

(define-read-only (get-balance (who principal))
    (ok (ft-get-balance laada-coin who))
)
(define-read-only (get-total-supply)
    (ok (ft-get-supply laada-coin))
)

(define-read-only (get-token-uri)
    (ok none)
)

(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
         ;; #[filter(amount, recipient)]
        (ft-mint? laada-coin amount recipient)
    )
)
;; private functions
;;

