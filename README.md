# M3M3 DAO
Project Usese React, and solidity to make a system. We make UI and UX simple to make user easy to particiapte. User could send Ethereum and min NFT that could be worked as an vote method. When user gets nft to votes they could vote with nft according to their voted numbers. Anyone could register project to proposals and all the data is recorede to smart contract. User could buy 1st ranked project meme coin. Buying means burn nft and get erc20 tokens.

# Demo
https://m3m3dao.github.io/webapp/

# Contract Repo
https://github.com/M3M3DAO/m3m3-contract

# Contract Address 

(Arbitrum)
```
NFT: 0x714eD56B2dA2f6CF4A583507bF3CF15313989E1B
Vote: 0xd0cF7C434bbA6Ae95e9580ea0dC3020255D2fBa1
```
(Avail)
```
NFT: 0x714eD56B2dA2f6CF4A583507bF3CF15313989E1B
Vote: 0xE54b29c5ee96Be7893374650Ee29bA6B682714b7
```
# verified in Scan (Avail)
https://op-avail-sepolia-explorer.alt.technology/address/0x714eD56B2dA2f6CF4A583507bF3CF15313989E1B?tab=contract

https://op-avail-sepolia-explorer.alt.technology/address/0xE54b29c5ee96Be7893374650Ee29bA6B682714b7?tab=contract

# Sequance Diagram

``` mermaid
sequenceDiagram
    participant User
    participant M3M3Voting
    participant M3M3NFT

    User ->> M3M3Voting: A. Submit Project Metadata

    User ->> M3M3NFT: B-1. Send Eth and Mint NFT
    M3M3NFT -->> User: B-2. tranfer NFT

    User ->> M3M3Voting: C-1. Vote for a Project with NFT
    M3M3Voting ->> M3M3Voting : C-2. get 1st ranked meme coin
    User ->> M3M3Voting: C-3. Buy 1st ranked Meme Coin with NFT
    User ->> M3M3NFT: C-4. Transfer NFT to Contract

    User ->> M3M3Voting: D-1. Burn NFT
    M3M3Voting ->> M3M3NFT:  D-2. Burn NFT
    M3M3Voting ->> User: D-3. Transfer Meme Coin to User
```
