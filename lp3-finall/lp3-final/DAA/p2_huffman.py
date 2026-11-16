# Practical 2: Huffman Encoding (greedy)
import heapq

text = input("Enter text: ")

# count frequency of each character
freq = {}
for ch in text:
    if ch in freq:
        freq[ch] += 1
    else:
        freq[ch] = 1

# each heap item: [frequency, [char, code], [char, code], ...]
heap = []
for ch in freq:
    heap.append([freq[ch], [ch, ""]])
heapq.heapify(heap)

# greedy step: join the two smallest frequencies
while len(heap) > 1:
    low = heapq.heappop(heap)
    high = heapq.heappop(heap)
    for pair in low[1:]:
        pair[1] = "0" + pair[1]
    for pair in high[1:]:
        pair[1] = "1" + pair[1]
    heapq.heappush(heap, [low[0] + high[0]] + low[1:] + high[1:])

codes = {}
for pair in heap[0][1:]:
    codes[pair[0]] = pair[1]

print("\nCharacter  Code")
for ch in codes:
    print(ch, "        ", codes[ch])

encoded = ""
for ch in text:
    encoded += codes[ch]
print("\nEncoded text:", encoded)
