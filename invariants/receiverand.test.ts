import assert from "node:assert/strict";
import test from "node:test";
import {
  ORNG_ACCOUNT,
  MAX_ENTROPY_HEX,
  emptyBook,
  openJob,
  receiverand,
  unsignedReceiverandBody,
} from "./receiverand.ts";

const self = "pxrngdapp";
const base = () => openJob(emptyBook(self), { id: "1", assoc: "bet-1" });

test("orng.wax may resolve an open job once", () => {
  const done = receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "deadbeef" });
  assert.equal(done.jobs[0].status, "resolved");
  assert.equal(done.jobs[0].entropy, "deadbeef");
});

test("non-orng caller is refused before resolve", () => {
  assert.throws(
    () => receiverand(base(), { caller: "alice", jobId: "1", entropyHex: "deadbeef" }),
    /require orng\.wax/,
  );
});

test("second callback with the same entropy is a no-op", () => {
  const once = receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "aabbccdd" });
  const twice = receiverand(once, { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "aabbccdd" });
  assert.equal(twice.jobs[0].entropy, "aabbccdd");
});

test("second callback with different entropy is refused", () => {
  const once = receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "aabbccdd" });
  assert.throws(
    () => receiverand(once, { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "11223344" }),
    /entropy mismatch/,
  );
});

test("unknown job is refused", () => {
  assert.throws(
    () => receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "99", entropyHex: "deadbeef" }),
    /unknown job/,
  );
});

test("entropy is lowercased", () => {
  const done = receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "DEADBEEF" });
  assert.equal(done.jobs[0].entropy, "deadbeef");
});

test("short or non-hex entropy is refused", () => {
  assert.throws(
    () => receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "abc" }),
    /bad entropy/,
  );
  assert.throws(
    () => receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: "zzzzzzzz" }),
    /bad entropy/,
  );
});

test("entropy longer than 64 hex chars is refused", () => {
  assert.throws(
    () =>
      receiverand(base(), {
        caller: ORNG_ACCOUNT,
        jobId: "1",
        entropyHex: "a".repeat(MAX_ENTROPY_HEX + 1),
      }),
    /bad entropy/,
  );
});

test("max-length entropy is accepted", () => {
  const hex = "ab".repeat(32);
  assert.equal(hex.length, 64);
  const done = receiverand(base(), { caller: ORNG_ACCOUNT, jobId: "1", entropyHex: hex });
  assert.equal(done.jobs[0].entropy, hex);
});

test("non-positive job id is refused on open", () => {
  assert.throws(() => openJob(emptyBook(self), { id: "0", assoc: "x" }), /non-positive id/);
});

test("duplicate job id is refused", () => {
  const open = base();
  assert.throws(() => openJob(open, { id: "1", assoc: "other" }), /duplicate id/);
});

test("assoc length bounds on open", () => {
  assert.throws(() => openJob(emptyBook(self), { id: "1", assoc: "" }), /bad assoc length/);
  assert.throws(
    () => openJob(emptyBook(self), { id: "1", assoc: "x".repeat(65) }),
    /bad assoc length/,
  );
});

test("open job cap of 32", () => {
  let book = emptyBook(self);
  for (let i = 1; i <= 32; i++) book = openJob(book, { id: String(i), assoc: "a" + i });
  assert.throws(() => openJob(book, { id: "33", assoc: "overflow" }), /open job cap/);
});

test("unsigned body is unsent and requires orng.wax", () => {
  const body = unsignedReceiverandBody({
    caller: ORNG_ACCOUNT,
    jobId: "1",
    entropyHex: "DEADBEEF",
  });
  assert.equal(body.sent, false);
  assert.equal(body.name, "receiverand");
  assert.equal(body.data.entropy, "deadbeef");
  assert.throws(
    () => unsignedReceiverandBody({ caller: "alice", jobId: "1", entropyHex: "deadbeef" }),
    /require orng\.wax/,
  );
});
