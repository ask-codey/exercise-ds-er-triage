// Your emergency room's waiting list: a min-heap of patients, stored in an
// array. The most urgent patient comes first; two patients with the same
// urgency are seen in the order they arrived. The comment above each method
// says what it should do, with examples from demo.ts. Replace each method's
// body with your own code, and write its growth rate in its comment.

// One patient in the waiting room. You don't need to change this class.
// Urgency 1 is the most urgent and 5 the least; arrival is 1 for the first
// patient to arrive, 2 for the second, and so on.
export class Patient {
  name: string;
  urgency: number;
  arrival: number;

  constructor(name: string, urgency: number, arrival: number) {
    this.name = name;
    this.urgency = urgency;
    this.arrival = arrival;
  }
}

export class TriageQueue {
  // The heap, level by level: the children of index i are at 2i + 1 and
  // 2i + 2, and its parent is at Math.floor((i - 1) / 2).
  heap: Patient[] = [];

  // How many patients have arrived so far, for each patient's arrival number.
  arrivals = 0;

  /*
   * A patient arrives. Give them the next arrival number (1 for the first
   * patient ever added, 2 for the second, ...), put them at the end of the
   * heap, and bubble them up while they come before their parent.
   *
   * add("Leo", 3), then add("Mia", 1): Mia is now at the top.
   *
   * Growth rate: (write it here)
   */
  add(name: string, urgency: number): void {
  }

  /*
   * Take the next patient to be seen off the list and return their name:
   * the most urgent, and of those, the one who arrived first. Move the
   * last patient to the top and bubble them down. Return null when
   * nobody is waiting.
   *
   * After the five patients in demo.ts: next() -> "Mia", then "Pia".
   *
   * Growth rate: (write it here)
   */
  next(): string | null {
    return null;
  }

  /*
   * The name of the patient who would be seen next, without taking them
   * off the list, or null when nobody is waiting.
   *
   * Growth rate: (write it here)
   */
  peek(): string | null {
    return null;
  }

  /*
   * How many patients are waiting.
   *
   * Growth rate: (write it here)
   */
  count(): number {
    return this.heap.length;
  }

  /*
   * The waiting patients' names in the heap's own order: index 0, 1, 2 ...
   * of the array, not the order they'll be seen. The tests use it to check
   * that your heap bubbles up and down the way the lesson does.
   *
   * After the five patients in demo.ts: ["Mia", "Pia", "Noah", "Leo", "Ola"]
   *
   * Growth rate: (write it here)
   */
  heapOrder(): string[] {
    return [];
  }
}
