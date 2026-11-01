using ErTriage;

// Tries your waiting list on five patients. Run it with: dotnet run --project ErTriage
TriageQueue waiting = new TriageQueue();
waiting.Add("Leo", 3);
waiting.Add("Mia", 1);
waiting.Add("Noah", 3);
waiting.Add("Ola", 2);
waiting.Add("Pia", 1);

Console.WriteLine("Waiting, in heap order: " + string.Join(", ", waiting.HeapOrder()));
for (int i = 0; i < 6; i++)
{
    Console.WriteLine("Next: " + (waiting.Next() ?? "nobody waiting"));
}
