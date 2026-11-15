# Tips — legacy receiverand

## Do

- Gate **caller == orng.wax** before reading entropy.  
- Treat identical second delivery as success no-op.  
- Treat different second entropy as hard error (do not flip payout).  
- Prefer **randnotify** for greenfield contracts.

## Don't

- Let users call the resolve entry with a forged caller field.  
- Implement a second, separate payout path only for legacy.  
- Accept unbounded entropy strings.

## Related

[v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
