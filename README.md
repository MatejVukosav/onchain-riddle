# Onchain Riddle

A decentralized multiplayer riddle game built with Ethereum smart contracts and a modern React/Next.js frontend.

**Live Demo:**

- Open [onchain-riddle.vercel.app](https://onchain-riddle.vercel.app) in your browser.
- Connect your wallet.
- Guess the onchain riddle and submit your answer!

Try to solve the riddle
![Riddle](https://github.com/user-attachments/assets/92758557-c603-4afc-a36a-5d556d96e107)

Riddle is automatically replaced after correct guess!
![Solved](https://github.com/user-attachments/assets/f73d76c2-0325-497b-9fe3-242ad5ca01eb)

---

## Table of Contents

- [Onchain Riddle](#onchain-riddle)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
    - [Prerequisites](#prerequisites)
    - [Setup Steps](#setup-steps)
  - [Getting Started](#getting-started)
  - [License](#license)

---

## Overview

Onchain Riddle is a blockchain powered game where users solve riddles directly on chain. Riddles are managed by a smart contract bot, and users submit answers using their Ethereum wallet (e.g., MetaMask). The app supports both the Sepolia testnet and local Hardhat networks for seamless development and testing.

## Features

- Solve and submit answers to onchain riddles
- Connect with MetaMask or any injected Ethereum wallet
- Responsive, accessible UI
- Bot that automatically sets new riddle

## Tech Stack

- **Frontend:** React, Next.js, wagmi, TypeScript
- **Smart Contracts:** Solidity, Hardhat
- **Wallets:** MetaMask, Injected
- **Deployment:** Vercel (frontend), Hardhat (local/testnet)

## Project Structure

`frontend/` # Next.js dApp frontend
`hardhat/` # Solidity contracts and Hardhat scripts

### Prerequisites

- Node.js (v22+ recommended)
- pnpm
- MetaMask extension

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/MatejVukosav/onchain-riddle.git
cd onchain-riddle
```

## Getting Started

For detailed setup, see the `README.md` files in the `frontend/` and `hardhat/` directories.

## License

MIT License
