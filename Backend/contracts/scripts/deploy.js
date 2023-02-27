const { ethers } = require("hardhat");

async function main() {
  const Certificate = await ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();

  console.log("Certificate contract deployed to:", certificate.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
