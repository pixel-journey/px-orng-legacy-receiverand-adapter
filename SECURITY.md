# Security — legacy receiverand

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-orng caller | refused |
| Unknown job | refused |
| Bad entropy shape | refused |
| Second different entropy | entropy mismatch |
| Second same entropy | no-op |
| Open id / assoc / cap | refused |

## Not closed

| Concern | Guidance |
| --- | --- |
| Auth | Real `require_auth(orng.wax)` |
| Notification wiring | Correct `on_notify` for the legacy action name |
| Dual-path double pay | Use shared resolver (dual-callback lab) |

No live oracle calls in this repository.
