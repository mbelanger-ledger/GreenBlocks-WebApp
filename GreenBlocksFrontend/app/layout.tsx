"use client";
import Navbar from "@/components/instructionsComponent/navigation/navbar";
import Footer from "@/components/instructionsComponent/navigation/footer";
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import type {AppProps} from 'next/app';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {
    arbitrum,
    goerli,
    mainnet,
    optimism,
    polygon,
    base,
    zora,
} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import {alchemyProvider} from 'wagmi/providers/alchemy';

const {chains, publicClient, webSocketPublicClient} = configureChains(
    [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        zora,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
    ],
    [publicProvider()]
);
const {connectors} = getDefaultWallets({
    appName: 'Greenblocks',
    projectId: '7b2b21eaf2eb15b6fa676a3a12d3b4ed',
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} modalSize="compact"
                                initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}>
                <body>
                <div style={{display: "flex", flexDirection: "column", minHeight: "105vh"}}>
                    <Navbar/>
                    {/*<div style={{flexGrow: 1}}>*/}
                    {children}
                    {/*</div>*/}
                    <Footer/>
                </div>
                </body>
            </RainbowKitProvider>
        </WagmiConfig>
        </html>
    );
}
