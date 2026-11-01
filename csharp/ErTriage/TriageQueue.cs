namespace ErTriage;

// Your emergency room's waiting list: a min-heap of patients, stored in a
// list. The most urgent patient comes first; two patients with the same
// urgency are seen in the order they arrived. The comment above each method
// says what it should do, with examples from Program.cs. Replace each
// method's body with your own code, and write its growth rate in its comment.
public class TriageQueue
{
    // The heap, level by level: the children of index i are at 2i + 1 and
    // 2i + 2, and its parent is at (i - 1) / 2.
    private readonly List<Patient> heap = new List<Patient>();

    // How many patients have arrived so far, for each patient's Arrival number.
    private int arrivals;

    /*
     * A patient arrives. Give them the next arrival number (1 for the first
     * patient ever added, 2 for the second, ...), put them at the end of the
     * heap, and bubble them up while they come before their parent.
     *
     * Add("Leo", 3), then Add("Mia", 1): Mia is now at the top.
     *
     * Growth rate: (write it here)
     */
    public void Add(string name, int urgency)
    {
    }

    /*
     * Take the next patient to be seen off the list and return their name:
     * the most urgent, and of those, the one who arrived first. Move the
     * last patient to the top and bubble them down. Return null when
     * nobody is waiting.
     *
     * After the five patients in Program.cs: Next() -> "Mia", then "Pia".
     *
     * Growth rate: (write it here)
     */
    public string? Next()
    {
        return null;
    }

    /*
     * The name of the patient who would be seen next, without taking them
     * off the list, or null when nobody is waiting.
     *
     * Growth rate: (write it here)
     */
    public string? Peek()
    {
        return null;
    }

    /*
     * How many patients are waiting.
     *
     * Growth rate: (write it here)
     */
    public int Count => heap.Count;

    /*
     * The waiting patients' names in the heap's own order: index 0, 1, 2 ...
     * of the list, not the order they'll be seen. The tests use it to check
     * that your heap bubbles up and down the way the lesson does.
     *
     * After the five patients in Program.cs: ["Mia", "Pia", "Noah", "Leo", "Ola"]
     *
     * Growth rate: (write it here)
     */
    public List<string> HeapOrder()
    {
        return new List<string>();
    }
}
