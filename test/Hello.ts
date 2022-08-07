import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hello", function () {
    async function deployHelloFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();
    
        const Hello = await ethers.getContractFactory("Hello");
        const hello = await Hello.deploy();
    
        return { hello, owner, otherAccount };
      }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
          const { hello, owner } = await loadFixture(deployHelloFixture);
    
          expect(await hello.owner()).to.equal(owner.address);
        });
    });

    describe("Greeting", function () {
        it("Should respond with the default greeting", async function () {
            const { hello, owner } = await loadFixture(deployHelloFixture);
            const defaultGreeting =  "Hello, World! My name is Jane Doe. The greeter has changed 0 times."
            expect(await hello.greeting()).to.equal(defaultGreeting);
        });
    });
});