it("should add a certificate and emit an event", async function () {
  const name = "John Doe";
  const schoolName = "Hardhat University";
  const schoolMajor = "Computer Science";
  const schoolDepartment = "Engineering";

  const certificateHash = ethers.utils.formatBytes32String("Certificate Hash");

  const tx = await certificateContract.addCertificate(
    name,
    schoolName,
    schoolMajor,
    schoolDepartment,
    certificateHash
  );
  const receipt = await tx.wait();
  const certificateData = receipt.events[0].args[0];
  expect(certificateData.studentName).to.equal(name);
  expect(certificateData.schoolName).to.equal(schoolName);
  expect(certificateData.schoolMajor).to.equal(schoolMajor);
  expect(certificateData.schoolDepartment).to.equal(schoolDepartment);
  expect(certificateData.verified).to.equal(false);
});

it("should return empty certificate for non-existent hash", async function () {
  const certificateHash = ethers.utils.formatBytes32String(
    "Non-existent Certificate Hash"
  );
  const certificateData = await certificateContract.getCertificateInfo(
    certificateHash
  );
  expect(certificateData.studentName).to.equal("");
  expect(certificateData.schoolName).to.equal("");
  expect(certificateData.schoolMajor).to.equal("");
  expect(certificateData.schoolDepartment).to.equal("");
  expect(certificateData.verified).to.equal(false);
});
