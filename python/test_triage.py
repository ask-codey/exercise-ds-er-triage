# The tests for your waiting list. You don't need to change this file.
# Each message says what was expected, so a failing test tells you what to look at.
import time

from triage import TriageQueue


def five_patients():
    """Leo (3), Mia (1), Noah (3), Ola (2) and Pia (1) arrive in that order."""
    waiting = TriageQueue()
    waiting.add("Leo", 3)
    waiting.add("Mia", 1)
    waiting.add("Noah", 3)
    waiting.add("Ola", 2)
    waiting.add("Pia", 1)
    return waiting


def test_next_gives_the_most_urgent_patient():
    waiting = TriageQueue()
    waiting.add("Leo", 3)
    waiting.add("Mia", 1)
    waiting.add("Noah", 3)
    assert waiting.next() == "Mia", "Not yet: Mia has urgency 1, the most urgent, so she's seen first."


def test_ties_go_in_arrival_order():
    waiting = TriageQueue()
    for name in ["Ana", "Ben", "Cal", "Dee"]:
        waiting.add(name, 2)
    seen = [waiting.next() for _ in range(4)]
    assert seen == ["Ana", "Ben", "Cal", "Dee"], "Not yet: four patients with the same urgency are seen in the order they arrived."


def test_sees_everyone_in_triage_order():
    waiting = five_patients()
    seen = [waiting.next() for _ in range(5)]
    assert seen == ["Mia", "Pia", "Ola", "Leo", "Noah"], \
        "Not yet: urgency 1 first (Mia arrived before Pia), then urgency 2, then urgency 3 (Leo arrived before Noah)."
    assert waiting.next() is None, "Not yet: once everyone has been seen, next gives None."


def test_peek_shows_without_removing():
    waiting = five_patients()
    assert waiting.peek() == "Mia", "Not yet: Mia is next."
    assert waiting.peek() == "Mia", "Not yet: looking twice doesn't take Mia off the list."
    assert waiting.count() == 5, "Not yet: peek leaves all 5 patients waiting."


def test_an_empty_waiting_room_gives_nothing():
    waiting = TriageQueue()
    waiting.add("Leo", 3)
    assert waiting.next() == "Leo", "Not yet: Leo is the only patient, so he's next."
    assert waiting.next() is None, "Not yet: nobody is left, so next gives None."
    assert waiting.peek() is None, "Not yet: nobody is left, so peek gives None."
    assert waiting.count() == 0, "Not yet: nobody is waiting."


def test_count_goes_up_and_down():
    waiting = five_patients()
    assert waiting.count() == 5, "Not yet: 5 patients arrived."
    waiting.next()
    assert waiting.count() == 4, "Not yet: after one is seen, 4 are waiting."


def test_the_heap_bubbles_like_the_lesson():
    waiting = five_patients()
    assert waiting.heap_order() == ["Mia", "Pia", "Noah", "Leo", "Ola"], \
        "Not yet: after the five arrivals, bubbling each one up gives the heap Mia, Pia, Noah, Leo, Ola."
    waiting.next()
    assert waiting.heap_order() == ["Pia", "Ola", "Noah", "Leo"], \
        "Not yet: after Mia is seen, Ola (the last) moves to the top and bubbles down below Pia."


def test_a_busy_night():
    waiting = TriageQueue()
    arrivals = []
    for i in range(1, 10001):
        urgency = i * 7 % 5 + 1
        waiting.add(f"Patient {i}", urgency)
        arrivals.append((urgency, i, f"Patient {i}"))
    arrivals.sort()
    for number, (urgency, arrival, name) in enumerate(arrivals, start=1):
        assert waiting.next() == name, \
            f"Not yet: on a busy night of 10,000 patients, patient number {number} to be seen should be {name}."
    assert waiting.count() == 0, "Not yet: everyone has been seen."


def test_the_disaster_drill_stays_fast():
    waiting = TriageQueue()
    started = time.perf_counter()
    for i in range(1, 100001):
        waiting.add(f"Patient {i}", i * 7 % 5 + 1)
    seen = [waiting.next() for _ in range(100000)]
    seconds = time.perf_counter() - started
    expected = [f"Patient {i}" for urgency in range(1, 6) for i in range(1, 100001) if i * 7 % 5 + 1 == urgency]
    for number, (name, want) in enumerate(zip(seen, expected), start=1):
        assert name == want, f"Not yet: in the drill, patient number {number} to be seen should be {want}."
    assert seconds < 3, f"Not yet: the drill's 100,000 arrivals and calls took {seconds:.1f} seconds. When each arrival and each call moves a patient at most one level per step, it takes about one."
