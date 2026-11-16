# Practical 11: K-Means clustering with elbow method
# dataset: sales_data_sample.csv
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

df = pd.read_csv(input("Enter dataset file name (sales_data_sample.csv): "), encoding="latin-1")
X = df[["QUANTITYORDERED", "PRICEEACH", "SALES"]].dropna()

# Elbow method: find WCSS for k = 1 to 10
wcss = []
for k in range(1, 11):
    model = KMeans(n_clusters=k, random_state=1)
    model.fit(X)
    wcss.append(model.inertia_)

plt.plot(range(1, 11), wcss, marker="o")
plt.title("Elbow Method")
plt.xlabel("Number of clusters")
plt.ylabel("WCSS")
plt.show()

k = int(input("Enter number of clusters (see elbow): "))
model = KMeans(n_clusters=k, random_state=1)
X["Cluster"] = model.fit_predict(X)
print(X["Cluster"].value_counts())
print(X.groupby("Cluster").mean())
