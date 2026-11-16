# Practical 7: Uber fare prediction (dataset: uber.csv)
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error

df = pd.read_csv(input("Enter dataset file name (uber.csv): "))
print("Raw shape:", df.shape)

# 1. Pre-process
df = df.drop(columns=["Unnamed: 0", "key"], errors="ignore")
df = df.dropna()
print("After dropping missing values:", df.shape)

# distance in km between pickup and drop (haversine formula)
lat1 = np.radians(df["pickup_latitude"])
lat2 = np.radians(df["dropoff_latitude"])
dlon = np.radians(df["dropoff_longitude"] - df["pickup_longitude"])
a = np.sin((lat2 - lat1) / 2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2) ** 2
df["distance"] = 6371 * 2 * np.arcsin(np.sqrt(a))

# hour and year from pickup time
df["pickup_datetime"] = pd.to_datetime(df["pickup_datetime"], errors="coerce")
df = df.dropna(subset=["pickup_datetime"])
df["hour"] = df["pickup_datetime"].dt.hour
df["year"] = df["pickup_datetime"].dt.year
df = df.drop(columns=["pickup_datetime"])

# remove wrong values
df = df[(df["fare_amount"] > 0) & (df["distance"] > 0)]
df = df[(df["passenger_count"] > 0) & (df["passenger_count"] <= 6)]
print("After removing wrong values:", df.shape)

# 2. Outliers (IQR method on fare and distance)
for col in ["fare_amount", "distance"]:
    q1 = df[col].quantile(0.25)
    q3 = df[col].quantile(0.75)
    iqr = q3 - q1
    df = df[(df[col] >= q1 - 1.5 * iqr) & (df[col] <= q3 + 1.5 * iqr)]
print("After removing outliers:", df.shape)

# 3. Correlation
corr = df.corr()
print("\nCorrelation with fare_amount:")
print(corr["fare_amount"])
plt.imshow(corr, cmap="coolwarm")
plt.colorbar()
plt.xticks(range(len(corr)), corr.columns, rotation=90)
plt.yticks(range(len(corr)), corr.columns)
plt.title("Correlation heatmap")
plt.show()

# 4. Models
X = df.drop(columns=["fare_amount"])
y = df["fare_amount"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

lr = LinearRegression()
lr.fit(X_train, y_train)
rf = RandomForestRegressor(n_estimators=50, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)

# 5. Evaluation
p1 = lr.predict(X_test)
p2 = rf.predict(X_test)
print("\nLinear Regression: R2 =", r2_score(y_test, p1), " RMSE =", np.sqrt(mean_squared_error(y_test, p1)))
print("Random Forest    : R2 =", r2_score(y_test, p2), " RMSE =", np.sqrt(mean_squared_error(y_test, p2)))
