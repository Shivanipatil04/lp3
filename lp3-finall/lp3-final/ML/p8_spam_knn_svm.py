# Practical 8: Email spam detection using KNN and SVM
# dataset: emails.csv (last column "Prediction": 1 = spam, 0 = not spam)
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix

df = pd.read_csv(input("Enter dataset file name (emails.csv): "))
df = df.drop(columns=["Email No."])

X = df.drop(columns=["Prediction"])
y = df["Prediction"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

k = int(input("Enter K for KNN: "))
knn = KNeighborsClassifier(n_neighbors=k)
knn.fit(X_train, y_train)
p1 = knn.predict(X_test)

svm = SVC(kernel="linear")
svm.fit(X_train, y_train)
p2 = svm.predict(X_test)

print("\nKNN accuracy:", accuracy_score(y_test, p1))
print(confusion_matrix(y_test, p1))
print("\nSVM accuracy:", accuracy_score(y_test, p2))
print(confusion_matrix(y_test, p2))
