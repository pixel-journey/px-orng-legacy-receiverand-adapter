# AI handoff — legacy receiverand adapter

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Legacy `receiverand` vs `randnotify` |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Both names, one writer |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Prefer randnotify job table |

## Non-negotiables

1. **New code prefers `randnotify`.** Keep `receiverand` only while old deliveries can still arrive.
2. Both names must share **one** resolver / resolved flag.
3. Same entropy twice → **no-op**. Different entropy → **mismatch** (do not overwrite).
4. Coinflip is stricter on second-entropy mismatch — do not merge without reading that lab.
5. `orng.wax` is WAX-only. No broadcast.

## Prompt seeds

- "randnotify then receiverand with same entropy — state?"
- "Second delivery different entropy — overwrite or mismatch?"
- "Why keep receiverand at all if randnotify is preferred?"
- "Port one-resolver rule without inventing orng.wax on EOS."

## Do not

- Write two independent resolvers for the two action names.
- Overwrite first entropy on mismatch.
- Prefer receiverand for greenfield code.
