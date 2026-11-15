# Worked examples — legacy receiverand

`ORNG_ACCOUNT = orng.wax`. Self contract under test: `pxrngdapp`.

## Resolve once

Open job id `1`, assoc `bet-1`. Caller `orng.wax` + entropy `deadbeef` → status resolved, entropy stored.

Caller `alice` → `require orng.wax` before any resolve.

## Idempotent same entropy

Second callback with `aabbccdd` again → no-op, entropy unchanged.

Second callback with **different** entropy → `entropy mismatch`.

## Shape

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

Pair with dual-callback lab for v3 `randnotify` path.
