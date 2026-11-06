/**
 * Legacy orng.wax::receiverand adapter (educational).
 * Auth gate first: only orng.wax may resolve. Once-only. No live chain.
 */

export const ORNG_ACCOUNT = "orng.wax";
export const MAX_ASSOC = 64;
export const MIN_ASSOC = 1;
export const MAX_OPEN_JOBS = 32;
export const MIN_ENTROPY_HEX = 8;
export const MAX_ENTROPY_HEX = 64;

export type JobStatus = "open" | "resolved";

export type Job = {
  id: string;
  assoc: string;
  status: JobStatus;
  entropy: string | null;
};

export type Book = {
  self: string;
  jobs: Job[];
};

const U64 = /^(0|[1-9][0-9]{0,19})$/;
const NAME = /^[a-z1-5.]{1,12}$/;
const HEX = /^[0-9a-f]+$/;

function assertName(name: string, label: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad " + label);
  }
}

function u64(value: string, label: string): bigint {
  if (!U64.test(value)) throw new Error("bad " + label);
  const n = BigInt(value);
  if (n > 0xffffffffffffffffn) throw new Error("bad " + label);
  return n;
}

export function openJob(
  book: Book,
  input: { id: string; assoc: string }
): Book {
  const id = u64(input.id, "id");
  if (id < 1n) throw new Error("non-positive id");
  if (input.assoc.length < MIN_ASSOC || input.assoc.length > MAX_ASSOC) {
    throw new Error("bad assoc length");
  }
  if (book.jobs.some((j) => j.id === id.toString())) {
    throw new Error("duplicate id");
  }
  const openCount = book.jobs.filter((j) => j.status === "open").length;
  if (openCount >= MAX_OPEN_JOBS) throw new Error("open job cap");
  return {
    ...book,
    jobs: [
      ...book.jobs,
      {
        id: id.toString(),
        assoc: input.assoc,
        status: "open",
        entropy: null,
      },
    ],
  };
}

/**
 * Legacy receiverand path.
 * 1. caller must be orng.wax (require_auth stand-in)
 * 2. job must exist and be open
 * 3. entropy is lowercase hex of bounded length
 * 4. resolve once — same entropy is a no-op; different entropy refuses
 */
export function receiverand(
  book: Book,
  input: {
    caller: string;
    jobId: string;
    entropyHex: string;
  }
): Book {
  assertName(input.caller, "caller");
  if (input.caller !== ORNG_ACCOUNT) throw new Error("require orng.wax");
  const jobId = u64(input.jobId, "job id").toString();
  const hex = input.entropyHex.toLowerCase();
  if (
    hex.length < MIN_ENTROPY_HEX ||
    hex.length > MAX_ENTROPY_HEX ||
    !HEX.test(hex)
  ) {
    throw new Error("bad entropy");
  }
  const job = book.jobs.find((j) => j.id === jobId);
  if (!job) throw new Error("unknown job");
  if (job.status === "resolved") {
    if (job.entropy !== hex) throw new Error("entropy mismatch");
    return book;
  }
  return {
    ...book,
    jobs: book.jobs.map((j) =>
      j.id === jobId ? { ...j, status: "resolved" as const, entropy: hex } : j
    ),
  };
}

export function emptyBook(self: string): Book {
  assertName(self, "self");
  return { self, jobs: [] };
}
