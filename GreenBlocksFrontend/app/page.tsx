'use client'
import InstructionsComponent from "@/components/instructionsComponent";
import styles from "./page.module.css";
import "./globals.css";
import TransactionHistoryComponent from "@/components/TransactionHistoryComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <InstructionsComponent></InstructionsComponent>
      <TransactionHistoryComponent></TransactionHistoryComponent>
    </main>
  );
}
