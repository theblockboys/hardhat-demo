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

      const phrase1 = "Hello, World! My name is ";
      const phrase2 = ". The greeter has changed ";
      const phrase3 = " times.";
      const defaultGreeter = "Jane Doe";
      const defaultGreeterCount = 0;

    describe("Deployment", function () {
        it(`Should set the right owner`, async () => {
            // ARRANGE
            // ACT
            const { hello, owner } = await loadFixture(deployHelloFixture);

            // ASSERT
            expect(await hello.owner()).to.equal(owner.address);
        });

        it(`Should set the default greeter | ${defaultGreeter} `, async () => {
            // ARRANGE
            // ACT
            const { hello } = await loadFixture(deployHelloFixture);

            // ASSERT
            expect(await hello.greeter()).to.equal(defaultGreeter);
        });

        it(`Should set the default greeterCount | ${defaultGreeterCount})`, async () => {
            // ARRANGE
            // ACT
            const { hello } = await loadFixture(deployHelloFixture);

            // ASSERT
            expect(await hello.greeterCount()).to.equal(defaultGreeterCount);
        });
    });

    describe("Greeting", function () {
        it("Should respond with the default greeting on first call", async () => {
            // ARRANGE
            const defaultGreeting =  `${phrase1}${defaultGreeter}${phrase2}${defaultGreeterCount}${phrase3}`
            const { hello } = await loadFixture(deployHelloFixture);

            // ACT
            let greeting = await hello.greeting()

            // ASSERT
            expect(greeting).to.equal(defaultGreeting);
        });
        
        describe("Change Geeter", function () {
            const newGreeter = "John Doe";
            const newGreeterCount = 3;

            it(`Should set greeter | ${newGreeter}`, async () => {
                // ARRANGE
                const { hello } = await loadFixture(deployHelloFixture);

                // ACT
                await hello.changeGreeter(newGreeter);

                // ASSERT
                expect(await hello.greeter()).to.equal(newGreeter);
            });

            it(`Should set greeterCount | ${newGreeterCount}`, async () => {
                // ARRANGE
                const { hello } = await loadFixture(deployHelloFixture);

                // ACT
                await hello.changeGreeter("Some Greeter");
                await hello.changeGreeter("Some Other Greeter");
                await hello.changeGreeter(newGreeter);


                // ASSERT
                expect(await hello.greeterCount()).to.equal(newGreeterCount);
            });

            it(`Should revert with correct error when new greeter is empty`, async () => {
                // ARRANGE
                const revertMsg = "Invalid newGreeter. Empty string not allowed.";
                const { hello } = await loadFixture(deployHelloFixture);

                // ACT
                // ASSERT
                await expect(hello.changeGreeter("")).to.be.revertedWith(revertMsg);
            });
        });

        describe("Reset", function () {
            it(`Should reset the state back to the defaults`, async () => {
                // ARRANGE
                const { hello } = await loadFixture(deployHelloFixture);
                await hello.changeGreeter("Greeter 1");
                await hello.changeGreeter("Greeter 2");
                await hello.changeGreeter("Greeter 3");
                expect(await hello.greeter()).to.equal("Greeter 3");
                expect(await hello.greeterCount()).to.equal(3);

                // ACT
                await hello.reset();

                // ASSERT
                expect(await hello.greeter()).to.equal(defaultGreeter);
                expect(await hello.greeterCount()).to.equal(defaultGreeterCount);
            });

            it(`Should revert when non-owner makes call`, async () => {
                // ARRANGE
                const revertMsg = "Ownable: caller is not the owner";
                const { hello, otherAccount } = await loadFixture(deployHelloFixture);

                // ACT
                // ASSERT
                await expect(hello.connect(otherAccount).reset()).to.be.revertedWith(revertMsg);
            });
        });
    });
});