# Practical 10: KNN on diabetes.csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score

df = pd.read_csv(input("Enter dataset file name (diabetes.csv): "))

X = df.drop(columns=["Outcome"])
y = df["Outcome"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

k = int(input("Enter K: "))
knn = KNeighborsClassifier(n_neighbors=k)
knn.fit(X_train, y_train)
pred = knn.predict(X_test)

accuracy = accuracy_score(y_test, pred)
print("Confusion matrix:")
print(confusion_matrix(y_test, pred))
print("Accuracy  :", accuracy)
print("Error rate:", 1 - accuracy)
print("Precision :", precision_score(y_test, pred))
print("Recall    :", recall_score(y_test, pred))
