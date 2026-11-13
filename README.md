# Legacy receiverand: only orng.wax may resolve

> **Domain:** WAX ORNG — legacy `receiverand`  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Auth gate on the **legacy** random delivery path: only `orng.wax` may resolve; resolve is once-only (same entropy no-op; different entropy refused).

**Code under test:** `npm test`. Does not call `orng.wax` or produce wasm.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). Prefer [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter); merge paths with [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Auth, idempotency, conflict |
| [TIPS.md](TIPS.md) | Prefer v3; unify dual path |
| [SECURITY.md](SECURITY.md) | Caller and entropy |
| [SOURCES.md](SOURCES.md) | Official links |

## What is true (executed)

| Rule | Result |
| --- | --- |
| `caller === orng.wax` | resolve succeeds |
| Wrong caller | refused |
| Second delivery, same entropy | no-op |
| Second delivery, different entropy | refused |
| Unknown job / bad entropy / caps | refused |

```bash
npm test
```

MIT — Pixel Journey
