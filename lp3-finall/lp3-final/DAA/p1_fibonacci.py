# Practical 1: Fibonacci - recursive and non-recursive

def fib_loop(n):
    a = 0
    b = 1
    for i in range(n):
        c = a + b
        a = b
        b = c
    return a

def fib_rec(n):
    if n <= 1:
        return n
    return fib_rec(n - 1) + fib_rec(n - 2)

n = int(input("Enter n: "))

print("Non-recursive:", fib_loop(n))
print("Recursive:", fib_rec(n))

print("Series:")
for i in range(n + 1):
    print(fib_loop(i), end=" ")

print("\n\nTime complexity : non-recursive O(n), recursive O(2^n)")
print("Space complexity: non-recursive O(1), recursive O(n)")
