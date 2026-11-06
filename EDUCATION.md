# Education

## Pitfall

A contract that exposes a public `receiverand` (or a poorly gated notify handler) lets **any** account inject entropy and settle bets.

## Rule order

1. **Auth first** — stand-in for `require_auth("orng.wax")`. Refuse everyone else before looking up the job.
2. **Job exists and is open** — unknown ids never create state from a callback.
3. **Entropy shape** — bounded hex, normalized to lowercase so case variants cannot double-settle.
4. **Once-only** — a second delivery with the **same** entropy is a no-op; a **different** entropy is refused (mismatch).

## Why legacy still matters

v3 prefers `randnotify`. Older contracts and some dapps still listen on `receiverand`. The adapter rule is the same gate the dual-callback lab expects on that path alone.
