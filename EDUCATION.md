# Education — legacy receiverand adapter

Before ORNG v3 `randnotify`, jobs resolved through `receiverand`. The critical gate is **caller must be orng.wax**. Same entropy twice is a no-op; different entropy is a mismatch.

## Outcomes

1. Show non-orng callers never resolve.
2. Show second identical entropy is idempotent.
3. Show entropy is lowercased and length-bounded.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
