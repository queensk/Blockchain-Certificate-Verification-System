const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certificate contract", function () {
  let certificateContract;

  beforeEach(async function () {
    const Certificate = await ethers.getContractFactory("Certificate");
    certificateContract = await Certificate.deploy();
    await certificateContract.deployed();
  });

  it("should add and verify certificate correctly", async function () {
    // Add a new certificate
    const certName = "John Doe";
    const certDate = "2022-02-25";
    const certIssuer = "Example Organization";
    const certHash = ethers.utils.formatBytes32String("0x1234");
    await certificateContract.addCertificate(
      certName,
      certDate,
      certIssuer,
      certHash
    );

    // Verify the certificate
    const certificateData = await certificateContract.getCertificate(certHash);
    expect(certificateData.name).to.equal(certName);
    expect(certificateData.date).to.equal(certDate);
    expect(certificateData.issuer).to.equal(certIssuer);
    expect(certificateData.hash).to.equal(certHash);
    console.log(certHash);
    console.log(certificateData);

    const verified = await certificateContract.verifyCertificate(certHash);
    expect(verified).to.be.true;
  });

  it("should return empty certificate for non-existent hash", async function () {
    const certHash = ethers.utils.formatBytes32String("");
    const certificateData = await certificateContract.getCertificate(certHash);
    expect(certificateData.name).to.be.empty;
    expect(certificateData.date).to.be.empty;
    expect(certificateData.issuer).to.be.empty;
    expect(certificateData.hash).to.equal(certHash);
  });
});
