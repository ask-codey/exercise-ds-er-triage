// The tests for your waiting list. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
import assert from "node:assert/strict";
import { test } from "node:test";
import { TriageQueue } from "./triage.ts";

// Leo (3), Mia (1), Noah (3), Ola (2) and Pia (1) arrive in that order.
function fivePatients(): TriageQueue {
  const waiting = new TriageQueue();
  waiting.add("Leo", 3);
  waiting.add("Mia", 1);
  waiting.add("Noah", 3);
  waiting.add("Ola", 2);
  waiting.add("Pia", 1);
  return waiting;
}

test("next gives the most urgent patient", () => {
  const waiting = new TriageQueue();
  waiting.add("Leo", 3);
  waiting.add("Mia", 1);
  waiting.add("Noah", 3);
  assert.equal(waiting.next(), "Mia", "Not yet: Mia has urgency 1, the most urgent, so she's seen first.");
});

test("ties go in arrival order", () => {
  const waiting = new TriageQueue();
  for (const name of ["Ana", "Ben", "Cal", "Dee"]) {
    waiting.add(name, 2);
  }
  const seen = [waiting.next(), waiting.next(), waiting.next(), waiting.next()];
  assert.deepEqual(seen, ["Ana", "Ben", "Cal", "Dee"], "Not yet: four patients with the same urgency are seen in the order they arrived.");
});

test("sees everyone in triage order", () => {
  const waiting = fivePatients();
  const seen: (string | null)[] = [];
  for (let i = 0; i < 5; i++) {
    seen.push(waiting.next());
  }
  assert.deepEqual(seen, ["Mia", "Pia", "Ola", "Leo", "Noah"],
    "Not yet: urgency 1 first (Mia arrived before Pia), then urgency 2, then urgency 3 (Leo arrived before Noah).");
  assert.equal(waiting.next(), null, "Not yet: once everyone has been seen, next gives null.");
});

test("peek shows without removing", () => {
  const waiting = fivePatients();
  assert.equal(waiting.peek(), "Mia", "Not yet: Mia is next.");
  assert.equal(waiting.peek(), "Mia", "Not yet: looking twice doesn't take Mia off the list.");
  assert.equal(waiting.count(), 5, "Not yet: peek leaves all 5 patients waiting.");
});

test("an empty waiting room gives nothing", () => {
  const waiting = new TriageQueue();
  waiting.add("Leo", 3);
  assert.equal(waiting.next(), "Leo", "Not yet: Leo is the only patient, so he's next.");
  assert.equal(waiting.next(), null, "Not yet: nobody is left, so next gives null.");
  assert.equal(waiting.peek(), null, "Not yet: nobody is left, so peek gives null.");
  assert.equal(waiting.count(), 0, "Not yet: nobody is waiting.");
});

test("count goes up and down", () => {
  const waiting = fivePatients();
  assert.equal(waiting.count(), 5, "Not yet: 5 patients arrived.");
  waiting.next();
  assert.equal(waiting.count(), 4, "Not yet: after one is seen, 4 are waiting.");
});

test("the heap bubbles like the lesson", () => {
  const waiting = fivePatients();
  assert.deepEqual(waiting.heapOrder(), ["Mia", "Pia", "Noah", "Leo", "Ola"],
    "Not yet: after the five arrivals, bubbling each one up gives the heap Mia, Pia, Noah, Leo, Ola.");
  waiting.next();
  assert.deepEqual(waiting.heapOrder(), ["Pia", "Ola", "Noah", "Leo"],
    "Not yet: after Mia is seen, Ola (the last) moves to the top and bubbles down below Pia.");
});

test("a busy night", () => {
  const waiting = new TriageQueue();
  const arrivals: { name: string; urgency: number; arrival: number }[] = [];
  for (let i = 1; i <= 10000; i++) {
    const urgency = (i * 7) % 5 + 1;
    waiting.add(`Patient ${i}`, urgency);
    arrivals.push({ name: `Patient ${i}`, urgency, arrival: i });
  }
  arrivals.sort((a, b) => a.urgency - b.urgency || a.arrival - b.arrival);
  arrivals.forEach((patient, i) => {
    assert.equal(waiting.next(), patient.name,
      `Not yet: on a busy night of 10,000 patients, patient number ${i + 1} to be seen should be ${patient.name}.`);
  });
  assert.equal(waiting.count(), 0, "Not yet: everyone has been seen.");
});

test("the disaster drill stays fast", () => {
  const waiting = new TriageQueue();
  const started = performance.now();
  for (let i = 1; i <= 100000; i++) {
    waiting.add(`Patient ${i}`, (i * 7) % 5 + 1);
  }
  const seen: (string | null)[] = [];
  for (let i = 0; i < 100000; i++) {
    seen.push(waiting.next());
  }
  const seconds = (performance.now() - started) / 1000;
  let number = 0;
  for (let urgency = 1; urgency <= 5; urgency++) {
    for (let i = 1; i <= 100000; i++) {
      if ((i * 7) % 5 + 1 === urgency) {
        if (seen[number] !== `Patient ${i}`) {
          assert.fail(`Not yet: in the drill, patient number ${number + 1} to be seen should be Patient ${i}.`);
        }
        number++;
      }
    }
  }
  assert.ok(seconds < 3, `Not yet: the drill's 100,000 arrivals and calls took ${seconds.toFixed(1)} seconds. When each arrival and each call moves a patient at most one level per step, it takes about one.`);
});
