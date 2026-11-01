# Exercise: Emergency Room Triage

Exercise code for the lesson **Exercise: Emergency Room Triage** in the course *Data Structures and Big-O, Demystified* on [ask-codey.com](https://www.ask-codey.com).

An emergency room's waiting list: the most urgent patient is seen first (urgency 1 is the most urgent, 5 the least), and two patients with the same urgency are seen in the order they arrived. You build it as a min-heap stored in a list, the way the lesson *Heaps: The Emergency Room* does. Every patient is a `Patient` with a name, an urgency and an arrival number. You finish the `TriageQueue` class:

- `add` (`Add` in C#): a patient arrives, gets the next arrival number, and bubbles up
- `next` (`Next`): the next patient to be seen comes off the list, and the last one bubbles down
- `peek` (`Peek`): who's next, without taking them off
- `count` (`Count` in C#, `size()` in Java): how many are waiting
- `heapOrder` (`HeapOrder`, `heap_order`): the names in the heap's own order, so the tests can check your bubbling

## Pick your language

The same exercise is here in five languages. Work in the folder for the language you set up; you only need one.

| Folder | Your code | The tests |
|---|---|---|
| `csharp/` | `ErTriage/TriageQueue.cs` | `ErTriage.Tests/TriageQueueTests.cs` |
| `java/` | `src/main/java/TriageQueue.java` | `src/test/java/TriageQueueTest.java` |
| `python/` | `triage.py` | `test_triage.py` |
| `javascript/` | `triage.js` | `triage.test.js` |
| `typescript/` | `triage.ts` | `triage.test.ts` |

Each method does nothing, or returns an empty answer, for now. The comment above it says what it should do, with examples. Replace its body with your own code, and write the method's growth rate on its **Growth rate:** line. The class already has its `heap` list and an `arrivals` counter, and the count method is done. The `Patient` class is given (in C# and Java it has a file of its own), and you don't need to change it. Use your own heap, not your language's built-in priority queue: one test checks the heap's own order.

Every folder also has a small demo program that tries your waiting list on five patients. You don't need to change the tests or the demo.

## Run it and check your work

Open your language's folder in VS Code (**File > Open Folder**), then open its terminal (**Terminal > New Terminal**) and run these commands there.

**C#**

```bash
dotnet run --project ErTriage
dotnet test
```

**Java** (the Maven Wrapper downloads Maven the first time, so the first run takes a minute)

```bash
java src/main/java/Demo.java
./mvnw test
```

On Windows in PowerShell, write `.\mvnw test` instead of `./mvnw test`.

**Python** (once: make a virtual environment and install pytest into it)

```bash
python -m venv .venv
```

Then turn it on: `.venv\Scripts\Activate.ps1` in PowerShell on Windows, or `source .venv/bin/activate` on macOS (where the command is `python3`, not `python`). Then:

```bash
pip install -r requirements.txt
python demo.py
python -m pytest
```

**JavaScript**

```bash
node demo.js
npm test
```

**TypeScript** (once: `npm install`, which installs TypeScript)

```bash
node demo.ts
npm test
```

At first every test fails: that is expected. Each method you finish turns its tests green. A failing test's message starts with **Not yet:** and says what it expected.

## Tips

- **Write a small helper first:** does patient `a` come before patient `b`? Compare the urgency; only when the urgency is the same, compare the arrival number.
- **`add` is the lesson's bubble up,** with the helper in place of `<`: put the patient at the end, then swap them with their parent while they come first.
- **`next` is the lesson's bubble down:** keep the top, move the last patient to the top, then swap them with whichever child comes first, for as long as that child comes before them.
- **The index arithmetic:** the children of index i are at 2i + 1 and 2i + 2, and its parent is at (i - 1) / 2, rounded down.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
