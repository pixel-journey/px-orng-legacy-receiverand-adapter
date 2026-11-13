# Education — legacy receiverand

> **Rung:** `npm test` passes. No live `orng.wax`.  
> Prefer [v3 randnotify](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) for new contracts; keep this path only for compatibility.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Only `orng.wax` may resolve |
| Intermediate | Once-only resolve; same entropy replay is a no-op |
| Masterclass | Different entropy on second delivery must fail; dual-path merge |

## Beginner

Legacy delivery calls into your contract as `receiverand`. The **first** check is `caller === orng.wax`. Anyone else is refused before job state changes.

## Intermediate

Open jobs with positive id, assoc length 1..64, max 32 open. Resolve stores entropy. Second resolve with **same** entropy is a no-op. Second resolve with **different** entropy throws `entropy mismatch` (detects inconsistent oracle deliveries).

## Masterclass

If your dapp still accepts both `receiverand` and `randnotify`, share one resolver: [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent). Do not pay twice.

## Will not teach

Live oracle RSA, credit economics, or wasm deployment.
