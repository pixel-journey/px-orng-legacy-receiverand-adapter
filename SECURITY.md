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

## Honesty limits

No live oracle calls. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). Related: [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).
