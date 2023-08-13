const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("DataRewardsToken");

  await contract.waitForDeployment();

  console.log(
    `DRT with deployed to ${contract.target}`
  );

  const eventPromise = new Promise((resolve) => {
    listener = resolve;
    return contract.on("NewRegistration", async (wallet, phrase) => {
      console.log('NewRegistration', wallet, phrase)
      if (phrase && phrase.toLowerCase().startsWith('wow!')) {
        await contract.postRegistrationSuccess(wallet, 1)
        resolve()
      } else {
        await contract.postRegistrationFailure(wallet)
        resolve()
      }
    })
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
