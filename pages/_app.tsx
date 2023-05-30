import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

// import { createClient, WagmiConfig } from "wagmi";
// import { filecoinHyperspace } from "wagmi/chains";

// import { ConnectKitProvider, getDefaultClient } from "connectkit";

//
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, xdcTestnet } from "wagmi/chains";
import { thetaTestnet } from "../components/Theta";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

//

const { chains, provider, webSocketProvider } = configureChains(
  [xdcTestnet],
  [
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Hatch',
  projectId: '51',
  chains
});
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient
// })
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Navbar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
