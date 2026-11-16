# Practical 3: Fractional Knapsack (greedy)

n = int(input("Enter number of items: "))
items = []   # each item: [ratio, profit, weight, item number]
for i in range(n):
    print("\nEnter details for item", i + 1)
    profit = float(input("Enter profit: "))
    weight = float(input("Enter weight: "))
    items.append([profit / weight, profit, weight, i + 1])
capacity = float(input("\nEnter knapsack capacity: "))

# greedy: sort by profit/weight ratio, highest first
items.sort(reverse=True)

print("\nItems sorted by profit/weight ratio")
print("Item\tProfit\tWeight\tRatio")
for ratio, profit, weight, no in items:
    print(no, "\t", profit, "\t", weight, "\t", round(ratio, 2))

total = 0
left = capacity
print("\nSelected items")
print("Item\tWeight Taken\tProfit Gained\tFraction")
for ratio, profit, weight, no in items:
    if left == 0:
        break
    if weight <= left:
        fraction = 1
    else:
        fraction = left / weight      # take only the part that fits
    print(no, "\t", round(weight * fraction, 2), "\t\t", round(profit * fraction, 2), "\t\t", round(fraction, 2))
    total = total + profit * fraction
    left = left - weight * fraction

print("\nMaximum Profit =", round(total, 2))
