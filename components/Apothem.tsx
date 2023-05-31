import { Chain } from "wagmi";

export const xdcTestnet: Chain = {
  id: 51, // Update with the appropriate ID for the XDC Testnet
  name: "TXDC", // Update with the name of the XDC Testnet
  network: "Txdc", // Update with the network name of the XDC Testnet
  nativeCurrency: {
    decimals: 18,
    name: "TXDC", // Update with the native currency name of the XDC Testnet
    symbol: "TXDC", // Update with the native currency symbol of the XDC Testnet
  },
  rpcUrls: {
    public: { http: ["https://rpc.apothem.network"] }, // Update with the RPC URL for the XDC Testnet
    default: { http: ["https://rpc.apothem.network"] }, // Update with the default RPC URL for the XDC Testnet
  },
  blockExplorers: {
    etherscan: {
      name: "TXDC Explorer",
      url: "https://explorer.apothem.network/",
    }, // Update with the block explorer information for the XDC Testnet
    default: { name: "TXDC Explorer", url: "https://explorer.apothem.network/" }, // Update with the default block explorer information for the XDC Testnet
  },
  contracts: {
    multicall3: {
      address: "0xabcde12345", // Update with the address of the multicall3 contract on the XDC Testnet
      blockCreated: 1_000_000, // Update with the block number when the multicall3 contract was created on the XDC Testnet
    },
  },
};
