# px-orng-legacy-receiverand-adapter

> **Trust:** private educational lab (Tier B)  
> **Domain:** WAX ORNG — legacy `receiverand`  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** Teach the auth gate on the **legacy** random delivery path: only `orng.wax` may resolve a job, and resolve is once-only.

**Real code:** `npm test`. **Does not** call `orng.wax`, pull credits, or produce wasm.

Official: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). Sample: [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample). Prefer [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) for new work; merge paths with [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).

## What is true (executed)

| Rule | Result |
| --- | --- |
| `caller === orng.wax` | resolve succeeds |
| Wrong caller | refused |
| Second delivery, same entropy | no-op (stays resolved) |
| Second delivery, different entropy | refused |
| Unknown job / bad entropy / id 0 / assoc bounds / 33rd job | refused |

## Related

- [px-orng-v3-randnotify-starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter)
- [px-orng-dual-callback-idempotent](https://github.com/pixel-journey/px-orng-dual-callback-idempotent)
- [px-orng-coinflip-escrow](https://github.com/pixel-journey/px-orng-coinflip-escrow)

## Run

```bash
npm test
```

MIT — Pixel Journey
