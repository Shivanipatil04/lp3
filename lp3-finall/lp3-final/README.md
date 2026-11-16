# LP3 Practicals - final set

Folders: DAA (P1-P5), ML (P7-P11), Blockchain (P13-P17)
Mini projects (6, 12, 18) are skipped.

## One-time setup
    pip install pandas numpy scikit-learn matplotlib

## Run in VS Code
1. File -> Open Folder -> select this folder.
2. For ML programs, copy the CSV files (uber.csv, emails.csv, Churn_Modelling.csv,
   diabetes.csv, sales_data_sample.csv) into the ML folder.
3. Open a .py file -> press the Play button (top right), or in the terminal (Ctrl + `):
       cd ML
       python p7_uber_price.py          (use python3 on Linux/Mac)
4. Type the inputs when the program asks and press Enter.

## Run in Linux terminal
    cd lp3-final/DAA
    python3 p5_nqueens.py

    cd ../ML          # CSV must be in this same folder
    python3 p8_spam_knn_svm.py

## Run in Jupyter
    jupyter notebook
New -> Python 3 -> paste the whole program in one cell -> Shift+Enter.
Type the inputs in the box under the cell. Charts show inside the notebook.

## Blockchain (Remix IDE, no install)
1. Open remix.ethereum.org -> new file -> paste the .sol code.
2. Solidity Compiler tab -> Compile.
3. Deploy & Run tab -> Environment: Remix VM -> Deploy.
4. P15: type an amount in the Value box (wei) -> deposit; withdraw(amount); showBalance.
   P16: addStudent(1, "Ravi", 85) -> getStudent(0) -> totalStudents.
        Fallback: put some Value in "Low level interactions" and click Transact -> fallbackCount goes up.
   Note the transaction fee / gas values in the console after every transaction.
5. Real test network: Environment -> Injected Provider - MetaMask (Sepolia).
6. P13, P14, P17 have no code: see Blockchain_Notes_P13_P14_P17.md

## Sample inputs and expected output
P1  n = 7                     -> 13, series 0 1 1 2 3 5 8 13   (keep n <= 35)
P2  text = aabbbc             -> b=0, c=10, a=11, encoded 111100010
P3  items (60,10) (100,20) (120,30), capacity 50 -> Maximum Profit = 240.0
P4  same items, capacity 50   -> Maximum value = 220 (items 2 and 3)
P5  n = 6, column = 2         -> 6x6 board with Q and .
P7  uber.csv                  -> Linear R2 ~0.66, Random Forest R2 ~0.73
P8  emails.csv, K = 5         -> KNN ~0.87, SVM ~0.95
P9  Churn_Modelling.csv, 200  -> accuracy ~0.86
P10 diabetes.csv, K = 5       -> accuracy ~0.73
P11 sales_data_sample.csv, 3  -> 3 clusters (elbow bends at 3)
