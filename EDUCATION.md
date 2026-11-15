# Education — legacy receiverand adapter

## Beginner

Older orng.wax paths call `receiverand` on the dapp. Only `orng.wax` may deliver entropy. Anyone else must be refused before the job is touched.

## Intermediate

Once-only: same entropy again is safe; different entropy is not. Cap open jobs at 32. Normalize hex to lowercase.

## Masterclass (not in this repo)

- Live `requestrand` credits.
- Dual callback with v3 `randnotify` (see coinflip / dual-callback labs).

## Outcomes

1. Prove non-orng callers never resolve.
2. Show same-entropy replay is a no-op.
3. List open-job shape checks.
