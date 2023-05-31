import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
//
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Wallet } from "ethers";
import { GatewayProvider, IdentityButton } from "@civic/ethereum-gateway-react";
import { xdcTestnet } from "../components/Apothem";



//

const GATEKEEPER_NETWORK =
  process.env.REACT_APP_GATEKEEPER_NETWORK ||
  "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6";


const useWallet = (): Wallet | undefined => {
  const { connector, address } = useAccount();
  const [wallet, setWallet] = useState<Wallet>();
  // update the wallet if the connector or address changes
  useEffect(() => {
    if (!connector) return;
    connector.getSigner().then(setWallet);
  }, [connector, address]);

  return wallet;
};

const { chains, provider, webSocketProvider } = configureChains(
  [xdcTestnet],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Hatch",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  const wallet = useWallet();
  if (!wallet)
    return (
      <>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </>
    );
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <GatewayProvider
        gatekeeperNetwork={GATEKEEPER_NETWORK}
        wallet={wallet}
        >
          <Navbar />
        <Component {...pageProps} />
    </GatewayProvider>
        
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
