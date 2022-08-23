import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { Provider } from 'react-redux'
import store from './game/stores'
import "./index.css";

import './console'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai
  ],
  [
    alchemyProvider({
      apiKey: 'iUC0GH6CW_qfRxEzlipX-obRqJZRcnfg'
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'pixel world',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});



const Application = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>
          <App />
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );

};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode >
    < Application />
  // </React.StrictMode >
  );

