# SPPU LP3 (410246) Practical Website - Build Notes & Errata

**College:** Late G. N. Sapkal College of Engineering, Nashik  
**Course:** Laboratory Practice III (410246) — AY 2026–27  
**Degree:** BE Computer Engineering (2019 Course, SPPU)  

---

## 1. Source Code Preservation (100% Byte-Identical Guarantee)
In accordance with exam guidelines, **no source code files have been modified or edited**. All 12 programs are embedded byte-for-byte from `lp3-final/` into `js/data.js` preserving exact indentation, whitespace, and comments.

### Verified SHA-256 Checksums
| Practical | Source File | Size (Bytes) | SHA-256 Checksum | Status |
|:---:|:---|:---:|:---|:---:|
| **P1** | `DAA/p1_fibonacci.py` | 570 | `652b785ac0e94bac...` | **MATCH** |
| **P2** | `DAA/p2_huffman.py` | 917 | `6be06952046e4e87...` | **MATCH** |
| **P3** | `DAA/p3_fractional_knapsack.py` | 1220 | `55986b42d8be023a...` | **MATCH** |
| **P4** | `DAA/p4_knapsack_01.py` | 1165 | `a8067860bdf2f390...` | **MATCH** |
| **P5** | `DAA/p5_nqueens.py` | 1228 | `534c53aed1d33a64...` | **MATCH** |
| **P7** | `ML/p7_uber_price.py` | 2581 | `2d2cbd898e9dbfb2...` | **MATCH** |
| **P8** | `ML/p8_spam_knn_svm.py` | 978 | `a370551b00b0b01b...` | **MATCH** |
| **P9** | `ML/p9_bank_churn_nn.py` | 1186 | `525bb79d1831528e...` | **MATCH** |
| **P10** | `ML/p10_knn_diabetes.py` | 859 | `a53b9230eb819969...` | **MATCH** |
| **P11** | `ML/p11_kmeans_sales.py` | 844 | `badcc46f1bf7f822...` | **MATCH** |
| **P15** | `Blockchain/p15_BankAccount.sol` | 699 | `2b2c4b1a021fb2bb...` | **MATCH** |
| **P16** | `Blockchain/p16_StudentData.sol` | 985 | `1e35d7d67f10f167...` | **MATCH** |

---

## 2. Manual Errata & Discrepancies Handled

1. **Practical 1 (Fibonacci Series Typo in Manual)**:
   - *Manual Text:* The lab manual docx contains: `"0, 1, 1, 2, 3, 5, 8, 13, 21, 38, ..."`
   - *Correction:* The number following 21 is `34` ($13 + 21 = 34$), not 38. The theory was corrected accordingly without copying the manual's typo.

2. **Practical 8 (Missing Assignment Questions in Manual)**:
   - *Observation:* In `LGNSCOE Lab Manual LP3 2026-27.docx`, Experiment 8 ends with a Kaggle reference link and has no assignment/viva questions.
   - *Resolution:* High-yield SPPU viva voce questions for P8 (KNN vs SVM, hyperplane, margin, support vectors, train-test split, classification metrics) were curated and integrated into the site.

3. **Practical 17 (Manual Copy-Paste Artifact)**:
   - *Observation:* The manual's assignment questions for Experiment 17 (Survey Report on Blockchains) mistakenly ask about Solidity structs, arrays, and fallbacks (copied from Experiment 16).
   - *Resolution:* Authentic SPPU questions on blockchain taxonomy, public vs private networks, consensus algorithms, and real-world enterprise adoption were provided.

4. **Practical 9 (TensorFlow/Keras vs Scikit-Learn MLPClassifier)**:
   - *Observation:* The lab manual mentions Keras / TensorFlow for bank customer churn, but the actual provided laboratory file (`p9_bank_churn_nn.py`) uses `scikit-learn`'s `MLPClassifier(hidden_layer_sizes=(8, 8), max_iter=epochs)`.
   - *Explanation:* The site explicitly notes this to examiners: both implement feed-forward Artificial Neural Networks with backpropagation; `scikit-learn` provides an identical conceptual model while eliminating heavy deep-learning GPU/C++ runtime overhead.

---

## 3. Runtime & Execution Notes

- **P1 Recursion Limit:** When testing `p1_fibonacci.py`, values of $n > 35$ will take exponential time ($O(2^n)$) in the recursive branch. Always use $n \le 35$ during lab demonstrations.
- **P11 CSV Encoding:** `sales_data_sample.csv` contains Latin-1 character accents; `p11_kmeans_sales.py` explicitly handles this with `encoding="latin-1"`.
- **Zero Network Calls:** The entire website functions natively on `file://` protocol. All code and metadata are injected via `js/data.js`, bypassing browser CORS `fetch()` restrictions.
