# Practical 4: 0-1 Knapsack using Dynamic Programming

n = int(input("Enter number of items: "))
profit = []
weight = []
for i in range(n):
    print("\nEnter details for item", i + 1)
    profit.append(int(input("Enter profit: ")))
    weight.append(int(input("Enter weight: ")))
capacity = int(input("\nEnter knapsack capacity: "))

# table of (n+1) rows and (capacity+1) columns filled with 0
dp = []
for i in range(n + 1):
    dp.append([0] * (capacity + 1))

for i in range(1, n + 1):
    for w in range(1, capacity + 1):
        if weight[i - 1] <= w:
            take = profit[i - 1] + dp[i - 1][w - weight[i - 1]]
            leave = dp[i - 1][w]
            dp[i][w] = max(take, leave)
        else:
            dp[i][w] = dp[i - 1][w]

# find which items were selected (go backwards through the table)
selected = []
w = capacity
for i in range(n, 0, -1):
    if dp[i][w] != dp[i - 1][w]:
        selected.append(i)
        w = w - weight[i - 1]
selected.reverse()

print("\nSelected items")
print("Item\tWeight Taken\tProfit Gained")
for i in selected:
    print(i, "\t", weight[i - 1], "\t\t", profit[i - 1])

print("\nMaximum Profit =", dp[n][capacity])