# Legacy receiverand: only orng.wax may resolve

> **Domain:** WAX ORNG — legacy `receiverand`  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** Teach the auth gate on the **legacy** random delivery path: only `orng.wax` may resolve a job, and resolve is once-only.

**Code under test:** `npm test`. Does not call `orng.wax`, pull credits, or produce wasm.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). **Sample:** [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

For new work prefer the [v3 randnotify starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter). Merge both delivery paths with [dual-callback idempotent](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).

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

```bash
npm test
```

MIT — Pixel Journey
