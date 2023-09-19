import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import TransactionHistory from "../components/TransactionHistory";
import TokensBalancePanel from "../components/tokensBalanceDisplay";

export default function Home() {
  return (
    <div>

      <main className={styles.main}>
          <div className={styles.container}>
              <header className={styles.header_container}>
                  <div className={styles.header}>
                      <h1>
                          create<span>-web3-dapp</span>
                      </h1>
                      <h3>The ultimate solution to create web3 applications</h3>
                  </div>
              </header>
          </div>
        <NFTGallery />
        <TransactionHistory />
          <TokensBalancePanel />
      </main>
    </div>
  );
}
