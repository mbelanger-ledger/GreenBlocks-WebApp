
'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
        <p>create-web3-dapp</p>
      </a>
      <ConnectButton />
    </nav>
  );
}
