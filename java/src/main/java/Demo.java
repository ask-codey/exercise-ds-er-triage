// Tries your waiting list on five patients. Run it with: java src/main/java/Demo.java
public class Demo {
    public static void main(String[] args) {
        TriageQueue waiting = new TriageQueue();
        waiting.add("Leo", 3);
        waiting.add("Mia", 1);
        waiting.add("Noah", 3);
        waiting.add("Ola", 2);
        waiting.add("Pia", 1);

        System.out.println("Waiting, in heap order: " + String.join(", ", waiting.heapOrder()));
        for (int i = 0; i < 6; i++) {
            String next = waiting.next();
            System.out.println("Next: " + (next != null ? next : "nobody waiting"));
        }
    }
}
