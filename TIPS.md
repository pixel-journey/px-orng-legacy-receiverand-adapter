# Tips — legacy receiverand only

Greenfield contracts should take `randnotify` and still share a resolver with this path if any old oracle delivery can arrive. This file is the **legacy name** in isolation.

## Do

- `require_auth(orng.wax)` before reading entropy. The lab only compares a caller string.
- Identical second delivery: success no-op.
- Different second entropy: hard error. Do not flip the stored payout.
- Cap entropy length. Unbounded blobs are a CPU grief.

## Don't

- Expose a user-callable resolve that trusts a `caller` field.
- Build a second payout function "just for legacy."
- Drop this path on day one if in-flight `receiverand` jobs still exist.

## Common mistakes

1. Deleting `receiverand` while jobs requested under the old ABI are still open.
2. Accepting any 32-byte string the user passes and calling it oracle output.
3. Paying on the adapter and again when you later add `randnotify` without [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).

## Nice-to-have (elsewhere)

Migration window: accept both names for N days, then refuse `receiverand` after a published block. That switch is not in this repo.

Related: [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng)
