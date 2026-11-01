# Tries your waiting list on five patients. Run it with: python demo.py
from triage import TriageQueue

waiting = TriageQueue()
waiting.add("Leo", 3)
waiting.add("Mia", 1)
waiting.add("Noah", 3)
waiting.add("Ola", 2)
waiting.add("Pia", 1)

print("Waiting, in heap order: " + ", ".join(waiting.heap_order()))
for _ in range(6):
    print("Next: " + (waiting.next() or "nobody waiting"))
