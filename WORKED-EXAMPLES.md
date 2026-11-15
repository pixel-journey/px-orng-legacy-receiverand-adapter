# Worked examples — legacy receiverand

`ORNG_ACCOUNT` is `orng.wax`. Self dapp is `pxrngdapp`.

## Happy path

Open job id `1`, assoc `bet-1`. Caller `orng.wax` with entropy `deadbeef` → status `resolved`, entropy stored lowercased.

## Caller gate

Caller `alice` throws `require orng.wax` **before** any resolve.

## Idempotent same bytes

Second callback with the same entropy is a no-op (entropy stays `aabbccdd`). Different second entropy → `entropy mismatch`.

## Shape

| Case | Error |
| --- | --- |
| job `99` | unknown job |
| entropy `abc` or `zzzzzzzz` | bad entropy |
| entropy longer than `MAX_ENTROPY_HEX` (64) | bad entropy |
| 64-char hex | accepted |
| open id `0` | non-positive id |
| second open id `1` | duplicate id |
| empty assoc or 65 chars | bad assoc length |
| 33rd open job | open job cap |

## unsigned body

`unsignedReceiverandBody` has `sent: false`, name `receiverand`, entropy lowercased. Non-orng caller refused on the body builder too.

Prefer v3 `randnotify` for new contracts; this lab is the legacy path hygiene.
