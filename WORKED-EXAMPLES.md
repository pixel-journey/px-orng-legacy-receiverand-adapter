# Worked examples — legacy receiverand

`ORNG_ACCOUNT = orng.wax`. Self contract under test: `pxrngdapp`.

Greenfield code prefers `randnotify`. Keep this path only while old deliveries can still arrive. Both names must share **one** resolver ([dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent)).

## Resolve once

Open job id `1`, assoc `bet-1`. Caller `orng.wax` + entropy `deadbeef` → status resolved, entropy stored.

Caller `alice` → `require orng.wax` before any resolve.

## Idempotent same entropy

Second callback with the **same** entropy again → no-op, entropy unchanged, no second pay.

## Different second entropy

Second callback with **different** entropy → `entropy mismatch`. Stored entropy and payout must not flip.

| Lab | Second different entropy |
| --- | --- |
| **This lab** | `entropy mismatch` |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | `already_resolved`; first payout frozen |
| [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) | `random mismatch` |

## Shape refusals

| Case | Error |
| --- | --- |
| job id `99` | unknown job |
| entropy `DEADBEEF` | accepted as `deadbeef` |
| odd length / non-hex | bad entropy |
| length > 64 hex | bad entropy |
| length 64 (`ab`×32) | accepted |
| open id `0` | non-positive id |
| second open id `1` | duplicate id |
| empty / 65-char assoc | bad assoc length |
| 33rd open job | open job cap |

`unsignedReceiverandBody` is **unsent**; still requires orng.wax as caller in the body builder.

No live oracle call. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) on WAX mainnet.
