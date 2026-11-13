# Worked examples — receiverand

## Example A — happy path

```text
book = emptyBook("dappcontract")
book = openJob(book, { id: "1", assoc: "wager-1" })
book = receiverand(book, {
  caller: "orng.wax",
  jobId: "1",
  entropyHex: "aabbccdd",
})
// status resolved, entropy set
```

## Example B — wrong caller

`caller: "evil"` → `require orng.wax`. Job stays open.

## Example C — idempotent same entropy

Second `receiverand` with identical hex → book unchanged (still resolved).

## Example D — conflicting entropy

Second delivery with different hex → `entropy mismatch`.

## Example E — caps

| Input | Error |
| --- | --- |
| id `0` | non-positive id |
| 33rd open job | open job cap |
| entropy `zz` | bad entropy |
| unknown job id | unknown job |

## Example F — unsigned body

`unsignedReceiverandBody` builds a teaching action shape with `sent: false`. Not broadcast.
