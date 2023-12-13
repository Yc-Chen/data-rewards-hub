# Data Rewards Hub

"If you are not paying for the product, then you are the product."

<p align="right">But users' data is also important for the product to work or improve.</p>

---

**💡How about we align that?**

---

This repo demonstrate a concept where users can get an NFT for their 'data' contribution
and in return get rewards through other crypto assets, including stable coins.
It features a simple ERC721 contract that is used for recognizing users.
It can be an online service or a physical product.
The idea is that users can register their product and get an NFT.
The NFT can be transacted in the market and the owner can get rewards.

## Steps

1. `npm install`. (Developed with Node v18)
2. `npm run blockchain`. This will start a hardhat local node
3. Add the local blockchain and import the first account into MetaMask:
    - Network Name: Local
    - New RPC URL: http://localhost:8545
    - Chain ID: 31337
    - Currency Symbol: GO (although hardhat believes its 'ETH')
    - Import account: 0x5FbDB2315678afecb367f032d93F642f64180aa3 (This is usually the first account in hardhat local network).
4. `npm run compile && npm run deploy`. This will compile the NFT contract and deploy it. (Note, do not deploy twice!)
5. `npm run dev`. This will start a local dashbaord

> [!NOTE]  
> If you ever restart the blockchain, you will need to reset the account activities in MetaMask!
