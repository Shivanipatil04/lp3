# Practical 5: N-Queens with the first queen already placed (backtracking)

def is_safe(queens, row, col):
    # check all queens placed above: same column or same diagonal
    for r in range(row):
        c = queens[r]
        if c == col or abs(c - col) == abs(r - row):
            return False
    return True

def solve(queens, row, n):
    if row == n:
        return True
    for col in range(n):
        if is_safe(queens, row, col):
            queens[row] = col
            if solve(queens, row + 1, n):
                return True
            queens[row] = -1          # backtrack
    return False

n = int(input("Enter n: "))
col = int(input("Column (1 to " + str(n) + ") for the first queen in row 1: "))
if col < 1 or col > n:
    print("Column must be between 1 and", n)
    exit()

queens = [-1] * n            # queens[row] = column of queen in that row
queens[0] = col - 1          # first queen is fixed

if solve(queens, 1, n):
    print()
    for row in range(n):
        line = ""
        for c in range(n):
            if queens[row] == c:
                line += "Q "
            else:
                line += ". "
        print(line)
else:
    print("No solution with the first queen at this position")
