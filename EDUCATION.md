# Education — legacy `receiverand` adapter

> **Rung:** `npm test` passes. Models the **pre-v3** delivery path. Does not call `orng.wax`.  
> **The test is the rule.**

Modern dapps prefer `randnotify` ([v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter)). Legacy contracts and samples still show `receiverand`. The critical shared rule is the same: **caller must be `orng.wax`**, and resolve is **once**.

For both paths sharing one resolver: [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).

Official: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Non-orng callers never resolve |
| Intermediate | Same entropy twice is a no-op; different entropy is mismatch |
| Masterclass | Prefer v3 for new code; keep legacy only for compatibility |

---

## Beginner

Open job id `1`, assoc `bet-1`. Caller `orng.wax` + entropy `deadbeef` → resolved, entropy stored. Caller `alice` → refused before resolve.

## Intermediate

Second callback with the **same** entropy → no-op (idempotent). Second with **different** entropy → `entropy mismatch` (do not overwrite).

Entropy is lowercased; odd length / non-hex / length > 64 refused. Open id 0, duplicate open, bad assoc length, open-job cap (33rd) refused.

## Masterclass

New contracts should implement **one** internal resolver and, if both notification names must be supported, route both into it ([dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent)). Do not maintain two divergent payout bodies.

`require_auth(orng.wax)` on chain; string compare in tests is teaching only.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
