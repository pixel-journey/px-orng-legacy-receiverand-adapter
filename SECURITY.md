# Security — legacy receiverand adapter

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-orng caller | refused |
| Unknown job | refused |
| Bad entropy shape | refused |
| Second **different** entropy | entropy mismatch |
| Second **same** entropy | no-op |
| Open id / assoc / cap | refused |

## Contrast with dual-callback / coinflip

| Lab | Second different entropy |
| --- | --- |
| **Legacy adapter (this)** | entropy **mismatch** |
| [Dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | `already_resolved` (first payout frozen) |
| [Coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) | `random mismatch` |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Auth | Real `require_auth(orng.wax)` |
| Notification wiring | Correct `on_notify` for the legacy action name |
| Dual-path double pay | Shared resolver — [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) |
| Entropy length | Cap blob size (CPU grief) |

## Attack angles

1. Deleting `receiverand` while jobs requested under the old ABI are still open.  
2. Accepting any 32-byte string the user passes and calling it oracle output.  
3. Paying on the adapter and again when `randnotify` is added without a shared writer.  
4. Exposing a user-callable resolve that trusts a `caller` field.  
5. Mixing this mismatch policy with dual-callback's freeze-first policy.

## Honesty limits

No live oracle calls.

| Sibling | Distinction |
| --- | --- |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Job / notify path, max 32 |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Shared once-resolve |

Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).
