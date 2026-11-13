# Security notes — receiverand

| Mitigated | Behavior |
| --- | --- |
| Non-orng caller | refused |
| Double resolve same entropy | no-op |
| Double resolve different entropy | refused |
| Unknown job / bad entropy / caps | refused |

Production: `require_auth(orng.wax)`, real notification routing, shared dual-path latch, credit checks before open.
