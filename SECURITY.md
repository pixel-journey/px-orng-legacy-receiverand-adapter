# Security

| Surface | Closed by |
| --- | --- |
| Spoofed entropy from any wallet | `caller !== orng.wax` refused |
| Double-pay via second callback | same entropy = no-op; different = mismatch |
| Callback creates jobs | unknown job refused |
| Job table spam | max 32 open jobs; assoc length 1..64; id ≥ 1 |
| Case-only entropy replay | lowercased before compare |

**Still open until a real contract exists:** collection/dapp account wiring, credit payment to `orng.wax`, wasm, and live notify delivery.
