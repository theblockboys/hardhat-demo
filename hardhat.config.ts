import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import secrets from "./secrets.json";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: secrets.networks.goerli.endpoint,
      accounts: [secrets.networks.goerli.accountPrivateKey]
    }
  }
};

export default config;
