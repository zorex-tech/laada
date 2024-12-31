
;; title: reward-vault
;; version: v1.0.0
;; summary: Used to lock rewards for created campaign
;; description: Projects call in this contract to lock in intended rewards for campaign

;; lock rewards from project
;; specify the tx-sender as the benficiary
;; allow benficiary to approve-beneficiary
;; claim the vault value to the beneficiary
;; adjust claim block height

;; DATA STRUCTURES
;; var owner
;; var baneficiary
;; var unlock block height
;; 
;; ERROR CODES
;; NOT-A-VALID-BENEFICIARY
;; UNLOCK-BLOCK-HEIGHT-NOT-YET-REACHED
;; UNLOCK-BLOCK-HEIGHT-MUST-BE-IN-FUTURE
;; NOT-ALLOWED-TO-MAKE-THIS-CALL
;; YOU-MUST-PROVIDE-A-VALUE-TO-LOCK

;; traits
;;

;; token definitions
;;

;; constants
;;

(define-constant NOT-A-VALID-BENEFICIARY (err u100))   
(define-constant UNLOCK-BLOCK-HEIGHT-NOT-YET-REACHED (err u102))    
(define-constant UNLOCK-BLOCK-HEIGHT-MUST-BE-IN-FUTURE (err u103))   
(define-constant NOT-ALLOWED-TO-MAKE-THIS-CALL (err u104))    
(define-constant YOU-MUST-PROVIDE-A-VALUE-TO-LOCK (err u105))


;; data vars
;;
(define-constant owner tx-sender)
(define-data-var unlock-height uint u0)
(define-data-var beneficiary ( optional principal) none)

;; data maps
;;


;; public functions
;;
;; lock the rewards
(define-public (lock-rewards ( lock-benficiary principal) ( unlock-at uint) ( amount uint)) 
    (begin
        (asserts! (> unlock-at block-height) UNLOCK-BLOCK-HEIGHT-MUST-BE-IN-FUTURE)
        (asserts! (> amount u0) YOU-MUST-PROVIDE-A-VALUE-TO-LOCK)
        (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
        (var-set unlock-height unlock-at)
         ;; #[filter(lock-benficiary)]
        (var-set beneficiary ( some lock-benficiary))
        (ok true)
    )
)

(define-public (approve-beneficiary (new-benficiary principal)) 
 
    (begin
          
         (asserts! (is-eq (some tx-sender) (var-get beneficiary)) NOT-ALLOWED-TO-MAKE-THIS-CALL)
         ;; #[filter(new-benficiary)]
         (var-set beneficiary (some new-benficiary))
           (ok true)
    )

)

(define-public (claim ) 
    (begin 
        (asserts! (is-eq (some tx-sender) (var-get beneficiary)) NOT-A-VALID-BENEFICIARY)
        (asserts! (> block-height (var-get unlock-height)) UNLOCK-BLOCK-HEIGHT-NOT-YET-REACHED)
        (try! (stx-transfer? (as-contract (stx-get-balance tx-sender)) (as-contract tx-sender) tx-sender))
        (ok true)
    )
    
)

(define-public (change-unlock-height (new-unlock-height uint)) 
    (begin 
        (asserts! (> new-unlock-height (var-get unlock-height)) UNLOCK-BLOCK-HEIGHT-MUST-BE-IN-FUTURE)
        (asserts! (is-eq tx-sender owner) NOT-ALLOWED-TO-MAKE-THIS-CALL)
        (var-set unlock-height new-unlock-height)
        (ok true)
     )
)

;; read only functions
;;
;; get beneficiary

;; private functions
;;

