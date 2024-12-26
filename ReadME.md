# Laada
A decentralized application that allows users to earn rewards for engaging in specific activities on social media platforms like Twitter and Discord. The rewards are managed through smart contracts written in Clarity and deployed on the Stacks blockchain.

## Features
_User Registration_: 
Users can register using their Stacks wallet address.
Social Media Integration: 
Supports activities such as retweets, follows, or hashtags on Twitter, and joining servers or channels on Discord.
_Reward Distribution_: 
Smart contract logic to verify activities and reward users with tokens.
_User Dashboard_: 
A web interface to view available campaigns, check rewards, and claim tokens.
## Tech Stack
_Frontend_: Next.js
_Backend_: Node.js for handling social media API interactions.
_Blockchain_: Clarity for smart contract development on the Stacks blockchain.
_Wallet Integration_: stacks.js for wallet interactions.
_APIs_: Twitter API, Discord Webhooks for activity monitoring.
## Getting Started
### Prerequisites
Node.js and npm installed.
A Stacks wallet address.
Twitter Developer account for API access.
Discord Developer account for webhook setup.
### Installation
1. Clone the Repository:

```shell
git clone https://github.com/zorex-tech/laada.git
cd laada
```
### Install Dependencies:

```bash
 For backend
cd backend
npm install

For frontend
cd ../frontend
npm install
```
### 3. Set Up Environment Variables: 
Create a .env file in the backend and frontend directories and add the following variables:

- TWITTER_API_KEY: Your Twitter API Key.
- TWITTER_API_SECRET: Your Twitter API Secret.
- DISCORD_WEBHOOK_URL: Your Discord webhook URL.
- STACKS_NETWORK: The Stacks network (e.g., testnet or mainnet).
### 4. Deploy Clarity Smart Contract:

Deploy the Clarity smart contract to the Stacks blockchain using the Stacks CLI.
Update the contract address in the frontend configuration.
## Running the Application
### 1. Start the Backend Server:

```bash
cd backend
npm run start
```
### 2. Start the Frontend:

```bash
Copy code
cd frontend
npm run dev
```
### 3. Access the Application:
Open your browser and navigate to http://localhost:3000 to access the user dashboard.

# Project Structure
```bash
Copy code
laada/
├── backend/             # Server to handle social media interactions and reward distribution
├── contract/            # Clarity smart contracts
├── frontend/            # User interface for registration and reward claiming
├── README.md
└── .env                 # Environment variables for API keys and configurations
```
# Usage
### 1. Register with Stacks Wallet:

Users connect their Stacks wallet using the frontend interface.
The smart contract records the user's registration on-chain.
### 2. Engage with Social Media:

Users can participate in campaigns such as tweeting with a specific hashtag or joining a Discord server.
The backend server monitors these activities using the respective platform APIs.
### 3. Receive Rewards:

Once the backend server verifies a user's action, it interacts with the Clarity smart contract to reward the user.
The user can see their rewards on the dashboard and claim them to their wallet.
## Smart Contract Overview
The Clarity smart contract includes the following key functions:

- register-user: Registers a new user with their Stacks address.
- reward-user: Mints tokens and transfers them to the user upon verification of their social media activity.
- get-reward-balance: Returns the balance of rewards for a user.
- claim-rewards: Allows users to transfer their accumulated rewards to their wallet.
# Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any features, improvements, or bug fixes.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
- Stacks Blockchain for enabling smart contract development with Clarity.
- Twitter Developer Platform for API access.
- Discord Developer Portal for webhook integration.
# Contact
For questions or support, please reach out to mosnyik@gmail.com.