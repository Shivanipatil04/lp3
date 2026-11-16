# Practical 9: Bank customer churn using a neural network
# dataset: Churn_Modelling.csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

df = pd.read_csv(input("Enter dataset file name (Churn_Modelling.csv): "))

# remove columns that are not useful
df = df.drop(columns=["RowNumber", "CustomerId", "Surname"])
# convert Geography and Gender text into numbers
df = pd.get_dummies(df, columns=["Geography", "Gender"], drop_first=True)

X = df.drop(columns=["Exited"])
y = df["Exited"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

epochs = int(input("Enter number of epochs: "))
model = MLPClassifier(hidden_layer_sizes=(8, 8), max_iter=epochs, random_state=1)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, pred))
print(confusion_matrix(y_test, pred))
print("(1 = customer leaves, 0 = customer stays)")
