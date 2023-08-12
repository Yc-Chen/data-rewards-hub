# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

OpenZepplin wizard: https://docs.openzeppelin.com/contracts/4.x/wizard

hardhat:

```sh
npx hardhat compile

npx hardhat run --network localhost scripts/deploy.js
# or
npx hardhat run --network localhost scripts/deployDRT.js
```

To interact with the contract: `npx hardhat console --network localhost`

```JavaScript
const Contract = await ethers.getContractFactory('DataContributionToken');
contract = await Contract.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')
await contract.register('My first product')


// connect from a different account
const [owner, addr1] = await ethers.getSigners()
contract1 = await Contract.connect(addr1)
await contract1.register('My second product')

// as oracle
await contract.postRegistrationSuccess(owner.address, 1)
await contract.postRegistrationSuccess(addr1.address, 2) 
```

TODO, write this into test

## Next step

Make an oracle that periodically listens to the event and writes back to the blockchain.
Make a UI that users can register product and see if they have a product.
