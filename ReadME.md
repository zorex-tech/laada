# Laada
A decentralized application that allows users to earn rewards for engaging in specific activities on social media platforms like Twitter and Discord. The rewards are managed through smart contracts written in Clarity and deployed on the Stacks blockchain.

## 🚀 Features 
* _User Registration_: 
Users can register using their Stacks wallet address.
* _Social Media Integration_: 
Supports activities such as retweets, follows, or hashtags on Twitter, and joining servers or channels on Discord.
* _Reward Distribution_: 
Smart contract logic to verify activities and reward users with tokens.
* _User Dashboard_: 
A web interface to view available campaigns, check rewards, and claim tokens.
## 💻 Tech Stack
* _Frontend_: Next.js
* _Backend_: Node.js for handling social media API interactions.
* _Blockchain_: Clarity for smart contract development on the Stacks blockchain.
* _Wallet Integration_: stacks.js for wallet interactions.
* _APIs_: Twitter API, Discord Webhooks for activity monitoring.
## Getting Started
### Prerequisites
* Node.js and npm installed.
* A Stacks wallet address.
* Twitter Developer account for API access.
* Discord Developer account for webhook setup.
* Telegram bot 
### 🛠️ Installation
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

- TWITTER_CLIENT_ID: Your Twitter API Key.
- TWITTER_CLIENT_SECRET: Your Twitter API Secret.
- DISCORD_CLIENT_ID: Your Discord client id.
- DISCORD_CLIENT_SECRET: Your Discord client secret.
- TELEGRAM_CLIENT_ID: Your Telegram bot name.
- TELEGRAM_CLIENT_SECRE: Your Telegram bot id.
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
Open your browser and navigate to http://localhost:3000 to the landing page with option to create campaign or create profile.

# Project Structure
```bash
Copy code
laada/
├── backend/ # Server to handle social media interactions and reward distribution
    ├── contracts/ # Clarity smart contracts for onchain activities
├── frontend/ # User interface for registration and reward claiming
├── README.md
└── .env.local  # Environment variables for API keys and configurations
```
# Usage
### 1. Register with Stacks Wallet:

Users connect their Stacks wallet using the frontend interface and create a profile.
The system records the users profile data in the database.
### 2. Create a project campaign:

Users connect their Stacks wallet using the frontend interface and create a campaign.
The system records the users project data in the database after locking the specified rewards in the reward vault smart contract.
### 3. Engage with Social Media:

Users can participate in various campaigns such as 
- X (twitter): 
  - Like a post - 1 point, 
  - Retwite a post - 2 points,
  - Commenting/Replying a twitter post - 3 points,
  - Tag a friend to a tweet - 3 points,   
  - Quoting a tweet - 4 points,   
  - Share a campaign - 4 points,   
  - Post original content - 5 ponits,
  - complete special chalenge - 8 points   
- Discord: 
  - Join a Discord server - 1 point, 
  - comment/react to post in the server - 1 point, 
  - Make a meaningful post in the server - 2 point, 
  - Reply to others - 3 point, 
  - Invite a friend - 4 point, 
  - Moderating/helping others in the server - 5 point, 
  - Boosting the server/ wining a challenge - 8 point, 
- Telegram: 
  - Join a telegram group/channel - 2 points, 
  - Comment/react to messages - 2 points, 
  - Post a message - 3 points, 
  - Reply to other messages - 4 points, 
  - Invite a freind - 5 points,
  - Share group content externally - 6 points,
  - Win a quizw / or a challenge - 8 points,
  
The backend server monitors these activities using the respective platform APIs and/bots and awards predefiened points accordingly.
### 4. Receive Rewards:

Once the backend server verifies a user's action, the user gets awarded the appropriate points that can be used to mint the Laada Reward Token (LRT) for the user.
The user can see their rewards on the dashboard and mint them to their wallet when they want. These tokens are used to swap for stx after the project takes a snapshot
## Smart Contract Overview
The Clarity smart contract includes the following key functions:

- Laada Reward Token (LRT) contract for minting and burning LRT
- Reward Vault: To allow projects lock intended rewards when they create project campaign

# Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any features, improvements, or bug fixes.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
- Stacks Blockchain for enabling smart contract development with Clarity.
- Twitter Developer Platform for API access.
- Discord Developer Portal for webhook integration.
- Telegram Developer Portal for webhook integration.
# Contact
For questions or support, please reach out to mosnyik@gmail.com.