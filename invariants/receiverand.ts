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

/** Unsigned receiverand-style body for educational client demos. Not broadcast. */
export function unsignedReceiverandBody(args: {
  caller: string;
  jobId: string;
  entropyHex: string;
}): {
  account: string;
  name: string;
  data: { caller: string; job_id: string; entropy: string };
  sent: false;
} {
  assertName(args.caller, "caller");
  if (args.caller !== ORNG_ACCOUNT) throw new Error("require orng.wax");
  const jobId = u64(args.jobId, "job id").toString();
  const hex = args.entropyHex.toLowerCase();
  if (
    hex.length < MIN_ENTROPY_HEX ||
    hex.length > MAX_ENTROPY_HEX ||
    !HEX.test(hex)
  ) {
    throw new Error("bad entropy");
  }
  return {
    account: "pxrngdapp",
    name: "receiverand",
    data: { caller: args.caller, job_id: jobId, entropy: hex },
    sent: false,
  };
}
