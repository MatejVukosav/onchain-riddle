# Getting Started

## Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- MetaMask extension

## Setup

1. **Clone the repo**
   git clone https://github.com/MatejVukosav/onchain-riddle.git
   cd onchain-riddle/frontend

2. **Install dependencies**
   pnpm install

3. **Configure environment variables**

   See `frontend/.env.example` for required variables.

4. **Run Hardhat node**
   cd ..
   cd hardhat
   pnpm hardhat node

5. **Deploy contracts**

   Follow instructions in `hardhat` folder to run hardhat network and deploy a contract.

6. **Start the frontend**

   Create .env variable file and set environment variables

7. **Start the frontend**

   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser and play the game.

## Tech Stack

- Next.js 15
- React 19
- wagmi (Ethereum wallet integration)
- TypeScript
- Shadcn UI
