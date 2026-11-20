# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Legacy `receiverand` vs `randnotify` |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample |
| [docs.wax.io](https://docs.wax.io/) | Notify routing |

**New code prefers `randnotify`.** Keep `receiverand` only while old deliveries can still arrive. Both names must share **one** resolver.

Same entropy twice → no-op. Different entropy → mismatch (do not overwrite).

## Related labs

| Lab | Topic |
| --- | --- |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Job table + once-resolve |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Both names, one writer |
| [coinflip](https://github.com/pixel-journey/px-orng-coinflip-escrow) | Stricter second-entropy mismatch |
| `px-contract-examples-vault` (private index; not this public course) | Curriculum order |
