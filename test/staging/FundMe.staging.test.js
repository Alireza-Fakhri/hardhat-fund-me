const { assert } = require("chai");
const { network, ethers, getNamedAccounts } = require("hardhat");
const { developementChains } = require("../../helper-hardhat-config");

developementChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let deployer;
          let fundMe;
          const sendValue = ethers.utils.parseEther("0.1");
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue });
              const txResponse = await fundMe.withdraw({ gasLimit: 100000 });
              const txReceipt = await txResponse.wait(1);

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endingFundMeBalance.toString(), "0");
          });
      });
