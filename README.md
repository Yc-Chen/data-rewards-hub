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

## Next step

Make a UI that users can register product and see if they have a product.
