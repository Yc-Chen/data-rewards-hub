# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
```

hardhat:

```sh
npx hardhat compile

npx hardhat run --network localhost scripts/deployDRT.js
```

To interact with the contract: `npx hardhat console --network localhost`

```JavaScript
const Contract = await ethers.getContractFactory('DataRewardsToken');
contract = await Contract.attach('0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1')
await contract.register('My first product') // this will not register
await contract.register('Wow! My first product') // this will register

// connect from a different account
const [owner, addr1] = await ethers.getSigners()
await contract.connect(addr1).register('My second product')
await contract.connect(addr1).isPending()

// as oracle
await contract.postRegistrationFailure(owner.address)
await contract.postRegistrationSuccess(addr1.address, 2) 
```

TODO, write this into test

## Nue JS

Note that `"type": "module"` is required in `package.json` for `import` to work.
But will it break something else?

Nue js has received pretty bad comments on hacker news.
Decided not to use it.

## Next step

Make a UI that users can register product and see if they have a product.

- [x] connect to the local blockchain
- [x] change to another framework. vue? htmx?
- [x] add shoelace
- [ ] build admin UI to 'airdrop' tokens
    - [x] figure out how to call contract methods
    - [ ] `awardNFT` is called, but where does the NFT go?
    - [ ] awardNFT to giveNFT

Snippet on how to use ether.js to get past events:
https://github.com/ethers-io/ethers.js/issues/37

Note: etherjs has upgraded to v6.
Docs:
https://docs.ethers.org/v6/search/?search=getsigner

Refactor the contract to emit events only. Also make it inherit from ERC721.

Rename 'data rewards' to 'data contribution'

## Discussions

- Is it better to reset the network or to redeploy the contract?
  Better redeploy the contract. Otherwise you also need to reset the metamask wallet activity.
