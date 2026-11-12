# Official sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Modern + legacy delivery paths on `orng.wax` |
| [WAX RNG sample](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | docs.wax.io sample (often shows receive-style handling) |
| [docs.wax.io](https://docs.wax.io/) | WAX development |

Prefer the v3 notify path for new contracts; this lab documents the **legacy** gate so dual-path code stays honest.

## Domain map

| Repo | Role |
| --- | --- |
| [px-orng-v3-randnotify-starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | v3 job + once-resolve |
| **This repo** | Legacy `receiverand` auth + once + entropy |
| [px-orng-dual-callback-idempotent](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Shared resolver for both names |
| [px-orng-coinflip-escrow](https://github.com/pixel-journey/px-orng-coinflip-escrow) | Escrow + payout on delivery |
