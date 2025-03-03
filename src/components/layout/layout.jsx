import React from "react";
import { Outlet } from "react-router-dom";
import { PageHeader } from "./page-header";
import styles from "../components.module.css";

function Layout() {
  return (
    <main className={styles.main}>
      <PageHeader />
      <Outlet />
    </main>
  );
}

export { Layout };
