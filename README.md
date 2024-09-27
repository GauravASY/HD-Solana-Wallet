## HD-Solana-Wallet
This repository contains an implementation of a Hierarchical Deterministic (HD) Wallet for the Solana blockchain. 

## Features
1. It supports wallet generation and key derivation using the BIP-32/39/44 standard for secure key management.
2. BIP-39 Mnemonic Generation: Create secure seed phrases for wallet recovery.
3. HD Derivation : Derive public/private key pairs for Solana from the master seed.
4. Multiple Account Management: Generate and manage multiple accounts within a single seed phrase.

## Wallet Derivation Path
The default derivation path used for Solana wallets is m/44'/501'/0'/0', following the BIP-44 standard. You can adjust this path to derive different accounts.

## Collaborate ?
This project is a work in progress. I plan to add other functionalites like signing transaction, fetching the balance, send and receive Solana etc. to it. If you find an issue or would like to submit an improvement to this project then submit the issue or a pull request with fix (do refer the issue). Thank You.
