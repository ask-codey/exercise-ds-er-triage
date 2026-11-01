import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.Test;

// The tests for your waiting list. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
class TriageQueueTest {
    // Leo (3), Mia (1), Noah (3), Ola (2) and Pia (1) arrive in that order.
    private static TriageQueue fivePatients() {
        TriageQueue waiting = new TriageQueue();
        waiting.add("Leo", 3);
        waiting.add("Mia", 1);
        waiting.add("Noah", 3);
        waiting.add("Ola", 2);
        waiting.add("Pia", 1);
        return waiting;
    }

    @Test
    void nextGivesTheMostUrgentPatient() {
        TriageQueue waiting = new TriageQueue();
        waiting.add("Leo", 3);
        waiting.add("Mia", 1);
        waiting.add("Noah", 3);
        assertEquals("Mia", waiting.next(), "Not yet: Mia has urgency 1, the most urgent, so she's seen first.");
    }

    @Test
    void tiesGoInArrivalOrder() {
        TriageQueue waiting = new TriageQueue();
        for (String name : new String[] {"Ana", "Ben", "Cal", "Dee"}) {
            waiting.add(name, 2);
        }
        List<String> seen = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            seen.add(waiting.next());
        }
        assertEquals(List.of("Ana", "Ben", "Cal", "Dee"), seen,
            "Not yet: four patients with the same urgency are seen in the order they arrived.");
    }

    @Test
    void seesEveryoneInTriageOrder() {
        TriageQueue waiting = fivePatients();
        List<String> seen = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            seen.add(waiting.next());
        }
        assertEquals(List.of("Mia", "Pia", "Ola", "Leo", "Noah"), seen,
            "Not yet: urgency 1 first (Mia arrived before Pia), then urgency 2, then urgency 3 (Leo arrived before Noah).");
        assertNull(waiting.next(), "Not yet: once everyone has been seen, next gives null.");
    }

    @Test
    void peekShowsWithoutRemoving() {
        TriageQueue waiting = fivePatients();
        assertEquals("Mia", waiting.peek(), "Not yet: Mia is next.");
        assertEquals("Mia", waiting.peek(), "Not yet: looking twice doesn't take Mia off the list.");
        assertEquals(5, waiting.size(), "Not yet: peek leaves all 5 patients waiting.");
    }

    @Test
    void anEmptyWaitingRoomGivesNothing() {
        TriageQueue waiting = new TriageQueue();
        waiting.add("Leo", 3);
        assertEquals("Leo", waiting.next(), "Not yet: Leo is the only patient, so he's next.");
        assertNull(waiting.next(), "Not yet: nobody is left, so next gives null.");
        assertNull(waiting.peek(), "Not yet: nobody is left, so peek gives null.");
        assertEquals(0, waiting.size(), "Not yet: nobody is waiting.");
    }

    @Test
    void countGoesUpAndDown() {
        TriageQueue waiting = fivePatients();
        assertEquals(5, waiting.size(), "Not yet: 5 patients arrived.");
        waiting.next();
        assertEquals(4, waiting.size(), "Not yet: after one is seen, 4 are waiting.");
    }

    @Test
    void theHeapBubblesLikeTheLesson() {
        TriageQueue waiting = fivePatients();
        assertEquals(List.of("Mia", "Pia", "Noah", "Leo", "Ola"), waiting.heapOrder(),
            "Not yet: after the five arrivals, bubbling each one up gives the heap Mia, Pia, Noah, Leo, Ola.");
        waiting.next();
        assertEquals(List.of("Pia", "Ola", "Noah", "Leo"), waiting.heapOrder(),
            "Not yet: after Mia is seen, Ola (the last) moves to the top and bubbles down below Pia.");
    }

    @Test
    void aBusyNight() {
        TriageQueue waiting = new TriageQueue();
        List<Patient> arrivals = new ArrayList<>();
        for (int i = 1; i <= 10000; i++) {
            int urgency = i * 7 % 5 + 1;
            waiting.add("Patient " + i, urgency);
            arrivals.add(new Patient("Patient " + i, urgency, i));
        }
        arrivals.sort(Comparator.comparingInt(Patient::urgency).thenComparingInt(Patient::arrival));
        for (int i = 0; i < arrivals.size(); i++) {
            assertEquals(arrivals.get(i).name(), waiting.next(),
                "Not yet: on a busy night of 10,000 patients, patient number " + (i + 1) + " to be seen should be " + arrivals.get(i).name() + ".");
        }
        assertEquals(0, waiting.size(), "Not yet: everyone has been seen.");
    }
}
