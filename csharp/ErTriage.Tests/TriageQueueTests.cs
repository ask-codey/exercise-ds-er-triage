using ErTriage;

namespace ErTriage.Tests;

// The tests for your waiting list. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.

[TestClass]
public class TriageQueueTests
{
    // Leo (3), Mia (1), Noah (3), Ola (2) and Pia (1) arrive in that order.
    private static TriageQueue FivePatients()
    {
        TriageQueue waiting = new TriageQueue();
        waiting.Add("Leo", 3);
        waiting.Add("Mia", 1);
        waiting.Add("Noah", 3);
        waiting.Add("Ola", 2);
        waiting.Add("Pia", 1);
        return waiting;
    }

    [TestMethod]
    public void NextGivesTheMostUrgentPatient()
    {
        TriageQueue waiting = new TriageQueue();
        waiting.Add("Leo", 3);
        waiting.Add("Mia", 1);
        waiting.Add("Noah", 3);
        Assert.AreEqual("Mia", waiting.Next(), "Not yet: Mia has urgency 1, the most urgent, so she's seen first.");
    }

    [TestMethod]
    public void TiesGoInArrivalOrder()
    {
        TriageQueue waiting = new TriageQueue();
        foreach (string name in new string[] { "Ana", "Ben", "Cal", "Dee" })
        {
            waiting.Add(name, 2);
        }
        List<string?> seen = new List<string?> { waiting.Next(), waiting.Next(), waiting.Next(), waiting.Next() };
        CollectionAssert.AreEqual(new List<string?> { "Ana", "Ben", "Cal", "Dee" }, seen,
            "Not yet: four patients with the same urgency are seen in the order they arrived.");
    }

    [TestMethod]
    public void SeesEveryoneInTriageOrder()
    {
        TriageQueue waiting = FivePatients();
        List<string?> seen = new List<string?>();
        for (int i = 0; i < 5; i++)
        {
            seen.Add(waiting.Next());
        }
        CollectionAssert.AreEqual(new List<string?> { "Mia", "Pia", "Ola", "Leo", "Noah" }, seen,
            "Not yet: urgency 1 first (Mia arrived before Pia), then urgency 2, then urgency 3 (Leo arrived before Noah).");
        Assert.IsNull(waiting.Next(), "Not yet: once everyone has been seen, Next gives null.");
    }

    [TestMethod]
    public void PeekShowsWithoutRemoving()
    {
        TriageQueue waiting = FivePatients();
        Assert.AreEqual("Mia", waiting.Peek(), "Not yet: Mia is next.");
        Assert.AreEqual("Mia", waiting.Peek(), "Not yet: looking twice doesn't take Mia off the list.");
        Assert.AreEqual(5, waiting.Count, "Not yet: Peek leaves all 5 patients waiting.");
    }

    [TestMethod]
    public void AnEmptyWaitingRoomGivesNothing()
    {
        TriageQueue waiting = new TriageQueue();
        waiting.Add("Leo", 3);
        Assert.AreEqual("Leo", waiting.Next(), "Not yet: Leo is the only patient, so he's next.");
        Assert.IsNull(waiting.Next(), "Not yet: nobody is left, so Next gives null.");
        Assert.IsNull(waiting.Peek(), "Not yet: nobody is left, so Peek gives null.");
        Assert.AreEqual(0, waiting.Count, "Not yet: nobody is waiting.");
    }

    [TestMethod]
    public void CountGoesUpAndDown()
    {
        TriageQueue waiting = FivePatients();
        Assert.AreEqual(5, waiting.Count, "Not yet: 5 patients arrived.");
        waiting.Next();
        Assert.AreEqual(4, waiting.Count, "Not yet: after one is seen, 4 are waiting.");
    }

    [TestMethod]
    public void TheHeapBubblesLikeTheLesson()
    {
        TriageQueue waiting = FivePatients();
        CollectionAssert.AreEqual(new List<string> { "Mia", "Pia", "Noah", "Leo", "Ola" }, waiting.HeapOrder(),
            "Not yet: after the five arrivals, bubbling each one up gives the heap Mia, Pia, Noah, Leo, Ola.");
        waiting.Next();
        CollectionAssert.AreEqual(new List<string> { "Pia", "Ola", "Noah", "Leo" }, waiting.HeapOrder(),
            "Not yet: after Mia is seen, Ola (the last) moves to the top and bubbles down below Pia.");
    }

    [TestMethod]
    public void ABusyNight()
    {
        TriageQueue waiting = new TriageQueue();
        List<(int Urgency, int Arrival, string Name)> arrivals = new List<(int Urgency, int Arrival, string Name)>();
        for (int i = 1; i <= 10000; i++)
        {
            int urgency = i * 7 % 5 + 1;
            waiting.Add("Patient " + i, urgency);
            arrivals.Add((urgency, i, "Patient " + i));
        }
        arrivals.Sort();
        for (int i = 0; i < arrivals.Count; i++)
        {
            Assert.AreEqual(arrivals[i].Name, waiting.Next(), "Not yet: on a busy night of 10,000 patients, patient number " + (i + 1) + " to be seen should be " + arrivals[i].Name + ".");
        }
        Assert.AreEqual(0, waiting.Count, "Not yet: everyone has been seen.");
    }
}
