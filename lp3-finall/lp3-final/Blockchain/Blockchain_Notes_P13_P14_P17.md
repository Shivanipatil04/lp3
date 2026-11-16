# Blockchain – Practicals 13, 14, 17 (no code, procedure/report)

## Practical 13: Install MetaMask and study Ether spent per transaction
1. Open Chrome/Edge/Firefox -> https://metamask.io -> **Download** -> Add extension (use only the official site).
2. Click **Create a new wallet** -> set password -> write down the 12-word Secret Recovery Phrase on paper (never share it) -> confirm it.
3. Switch network to a **test network (Sepolia)**: network dropdown -> enable "Show test networks" -> choose Sepolia.
4. Get free test ETH from a Sepolia faucet (e.g. Google Cloud Web3 faucet / Alchemy faucet) using your wallet address.
5. Send a small amount (e.g. 0.001 ETH) to a second account (create via **Add account**).
6. On the confirmation screen note: **Gas limit, Max fee, Gas price (Gwei), Estimated gas fee**.
7. After it confirms: Activity -> click the transaction -> View on Etherscan. Record Gas Used, Gas Price, Transaction Fee.

**Formula:** Transaction fee = Gas used x Gas price. A plain ETH transfer uses 21,000 gas.
Example: 21,000 x 20 Gwei = 420,000 Gwei = 0.00042 ETH.

| Tx | Amount sent | Gas used | Gas price (Gwei) | Fee (ETH) |
|----|-------------|----------|------------------|-----------|
| 1  |             |          |                  |           |

## Practical 14: Create your own wallet using MetaMask
1. MetaMask -> account icon -> **Add account or hardware wallet** -> **Add a new account** -> name it.
2. Copy the public address (0x...) from the account name.
3. Explain: address = public (share), private key / recovery phrase = secret.
4. Receive test ETH from faucet, then send a transaction to another account and show the balance change.
5. Screenshot: wallet address, balance, transaction in Activity tab.

## Practical 17: Survey report – Types of Blockchains and real-time use cases

**Introduction.** A blockchain is a distributed, immutable ledger where blocks of transactions are linked by cryptographic hashes and validated by consensus, with no central authority.

**Types**
| Type | Access | Who validates | Speed | Examples |
|------|--------|---------------|-------|----------|
| Public | Anyone can join, read, write | Anyone (PoW/PoS) | Slower | Bitcoin, Ethereum |
| Private | Invitation only, one organisation controls | Selected nodes | Fast | Hyperledger Fabric (single org), Multichain |
| Consortium (Federated) | Group of organisations | Pre-selected group of nodes | Fast | R3 Corda, Quorum, Hyperledger |
| Hybrid | Mix: some data public, some private | Controlled by rules | Medium | Dragonchain, XinFin |

- **Public:** fully decentralised, transparent, high security, low scalability, high energy (PoW).
- **Private:** centralised control, high privacy and throughput, less trust/decentralisation.
- **Consortium:** semi-decentralised, shared governance, suited to multi-party business networks.
- **Hybrid:** customisable visibility; sensitive data stays private, proofs go public.

**Real-time use cases**
1. **Cryptocurrency / payments** – Bitcoin, Ethereum; cross-border transfers (Ripple).
2. **Supply chain** – IBM Food Trust (Walmart) traces food origin in seconds; Maersk TradeLens for shipping.
3. **Healthcare** – secure, shared patient records and drug traceability.
4. **Banking and finance** – trade finance, KYC sharing, smart-contract based loans, DeFi.
5. **Voting** – tamper-proof e-voting (pilots in Estonia, West Virginia).
6. **Land records / government** – property registries (Georgia, Andhra Pradesh pilot in India).
7. **Education** – verifiable digital degree certificates.
8. **NFTs and digital assets** – ownership of art, tickets, game items.
9. **Insurance** – parametric insurance paid automatically through smart contracts.

**Advantages:** transparency, immutability, security, no intermediaries, traceability.
**Limitations:** scalability, energy use (PoW), regulation, irreversible mistakes.

**Conclusion.** The choice of blockchain depends on trust, privacy and performance needs: public for open trustless systems, private/consortium for enterprise, hybrid for flexible control.