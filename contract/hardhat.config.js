require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// const PRIVATE_KEY = "2681881ef2ddd24cd569a5e5df1f34ac3f765f37ad7cffce76a9a7ee3c1fe7b8";

const PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "hyperspace",
  networks: {
    theta_testnet: {
      url: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
      accounts: [PRIVATE_KEY],
      chainId: 365,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};