// Tries your waiting list on five patients. Run it with: node demo.ts
import { TriageQueue } from "./triage.ts";

const waiting = new TriageQueue();
waiting.add("Leo", 3);
waiting.add("Mia", 1);
waiting.add("Noah", 3);
waiting.add("Ola", 2);
waiting.add("Pia", 1);

console.log(`Waiting, in heap order: ${waiting.heapOrder().join(", ")}`);
for (let i = 0; i < 6; i++) {
  console.log(`Next: ${waiting.next() ?? "nobody waiting"}`);
}
