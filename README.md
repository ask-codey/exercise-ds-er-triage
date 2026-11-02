# Exercise: Emergency Room Triage

Exercise code for the lesson **Exercise: Emergency Room Triage** in the course *Data Structures and Big-O, Demystified* on [ask-codey.com](https://www.ask-codey.com).

## The ticket

> **From:** the charge nurse, City General's emergency room
>
> Our waiting-list app calls patients by urgency, from 1, the most urgent, to 5, the least.
>
> 1. **Most urgent first.** "Who's next?" always gives the most urgent patient waiting, even one who walked in a minute ago.
> 2. **Fair ties.** Two patients with the same urgency are seen in the order they arrived.
> 3. **Arrivals all night, "who's next?" all night.** Neither may slow down as the room fills up.
> 4. **The board** shows who's next without calling them, and how many are waiting.
>
> **Too slow:** every year the region's disaster drill sends 100,000 pretend patients through the app, all waiting at once, then called one by one. The whole drill has to finish in under 3 seconds.

The code that's there has the `Patient` class (a name, an urgency and an arrival number) and the `TriageQueue` class, with its `heap` list, empty at first, and an `arrivals` counter that starts at 0. Five methods are yours to finish:

- `add` (`Add` in C#): a patient arrives and gets the next arrival number
- `next` (`Next`): the next patient to be seen comes off the list, and their name is returned
- `peek` (`Peek`): who's next, without taking them off
- `count` (`Count` in C#, `size()` in Java): how many are waiting
- `heapOrder` (`HeapOrder`, `heap_order`): the names in the list's own order, index 0 first, so the tests can check how you keep it

Build the waiting list yourself, not with a ready-made one from your language's library: one test checks `heapOrder` step by step. Nine tests check it, ending with the disaster drill: 100,000 patients in under 3 seconds.

## Pick your language

The same exercise is here in five languages. Work in the folder for the language you set up; you only need one.

| Folder | Your code | The tests |
|---|---|---|
| `csharp/` | `ErTriage/TriageQueue.cs` | `ErTriage.Tests/TriageQueueTests.cs` |
| `java/` | `src/main/java/TriageQueue.java` | `src/test/java/TriageQueueTest.java` |
| `python/` | `triage.py` | `test_triage.py` |
| `javascript/` | `triage.js` | `triage.test.js` |
| `typescript/` | `triage.ts` | `triage.test.ts` |

Each method does nothing, or returns an empty answer, for now. The comment above it says what it should do, with examples. Replace its body with your own code, and write the method's growth rate on its **Growth rate:** line. The class already has its `heap` list and an `arrivals` counter, and the count method is done. The `Patient` class is given (in C# and Java it has a file of its own), and you don't need to change it.

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

<details>
<summary>Stuck?</summary>

- **Where to look:** the ticket asks for what the lesson *Who's Next in the Emergency Room? Heaps* builds, a **min-heap**, ordered by two things the way *Fair Ties, Ready-Made: Priority Queues in Your Language* orders them. It keeps only the most urgent patient in a known place, at the top, which is all "who's next?" needs.
- **Write a small helper first:** does patient `a` come before patient `b`? Compare the urgency; only when the urgency is the same, compare the arrival number.
- **`add` is the lesson's bubble up,** with the helper in place of `<`: put the patient at the end, then swap them with their parent while they come first.
- **`next` is the lesson's bubble down:** keep the top, move the last patient to the top, then swap them with whichever child comes first, for as long as that child comes before them.
- **The index arithmetic:** the children of index i are at 2i + 1 and 2i + 2, and its parent is at (i - 1) / 2, rounded down.
- **Don't forget the last patient.** When `next` takes the only patient, there's nobody left to move to the top.

</details>

<details>
<summary>Why Should I Choose This?</summary>

Open this once your tests are green. The drill is 100,000 patients waiting at once, then called one by one.

- **An unsorted list, read on every call:** arrivals are instant, but each "who's next?" reads everyone still waiting, O(n). That's about 5 billion comparisons for the drill: 38 seconds in C# and about five minutes in Python, against the 3 seconds allowed.
- **A list kept sorted:** each call takes the patient at the end, instantly, but each arrival slides the patients behind its place along, O(n). Computers slide memory in big blocks, so the drill can still pass (about 0.6 seconds with Python's built-in insert), but ten times the patients is a hundred times the sliding.
- **One plain queue per urgency level:** honestly, with exactly five levels this would pass the drill too. An arrival joins the back of its level's queue and a call checks at most five queues, O(1) each, with fair ties for free. It stops working when the priority has many values, such as minutes until a deadline or the distance to the next stop on a route.
- **A heap:** an arrival and a call each move one patient at most one level per step, and 100,000 patients make only 17 levels: O(log n). Your heap passes the drill in about a second in Python and a fraction of one in the other languages, and it works the same for any kind of priority, which is why it's the one every language's library ships.

</details>

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
