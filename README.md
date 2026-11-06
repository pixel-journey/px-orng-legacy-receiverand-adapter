# px-orng-legacy-receiverand-adapter

> **Trust:** private educational lab (Tier B)  
> **Quest:** 002 — legacy `orng.wax::receiverand` path  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach the auth gate on the **legacy** random delivery path: only `orng.wax` may resolve a job, and resolve is once-only.

**Real code:** `npm test`. **Does not** call `orng.wax`, pull credits, or produce wasm.

## What is true (executed)

| Rule | Result |
| --- | --- |
| `caller === orng.wax` | resolve succeeds |
| `caller === alice` | refused before resolve |
| Second delivery, same entropy | no-op (stays resolved) |
| Second delivery, different entropy | refused |
| Unknown job id | refused |
| Entropy upper-case | stored lower-case |
| Entropy too short / non-hex | refused |
| Job id `0` on open | refused |
| Assoc length 0 or 65 | refused |
| 33rd open job | refused (cap 32) |

## What is not claimed

- Live `orng.wax` notify or action
- RNG credit stake / pay-per-use
- Dual-path merge with `randnotify` (see `px-orng-dual-callback-idempotent`)
- wasm / abi from CDT

## Run

```bash
npm test
```

No host is called.

## Related

- `px-orng-v3-randnotify-starter` — v3 `randnotify` hygiene
- `px-orng-dual-callback-idempotent` — shared resolver for both paths
- `px-orng-coinflip-escrow` — payout on top of delivery

MIT — Pixel Journey
