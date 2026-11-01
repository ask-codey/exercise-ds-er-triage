// One patient in the waiting room. You don't need to change this file.
// Urgency 1 is the most urgent and 5 the least; arrival is 1 for the first
// patient to arrive, 2 for the second, and so on.
public record Patient(String name, int urgency, int arrival) {
}
